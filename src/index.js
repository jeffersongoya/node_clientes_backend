const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const routes = require("./routes/routes");

app.use(routes);

const porta = process.env.PORT || 3001; //necessary to integrate heroku
app.listen(porta, () => {
    console.log(`Server started on port ${porta}`);
});