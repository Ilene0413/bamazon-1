let columnify = require('columnify');

let columnData = {
    productId: "",

    productName: "",
    productPrice: "",
    productQuantity: ""
}, {
    showheaders: true,
    align: 'center',
    config: {
        productId: {
            minWidth: 5,
            headingTransform: function (heading) {
                heading = "Product ID ";
                return heading
            }
                    },
productName: {
    minWidth: 20,
        headingTransform: function (heading) {
            heading = "Product";
            return heading
        }
},
productPrice: {
    maxWidth: 10,
        headingTransform: function (heading) {
            heading = "Price/Unit";
            return heading
        }
},
productQuantity: {
    maxWidth: 15,
        headingTransform: function (heading) {
            heading = "Quantity on Hand ";
            return heading
        }
},
                }

            });