const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
//const middleware = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// api 
app.get('/api/products', (req, res) => {
    return res.json(data.products);
});

app.post('/api/products', (req, res) => {
    let products =[], id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart){
        res.json(products);
    } else {
        for (let i=0; i<data.products.length; i++){
            id = data.products[i].id.toString();
            if (cart.hasOwnProperty(id)){
                data.products[i].qty = cart[id]
                products.push(data.products[i]);
            }
        }
        return res.json(products);
    }
});

app.post('/api/auth', (req, res) => {
    let user = data.users.filter((user) => {
        return user.name === req.body.name && user.password === req.body.password; 
    });

    if (user.length > 0) {
        let tokenPayload = {
            name: user[0].name,
            password: user[0].password
        };
        let token = jwt.sign(tokenPayload, "jwt_secret_password", { expiresIn: '1h'});
        let response = {
            message: 'Created Token and Authenticate Successfully',
            token: token
        };


        return res.json(response);
        
    } else {
        return res.status("409").json("Authenticate Error, Cannot find User !");
    }
})


const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');