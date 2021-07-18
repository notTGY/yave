// M stands for map
M=[]

// H function is a shader, it gets distance to the pixel 
// and returns value between 0 and 255, the light level
H=e=>20*++e|0

// starting position of the player is set there
X=Y=Z=0

// this is the canvas resolution
RES=80

// SA - Sin(A), SB - Sin(B), CA - Cos(A) ...
// Where A is a yaw, B is a pitch
// Also x is a context of a canvas
A=B=0,x=c.getContext`2d`

// your regular aliases to make life easier
S=Math.sin
C=Math.cos

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

// once we finished the colliding stuff,
// set r g and b of the pixel to the value of the color
PUTPIXEL = e => Q[N*4]=Q[N*4+1]=Q[N*4+2]=K

// Optimisation funcitons: touch only if you believe youself
O1 = O=>{
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
}


O2 = O => {
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
}


// this is the last big bit: render function itself
U=e=>{
  // call BEFORE function before render
  BEFORE()

  // calculate camera angles sin and cos
  CA=C(A)
  SA=S(A)
  CB=C(B)
  SB=S(B)

  // first step of optimisations: filter all map objects down to 
  // ones who are in the field of view 
  // reduces maximum number of objects to the constant ( < 200 )
  V=M.filter(O1)


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
    W = V.filter(O2)

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

    PUTPIXEL(K)
  }

  // once we filled the array with current data,
  // apply that image to the canvas
  x.putImageData(P,0,0)

  // call AFTER function after render
  AFTER()

  // go to the next iteration of the render loop
  setTimeout(U,0)
}
