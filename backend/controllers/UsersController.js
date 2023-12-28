const mysql2 = require("mysql2");
var configDB = {
  host: "localhost",
  user: "root",
  password: "mt2109",
  database: "react_ecommerce",
};

class UsersController {
  async index(req, res) {
    try {
      var con = mysql2.createConnection(configDB); // Tạo connection
      var users = await new Promise((resolve, rejects) => {
        con.query("SELECT * FROM users_account", function (err, result) {
          if (err) rejects(err);
          resolve(result);
        });
      });
      res.status(200).send(users);
      // console.log(users);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      con.end(); // Đóng connection
    }
  }

  async register(req, res) {
    try {
      const data = req.body;
      // var { preview_text, file, detail_text, cat } = req.form_data;
      var con = mysql2.createConnection(configDB);
      var users = await new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO users_account(username,email,password) values ('${data.fullName}','${data.email}','${data.password}')`,
          function (err, result) {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(users);
      console.log("ok");
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      console.log("failed");
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      console.log(id);

      var con = mysql2.createConnection(configDB);
      var users = await new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM users_account WHERE id=${id}`,
          function (err, result) {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(users);
      // console.log(id);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      console.log("failed");
    }
  }
}

module.exports = new UsersController();
