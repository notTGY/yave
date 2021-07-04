// M stands for map
M=[]
// following for block generates 255x255 map, 
// with random blocks at height 1 and constant blocks at height 0
// objects of the map are made exstensible (maybe some1 will use this engine)
for (I=255;I--;){
  for (J=255;J--;){
    M.push([I,0,J])
    if(Math.random()>.7)M.push([I,1,J])
  }
}
// H function is a shader, it gets distance to the pixel 
// and returns value between 0 and 255, the light level
H=e=>20*++e|0
// starting position of the player is set there
Y=3
X=Z=99
// this is the canvas resolution
RES=80

// used for debugging to approximate FPS
// frame=0


// SA - Sin(A), SB - Sin(B), CA - Cos(A) ...
// Where A is a yaw, B is a pitch
// Actually, we don't need B in this implementation,
// because we only move player according to the A
// Also x is a context of a canvas
SA=SB=L=A=0,x=c.getContext`2d`
CA=CB=1

// your regular aliases to make life easier
S=Math.sin
C=Math.cos

// this function is used to set rotation angles from mousemove
// it has 125 hard coded as half of the canvas size
F=e=>2*Math.asin(1-e/125)

// this is the mentioned mousemove handler
onmousemove=e=>{
  A=-2.5*F(e.x)
  B=F(e.y)

  // we recalculate cos and sin on change to optimise engine
  CA=C(A)
  SA=S(A)
  CB=C(B)
  SB=S(B)
}

// this is very simple thing: 
// we assign L value according to which button is pressed
onkeydown=e=>L={w:1,s:3,a:4,d:2}[e.key]

// set resolution of the canvas
c.width=c.height=RES

// get image data frame (much faster render than fillRect)
P=x.createImageData(RES,RES)

// Q is the actual data of the imageData
Q=P.data

// we are setting 255 opacity for every pixel (optimising 25% of render loop)
for(N=RES**2;N--;)Q[N*4+3]=255

// this is collider it gets coordinates relative to the block center
// and if there was collision sets K variable (K is color)
// to the shader of the D - distance
// and also sets distance to maximum in order to skip other checks
R=(I,J,e)=>{
  // simple box collider
  if (I<.5&&J<.5&&e<.5&&I>-.5&&J>-.5&&e>-.5) {
    // setting color
    K=H(D)
    // setting D to skip a lot of function calls
    D=9
  }
}

// helper function that is used to calculate delta time to move player smoothly
G=e=>new Date().getTime();

// this is the last big bit: render function itself
(U=e=>{
  // at the start get current timestamp
  E=G()

  // first step of optimisations: filter all map objects down to 
  // ones who are in the field of view 
  // reduces maximum number of objects to the constant ( < 200 )
  V=M.filter(O=>{
    // rx, ry, rz - relative x, y, z of the object related to the player
    rx = O[0]-X
    ry = O[1]-Y
    rz = O[2]-Z

    // cut off far away objects
    if(rx**2+ry**2+rz**2>60) return 0

    // this is the vector of the center ray (center of the screen)
    cx = SA*CB
    cy = SB
    cz = CA*CB

    // t is length of the projection of the relative coords to the center ray
    //t = (rx*cx + ry*cy + rz*cz)/(cx**2 + cy**2 + cz**2)
    // it is optimised because (cx**2 + cy**2 + cz**2) === 1 all the time
    t = (rx*cx + ry*cy + rz*cz)

    // we cut off far away objects, now we cut off far back or far close objects
    if (t<1) return 0

    // px, py, pz - relative coords minus projection coords (distance from the center of the screen)
    px = rx - t*cx
    py = ry - t*cy
    pz = rz - t*cz

    // this distance should be no longer than 2t, because
    // (I dunno, this just worker really well, I guess, there is some scientific purpose for this)
    return (px**2 + py**2 + pz**2)<4*t*t
  })


  // here comes most hard on time segment
  // for each pixel raymarch its color
  for(N=RES**2;N--;){
    // px is relative to center x angle
    px = 2*(N%RES)/RES-1
    // py is relative to center y angle
    py = 2*(N/RES|0)/RES-1

    // this is a handy alias to reduce number of float computations done
    pp = CB + py*SB

    // dx, dy, dz is the exact vector corresponding to ray going through this pixel
    // this is some hardcore math done :)
    dx = px*CA + SA*pp 
    dz = CA*pp - px*SA 
    dy = SB - py*CB

    // W is more optimised version of V
    // this means that we are taking only thouse visible objects,
    // which are penetrated by the ray of this current pixel
    // this thing is between x1.5 and x2.5 optimisation
    W = V.filter(O => {
      // relative coords once again
      rx = O[0]-X
      ry = O[1]-Y
      rz = O[2]-Z

      // length of projection once again
      // but now to the actual pixel ray
      a = rx*dx + ry*dy + rz*dz

      // deviation
      bx = rx - a*dx
      by = ry - a*dy
      bz = rz - a*dz

      // simple thing to cut off extra far away from ray guys
      return bx**2 + by**2 + bz**2 < 2*a*a
      // you may be asking, why haven't we cut off extra far away in depth guys?
      // this is because we already managed to cut them off in previous optimisation
    })

    // ok, so K is the color of the pixel
    // we start off from white and as soon as we get collision
    // we set it to the appropriate color,
    // this means, if we don't have collision, color is still white
    K=255

    // this is some real raymarching
    // from Distance 1 to 9 with step 0.2
    // for each object try to collide it with 
    // the ray of the pixel multiplyed by the distance
    // (dx*D, dy*D, dz*D) and (rx, ry, rz)
    for(D=1;D<9;D+=.2)
      W.map(O => R(
          O[0]-X - dx*D,
          O[1]-Y - dy*D,
          O[2]-Z - dz*D
        )
      )

    // once we finished the colliding stuff,
    // set r g and b of the pixel to the value of the color
    Q[N*4]=Q[N*4+1]=Q[N*4+2]=K
  }

  // once we filled the array with current data,
  // apply that image to the canvas
  x.putImageData(P,0,0)

  // this thing handles movement of the player
  // it takes closer examination to understand
  if(L--){
    // T is delta time btw
    T=(G()-E)/255

    // some trigonometry magic + smart L solution
    Z+=T*C(A+Math.PI*L/2)
    X+=T*S(A+Math.PI*L/2)
  }

  // used for debugging to see FPS
  //if(frame++%2)x.fillRect(0,0,9,9)

  // go to the next iteration of the render loop
  // also set movement variable to 0 (clear movement)
  setTimeout(U,L=0)
})()
