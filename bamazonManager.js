//load mysql, inquirer and columnify packages

let mysql = require("mysql");
let inquirer = require("inquirer");
//load the NPM print table package
const cTable = require('console.table');

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
                //format printing of products

        let productsInStore = results;
        displayProducts(productsInStore);
        managerOptions();
    });


}
//this function is to view all products with low inventory

function lowInventory() {
    //query products database to list all products with low inventory (less than 5)

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) {
            console.log(`error ${err}`);
            throw err;
        };
        let productsInStore = results;
        displayProducts(productsInStore);
        managerOptions();
    });

}
//this function console logs the products to be displayed

function displayProducts(productsInStore) {
let values = [
    [prodId = '',
    prodName = '',
    prodPrice = '',
    prodQuantity = ''
    ],
];

for (let i = 0; i < productsInStore.length; i++) {
    values.push([productsInStore[i].product_id,
    productsInStore[i].product_name.trim(),
    productsInStore[i].product_price.toFixed(2),
    productsInStore[i].stock_quantity
    ]);
};
console.table(['Product ID', 'Product Name', 'Price/Unit', 'Quantity on Hand'], values);
}
//this function is update the quantity on hand of an existing item
function addInventory() {
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
                        if (results[i].product_name === answer.choice) {
                            chosenItem = results[i].product_id;
                            chosenProduct = results[i].product_name;
                            newQuantity = results[i].stock_quantity + parseInt(answer.addQuantity);
                            break;
                        }
                    }
                    updateProducts(newQuantity, chosenItem, chosenProduct);


                });
        };
    });
}

//this function updates the products database with a new quantity for a product

function updateProducts(newQuantity, productId, productName) {
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
//this function inserts a new product into the products database
function newProduct() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Enter Product Name:",
                validate: function (input) {
                    // Declare function as asynchronous, and save the done callback
                    let done = this.async();
                    setTimeout(function () {
                        if (!input || input.trim() ==="") {
                            // Pass the return value in the done callback
                            done('You need to enter a product name');
                            return;
                        }
                        // Pass the return value in the done callback
                        done(null, true);
                    }, 1000);
                }
            },
            {
                name: "department",
                type: "input",
                message: "Enter Department",
                validate: function (input) {
                    // Declare function as asynchronous, and save the done callback
                    let done = this.async();
                    setTimeout(function () {
                        if (!input || input.trim() ==="") {
                            // Pass the return value in the done callback
                            done('You need to enter a department');
                            return;
                        }
                        // Pass the return value in the done callback
                        done(null, true);
                    }, 1000);
                }

            },
            {
                name: "price",
                type: "input",
                message: "Enter price per unit",
                validate: function (input) {
                    // Declare function as asynchronous, and save the done callback
                    let done = this.async();
                    setTimeout(function () {
                        //need to enter a price; price must be a number
                        if ((!input) || (isNaN(input))) {
                            // Pass the return value in the done callback
                            done('Enter a valid price');
                            return;
                        }
                        // Pass the return value in the done callback
                        done(null, true);
                    }, 1000);
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter quantity on hand",
                validate: function (input) {
                    // Declare function as asynchronous, and save the done callback
                    let done = this.async();
                    setTimeout(function () {
                        //need to enter a quantity on hand, quantity on hand must be an integer
                        if ((!input) || (isNaN(input)) || (!Number.isInteger(parseFloat(input)))) {
                            // Pass the return value in the done callback
                            done('Enter a valid quantity on hand');
                            return;
                        }
                        // Pass the return value in the done callback
                        done(null, true);
                    }, 1000);
                }
            }

        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    product_department: answer.department,
                    product_price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) {
                        console.log(`insert error ${err}`);
                        throw err;
                    }
                    console.log(`Product was inserted:
                                        Product Name: ${answer.product} 
                                        Department: ${answer.department}
                                        Price: ${answer.price}
                                        Quantity on hand: ${answer.quantity}`);
                    managerOptions();
                }
            );
        });
}