var constants = require('./config/constants')
var express = require('express');
var swaggerUi = require('swagger-ui-express');
var app = express();

//// Swagger ////
var swaggerDocument = require('./doc/api_doc_swagger.json');
swaggerDocument.host=`localhost:${constants.PORT}`

app.use(require('./routes'))

app.listen(constants.PORT, function () {
    console.log(`App running in port ${constants.PORT}`);
});

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

