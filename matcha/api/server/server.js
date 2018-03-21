let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

let hostname = 'localhost';
let port = 3100;

let app = module.exports = express();
let router = express.Router();

let home = require('../home/home');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.route('/api/signup').post((req, res) => home.signUp(req, res));

router.route('/api/test').all((req, res) => {
    let cars = [
        {
            nom: 'clio',
            marque: 'Renault'
        },
        {
            nom: '206',
            marque: 'Peugeot'
        }
    ];
    console.log('TEST GETCARS');
    return res.status(200).send(cars);
});

app.use(router);

app.start = () => {
    app.listen(port, hostname, () => {
        console.log('Mon serveur fonctionne sur http://' + hostname + ':' + port + '\n');
    });
}