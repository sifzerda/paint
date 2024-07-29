 

packages and tech:

- fabric.js -- apparently better suited for ms paint
- ~~paper.js~~
- konva (optimization)
![Konva](https://img.shields.io/badge/Konva-0D83CD.svg?style=for-the-badge&logo=Konva&logoColor=white)
![Lodash](https://img.shields.io/badge/Lodash-3492FF.svg?style=for-the-badge&logo=Lodash&logoColor=white)
- lodash (optimization)


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

## (2) Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) 
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) 
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Canvas API](https://img.shields.io/badge/Canvas-E72429.svg?style=for-the-badge&logo=Canvas&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![FontAwesome](https://img.shields.io/badge/Font%20Awesome-538DD7.svg?style=for-the-badge&logo=Font-Awesome&logoColor=white) 
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## (3) Visuals

[Visit App deployed to Heroku](https://eightball-10-c60b2e58af61.herokuapp.com/)   

![poolPic1](https://github.com/user-attachments/assets/7a029b18-93a7-47f3-937f-798dae3b747d)

![poolpic1](https://github.com/user-attachments/assets/12ba417e-f00a-4b37-adb3-a6612b539c31)

![poolpic2](https://github.com/user-attachments/assets/1dfa1768-368e-4653-a78d-271ed1ac8466)


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
- ~~<strong>Paper.js: </strong>~~ Alternative to Fabric, canvas and image manipulation Library API. Able to make a paint style app, but lacks features of Fabric out of box.
- Konva:
- Lodash:
- 

## (6) Dev Stuff: Building:

The main functions of code:

(A) Game: 

(A.1) PoolTable component:

- <strong>'const ...' </strong>: ...
- <strong>'const ....' </strong>: ...
- <strong>'const ...', </strong>: ...

(A.2) Pool component:

- <strong>'const ...' </strong>: ....
- <strong>'useEffect...' </strong>: creates game world.
- <strong>'const ...' 'const ...' </strong>: ...
- <strong>'const ...' </strong>: ...
- <strong>'const ...' </strong>: ...
 
(B) Movement:

## (7) Config

(A) Pocket Sensors:

You can remove:
```bash
const sensorRadius = 10;
```
and 
```bash
        isSensor: true,
        isStatic: true,
```

(B) Change Background:

```bash
          isSensor: true,
```

## (8) Bugs and Further Development: 

- xxx
- xxx
- xxx

Optimization:
- use react-virtualized to only render visible stuff
- once game basically running, convert it into Redux or Zustand
- use a bundler like Webpack or Parcel to optimize build output: Enable code splitting, tree-shaking, and minification to reduce bundle size and improve load times.
- Consider memoizing components using React.memo to prevent unnecessary re-renders, especially if their props rarely change.

## (9) To do: 

- [x] Make Canvas
- [x] Make pencil that draws by toggling and dragging
- [ ] 
- [ ]
- [ ]
- [ ]
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 

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

This project is incomplete.

