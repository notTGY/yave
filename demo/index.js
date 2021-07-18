// following for block generates 255x255 map, 
// with random blocks at height 1 and constant blocks at height 0
// objects of the map are made exstensible (maybe some1 will use this engine)
for (I=255;I--;){
  for (J=255;J--;){
    M.push([I,0,J])
    if(Math.random()>.7)M.push([I,1,J])
  }
}

// starting position of the player is set there
Y=3
X=Z=99

// this function is used to set rotation angles from mousemove
// it has 250 hard coded as half of the canvas size
F=e=>2*Math.asin(1-e/250)

// this is the mentioned mousemove handler
onmousemove=e=>{
  A=-2.5*F(e.x)
  B=F(e.y)
}

// this is very simple thing: 
// we assign rotationAngle value according to which button is pressed
onkeydown = e => rotationAngle = {w:1,s:3,a:4,d:2}[e.key]

// do not move player by default
rotationAngle = 0

// before start of render loop get current time
BEFORE= e => startTime=new Date().getTime()

// after end of render move player
AFTER = e => {
  // get end time and delta of loop in ms
  endTime = new Date().getTime()
  dt = endTime - startTime

  // this thing handles movement of the player
  // it takes closer examination to understand
  if(rotationAngle--){
    // distance is distance that the player will travel this loop according to ms spent
    // this means that his speed is 1/255 meters/milisecond ~ 4 m/s
    distance = dt / 255

    // some trigonometry magic + smart rotationAngle solution
    Z += distance * C(A + rotationAngle * Math.PI/2)
    X += distance * S(A + rotationAngle * Math.PI/2)
  }

  // make rotationAngle 0 to not move player if the button is not pressed
  rotationAngle=0
}

U()
