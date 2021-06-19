S=[
  [0,0,7],
  [1,1,3],
  [1,0,3],
  [1,-1,3],
  [-1,0,2],
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

X=Y=Z=A=B=T=0,x=C.getContext`2d`
G=e=>new Date().getTime();
(U=e=>{
  F=G()
  C.width=C.height=50
  for(N=2500;N--;){
    for(D=1;D<9;D+=.2) {
      S.map(O=>{
        px = (N%50)/25-1
        py = N/50/25-1
        dx = D*px
        dy = D*py
        rx = X+dx
        ry = Y+dy
        rz = Z+D
        Rx = O[0]-rx
        Ry = O[1]-ry
        Rz = O[2]-rz
        if (Math.abs(Rx)<0.5&&Math.abs(Ry)<0.5&&Math.abs(Rz)<0.5) 
          x.fillRect(N%50, N/50, 2/D, 1)
      })
    }
  }

  Z = Math.sin(T/333)
  X = Math.cos(T/666)


  T+=G()-F
  setTimeout(U,0)
})()
