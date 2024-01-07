const mysql2 = require("mysql2");
var configDB = {
  host: "localhost",
  user: "root",
  password: "mt2109",
  database: "react_ecommerce",
};

class ProductsControllers {
  // get Products
  async index(req, res) {
    try {
      var con = mysql2.createConnection(configDB); // Tạo connection
      var products = await new Promise((resolve, rejects) => {
        con.query("SELECT * FROM products", function (err, result) {
          if (err) rejects(err);
          resolve(result);
        });
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      con.end(); // Đóng connection
    }
  }
  async getProductById(req, res) {
    try {
      const id = req.params.id;
      // console.log(id);
      var con = mysql2.createConnection(configDB); // Tạo connection
      var products = await new Promise((resolve, rejects) => {
        con.query(
          `SELECT * FROM products WHERE id = ${id} `,
          function (err, result) {
            if (err) rejects(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(products);
      // console.log(products);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      con.end(); // Đóng connection
    }
  }
  async getProductByCategory(req, res) {
    try {
      const encodedCategory = req.params.category;
      // const category = decodeURIComponent(encodedCategory);
      // console.log(category, encodedCategory);
      var con = mysql2.createConnection(configDB); // Tạo connection
      var products = await new Promise((resolve, rejects) => {
        con.query(
          "SELECT * FROM products WHERE category = ?",
          [encodedCategory],
          function (err, result) {
            if (err) rejects(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      con.end(); // Đóng connection
    }
  }
  async deleteProductById(req, res) {
    try {
      var id = req.params.id;
      var con = mysql2.createConnection(configDB); // Tạo connection
      var products = await new Promise((resolve, rejects) => {
        con.query(
          "DELETE FROM products WHERE id = ?",
          [id],
          function (err, result) {
            if (err) rejects(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    } finally {
      con.end(); // Đóng connection
    }
  }
  async addProduct(req, res) {
    try {
      var product = req.body;
      console.log(product);
      var con = mysql2.createConnection(configDB); // Tạo connection
      var products = await new Promise((resolve, rejects) => {
        con.query(
          `
                            INSERT INTO products (title, price, description, category, image)
                            VALUES (
                                "${product.title}",
                                "${product.price}",
                                "${product.description}",
                                "${product.category}",
                                "${product.image}"  
                            );
`,
          function (err, result) {
            if (err) rejects(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    } finally {
      con.end(); // Đóng connection
    }
  }
  async editById(req, res) {
    try {
      var data = req.body;
      var con = mysql2.createConnection(configDB); // Tạo connection
      var products = await new Promise((resolve, rejects) => {
        con.query(
          `UPDATE products SET title = "${data.title}", price = "${data.price}",description="${data.description}",category="${data.category}",
                image="${data.image}" WHERE id = "${data.id}" `,
          function (err, result) {
            if (err) rejects(err);
            resolve(result);
          }
        );
      });
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    } finally {
      con.end();
    }
  }
}

module.exports = new ProductsControllers();
