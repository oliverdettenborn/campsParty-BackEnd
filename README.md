<p align="center">
  <img src="https://raw.githubusercontent.com/thaliadettenborn/campsParty-FrontEnd/main/public/favicon.ico" width="100" alt="Camps Party" />
</p>

# Camps Party (FrontEnd)

 ![license](https://img.shields.io/github/license/thaliadettenborn/campsParty-BackEnd?style=flat-square) ![total lines](https://img.shields.io/tokei/lines/github/thaliadettenborn/campsParty-BackEnd) ![last commit](https://img.shields.io/github/last-commit/thaliadettenborn/campsParty-BackEnd?style=flat-square) ![issues](https://img.shields.io/github/package-json/v/thaliadettenborn/campsParty-BackEnd?style=flat-square) ![forks](https://img.shields.io/github/forks/thaliadettenborn/campsParty-BackEnd?style=flat-square) 

<br><br>
## About
<p>
  API for integration between the database and the website of the Camps Party event.<br><br>
  <a href="https://github.com/thaliadettenborn/campsParty-FrontEnd" target='_blank'>
    ✔️ Click here to view the front-end repository.
  </a>
</p>


<br><br><br>
<p align="center">
  <a style='color:inherit' href="#pré-requisites">Pre-requisites</a> •
  <a style='color:inherit' href="#running-the-web-applications">Running the web application</a> •
  <a style='color:inherit' href="#features">Features</a> •
  <a style='color:inherit' href="#rest">REST API</a> •
  <a style='color:inherit' href="#tech">Tech Stack</a> •
  <a style='color:inherit' href="#deploy">Deploy</a> •
  <a style='color:inherit' href="#contributors">Contributors</a> •
  <a style='color:inherit' href="#author">Author</a>
</p>

<br><br>
## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine: [Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/). In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

<br><br>
## Running the web application
```bash
# Clone this repository
$ git clone <https://github.com/thaliadettenborn/campsParty-BackEnd.git>

# Access the project folder cmd/terminal
$ cd campsParty-BackEnd

# Install the dependencies
$ npm install

# Create a file of environment variables at the root of the project
$ touch .env

# Set the database port and link as environment variable according to the ".env.example" file

# Run the app
$ npm start

# The server will automatically start

# Run the tests
$ npm test

```

<br><br>
## Features
- [x] Registration of new customers to pre-register for the event (Sign-up)<br>
- [x] Login of pre-registered users to complete registration (Sign-In)<br>
- [x] User logout<br>
- [x] Changing the participant's ticket types<br>
- [x] Posting or editing a participant's complete registration data<br>
- [x] List of all data related to the registration of a participant<br>
- [x] List of all event activities by day<br>
- [x] List of all event partner hotels<br>
- [x] List of all non-hotel accommodation options<br>
- [x] List of all activities chosen by a participant<br>
- [x] Posting or editing the activities chosen by a participant<br>

<br><br>
## REST API
<br>
Documentation: https://documenter.getpostman.com/view/13440732/TVt2cPWd#dc4de5ea-d64a-45c2-9e7d-5c0d9463c2fe
<br><br>

### `POST /api/users/sign-up`

#### Request
    curl --location --request POST 'https://camps-party.herokuapp.com/api/users/sign-up' \
    --data-raw '{
        "cpf": "123.456.789-10",
        "email": "meuemail@email.com",
        "ticketType": "none",
        "password": "abc123456",
        "passwordConfirmation": "abc123456"
        
    }'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    Content-Length: 137
    X-Powered-By: Express

    {
      "cpf": "123.456.789-10",
      "email": "meuemail@email.com",
      "id": 263,
      "completeRegistration": false,
      "ticketType": "none",
      "choosedActivities": false
    }

<br><br>
### `POST /api/users/sign-in`

#### Request
    curl --location --request POST 'https://camps-party.herokuapp.com/api/users/sign-in' \
    --data-raw '{
        "email": "meuemail@email.com",
        "password": "abc123456"
    }'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    Content-Length: 184
    X-Powered-By: Express

    {
      "token": "b5039232-e310-4556-b93f-682aa314fed1",
      "cpf": "123.456.789-10",
      "email": "meuemail@email.com",
      "id": 263,
      "completeRegistration": false,
      "ticketType": "none",
      "choosedActivities": false
    }

<br><br>
### `POST /api/users/sign-out`

#### Request
    curl --location --request POST 'https://camps-party.herokuapp.com/api/users/sign-out' \
    --header 'Authorization: Bearer eece68ba-55a3-4cc4-860c-18745f093e6b' \
    --data-raw ''

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    Content-Length: 184
    X-Powered-By: Express

<br><br>
### `PUT /api/users/ticketType`

#### Request
    curl --location --request PUT 'https://camps-party.herokuapp.com/api/users/ticketType' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw '{
        "ticketType": "hotel"
    }
    '

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    Content-Length: 184
    X-Powered-By: Express

    {
      "cpf": "123.456.789-10",
      "email": "meuemail@email.com",
      "id": 263,
      "completeRegistration": false,
      "ticketType": "hotel",
      "choosedActivities": false
    }

<br><br>

### `GET /api/event/activities/:day`

#### Request
    curl --location --request GET 'https://camps-party.herokuapp.com/api/event/activities/friday' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw ''
    PATH VARIABLES
    day: friday


#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    [
      {
          "id": 1,
          "description": "Minecraft: montando o PC ideal",
          "category": "Gaming",
          "hourOfTheDay": "Morning"
      },
      {
          "id": 2,
          "description": "Como vencer no candy crush (credit card needed)",
          "category": "Gaming",
          "hourOfTheDay": "Afternoon"
      },
      {
          "id": 3,
          "description": "Meu conjuge tá viciado, e agora?",
          "category": "Gaming",
          "hourOfTheDay": "Night"
      },
      {
          "id": 4,
          "description": "Clean Code é overrated",
          "category": "Hacking",
          "hourOfTheDay": "Morning"
      },
      {
          "id": 5,
          "description": "Por que seus filhos devem evitar PHP",
          "category": "Hacking",
          "hourOfTheDay": "Afternoon"
      },
      {
          "id": 6,
          "description": "Por que Java também não é a solução",
          "category": "Hacking",
          "hourOfTheDay": "Night"
      },
      {
          "id": 7,
          "description": "Oficina de Lego",
          "category": "Makers",
          "hourOfTheDay": "Morning"
      },
      {
          "id": 8,
          "description": "Robô feito de lego",
          "category": "Makers",
          "hourOfTheDay": "Afternoon"
      },
      {
          "id": 9,
          "description": "Criando o próprio lego na impressora 3d feita de lego",
          "category": "Makers",
          "hourOfTheDay": "Night"
      },
      {
          "id": 10,
          "description": "Criando seu unicórnio em 2 horas",
          "category": "Startups",
          "hourOfTheDay": "Morning"
      },
      {
          "id": 11,
          "description": "Obtendo um CNPJ em apenas 3 meses",
          "category": "Startups",
          "hourOfTheDay": "Afternoon"
      },
      {
          "id": 12,
          "description": "Marketing Multinível não é pirâmide: entre agora, traga amigos",
          "category": "Startups",
          "hourOfTheDay": "Night"
      }
    ]

<br><br>

### `POST /api/event/users/activities`

#### Request
    curl --location --request POST 'https://camps-party.herokuapp.com/api/event/users/activities' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw '{
        "friday": {
            "morning": "activity1",
            "afternoon": "activity2",
            "night": "activity3"
        },
        "saturday": {
            "morning": "activity4",
            "afternoon": "activity5",
            "night": "activity6"
        },
        "sunday": {
            "morning": "activity7",
            "afternoon": "activity8",
            "night": "activity9"
        }
    }'
#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

<br><br>
### `PUT /api/event/users/activities`

#### Request
    curl --location --request PUT 'https://camps-party.herokuapp.com/api/event/users/activities' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw '{
        "friday": {
            "morning": "activity1",
            "afternoon": "activity2",
            "night": "activity3"
        },
        "saturday": {
            "morning": "activity4",
            "afternoon": "activity5",
            "night": "activity6"
        },
        "sunday": {
            "morning": "activity7",
            "afternoon": "activity8",
            "night": "activity9"
        }
    }'
#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

<br><br>
### `GET /api/event/users/activities`

#### Request
    curl --location --request GET 'https://camps-party.herokuapp.com/api/event/activities/user' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw ''

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "friday": {
        "morning": "activity11",
        "afternoon": "activity12",
        "night": "activity13"
      },
      "saturday": {
        "morning": "activity14",
        "afternoon": "activity15",
        "night": "activity16"
      },
      "sunday": {
        "morning": "activity17",
        "afternoon": "activity18",
        "night": "activity19"
    }

<br><br>
### `GET /api/partners/hotels`

#### Request
    curl --location --request GET 'https://camps-party.herokuapp.com/api/partners/hotels' \
    --data-raw ''

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    [
      {
          "id": 4,
          "name": "Blue Tree Premium",
          "picUrl": "https://cf.bstatic.com/images/hotel/max1024x768/209/20915309.jpg",
          "description": "No Blue Tree Premium Faria Lima, você pode dar um mergulho na piscina aquecida, exercitar-se na academia e relaxar na sauna. Além disso, você pode apreciar a vista 360º da cidade. Os quartos elegantes do Blue Tree Premium dispõem de ar-condicionado, TV LCD a cabo, mesa de trabalho e frigobar. Há Wi-Fi disponível nas opções gratuita e paga em todas as acomodações e áreas comuns. Todas as unidades podem acomodar 1 a 2 pessoas.",
          "price": "R$ 1.200,00",
          "type": "hotel"
      },
      {
          "id": 5,
          "name": "Quality Faria Lima",
          "picUrl": "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partnerimages/30/77/307766274.jpeg",
          "description": "Os apartamentos dispõem de comodidades como ar-condicionado, cofre, mesa de trabalho, minibar, televisão e Wi-Fi, além de secador de cabelos. Algumas unidades apresentam sacada. As diárias do Quality Faria Lima incluem o café da manhã no Restaurante Marigot, que ainda serve almoço e jantar com pratos da gastronomia brasileira e da culinária internacional.",
          "price": "R$ 1.200,00",
          "type": "hotel"
      },
      {
          "id": 1,
          "name": "La Residence Paulista",
          "picUrl": "https://hoteliernews.com.br/wp-content/uploads/2020/07/laresidence-01-220715.jpg",
          "description": "O La Residence Paulista oferece o máximo do conforto, com apartamentos amplos, cama king size, além de contar com excelente atendimento e melhor localização de toda a cidade!",
          "price": "R$ 1.200,00",
          "type": "hotel"
      },
      {
          "id": 2,
          "name": "Dan Inn Planalto São Paulo",
          "picUrl": "https://media-cdn.tripadvisor.com/media/photo-w/07/f8/23/2b/dan-inn-planalto-hotel.jpg",
          "description": "Com uma combinação ideal de preço bom, conforto e conveniência, o hotel oferece um ambiente familiar com várias comodidades. Como um verdadeiro “lar longe de casa”, os quartos deste hotel contam com minibar e ar-condicionado. Além disso, acessar a internet é fácil com o wi-fi gratuito.",
          "price": "R$ 1.200,00",
          "type": "hotel"
      },
      {
          "id": 3,
          "name": "Intercity São Paulo Ibirapuera",
          "picUrl": "https://cf.bstatic.com/images/hotel/max1024x768/181/181885845.jpg",
          "description": "Os quartos modernos do Intercity São Paulo Ibirapuera possuem ar-condicionado, TV de tela plana a cabo, frigobar e mesa. Além disso, incluem banheiro privativo com chuveiro, secador de cabelo e produtos de higiene pessoal gratuitos. O restaurante do hotel serve buffet de café da manhã farto, além de especialidades nacionais e internacionais para almoço e jantar. O bar oferece uma seleção de coquetéis. Você também pode desfrutar do serviço de quarto 24 horas.",
          "price": "R$ 1.200,00",
          "type": "hotel"
      }
    ]

<br><br>
### `GET /api/partners/not-hotels`

#### Request
    curl --location --request GET 'https://camps-party.herokuapp.com/api/partners/not-hotels' \
    --data-raw ''

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    [
      {
          "id": 6,
          "name": "Sem acomodação",
          "picUrl": null,
          "description": "Acomodação por conta do participante.",
          "price": "R$ 300,00",
          "type": "none"
      },
      {
          "id": 7,
          "name": "Alojamento (barracas)",
          "picUrl": null,
          "description": "Acomodação no alojamento fornecido pelo eventos, necessário levar barraca.",
          "price": "R$ 600,00",
          "type": "tent"
      }
    ]

<br><br>
### `POST /api/user/subscription`

#### Request
    curl --location --request POST 'https://camps-party.herokuapp.com/api/user/subscription' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw '{
        "name": "José",
        "lastName": "da Siva",
        "address": "Av. Rebouças",
        "numberAddress": "150",
        "addOnAddress": "apto 101",
        "city": "São Paulo",
        "uf": "SP",
        "postalCode": "90000-000",
        "gender": "M",
        "accommodationId": 6,
        "phone": "(99) 12345-6789",
        "admissionCost": "0,00"
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "user": {
        "cpf": "123.456.789-10",
        "email": "meuemail@email.com",
        "id": 263,
        "completeRegistration": true,
        "ticketType": "hotel",
        "choosedActivities": false
      },
      "subscription": {
        "id": 68,
        "name": "José",
        "lastName": "da Siva",
        "address": "Av. Rebouças",
        "numberAddress": "150",
        "addOnAddress": "apto 101",
        "city": "São Paulo",
        "uf": "SP",
        "postalCode": "90000-000",
        "gender": "M",
        "userId": 263,
        "accommodationId": 6,
        "phone": "(99) 12345-6789",
        "cpf": "123.456.789-10",
        "admissionCost": "R$ 0,00"
      }
    }

<br><br>
### `PUT /api/user/subscription`

#### Request
    curl --location --request PUT 'https://camps-party.herokuapp.com/api/user/subscription' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw '{
        "name": "José Pedro",
        "lastName": "da Siva",
        "address": "Av. Rebouças",
        "numberAddress": "150",
        "addOnAddress": "apto 102",
        "city": "São Paulo",
        "uf": "SP",
        "postalCode": "90000-000",
        "gender": "M",
        "accommodationId": 6,
        "phone": "(99) 12345-6789",
        "admissionCost": "0,00"
    }'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "user": {
        "cpf": "123.456.789-10",
        "email": "meuemail@email.com",
        "id": 263,
        "completeRegistration": true,
        "ticketType": "hotel",
        "choosedActivities": true
      },
      "subscription": {
        "id": 68,
        "name": "José Pedro",
        "lastName": "da Siva",
        "address": "Av. Rebouças",
        "numberAddress": "150",
        "addOnAddress": "apto 102",
        "city": "São Paulo",
        "uf": "SP",
        "postalCode": "90000-000",
        "gender": "M",
        "userId": 263,
        "accommodationId": 6,
        "phone": "(99) 12345-6789",
        "cpf": "123.456.789-10",
        "admissionCost": "R$ 0,00"
      }
    }

<br><br>
### `GET /api/user/subscription`

#### Request
    curl --location --request GET 'https://camps-party.herokuapp.com/api/user/subscription' \
    --header 'Authorization: Bearer b5039232-e310-4556-b93f-682aa314fed1' \
    --data-raw ''

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 68,
      "name": "José Pedro",
      "lastName": "da Siva",
      "address": "Av. Rebouças",
      "numberAddress": "150",
      "addOnAddress": "apto 102",
      "city": "São Paulo",
      "uf": "SP",
      "postalCode": "90000-000",
      "gender": "M",
      "userId": 263,
      "accommodationId": 6,
      "phone": "(99) 12345-6789",
      "cpf": "123.456.789-10",
      "admissionCost": "R$ 0,00"
    }


<br><br>
## Tech Stack
Languages:<br>
<p align="center">
  <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img src="https://img.shields.io/badge/markdown-%23000000.svg?&style=for-the-badge&logo=markdown&logoColor=white"/>
</p>
<br>


The following tools and frameworks were used in the construction of the project:<br>
<p align="center" style='display: flex; justify-content: center; flex-wrap:wrap; align-items: center; margin: 0 50px;'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/bcrypt%20-%232B2F33.svg?&style=for-the-badge&logo=bcrypt&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/cors%20-%2314354C.svg?&style=for-the-badge&logo=cors&logoColor=white"'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/dotenv-%2300ADD8.svg?&style=for-the-badge&logo=dotenv&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/jest%20-%235B2F33.svg?&style=for-the-badge&logo=jest&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/joi-%23276DC3.svg?&style=for-the-badge&logo=joi&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/nodemon%20-%23239120.svg?&style=for-the-badge&logo=nodemon&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/pg%20%20-%232E7EEA.svg?&style=for-the-badge&logo=pg&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/string-strip%20html%20%20-%232E7EEA.svg?&style=for-the-badge&logo=string_strip_html&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/supertest%20-%23000.svg?&style=for-the-badge&logo=supertest&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/uuid%20-%2313988a.svg?&style=for-the-badge&logo=uuid&logoColor=4F4D3F'>

</p>

<br>
  Database:
  <img style='margin-left: 10px;' src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>

<br>
Version Control:
<img style='margin-left: 10px;' src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/>
<img style='margin-left: 5px;'  src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>

<br><br>
## Deploy

The application layout is available on Heroku:
<a style='margin-left: 10px;' href='https://camps-party.herokuapp.com/'><img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/></a>

<br><br>
## Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/responde-ai"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/40724166?s=200&v=4" width="100px;" alt=""/><br /><sub><b>Responde Aí</b></sub></a><br />
  </tr>
</table>

<br><br>
## Authors
---
<p align='center'>
  Made by Alice Amorim, Gabriel Milhomem, Lucas Kenji, and Thalia Dettenborn 👋🏽 Get in Touch! <br><br>

  <table>
    <tr>
      <td align="center">
        <img src="https://avatars3.githubusercontent.com/u/63621173?s=460&u=66dffbc47b48dfa2799739b3879a018c6c25854f&v=4" width="100px;"/> <br />
        <sub><b>Alice Amorim</b></sub></a> <br />
        <a href="https://www.linkedin.com/in/alice-amorim-3a7760169/">
          <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
        </a>
        <a href="https://github.com/monalice">
          <img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" />
        </a><br />
      <td align="center">
        <img src="https://avatars3.githubusercontent.com/u/57379072?s=460&u=8da0b7edee99a3485ca34005188c871d7c5b549a&v=4" width="100px;"/> <br />
        <sub><b>Gabriel Milhomem</b></sub></a> <br />
        <a href="https://www.linkedin.com/in/gabriel-milhomem-cunha/">
          <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
        </a>
        <a href="mailto:gabriell.mil@gmail.com">
          <img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/>
        </a>
        <a href="https://github.com/gabriel-milhomem">
          <img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" />
        </a><br />
      <td align="center">
        <img src="https://avatars3.githubusercontent.com/u/70969946?s=460&u=d873d977cde3717e8bc3631ab4d6a0773ace567d&v=4" width="100px;"/> <br />
        <sub><b>Lucas Kenji</b></sub></a> <br />
        <a href="https://www.linkedin.com/in/lucas-murakami/">
          <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
        </a>
        <a href="https://github.com/luucaskenji">
          <img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" />
        </a><br />
      <td align="center">
        <img src="https://avatars0.githubusercontent.com/u/70967247?s=460&u=0684339f0717ae41ce18689351f0215fdf270590&v=4" width="100px;"/> <br />
        <sub><b>Thalia Dettenborn</b></sub></a> <br />
        <a href="https://www.linkedin.com/in/thaliarobertadettenborn/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>
        <a href="mailto:thalia.born@gmail.com"><img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
        <a href="https://github.com/thaliadettenborn"><img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" /></a><br />
    </tr>
  </table>

</p>
