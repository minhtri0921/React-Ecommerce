const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql2 = require('mysql2')

var configDB = {
    host: 'localhost',
    user: "root",
    password: "mt2109",
    database: 'react_ecommerce'
};
var con = mysql2.createConnection(configDB);
var users;

async function getUsers() {
    var con = mysql2.createConnection(configDB);// Tạo connection
    users = await new Promise((resolve, rejects) => {
        con.query('SELECT * FROM users_account', function (err, result) {
            if (err) rejects(err);
            resolve(result)
        })
    })

}
router.post('/', async (req, res) => {
    await getUsers()

    var user = req.body;
    var userLogin;
    // console.log(user, users);
    for (const el of users) {
        if (user.email === el.email
            && user.password === el.password) {
            userLogin = el;
            console.log('------------');
        }
    }
    // console.log(userLogin);
    if (userLogin) {
        const token = jwt.sign({ username: user.username }, 'secret_key', {
            expiresIn: '1h'//10 phút
        });
        const { password, ...userWithoutPassword } = userLogin;
        var result = {
            ...userWithoutPassword,
            token
        }
        res.status(200).send(result);
    } else {
        res.status(500).send({ status: 'NOK' });
    }
})


module.exports = router;