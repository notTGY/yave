F=e=>2*Math.asin(1-e/250)
onmousemove=e=>{
  A=-2.5*F(e.x)
  B=F(e.y)
}
onkeydown = e => rotationAngle = {w:1,s:3,a:4,d:2,' ':5,'Shift':6}[e.key]
rotationAngle = 0

M = []
for (I=255;I--;){
  for (J=255;J--;){
    M.push([I,0,J,2])
    if(Math.random()>.7)M.push([I,1,J,1])
  }
}

BEFORE= e => startTime=new Date().getTime()
AFTER = e => {
  endTime = new Date().getTime()
  dt = endTime - startTime
  if (rotationAngle == 6) {
    Y -= dt / 255
  } else if (rotationAngle == 5) {
    Y += dt / 255
  } else if(rotationAngle--){
    distance = dt / 255
    Z += distance * C(A + rotationAngle * Math.PI/2)
    X += distance * S(A + rotationAngle * Math.PI/2)
  }
  rotationAngle=0
}


side = 0
type = 0
// collision
R=(I,J,e,O)=>{
  if (I<.5&&J<.5&&e<.5&&I>-.5&&J>-.5&&e>-.5) {
    type = O[3]
    if (J<0) side = 1
    else side = 0
    K=H(D)
    if (N==(RES+RES**2)/2) type = 3
    return D=9
  }
}

PUTPIXEL = e => {
  if (type == 0) {
    Q[N*4]=Q[N*4+1]=Q[N*4+2]=255
  } else if (type == 1) {
    if (side == 1) {
      Q[N*4+1]=K
      Q[N*4]=Q[N*4+2]=0
    } else {
      Q[N*4+1]=Q[N*4+2]=K/2
      Q[N*4]=K
    }
  } else if (type == 2) {
    Q[N*4]=Q[N*4+1]=Q[N*4+2]=K
  } else if (type == 3) {
    Q[N*4]=Q[N*4+1]=Q[N*4+2]=255
  }
  type = 0
  side = 0
}

oncontextmenu=onclick=e=>{
  e.preventDefault()
  CA=C(A)
  SA=S(A)
  CB=C(B)
  SB=S(B)
  N = (RES+RES**2)/2
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

  V=M.filter(O1)
  W = V.filter(O2)
  for(D=1;D<9;D+=.2)
    W.filter(O => R(
        O[0]-X - dx*D,
        O[1]-Y - dy*D,
        O[2]-Z - dz*D,
        O
      )
    ).forEach(O=>{
      i = M.indexOf(O)
      if (e.which == 3) {
        M.push([...O])
        M[i][1]++
        M[i][3] = 2
      } else {
        M.splice(i,1)
      }
      return 0
    })
}





U()
Y = 3
