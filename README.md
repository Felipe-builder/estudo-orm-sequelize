<p align="center"><b>Acessando dados com ORM</b></p>

<div align="center">


</div>

  <h1 align="center">API - Escola de Inglês</h1>
  <h3 align="center">Usar banco de dados é essencial em praticamente todas as aplicações Node.js voltadas para a web. Iremos estudar agora sobre como trabalhar com BDs de forma extremamente produtiva utilizando mapeamento objeto-relacional (ou ORM, do inglês: Object-relational mapping) com o Sequelize ORM.</h3>
  <p align="center" style="indent-text"><p>

## Pre Requisites
<a href="https://nodejs.org/en/download/"><img src="https://img.shields.io/badge/nodejs-v16.14.0-green?style=for-the-badge&logo=node.js"/></a></br>
<a href="https://www.mysql.com/downloads/"><img src="https://img.shields.io/badge/mysql-yellowgreen?style=for-the-badge&logo=mysql"/></a></br>
<a href="https://docs.npmjs.com/about-npm"><img src="https://img.shields.io/badge/npm-v8.3.1-yellow?style=for-the-badge&logo=npm"/></a></br>
<a href="https://code.visualstudio.com/download"><img src="https://img.shields.io/badge/vscode-yellow?style=for-the-badge&logo=Visual Studio Code"/></a>

# Summay

 - Crie uma API com NodeJS e algumas de suas principais bibliotecas
 - Aprenda na prática como funciona um ORM
 - Use o Sequelize para fazer operações em bancos sem usar SQL
 - Desenvolva uma aplicação organizada no modelo MVC
 - Aprimore seus conhecimentos em JavaScript para back-end
 - Saia do CRUD básico e implemente mais funcionalidades em sua API
 - Aprenda na prática como utilizar um ORM para diversas necessidades de seu projeto
 - Use as funcionalidades do Sequelize para refinar suas consultas ao banco
 - Vá além das camadas básicas do MVC e organize sua aplicação para crescer
 - Aprimore seus conhecimentos em JavaScript para back-end

## Recursos
### Consumido
> ## API
>
> ### Niveis
>   - GET - '/niveis'
>   - GET - '/niveis/:id'
>   - POST '/niveis'
>   - PUT '/niveis/:id'
>   - DELETE '/niveis/:id'
>   - POST '/niveis/:id/restaura'
>
> ### Pessoas
>   - GET '/pessoas'
>   - GET '/pessoas/ativas'
>   - GET '/pessoas/:id'
>   - POST '/pessoas'
>   - PUT '/pessoas/:id'
>   - DELETE '/pessoas/:id'
>   - POST '/pessoas/:id/restaura'
>   - GET '/pessoas/:estudanteId/matriculas/:matriculaId'
>   - POST '/pessoas/:estudanteId/matriculas'
>   - PUT '/pessoas/:estudanteId/matriculas/:matriculaId'
>   - DELETE '/pessoas/:estudanteId/matriculas/:matriculaId'
>   - POST '/pessoas/:estudanteId/matriculas/:matriculaId/restaura'
>   - GET '/pessoas/:estudanteId/matriculas'
>   - GET '/pessoas/matriculas/:turmaId/confirmadas'
>   - GET '/pessoas/matriculas/lotadas'
>   - POST '/pessoas/:estudanteId/cancela'
>
> ### Turmas
>   - GET '/turmas'
>   - GET '/turmas/:id'
>   - POST '/turmas/'
>   - PUT '/turmas/:id'
>   - DELETE '/turmas/:id'
>   - POST '/turmas/:id/restaura'



[Postman Collections](./postman/orm-sequelize.postman_collection.json)

# Compilation Guide

1. Clone the project from GitHub:

```
git clone https://github.com/Felipe-builder/estudo-orm-sequelize.git
```


2. Install depencendies

```
npm install
```
    
3. Run

```
npm run dev
```
or

```
npm run start
```

The application will respond on port `3000`, to test if it has been correctly uploaded, just access [localhost:3000](http://localhost:3000).

To end an application just press `ctrl+c` in the terminal.

## Application access

The application will respond on port `3000`, to test if it has been correctly uploaded, just access [localhost:3000](http://localhost:3000).
test users usernames and passwords 

## References

> https://nodejs.org/docs/latest-v16.x/api/index.html

> https://dev.mysql.com/doc/

> https://mongoosejs.com/docs/api.html

> https://momentjs.com/docs/