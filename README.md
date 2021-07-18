# yave Yet Another Voxel Engine

<img src="https://raw.githubusercontent.com/notTGY/yave/main/animation.gif" width=240 alt="demo" />

## What it does?
Yave renders 3d objects using raymarching + some clever clipping. It doesn't handle movement of camera or objects, however you will find insides on how to do this in the demo.

## How to use Yave
Firstly you will need canvas with the `id=c`. It will be automatically scaled to 80x80 resolution (which you can change).
Secondly you connect the Yave script.
Thirdly initialize the engine and start render process by calling `U()`
To initialize engine you must provide:
- map

You can provide:
- `BEFORE` and `AFTER` functions which will be called before and after each render
- starting position of the camera in `X`, `Y` and `Z`
- shader function
- object collider
- optimisation functions
- `PUTPIXEL(K)` function of putting pixel with the color `K`

## Coordinates
In Yave x and z are "horizontal" coordiates, and y specifies the height offset, so there can be some confusion

## Map format
Map is an Array of objects.
Each object must have `{ 0: x, 1: y, 2: z }`,
however if you rewrite optimisation functions, object collider and shader you can use
whatever format you want :-)
So to place 1x1x1 cube in the map at the coordinates (3, 2, 1)
You simply fill map like this: `M=[ [3, 2, 1] ]`

By the way, you can make cubes corolful by adding 4th property of color and coloring pixel according to it

## Pro tip
source code is avaliable with comments in both demo files and `index.js`, there is also `golfed.htm` file in demo directory to prove that yave is simple and small for real (1kb demo).
