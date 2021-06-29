M=[]
for (I=255;I--;){
  for (J=255;J--;){
    M.push([I,2*Math.random()|0,J])
  }
}
Y=4
X=Z=99


SA=SB=H=A=0,x=c.getContext`2d`
CA=CB=1
S=Math.sin
C=Math.cos
F=e=>2*Math.asin(1-e/125)
onmousemove=e=>{
  A=-2.5*F(e.x)
  B=F(e.y)
  CA=C(A)
  SA=S(A)
  CB=C(B)
  SB=S(B)
}
onkeydown=e=>H={w:1,s:3,a:4,d:2}[e.key]
R=(I,J,K)=>{
  if (I<.5&&J<.5&&K<.5&&I>-.5&&J>-.5&&K>-.5) {
    D = (255-700/++D|0).toString(16) // TODO: improve shader
    x.fillStyle = '#'+D+D+D
    x.fillRect(N%50, N/50, 1, 1)
    D=8
  }
}
G=e=>new Date().getTime();
(U=e=>{
  E=G()
  c.width=c.height=50

  V=M.filter(([I,J,K])=>{
    cx = I-X
    cy = J-Y
    cz = K-Z
    return cx**2+cy**2+cz**2<50;
  })

  for(N=2500;N--;){
    px = (N%50)/25-1
    py = N/1000-1
    pp = CB + py*SB
    dx = px*CA + SA*pp 
    dz = CA*pp - px*SA 
    dy = SB - py*CB
    V.map(([I,J,K])=>{
      for(D=1;D<7;D+=.2)
        R(
          I-X - dx*D,
          J-Y - dy*D,
          K-Z - dz*D
        )
    })
  }

  if(H--){
    T=(G()-E)/400
    Z+=T*C(A+Math.PI*H/2)
    X+=T*S(A+Math.PI*H/2)
  }


  setTimeout(U,H=0)
})()
