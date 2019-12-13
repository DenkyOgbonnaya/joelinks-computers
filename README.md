# About the repo
Joelinks-computers is a computer/computer accessories store web app, with functionality to add items to shopping cart and place orders.

[Test Live Demo](https://joelinks-computers.herokuapp.com)
```
username: admin
password: admin
```

![alt screenshot](https://res.cloudinary.com/diibyv2i7/image/upload/v1575811328/shopping_cart.png)

![alt screenshot](https://res.cloudinary.com/diibyv2i7/image/upload/v1576235647/productdetails.png)

![alt screenshot](https://res.cloudinary.com/diibyv2i7/image/upload/v1576235648/admin_dashboard.png)

![alt screenshot](https://res.cloudinary.com/diibyv2i7/image/upload/v1576235647/orderdetails.png)

## How to run locally 
```
1 Git clone the repository
2 cd to cloned repo root directory
3 run yarn to install dependencies
4 run yarn dev to run development server
5 open another terminal and cd to projects client directory
6 run yarn to install clients dependencies
7 run <yarn start> or <ng serve> without the angle brackets to start client development server
8 visit http://localhost:4200 on your browser to view app.
```

## Features
The following pages/features were implemented.

- authentication and authorization, local and Oauth
- Admin Dashboard
- Shopping cart system
- checkout system with payment gateway integration(paystack)
- multiple image upload with drag and drop and preview
- serverside product search and pagination
- products/products details page
- order/oder details page
- landing/services/about/user profile pages

## Tech Stack
This application was built with the following technologies:
- Angular
- Typescript
- Bootstrap
- Node.js
- Express.js
- MongoDb/Mongoose

## Sample enviroment configurations
check the .env.example file