# bamazon
create an amazon like store 

A video of how the amazon store works can be found at https://drive.google.com/file/d/1m6bkErn_zoOYrRsGBlIcfgXMTnqqBYeo/view. 

http://github.com - automatic!
[GitHub](https://drive.google.com/file/d/1m6bkErn_zoOYrRsGBlIcfgXMTnqqBYeo/view)

**Amazon Store** The app has 2 options, Bamazon customer or Bamazon manager.  

**Customer** 

In the customer App, a list of products with their product id, product name, and cost is displayed.  The user is then asked if they would like to purchase a product.
![first screen](https://github.com/Ilene0413/bamazon-1/blob/master/images/first-screen.png)

If the user answers **NO (N)**, the app ends.
![answer no](https://github.com/Ilene0413/bamazon-1/blob/master/images/answer-no.png)

If the user answers **YES (Y)**, the user will then enter the
product ID number.  The user must enter a valid product id number (can only be a number).
![answer yes](https://github.com/Ilene0413/bamazon-1/blob/master/images/answer-yes.png)

If the user enters a space, they will be asked to enter a valid product number
![enter space](https://github.com/Ilene0413/bamazon-1/blob/master/images/entered-space.png)

If the user enters a letter, they will be asked to enter a valid product number
![enter letter](https://github.com/Ilene0413/bamazon-1/blob/master/images/enter-letter.png)

![enter letter response](https://github.com/Ilene0413/bamazon-1/blob/master/images/enter-letter-response.png)

The user enters a vaild product ID. The user is then asked how many of the items they would like to purchase.  The user must enter a number.The number the user enters is then checked against the **products** database to make sure there is enough on hand for the user to purchase.  

![enter product & quantity](https://github.com/Ilene0413/bamazon-1/blob/master/images/enter-id-quantity.png)

If there is not enough on hand, the APP returns a message indicating that the user cannot purchase as there is insufficient quantity.
![first screen](https://github.com/Ilene0413/bamazon-1/blob/master/images/insufficient-quantity.png)


If the user enters an invalid quantity amount (this must be a  number), they receive a message.

![enter invalid quantity](https://github.com/Ilene0413/bamazon-1/blob/master/images/enter-invalid-quantity.png)

![invalid quantity response](https://github.com/Ilene0413/bamazon-1/blob/master/images/invalid-quantity-response.png)


**Manager** 
In the Manager App, a manager is given a choice of 4 options: 
**View Inventory**, **View Low Inventory**, **Add Inventory**, **Add New Product**.  

![first screen](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-initial.png)

To **View Inventory** the manager will move the cursor set to **View Inventory** and hit enter.  
![select view inventory](https://github.com/Ilene0413/bamazon-1/blob/master/images/select-view-inv.png)

The inventory will be displayed on the screen.
![view inventory](https://github.com/Ilene0413/bamazon-1/blob/master/images/view-inventory.png)

To **View Low Inventory**, the manager will move the cursor set to **Low Inventory** and hit enter.
![select low inventory](https://github.com/Ilene0413/bamazon-1/blob/master/images/select-low-inv.png)

The products with low inventory (quantity less than 5) will be displayed.

![low inventory](https://github.com/Ilene0413/bamazon-1/blob/master/images/view-low-inv.png)

To **Add Inventory**, the manager will move the cursor set to **Add Inventory** and hit enter.
![add inventory](https://github.com/Ilene0413/bamazon-1/blob/master/images/select-add.png)

The manager will then scroll the list and put the cursor on the product which they want to add quantity to.
![select product](https://github.com/Ilene0413/bamazon-1/blob/master/images/select-item-to-add-quantity.png)

The manager then must enter a number representing the quantity they want added. If a number is not entered, an error message is sent.
![invalid quantity](https://github.com/Ilene0413/bamazon-1/blob/master/images/invalid-mgr-qty-response.png)

The manager enters a quantity to be added to the quantity on hand for the specific product.
![updated quantity](https://github.com/Ilene0413/bamazon-1/blob/master/images/updated-quantity.png)

To **Add New Product**, the manager will move the cursor to **Add New Product** and hit enter
![select add new product](https://github.com/Ilene0413/bamazon-1/blob/master/images/select-new-inv.png)

The manager is then asked to enter the product name, then the product department, the product price, and quantity on hand. 
Tha manager will get a message back indicating that the product has been added.
![added product](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-added-new-prod.png)
![show added product](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-new-prod-added.png)

The price and quantity must be a number or the manager will get an error message
![invalid price product](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-invalid-price.png)
![invalid price response](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-invalid-price-response.png)
![invalid quantity](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-invalid-quantity.png)
![invalid quantity response](https://github.com/Ilene0413/bamazon-1/blob/master/images/mgr-invalid-quantity-response.png)

To exit the app, the manager will move the cursor to **Exit** and hit enter
![exit](https://github.com/Ilene0413/bamazon-1/blob/master/images/exit.png)










Developed by Ilene Cohen.
email: ilene413@icloud.com
February 2, 2019
