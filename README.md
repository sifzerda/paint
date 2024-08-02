# Paint 🎨

## Table of Contents
- [Paint 🎨](#paint-)
  - [Table of Contents](#table-of-contents)
  - [(1) Description](#1-description)
  - [(2) Badges](#2-badges)
  - [(3) Visuals](#3-visuals)
  - [(4) Installation](#4-installation)
  - [(5) Usage](#5-usage)
  - [(6) Dev Stuff: Building:](#6-dev-stuff-building)
  - [(7) Config](#7-config)
  - [(8) Bugs and Further Development:](#8-bugs-and-further-development)
  - [(9) To do:](#9-to-do)
  - [(10) Support](#10-support)
  - [(11) Contributing](#11-contributing)
  - [(12) Authors and acknowledgment](#12-authors-and-acknowledgment)
  - [(13) License](#13-license)
  - [(14) Project status](#14-project-status)

## (1) Description

An 'MS Paint' style app using Fabric.js. This was built with React, Node, Javascript, and CSS. 

Things learned:
- Using Fabric.js, + some experimentation with alternatives: a Paint style app in vanilla JS and in Paper.js (both saved in /copies)
- App which saves content to local machine (saves images)
- using 'clip-path' to draw custom-shaped svgs. Also used to 'reveal' or conceal parts of existing images.

## (2) Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) 
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Canvas API](https://img.shields.io/badge/Canvas-E72429.svg?style=for-the-badge&logo=Canvas&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font%20Awesome-538DD7.svg?style=for-the-badge&logo=Font-Awesome&logoColor=white) 
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## (3) Visuals

[Visit App deployed to Heroku](https://paint-sandy.vercel.app/)   

![paintpic](https://github.com/user-attachments/assets/edd3d6ad-957c-4e44-9d78-bf33766a6120)

![paintpic2](https://github.com/user-attachments/assets/1753daec-2619-4aa1-9dc2-eb22f3740f2f)


## (4) Installation

```bash
git clone https://github.com/sifzerda/paint.git
cd paint
npm install
npm run start
```

## (5) Usage

Technologies:

- <strong>Fabric.js: </strong> A HTML5 and Javascript Canvas API library for drawing, object and image manipulation. Had to scale back to v4 because of issue with import fabric in v5 & v6.
```bash
import * as fabric from 'fabric'; // v6
import { fabric } from 'fabric'; // v5
```
- ~~<strong>Paper.js: </strong>~~ Alternative to Fabric, canvas and image manipulation Library API. Able to make a paint style app, but lacks features of Fabric out of box. Scrapped in favor of fabric.

## (6) Dev Stuff: Building:

The main functions of code:

(A) Canvas: 

(A.1) PoolTable component:

- <strong>'  useEffect(() => { fabricCanvas.current' <strong>: create drawing canvas and size
- <strong>'const brushColor' and 'const brushWidth' </strong>: create brush color and brush width variables
- <strong>'const handleKeyDown...delete', </strong>: event listener; deletes selected object on delete key down
- <strong>'const handleKeyDown...delete', </strong>: event listener; deletes selected object on delete key down

(A.2) Pool component:

- <strong>'const ...' </strong>: ....
- <strong>'useEffect...' </strong>: creates game world.
- <strong>'const ...' 'const ...' </strong>: ...
- <strong>'const ...' </strong>: ...
- <strong>'const ...' </strong>: ...
 
(B) Movement:

## (7) Config

(A) SVG draw images:

Custom SVG drawings can be put into the drawShape fx if you have the svg path. You can copy the 'heart' case and paste the path in:
```bash
const sensorRadius = 10;
```
and 
```bash
       case 'new shape':
          newShape = new fabric.Path(`
            M10,30 
            A20,20,0,0,1,50,30 
            A20,20,0,0,1,90,30 
            Q90,60,50,90 
            Q10,60,10,30
          `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
```

then add corresponding button 
```bash
 <button onClick={() => drawShape('new shape')}>new shape</button>
```
## (8) Bugs and Further Development: 

- In order to add colours to the recent colours palette, you must select it in the color picker window and click 'Use'. The Use button was necessary to finalize the selected color, otherwise every color cursor drags over is added to the recent palette, making it useless.
- Some brushes and pencil don't respond to brush width -- needs to be fixed.
- Eraser has its own size adjuster

Optimization:
- use react-virtualized to only render visible stuff
- once game basically running, convert it into Redux or Zustand
- use a bundler like Webpack or Parcel to optimize build output: Enable code splitting, tree-shaking, and minification to reduce bundle size and improve load times.
- Consider memoizing components using React.memo to prevent unnecessary re-renders, especially if their props rarely change.

## (9) To do: 

- [x] Make Canvas
- [x] Make pencil that draws by toggling and dragging
- [x] color selection
- [x] recently added colors palette
- [x] transform and selection options
  - [x] Flip vertically
  - [x] Flip horizontally
  - [x] Rotate by 90 degrees
    - custom rotation is built into Fabric
- [x] create shapes
- [x] magnify
- [x] eraser
- [ ] 
- [ ] make different brush types:
  - [x] Airbrush
  - [ ] Caligraphy brush
  - [ ] Pen/marker
  - [x] Pencil
  - [x] Crayon (using pattern brush with texture)
- [x] save: provide choice of file extension (currently working inside /copies/saveasfileformat.jsx)
- [x] Can delete selecting and pressing delete key
- [x] Create a trash can icon that also deletes whatever is selected
- [ ] create undo and redo buttons that undo or redo most recent action

## (10) Support

For support, users can contact tydamon@hotmail.com.

## (11) Contributing

Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". 
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/NewFeature)
3. Commit your Changes (git commit -m 'Add some NewFeature')
4. Push to the Branch (git push origin feature/NewFeature)
5. Open a Pull Request

## (12) Authors and acknowledgment

The author acknowledges and credits those who have contributed to this project including:

- ChatGPT

## (13) License

Distributed under the MIT License. See LICENSE.txt for more information.

## (14) Project status

This project is (mostly) complete.

