# JavaScript Practice

## Target

- Apply knowledge of HTML5/CSS3/JavaScript (with ES6 syntax)
- Understand and apply MVC pattern
- Understand and apply DOM manipulation, form validation
- Use DevTools for debugging issues
- Use JSON server to manage the data

## Design on figma

[Figma](https://www.figma.com/file/9OHTvmzx42tLVSCROqRAK4/Plush-Toys-Store-(Copy)?node-id=91%3A8&mode=dev)

- Only get ideas from the design of UI structure

## Information

- Time line: 2023/08/04 – 2023/08/14
- Editor: Visual Studio Code
- Supported browser: Chrome, Firefox, MS Edge, Opera, Safari lasted
- Supported screen: Screen width 996px or larger

## Requirement

In this practice, we will have 3 objects need to care:

- User
- Card
- Language

List of features need to work on:

- User
  - We will use a fixed user to login to the application
  - Validate the username and password
  - Validate the format of username and password before press to button login
- Card
  - Create the card with properties. ( you can decide which properties need to save)
  - Update the card
  - Delete the card
  - Show the card detail as a popup
- Language
  - Create the language
  - Update the language
  - Archive the language
  - Filter cards follow the language

## Team size

- 1 developer: Duc Le

## Develop Environment

- [Visual Studio Code](https://code.visualstudio.com/)
- HTML & CSS
- [Github](https://github.com/LeVHoangduc/javascript_training)

## Deployment

- [N/A]()

## Folder structure

```
.
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── javascripts/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── helpers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── templates/
│   │   ├── views/
│   │   ├── app.js
│   │   └── main.js
│   ├── json-server/
│   │   └── db.json
│   ├── styles/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── themes/
│   │   ├── utils/
│   │   ├── vendors/
│   │   └── main.css
│   └── index.html
└── .editorconfig
└── .gitignore
└── package.json
└── README.md
```

## Getting started

- Step 01: Clone repository with HTTPS:

```bash
git clone https://github.com/LeVHoangduc/javascript_training.git
```

- Step 02: Change to branch feature/big-practice:

```bash
git checkout feature/javascript-practice
```

- Step 03: Install packages

```bash
npm install
```

- Step 04: Run

```bash
npx parcel src/index.html
```
