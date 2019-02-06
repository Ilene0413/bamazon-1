//bamazon customer program

// Load the NPM Package inquirer
let inquirer = require("inquirer");

//load the NPM print table package
// call once somewhere in the beginning of the app
const cTable = require('console.table');
let columnify = require('columnify')
let WordTable = require('word-table');
//require mysql

var mysql = require("mysql");

//create a connection to mysql

let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});
//connectd to the mysql and sql database
connection.connect(function (err) {
    if (err) {
        throw err
    };
    let state = {
        confirmMessage: "Do you want to purchase a product?"
    };

    displayProducts(state.confirmMessage);
});
//this function will display all the products in the store (id, name, and cost)

function displayProducts(askPurchase) {
    //display column headings
    connection.query("SELECT product_id, product_name, product_price FROM products", function (err, results) {
        if (err) {
            console.log(`error ${err}`);
            throw err;
        };
        // display all products in store (id, name and cost)

        // basic usage
        let productsInStore = results;
        //        let columns = columnify([{
        //            product_ID: "        ",
        // /           product_name: "       ",
        //            price: "",
        //        }],
        //            { showHeaders: true });
                console.log(`Product ID          Product          Price`);

        for (let i = 0; i < productsInStore.length; i++) {

            //            let displayColumns = columnify([{
            //                product_ID: productsInStore[i].product_id,
            //                product_name: productsInStore[i].product_name.trim(),
            // /               price: productsInStore[i].product_price
            //            }],
            //                { showHeaders: false },
            //                { config: { value: { align: 'right' } } });
            //           console.log(`${productsInStore[i].product_id}          ${productsInStore[i].product_name}          ${productsInStore[i].product_price}`);
            //     console.log(displayColumns);
       

          console.log(`${productsInStore[i].product_id} ${productsInStore[i].product_name.trim()} ${productsInStore[i].product_price}`);
    };
        //ask customer if they want to purchase a product
        console.log(`\n`);

        inquirer.prompt([
            {
                type: "confirm",
                name: "confirmYN",
                message: askPurchase,
            }
        ]).then(function (answers) {
            if (answers.confirmYN) {
                let productId = answers.productID;
                let quantityPurchased = answers.quantityToPurchase;
                getCustomerRequest(productsInStore.length);
            }
            else {
                connection.end();
            }
        })
            .catch(function (error) {
                console.log("error f " + error);
                appendLog("error f " + error + ",");
                return;
            });
    });
}
//this function will ask the customer what item they would like to purchase

function getCustomerRequest(maxProductId) {
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "Enter product ID to purchase",
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                let done = this.async();

                // Do async stuff
                setTimeout(function () {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    else {
                        if (input <= 0 || input > maxProductId) {
                            done('Invalid product code entered');
                        }
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 1000);
            }
        },
        {
            type: "input",
            name: "quantityToPurchase",
            message: "Enter quantity",
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                let done = this.async();

                // Do async stuff
                setTimeout(function () {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('Please provide quantity');
                        return;
                    }
                    else {
                        if (input <= 0) {
                            done('Please provide quantity');
                        }
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 1000);
            }
        },
    ]).then(function (answers) {

        let productId = answers.productID;
        let quantityPurchased = answers.quantityToPurchase;
        purchaseProduct(productId, quantityPurchased);
    })
        .catch(function (error) {
            console.log("error f " + error);
            appendLog("error f " + error + ",");
            return;
        });

}

//this function determines if there is enough of the product on hand for the user to purchase

function purchaseProduct(productId, quantityPurchased) {
    connection.query("SELECT * FROM products where product_id = ?", [productId], function (err, results) {
        if (err) {
            console.log(`error ${err}`);
            throw err;
        }
        // compare user quantity to purchase against quantity on hand
        let orderAgainMessage = "Do you want to order another product?"
        let purchasedProduct = results;
        let stock_quantity = purchasedProduct[0].stock_quantity;
        if (quantityPurchased <= stock_quantity) {
            //subtract number purchased from stock quantity, tell user total cost of purchase, and update database
            stock_quantity -= quantityPurchased;
            console.log(`You purchased ${quantityPurchased}  ${purchasedProduct[0].product_name} at a cost of $${purchasedProduct[0].product_price}
                      for a total cost of $${quantityPurchased * purchasedProduct[0].product_price}`);
            updateProducts(productId, stock_quantity);

        }
        else {
            console.log(`Insufficent Quantity on Hand `);

        }
        displayProducts(orderAgainMessage);


        return;
    });
}

function updateProducts(productId, stock_quantity) {
    let query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock_quantity
            },
            {
                product_id: productId
            }
        ],
        function (err, results) {
            if (err) {
                console.log(`Error ${err}`);
            }
            //  displayProducts();
        }
    );
}

