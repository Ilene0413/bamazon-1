var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  managerOptions();
});

// function which prompts the user for what action they should take
function managerOptions() {
  inquirer
    .prompt({
      name: "mgrOption",
      type: "list",
      message: "Please select one of the following options:",
      choices: [
          "View Products for Sale", 
          "View Low Inventory", 
          "Add to Inventory", 
          "Add New Product",
          "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      switch (answer.mgrOption){
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;
        
        case "Add New Product":
        newProduct();
        break;

        case "EXIT":
        connection.end();
      }
    });
}

// function to view all products for sale
function viewProducts() {

    //query products database to list all products and information
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) {
            console.log(`error ${err}`);
            throw err;
        };
        let productsInStore = results;
        console.log(`Product ID          Product          Price          QuantitY`);

        for (let i = 0; i < productsInStore.length; i++) {
          console.log(`${productsInStore[i].product_id} ${productsInStore[i].product_name.trim()}         ${productsInStore[i].product_price.toFixed(2)}           ${productsInStore[i].stock_quantity}`);
        }
        managerOptions();
    });

}

function bidAuction() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM auctions", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}
