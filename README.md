# node sample app


# Table of Contents
* [Installation](#installation)
* [Tools](#tools)
* [File Structure](#files)
* [Team Members](#team-members)
 
# <a name="installation"></a>Installation

**Please have a local postgres instance running**

`git clone https://github.com/ecasilla/303-node-backend`  

`cp .env.template .env`

`./database/setup.sh`

`npm install`  

`npm run seed`

`npm start`


# <a name="tools"></a>Tools

* Typescript
* Knex (sql query builder)
* Joi (request/contract validation)
* Gulp (build tool) 
* postgres 10.2



# <a name="files"></a>Folder Structure

```
├── README.md
├── accessories
│   ├── building-log.ts
│   ├── formatting-log.ts
│   ├── lint-log.ts
│   ├── linting-log.ts
│   ├── pre-commit-log.ts
│   ├── prepublish-log.ts
│   ├── real-build-log.ts
│   ├── test-log.ts
│   └── test-watch-log.ts
├── database
│   ├── init.sql
│   └── setup.sh
├── gulpfile.ts
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   └── todos
│   │       ├── index.ts
│   │       ├── todo.ctrl.ts
│   │       ├── todo.model.ts
│   │       └── todo.validation.ts
│   ├── components
│   │   ├── errors
│   │   │   └── index.ts
│   │   └── middleware
│   │       └── requestId.ts
│   ├── config
│   │   ├── constants.ts
│   │   ├── express.ts
│   │   ├── index.ts
│   │   └── seed.ts
│   ├── db
│   │   └── index.ts
│   ├── index.ts
│   ├── routes.ts
│   ├── utils
│   │   └── logger.ts
│   └── views
│       ├── 401.html
│       ├── 404.html
│       ├── 500.html
│       └── layout.ejs
├── tsconfig.json
├── tslint.json
└── typings
    ├── lme.d.ts
    └── typings.d.ts

```


# ROUTES
**METHOD**|**ROUTE**
:-----:|:-----:
GET|/api/todos/
GET|/api/todos/:id
POST|/api/todos/
PUT|/api/todos/:id
DELETE|/api/todos/:id

# <a name="team-members"></a>Team Members
* "Ernie Casilla" <ecasilla@gmail.com>

