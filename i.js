M=[]
with(Math){for(a=I=255;I--;)for(J=a;J--;M.push([I,0,J]))if(random()>.7)M.push([I,1,J]);S=sin;C=cos;F=e=>2*asin(1-e/125)}
x=c.getContext`2d`

P=x.createImageData(c.width=c.height=X=Z=H=80,H)
Q=P.data
for(b=N=H*H;N--;Y=3)Q[N*4+3]=a

G=e=>new Date().getTime();
(onmousemove=e=>{CA=C(A=-2.5*F(e.x));SA=S(A);CB=C(B=F(e.y));SB=S(B)})({x:L=0,y:0});
(U=e=>{
  E=G()
  V=M.filter(([I,J,e])=>(rx=I-X)**2+(ry=J-Y)**2+(rz=e-Z)**2<60&&(t = rx*(cx=SA*CB) + ry*SB + rz*(cz=CA*CB))>1&&(rx-t*cx)**2+(ry-t*SB)**2+(rz - t*cz)**2<4*t*t)

  for(N=b;N--;Q[N*4]=Q[N*4+1]=Q[N*4+2]=K){
    d = 2*(N%H)/H-1
    f = 2*N/b-1

    T = CB + f*SB

    dx = d*CA + SA*T 
    dz = CA*T - d*SA 
    dy = SB - f*CB

    W = V.filter(([I,J,e])=>((rx=I-X) - (B = rx*dx + (ry=J-Y)*dy + (rz=e-Z)*dz)*dx)**2 + (ry - B*dy)**2 + (rz - B*dz)**2 < 2*B*B)

    K=a
    for(D=1;D<9;D+=.2)
      W.map(O => ((I,J,e)=>I<.5&&J<.5&&e<.5&&I>-.5&&J>-.5&&e>-.5&&(K=20*++D|0)&&(D=9))(
          O[0]-X - dx*D,
          O[1]-Y - dy*D,
          O[2]-Z - dz*D
        )
      )
  }

  x.putImageData(P,0,0)

  if(L--){T=(G()-E)/a;Z+=T*C(L=A+1.6*L);X+=T*S(L)}
  setTimeout(U,L=0)
})(onkeydown=e=>L={w:1,s:3,a:4,d:2}[e.key])
