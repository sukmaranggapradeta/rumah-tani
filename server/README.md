# backend
backend for e-commerce farmer to customer for web based app U. Dahlan UPNVJ2019

# SIGNUP and LOGIN User as a customer or producer (role)
# SIGNUP
### URL : '/register'
* METHOD : POST
* BODY : 
    ```
    {
        name : "STRING"
        email : "STRING"
        password : "STRING"
        role: "producer/customer"
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        id: < ref_User_ObjectId >
        name : "STRING"
        email : "STRING" 
        role : "producer/customer"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```
# LOGIN
### URL : '/login'
* METHOD : POST
* BODY : 
    ```
    {
        email : ""
        password : ""
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        id : < ref_User_ObjectId >
        name : "STRING"
        email : "STRING"
        role: "producer/costumer"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "username / password invalid"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

# CRUD product for producer

# CREATE PRODUCT 
### URL : '/product/:userId'
* METHOD : POST
* BODY : 
    ```
    {
        name: "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        userId : < ref_User_ObjectId >
        name : "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```'
# GET ALL LIST PRODUCTS OF PRODUCER
### URL : '/product/all/:userId'
* METHOD : GET
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : [{
        userId : < ref_User_ObjectId >
        name : "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }]
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# GET A PRODUCT OF PRODUCER
### URL : '/product/:id'
* METHOD : GET
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        userId : < ref_User_ObjectId >
        name : "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# UPDATE A PRODUCT OF PRODUCER
### URL : '/product/:id'
* METHOD : PUT
* BODY : 
    ```
    {
        userId : < ref_User_ObjectId >
        name : "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        userId : < ref_User_ObjectId >
        name : "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# DELETE A PRODUCT OF PRODUCER
### URL : '/product/:id'
* METHOD : DELETE
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        message : "Delete successfully"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

#  CRUD FOR CUSTOMER

# READ ALL LIST PRODUCTS OF ALL PRODUCER
## set value's userId on parameter to be "null" (it must be string)
### example : http://localhost:3000/product/all/null
### URL : '/product/all/null'
* METHOD : GET
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : [{
        userId : < ref_User_ObjectId >
        name : "STRING"
        description : "STRING"
        stock : "STRING"
        price : "STRING"
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }]
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

# CREATE CART
### URL : '/cart'
* METHOD : POST
* BODY : 
    ```
    {
        userId : < ref_User_ObjectId >
        productId : < ref_Product_ObjectId >
        quantity : Number
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        userId : < ref_User_ObjectId >
        productId : < ref_Product_ObjectId >
        quantity : NUMBER
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# GET ALL DATA in COSTUMER's CART
### URL : '/cart/all/:userId'
* METHOD : GET
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : [
        {
            userId : {
                _id : < ref_User_ObjectId >
                email : "STRING"
                password : "ENCRYPTION"
                name : "STRING"
                role : "costumer"
            },
            productId : {
                _id : < ref_User_ObjectId >
                name : "STRING"
                description : "STRING"
                stock : "STRING"
                price : "STRING"
                userId: < ref_User_ObjectId >
            }
            createdAt : "TIMESTAMPS"
            updatedAt : "TIMESTAMPS"
        }
    ]
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# GET a DATA in COSTUMER's CART
### URL : '/cart/:id'
* METHOD : GET
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        userId : < ref_User_ObjectId >
        productId : < ref_Product_ObjectId >
        quantity : NUMBER
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# Update a DATA in COSTUMER's CART
### URL : '/cart/:id'
* METHOD : PUT
* BODY : 
    ```
    {
        quantity : NUMBER
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        userId : < ref_User_ObjectId >
        productId : < ref_Product_ObjectId >
        quantity : NUMBER
        createdAt : "TIMESTAMPS"
        updatedAt : "TIMESTAMPS"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
# Delete a DATA in COSTUMER's CART
### URL : '/cart/:id'
* METHOD : DELETE
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        message : "Delete successfully"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```