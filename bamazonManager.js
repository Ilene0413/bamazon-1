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
connection.connect(function (err) {
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
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            switch (answer.mgrOption) {
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
function lowInventory() {

    //query products database to list all products with low inventory (less than 5)
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
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


function addInventory() {
    console.log(`in add inventory`);
    // query the database for all items 
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) {
            console.log(`error is ${err}`);
            throw err;
        }
        else {
            // once you have the items, prompt the user for which they'd like to bid on
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "rawlist",
                        choices: function () {
                            let choiceArray = [];
                            for (var i = 0; i < results.length; i++) {
                                choiceArray.push(results[i].product_name);
                            }
                            return choiceArray;
                        },
                        message: "What product would you like to update?"
                    },
                    {
                        name: "addQuantity",
                        type: "input",
                        message: "How much inventory should be added?",
                        validate: function (input) {
                            // Declare function as asynchronous, and save the done callback
                            let done = this.async();

                            // Do async stuff
                            setTimeout(function () {
                                if (isNaN(input)) {
                                    // Pass the return value in the done callback
                                    done('Please provide quantity to be added');
                                    return;
                                }
                                else {
                                    if (input <= 0) {
                                        done('Please provide quantity to be added');
                                    }
                                }
                                // Pass the return value in the done callback
                                done(null, true);
                            }, 1000);
                        }

                    }
                ])
                .then(function (answer) {
                    // get the information of the chosen product
                    let chosenItem;
                    let chosenProduct;
                    let newQuantity = 0;
                    for (let i = 0; i < results.length; i++) {
                        console.log(`answer.choice ${answer.choice}`);
                        console.log(`answer quantity ${answer.addQuantity}`);
                        console.log(`result product name = ${results[i].product_name}`);
                        if (results[i].product_name === answer.choice) {
                            chosenItem = results[i].product_id;
                            chosenProduct = results[i].product_name;
                            newQuantity = results[i].stock_quantity + parseInt(answer.addQuantity);
                            console.log(`new quantity ${newQuantity}`);
                            console.log(`results ${results[i].stock_quantity}`);
                            break;
                        }
                    }
                    updateProducts(newQuantity, chosenItem, chosenProduct);


                });
        }


        function updateProducts(newQuantity, productId, productName) {
            console.log(`chosen item ${productId}`);
            // update item 
            let query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        product_id: productId
                    }
                ],
                function (error) {
                    if (error) {
                        console.log(`error ${error}`);
                        throw err;
                    }
                    else {
                        console.log(`Quantity updated: product ${productName}   Quantity on Hand: ${newQuantity}`);
                        managerOptions();
                    }

                });
        }
    });
}