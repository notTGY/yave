M = []
for (a=I=255;I--;Y=3)
  for (J=a;J--;)
    M.push([I,0,J],[I,1,J,1])

S=Math.sin
C=Math.cos

F=e=>2*Math.asin(1-e/255)
x=c.getContext`2d`

P=x.createImageData(c.width=c.height=X=Z=H=80,H)

Q=P.data

for(b=N=H*H;N--;)Q[N*4+3]=a

G=Date.now;

(onmousemove=e=>{
  i=C(A=-2.5*F(e.x))
  j=S(A)
  k=C(B=F(e.y))
  l=S(B)
})({x:0,y:L = 0})


oncontextmenu=onclick=e=>{
  e.preventDefault()
  if (e.which == 3) {
    o=M[idx]
    M.push([o[0],o[1]+1,o[2]])
  } else {
    M.splice(idx,1)
  }
  return 0
}


(U=e=>{
  E=G()
  V=M[g='filter'](([I,J,e])=>(h=I-X)**2+(m=J-Y)**2+(n=e-Z)**2<60&&(t=h*j*k+m*l+n*i*k)>1&&(h-t*j*k)**2+(m-t*l)**2+(n-t*i*k)**2<4*t*t);

  for(N=b;N--;){
    d = 2*(N%H)/H-1
    f = 2*N/b-1

    T = k + f*l

    o = d*i + j*T 
    q = i*T - d*j 
    p = l - f*k

    W=V[g](([I,J,e])=>((h=I-X)-(B=h*o+(m=J-Y)*p+(n=e-Z)*q)*o)**2+(m-B*p)**2+(n-B*q)**2<2*B*B)

    K=255
    T = s = 0

    for(D=1;D<9;D+=.2)
      W[g](O => 
        ((I,J,e,O)=>{
          if (I<.5&&J<.5&&e<.5&&I>-.5&&J>-.5&&e>-.5) {
            s = J<0
            K=20*++D|0
            T = N==(H+b)/2 ? 3 : O[3]
            return D=9
          }
        })(
          O[0]-X - o*D,
          O[1]-Y - p*D,
          O[2]-Z - q*D,
          O
        )
      )[g](O=>N==(b+H)/2?idx=M.indexOf(O):0)

  
  Q[p=N*4]=T&&s?0:K
  Q[p+1]=T&&!s?K/2:K
  Q[p+2]=T?s?0:K/2:K


  }

  x.putImageData(P,0,0)

  T = (G() - E) / a
  if (L > 4) {
    Y += (5.5-L)*T
  } else if(L--){
    Z += T * C(L=A + L * 1.6)
    X += T * S(L)
  }

  setTimeout(U,L=0)
})(onkeydown = e => L = {w:1,s:3,a:4,d:2,' ':5,'Shift':6}[e.key])

