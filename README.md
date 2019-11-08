# 2º DAW primer proyecto.
_(Node, AngularJS 1.5, Graphql, Prisma, Moleculer)_

Aplicación compuesta por tres backends y un frontend.

## Backend (puerto 3000)
- Sistema de log con log4js.
- Social login (Github).
- Sistema de correo electrónico para las sugerencias.
    - Las sugerencias son transmitidas al servidor de Prisma.
- Sistema de llenado de base de datos con faker.
    - backend/routes/api/element.js - (/fake/:qty)

<br>

## Backend Graphql (puerto 3001)
- Listado de usuarios solo para un usuario administrador.
- Base de datos compartida junto al primer backend


<br>

## Backend Moleculer (puerto 3500)
- Listado de eventos

<br>

## Backend Prisma (puerto 4000)
- Listado de sugerencias

<br>

## Frontend
- Aplicación isommórfica junto al primer backend. 
- Aplicación componetizada.
