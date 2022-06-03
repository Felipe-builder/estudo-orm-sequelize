const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const outputFile = './swagger_output.json';
const endpointsFiles = ['./api/routes/*Route.js'];


const doc = {
    info: {
    title: "API - School of English",
    version: "1.0.0",
    description: "API - School of English for managing Teachers and Students and their respective courses.",
    termsOfService: "http://example.com/terms/",
    contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
    },
    },
    host: "localhost:3000",
    base: "/",
    servers: [
        {
            url: "http://localhost:3000",
            description: "My API Documentation",
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            description: `
   For accessing the API a valid JWT token must be passed in all the queries in
   the 'Authorization' header.

   A valid JWT token is generated by the API and retourned as answer of a call
   to the route /login giving a valid user & password.

   The following syntax must be used in the 'Authorization' header :

       Bearer: xxxxxx.yyyyyyy.zzzzzz`,
            type: "http",
            name: "Authorization",
            scheme: "bearer",
            bearerFormat: "JWT",
            in: "header"
        }
    },
    apis: ["./api/routes/pessoasRoute.js",],
    definitions: {
        Pessoa: {
            nome: "Oliver Queen",
            nomeUser: "OliverArrow212",
            ativo: true,
            senha: "123456789",
            email: "arrow-oliver@hotmail.com",
            role: "estudante"
        },
        Login: {
            email: "arrow-oliver@hotmail.com",
            senha: "123456789"
        },
        PessoaCriada: {
            id: "12",
            nome: "Oliver Queen",
            nomeUser: "OliverArrow212",
            ativo: true,
            senha: "123456789",
            email: "arrow-oliver@hotmail.com",
            role: "estudante",
            updatedAt: "2022-06-01T14:18:37.482Z",
            createdAt: "2022-06-01T14:18:37.482Z"
        },
        TodasPessoasCriadas: [
            {
                $ref: '#/definitions/PessoaCriada'
            }
        ],
        Refresh: {          
            refreshToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        JwtExpired: {
            erro: "jwt expired",
            expiradoEm: "2022-06-02T17:45:45.000Z"
        },
        RefreshTokenNotSend: {
            "erro": "refresh token não enviado!"
          }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./api/index.js'); // Your express api project's root file where the server starts
});