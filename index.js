M=[
  [0,0,7],
  [1,1,3],
  [1,0,3],
  [1,-1,3],
  [-1,0,2],
  [0,2,3],
  [-1,1,3],
  [-1,-1,3],
  [0,-1,3],
  [2,0,6],
  [2,0,5],
  [2,0,4],
  [2,0,3],
  [2,0,2],
  [2,0,1],
  [2,0,0],
]

K=X=Y=Z=A=B=T=0,x=c.getContext`2d`
S=e=>Math.sin(e)
C=e=>Math.cos(e)
F=e=>2*Math.asin(1-e/250)
G=e=>new Date().getTime();
(U=e=>{
  E=G()
  c.width=c.height=40
  for(N=1600;N--;){
    M.map(O=>{
      for(D=1;D<7;D+=.2) {
        px = (N%40)/20-1
        py = N/800-1
        dx = px*C(A) + S(A)*C(B) + py*S(A)*S(B) 
        dz = -px*S(A) + C(A)*C(B) + py*C(A)*S(B)
        dy = - S(B) + py*C(B)
        rx = X+dx*D
        ry = Y+dy*D
        rz = Z+dz*D
        Rx = O[0]-rx
        Ry = O[1]-ry
        Rz = O[2]-rz
        if (Math.abs(Rx)<0.5&&Math.abs(Ry)<0.5&&Math.abs(Rz)<0.5) 
          x.fillRect(N%40, N/40, .8/D, 1)
      }
    })
  }
  T=(G()-E)/400

  if(K--){
    Z+=T*C(A+Math.PI*K/2)
    X+=T*S(A+Math.PI*K/2)
  }
  K=0


  setTimeout(U,0)
})()
onmousemove=e=>{
  A=-2.5*F(e.x)
  B=F(e.y)
}
onkeydown=e=>K={w:1,s:3,a:4,d:2}[e.key]
