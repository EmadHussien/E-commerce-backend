# E-commerce backend Node Application

## Project Overview

Welcome to the E&H E-Commerce platform! This FullStack application is designed to provide a comprehensive and secure online shopping experience. From user authentication to seamless payment processing, this platform encompasses a wide range of features for both users and administrators.

🚀 **Live Demo:** Explore the E&H E-Commerce platform [here](https://e-commerce-client-sand.vercel.app/).

🚀 **Live Demo For Admin Dashboard:** Explore the E&H E-Commerce Admin Dashboard [here](https://admin-dashboard-tan-psi.vercel.app).

🔗 **Backend Server:** Delve into the backend magic at [E-commerce-backend](https://e-commerce-backend-two-rouge.vercel.app/).

## Technologies Used

- Express framework for server-side CRUD operations (MVC architecture)
- MongoDB with Mongoose schema for data modeling
- JWT for secure authentication and authorization
- Bcrypt for password encryption
- Stripe API for payment processing
- GitHub for source code management
- Vercel for deployment

## Key Features:

#### User Authentication:

- Users can securely register and log in with JWT and refresh tokens.

  - User login obtain a JWT access token for authentication.

  - Include the token in the Authorization header for protected routes.

  - access token is valid for 15 minutes and refresh token is valid for 1 day.

  - refresh token saved in http only cookie and resent with each request automatically.

  - each request to a protected route will evaluate the token first and also check for the user roles so it can be directed to it's just authorized access routes.

#### Order Processing:

- Seamless order processing with Stripe integration for card payments.

  - Integrated Stripe API for secure payment transactions.

  - Set up your Stripe API keys for seamless payment processing.

  - recieving token represents the user's payment information from the client and make a charge request to stripe.

  - sending back the order details and payment response to the client.

#### Shopping Cart:

- Upon user registration, a dedicated shopping cart is automatically created for the registered user.

  - Cart is getting updated with every change user does.

  - Users can requst their cart data.

  - Add, remove items to their shopping cart.

#### Revenue Comparison:

- Calculate revenue intricacies with a month-over-month comparison to send them to client for revenue stats visualization.

#### New Joined Members:

- Track and display information about new members joining your platform.
  - Implement a feature to showcase new user registrations.

#### User Registration Over Time:

- Implement an API to show a year-long user registration timeline.

#### User Management:

- Effortlessly manage your digital citizenry with CRUD operations.
  - Create, Read, Update, and Delete user accounts as needed.

#### Product Management:

- Implement CRUD operations for managing products.
  - Create, Read, Update, and Delete products as an administrator.

#### MongoDB Integration:

- Integrate MongoDB for efficient data storage and retrieval.
  - Define Mongoose schemas for data modeling.

#### Security:

- Passwords are encrypted using bcrypt for enhanced security.
  - Implement bcrypt for secure password storage.

## Project Structure:

- **/E-commerce-backend**

  - `/Config` # Configuration files
  - `/Controllers` # Route handlers
  - `/Logs` # Log files
  - `/Middlewares` # Custom middlewares
  - `/Models` # Database models
  - `/Routes` # API routes
  - `/Views` # HTML views
  - `/public/css` # Static assets

## Getting Started

Note: This project requires environment variables for configuration, including database connection details and other sensitive information. As the .env file is not included in this repository for security reasons, you will need to set up your environment variables.

### Prerequisites

- Node.js installed
- Git installed
- MongoDB installed (for backend)

### Installation

1. Clone the client repository:
   ```bash
   git clone https://github.com/EmadHussien/E-commerce-backend.git
   ```
2. Install backend dependencies:

   ```bash
   cd E-commerce-backend
   npm install
   ```

### Running the App

```bash
cd E-commerce-backend
npm start
```

Ensure MongoDB is running with your environment . The backend will be available at http://localhost:5000.

# API Endpoints:-

## User related Endpoints:

### (-) Register a New User

#### Endpoint

- **POST** `baseURL/users/register`

#### Request

- **Body**: JSON object with user details.

  ```json
  {
    "username": "Emad",
    "email": "Emad@gmail.com",
    "password": "Emad@1234"
  }
  ```

#### Response

Status Code: 201 Created

Body:

```json
{
  "username": "Emad",
  "email": "Emad@gmail.com",
  "isAdmin": false,
  "img": "",
  "_id": "65781ec9a333fcb075c4b005",
  "createdAt": "2023-12-12T08:50:17.034Z",
  "updatedAt": "2023-12-12T08:50:17.034Z",
  "__v": 0
}
```

### (-) User Login

#### Endpoint

- **POST** `baseURL/auth/login`

#### Request

- **Body**: JSON object with user details.

  ```json
  {
    "username": "Emad",
    "password": "Emad@1234"
  }
  ```

#### Response

Status Code: 200 OK

Body:

```json
{
  "_id": "657829d9a333fcb075c4b00b",
  "username": "Emad ",
  "email": "Emad@gmail.com",
  "isAdmin": false,
  "img": "",
  "createdAt": "2023-12-12T09:37:29.472Z",
  "updatedAt": "2023-12-12T09:38:06.410Z",
  "__v": 0,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjY1NzgyOWQ5YTMzM2ZjYjA3NWM0YjAwYiIsInJvbGVzIjp7ImlzQWRtaW4iOmZhbHNlfX0sImlhdCI6MTcwMjM3Mzg4NiwiZXhwIjoxNzAyMzc0Nzg2fQ.1thDvvFX0FhxEUGcVTzUZoBrIMGsIxJXXXthZe08IwE"
}
```

### (-) Refresh Token

#### Endpoint

- **GET** `baseURL/refresh`

#### Request

- **Body**: No Body just http only cookie sent automatically by browser

#### Response

Status Code: 200 OK

Body:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjY1NzZhNTFmZDUwZmY5OGYzNjUyZjE2MCIsInJvbGVzIjp7ImlzQWRtaW4iOnRydWV9fSwiaWF0IjoxNzAyMzc0MzU1LCJleHAiOjE3MDIzNzQzOTV9.R3T8CjAInRKCVW1ChpTI-HeodH_1u_ESuxnrIWw4QZA"
}
```

### (-) Log Out

#### Endpoint

- **POST** `baseURL/logout`

#### Request

- **Body**: No Body just http only cookie sent automatically by browser

#### Response

<p> Status Code: 204 No Content </p>

### (-) Get All Users

#### Endpoint

- **GET** `baseURL/users`

#### Request

- **Auth**: Admin Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "_id": "657572b1579f67367f0c0f16",
    "username": "EmadOmda",
    "email": "emadhussien8522@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702195887177mm.jpeg?alt=media&token=6c663283-fa26-42f9-a051-02fba07a3848",
    "createdAt": "2023-12-10T08:11:29.199Z",
    "updatedAt": "2023-12-11T20:39:43.990Z",
    "__v": 0
  },
  {
    "_id": "6576a16c77d6f99cd1204607",
    "username": "Sarah",
    "email": "sarah@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702273383916premium_photo-1670884441012-c5cf195c062a.avif?alt=media&token=12f8c7c6-ca4f-4e34-be62-a8aac24dbc79",
    "createdAt": "2023-12-11T05:43:08.270Z",
    "updatedAt": "2023-12-11T05:43:08.270Z",
    "__v": 0
  },
  {
    "_id": "6576a232d50ff98f3652f121",
    "username": "Jacky952",
    "email": "jacky952@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702273584926photo-1544725176-7c40e5a71c5e.avif?alt=media&token=fa90aa72-d140-40ec-a578-4aa0646be8b3",
    "createdAt": "2023-12-11T05:46:26.811Z",
    "updatedAt": "2023-12-11T05:46:26.811Z",
    "__v": 0
  }
]
```

### (-) Get Latest 8 Users

#### Endpoint

- **GET** `baseURL/users?new=true`

#### Request

- **Auth**: Admin Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "_id": "657829d9a333fcb075c4b00b",
    "username": "Emad ",
    "email": "Emad@gmail.com",
    "isAdmin": false,
    "img": "",
    "createdAt": "2023-12-12T09:37:29.472Z",
    "updatedAt": "2023-12-12T09:41:24.668Z",
    "__v": 0,
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtYWQgIiwiaWF0IjoxNzAyMzc0MDg0LCJleHAiOjE3MDI0NjA0ODR9.SJZb4lUM9zO4UAz7VjEcqrMvIjjGYqrrUeVv6TUHiSM"
  },
  {
    "_id": "65781ec9a333fcb075c4b005",
    "username": "amasrsssaas",
    "email": "emd@aagmasaaail1ss.cossa",
    "isAdmin": false,
    "img": "",
    "createdAt": "2023-12-12T08:50:17.034Z",
    "updatedAt": "2023-12-12T08:50:17.034Z",
    "__v": 0
  },
  {
    "_id": "6576a79dbdf6bd964dfbee82",
    "username": "Rodrigo15691",
    "email": "Rodrigo15691@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702274966513premium_photo-1669879825881-6d4e4bde67d5.avif?alt=media&token=864a8770-1622-44a5-9545-0ac1acbd0c4b",
    "createdAt": "2023-12-11T06:09:33.735Z",
    "updatedAt": "2023-12-11T06:09:33.735Z",
    "__v": 0
  },
  {
    "_id": "6576a51fd50ff98f3652f160",
    "username": "Admin",
    "email": "admin@gmail.com",
    "isAdmin": true,
    "img": "",
    "createdAt": "2023-12-11T05:58:55.331Z",
    "updatedAt": "2023-12-12T09:52:52.871Z",
    "__v": 0,
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNzAyMzc0NzcyLCJleHAiOjE3MDI0NjExNzJ9.htJStfLOz-GvDHMj8fXWFAB7Z8i9vtpiUMdclikY7us"
  },
  {
    "_id": "6576a458d50ff98f3652f14d",
    "username": "Eduardo51296",
    "email": "Eduardo51296@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702274133575photo-1535713875002-d1d0cf377fde.avif?alt=media&token=76aff55c-8e0f-4597-a7da-6c848824bb7b",
    "createdAt": "2023-12-11T05:55:36.671Z",
    "updatedAt": "2023-12-11T05:55:36.671Z",
    "__v": 0
  },
  {
    "_id": "6576a3fed50ff98f3652f148",
    "username": "Marco9496",
    "email": "Marco9496@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702274040483photo-1599566150163-29194dcaad36.avif?alt=media&token=f4520ec0-fd7c-4d68-9849-49de43ac5e6e",
    "createdAt": "2023-12-11T05:54:06.373Z",
    "updatedAt": "2023-12-11T05:54:06.373Z",
    "__v": 0
  },
  {
    "_id": "6576a3d3d50ff98f3652f143",
    "username": "Natalia98165",
    "email": "Natalia98165@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702274000703premium_photo-1658527049634-15142565537a.avif?alt=media&token=88080dc9-6c41-424b-957d-152e7811805d",
    "createdAt": "2023-12-11T05:53:23.608Z",
    "updatedAt": "2023-12-11T05:53:23.608Z",
    "__v": 0
  },
  {
    "_id": "6576a3a7d50ff98f3652f13e",
    "username": "Daria13965",
    "email": "Daria13965@gmail.com",
    "isAdmin": false,
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702273957880photo-1494790108377-be9c29b29330.avif?alt=media&token=e62950b6-8240-438c-b26d-c841f566e59d",
    "createdAt": "2023-12-11T05:52:39.364Z",
    "updatedAt": "2023-12-11T05:52:39.364Z",
    "__v": 0
  }
]
```

### (-) Get User Registeration Stats over the year

#### Endpoint

- **GET** `baseURL/users/stats`

#### Request

- **Auth**: Admin Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "month": 12,
    "totalUsers": 15
  }
]
```

## Product related Endpoints:

### (-) Create New Product

#### Endpoint

- **POST** `baseURL/products`

#### Request

- **Body**: JSON object with Product details and Auth including Token.

  ```json
  {
    "title": "Brown Classic Women's Jacket",
    "description": "Upgrade your wardrobe with our Brown Classic Women's Jacket. This timeless jacket exudes sophistication and style, perfect for various occasions. Its rich brown color adds warmth and elegance to your look. Available in both large (L) and extra-large (XL) sizes, you can choose the perfect fit. Don't miss out on this classic jacket!",
    "img": "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
    "categories": ["Jacket", "Women"],
    "size": ["L", "XL"],
    "color": "Brown",
    "price": "85"
  }
  ```

#### Response

Status Code: 201 Created

Body:

```json
{
  "title": "Brown Classic Women's Jacket",
  "description": "Upgrade your wardrobe with our Brown Classic Women's Jacket. This timeless jacket exudes sophistication and style, perfect for various occasions. Its rich brown color adds warmth and elegance to your look. Available in both large (L) and extra-large (XL) sizes, you can choose the perfect fit. Don't miss out on this classic jacket!",
  "img": "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
  "categories": ["Jacket", "Women"],
  "size": ["L", "XL"],
  "color": ["Brown"],
  "price": "85",
  "inStock": true,
  "_id": "6578351ee9c7f7685ea4e081",
  "createdAt": "2023-12-12T10:25:34.333Z",
  "updatedAt": "2023-12-12T10:25:34.333Z",
  "__v": 0
}
```

### (-) Get All Products

#### Endpoint

- **GET** `baseURL/products`

#### Request

- **Auth**: Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "_id": "6572ec0927e7cd61f37dddc5",
    "title": "Big Chill Women's Mix Quilt Down Blend Jacket with Cozy Lining",
    "description": "The perfect coat for a cold day is here. This hooded multi quilted puffer jacket from Big Chill offers just enough warmth whether you are running errands or taking a stroll. The faux sherpa detail through the collar and hood gives you that warm and cozy feeling while the quilt patterns puts you right on trend. This easy zip on coat with zip closure pockets makes it an easy throw on while the down blend fill warms you right up. This really is the coat you need.",
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702030340903Big-Chill-Women-s-Mix-Quilt-Down-Blend-Jacket-with-Cozy-Lining_3fb92301-fb25-44b7-a9ac-15894471c31f.aa2dfc41536a3db4a0774c9b3fbe9ea8.webp?alt=media&token=839fa962-0643-4169-b862-b2c773e9540f",
    "categories": ["jackets"],
    "size": ["M", "L", "XL"],
    "color": ["pink"],
    "price": "26",
    "inStock": true,
    "createdAt": "2023-12-08T10:12:25.277Z",
    "updatedAt": "2023-12-11T07:07:00.612Z",
    "**v": 0
  },
  {
    "_id": "6575ae59dd1252bc52ec75c3",
    "title": "Riders by Lee® Indigo Easy Care 3/4 Sleeve Woven Shirt",
    "description": "Business meets casual in this modern take on the classic buttoned blouse. Built with three-quarter inch sleeves, the Lee® Riders Easy Care ¾ Sleeve Woven Shirt was made to handle everything your day throws at you without having to roll up your sleeves. It falls right at the waist and looks good untucked with a pair of jeans or tucked into your favorite work slacks. Made with a breathable cotton weave and designed to hug your natural curves, this feminine take on business casual is perfect for both the office, and for happy hour.",
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702211157314Riders-by-Lee-Indigo-Easy-Care-3-4-Sleeve-Woven-Shirt_4cf0c813-5995-4f80-a5e7-9b584b223b72.b3815babeceaa2477f14c904d96a2105.webp?alt=media&token=ad41733f-0d39-4b23-8fff-3313a0912a03",
    "categories": ["shirts"],
    "size": ["M", "L"],
    "color": ["white"],
    "price": "23",
    "inStock": true,
    "createdAt": "2023-12-10T12:26:01.398Z",
    "updatedAt": "2023-12-10T12:26:01.398Z",
    "**v": 0
  },
  {
    "_id": "6575af30a320a62e6318558a",
    "title": "Chaps Women's Long Sleeve Button Down Shirt",
    "description": "Casual comfort is a reality with this Chaps Women’s Chambray Button Down Shirt. Made of a lightweight denim, this button-down shirt features 2 front pockets. This classic shirt has a classic fit to match. Wear solo or layer with your favorite tee.",
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702211371260Chaps-Women-s-Long-Sleeve-Button-Down-Shirt_7c13e447-55fa-4d58-8fa1-0fee34e9702f.b0927384f29955180f5da735515a1319.webp?alt=media&token=1557d9a2-538e-478d-bdf2-f39c4ac106ae",
    "categories": ["shirts"],
    "size": ["SM", "M", "L"],
    "color": ["blue"],
    "price": "16",
    "inStock": true,
    "createdAt": "2023-12-10T12:29:36.783Z",
    "updatedAt": "2023-12-10T12:29:36.783Z",
    "**v": 0
  }
]
```

### (-) Delete Product

#### Endpoint

- **DELETE** `baseURL/products/productID`

#### Request

- **Auth**: Token.

#### Response

Status Code: 200 OK

Body:

```json
{
  "success": "6572ec0927e7cd61f37dddc5"
}
```

### (-) Get Single Product

#### Endpoint

- **GET** `baseURL/products/productID`

#### Request

- **Auth**: Token.

#### Response

Status Code: 200 OK

Body:

```json
{
  "_id": "6572ec0927e7cd61f37dddc5",
  "title": "Big Chill Women's Mix Quilt Down Blend Jacket with Cozy Lining",
  "description": "The perfect coat for a cold day is here. This hooded multi quilted puffer jacket from Big Chill offers just enough warmth whether you are running errands or taking a stroll. The faux sherpa detail through the collar and hood gives you that warm and cozy feeling while the quilt patterns puts you right on trend. This easy zip on coat with zip closure pockets makes it an easy throw on while the down blend fill warms you right up. This really is the coat you need.",
  "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702030340903Big-Chill-Women-s-Mix-Quilt-Down-Blend-Jacket-with-Cozy-Lining_3fb92301-fb25-44b7-a9ac-15894471c31f.aa2dfc41536a3db4a0774c9b3fbe9ea8.webp?alt=media&token=839fa962-0643-4169-b862-b2c773e9540f",
  "categories": ["jackets"],
  "size": ["M", "L", "XL"],
  "color": ["pink"],
  "price": "26",
  "inStock": true,
  "createdAt": "2023-12-08T10:12:25.277Z",
  "updatedAt": "2023-12-11T07:07:00.612Z",
  "__v": 0
}
```

### (-) Update Product

#### Endpoint

- **PUT** `baseURL/products/productID`

#### Request

- **Body**: JSON object with Product update fields and auth token.

  ```json
  {
    "price": 75
  }
  ```

#### Response

Status Code: 200 OK

Body:

```json
{
  "_id": "6572ec0927e7cd61f37dddc5",
  "title": "Big Chill Women's Mix Quilt Down Blend Jacket with Cozy Lining",
  "description": "The perfect coat for a cold day is here. This hooded multi quilted puffer jacket from Big Chill offers just enough warmth whether you are running errands or taking a stroll. The faux sherpa detail through the collar and hood gives you that warm and cozy feeling while the quilt patterns puts you right on trend. This easy zip on coat with zip closure pockets makes it an easy throw on while the down blend fill warms you right up. This really is the coat you need.",
  "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702030340903Big-Chill-Women-s-Mix-Quilt-Down-Blend-Jacket-with-Cozy-Lining_3fb92301-fb25-44b7-a9ac-15894471c31f.aa2dfc41536a3db4a0774c9b3fbe9ea8.webp?alt=media&token=839fa962-0643-4169-b862-b2c773e9540f",
  "categories": ["jackets"],
  "size": ["M", "L", "XL"],
  "color": ["pink"],
  "price": "75",
  "inStock": true,
  "createdAt": "2023-12-08T10:12:25.277Z",
  "updatedAt": "2023-12-12T10:28:04.005Z",
  "__v": 0
}
```

### (-) Get Products by Category

#### Endpoint

- **GET** `baseURL/products?category=shirts`

#### Request

- **Body**: No Body Netheir Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "_id": "6575ae59dd1252bc52ec75c3",
    "title": "Riders by Lee® Indigo Easy Care 3/4 Sleeve Woven Shirt",
    "description": "Business meets casual in this modern take on the classic buttoned blouse. Built with three-quarter inch sleeves, the Lee® Riders Easy Care ¾ Sleeve Woven Shirt was made to handle everything your day throws at you without having to roll up your sleeves. It falls right at the waist and looks good untucked with a pair of jeans or tucked into your favorite work slacks. Made with a breathable cotton weave and designed to hug your natural curves, this feminine take on business casual is perfect for both the office, and for happy hour.",
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702211157314Riders-by-Lee-Indigo-Easy-Care-3-4-Sleeve-Woven-Shirt_4cf0c813-5995-4f80-a5e7-9b584b223b72.b3815babeceaa2477f14c904d96a2105.webp?alt=media&token=ad41733f-0d39-4b23-8fff-3313a0912a03",
    "categories": ["shirts"],
    "size": ["M", "L"],
    "color": ["white"],
    "price": "23",
    "inStock": true,
    "createdAt": "2023-12-10T12:26:01.398Z",
    "updatedAt": "2023-12-10T12:26:01.398Z",
    "**v": 0
  },
  {
    "_id": "6575af30a320a62e6318558a",
    "title": "Chaps Women's Long Sleeve Button Down Shirt",
    "description": "Casual comfort is a reality with this Chaps Women’s Chambray Button Down Shirt. Made of a lightweight denim, this button-down shirt features 2 front pockets. This classic shirt has a classic fit to match. Wear solo or layer with your favorite tee.",
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702211371260Chaps-Women-s-Long-Sleeve-Button-Down-Shirt_7c13e447-55fa-4d58-8fa1-0fee34e9702f.b0927384f29955180f5da735515a1319.webp?alt=media&token=1557d9a2-538e-478d-bdf2-f39c4ac106ae",
    "categories": ["shirts"],
    "size": ["SM", "M", "L"],
    "color": ["blue"],
    "price": "16",
    "inStock": true,
    "createdAt": "2023-12-10T12:29:36.783Z",
    "updatedAt": "2023-12-10T12:29:36.783Z",
    "**v": 0
  }
]
```

## Cart related Endpoints:

### (-) Get User Cart

#### Endpoint

- **GET** `baseURL/carts/userID`

#### Request

- **Auth**: Need Token.

#### Response

Status Code: 200 OK

Body:

```json
{
  "_id": "657572b1579f67367f0c0f18",
  "userID": "657572b1579f67367f0c0f16",
  "products": [
    {
      "_id": "6575af30a320a62e6318558a",
      "title": "Chaps Women's Long Sleeve Button Down Shirt",
      "description": "Casual comfort is a reality with this Chaps Women’s Chambray Button Down Shirt. Made of a lightweight denim, this button-down shirt features 2 front pockets. This classic shirt has a classic fit to match. Wear solo or layer with your favorite tee.",
      "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-41f8d.appspot.com/o/1702211371260Chaps-Women-s-Long-Sleeve-Button-Down-Shirt_7c13e447-55fa-4d58-8fa1-0fee34e9702f.b0927384f29955180f5da735515a1319.webp?alt=media&token=1557d9a2-538e-478d-bdf2-f39c4ac106ae",
      "categories": ["shirts"],
      "size": "SM",
      "color": "blue",
      "price": "16",
      "inStock": true,
      "createdAt": "2023-12-10T12:29:36.783Z",
      "updatedAt": "2023-12-10T12:29:36.783Z",
      "**v": 0,
      "quantity": 2
    }
  ],
  "createdAt": "2023-12-10T08:11:29.387Z",
  "updatedAt": "2023-12-12T11:15:24.357Z",
  "**v": 3
}
```

### (-) Update Cart

#### Endpoint

- **PUT** `baseURL/carts/cartID`

#### Request

- **Body**: JSON object with cart update fields and auth token.

  ```json
  {
    "products": []
  }
  ```

#### Response

Status Code: 200 OK

Body:

```json
{
  "_id": "657572b1579f67367f0c0f18",
  "userID": "657572b1579f67367f0c0f16",
  "products": [],
  "createdAt": "2023-12-10T08:11:29.387Z",
  "updatedAt": "2023-12-12T11:25:57.029Z",
  "__v": 4
}
```

## Order related Endpoints:

### (-) Get All Orders

#### Endpoint

- **GET** `baseURL/orders`

#### Request

- **Auth**: Need Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "_id": "653c772ef47bd8c0240a2b6d",
    "userID": "EmadO49c95bc66",
    "products": [
      {
        "productID": "Banada4",
        "quantity": 10,
        "_id": "653c772ef47bd8c0240a2b6e"
      },
      {
        "productID": "COCO",
        "quantity": 5,
        "_id": "653c772ef47bd8c0240a2b6f"
      }
    ],
    "amount": 1200,
    "address": "USA",
    "status": "Pending",
    "createdAt": "2023-09-28T02:51:26.973Z",
    "updatedAt": "2023-09-28T02:51:26.973Z",
    "**v": 0
  },
  {
    "_id": "655f6ab03d16d877070e825b",
    "userID": "655b7478b3069c4c800df9e4",
    "products": [
      {
        "productID": "65484239faf8dc76c4d06340",
        "quantity": 4,
        "_id": "655f6ab03d16d877070e825c"
      },
      {
        "productID": "654845befaf8dc76c4d06356",
        "quantity": 3,
        "_id": "655f6ab03d16d877070e825d"
      },
      {
        "productID": "654843c8faf8dc76c4d06348",
        "quantity": 1,
        "_id": "655f6ab03d16d877070e825e"
      },
      {
        "productID": "654844e8faf8dc76c4d0634c",
        "quantity": 1,
        "_id": "655f6ab03d16d877070e825f"
      }
    ],
    "amount": 630,
    "address": "Downtown/ cairo / egypt Cairo Egypt",
    "status": "Pending",
    "createdAt": "2023-11-23T15:07:28.385Z",
    "updatedAt": "2023-11-23T15:07:28.385Z",
    "**v": 0
  },
  {
    "_id": "655f6f40c54fdcc24e7ce62c",
    "userID": "655b7478b3069c4c800df9e4",
    "products": [
      {
        "productID": "654840b0faf8dc76c4d06338",
        "quantity": 2,
        "_id": "655f6f40c54fdcc24e7ce62d"
      }
    ],
    "amount": 180,
    "address": "1213 Cairo Egypt",
    "status": "Pending",
    "createdAt": "2023-11-23T15:26:56.180Z",
    "updatedAt": "2023-11-23T15:26:56.180Z",
    "**v": 0
  }
]
```

### (-) Get Product's last month sales Stats

#### Endpoint

- **GET** `baseURL/orders/income?productId={productID}`

#### Request

- **Auth**: Need Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "month": 11,
    "totalIncome": 300
  }
]
```

### (-) Get Income for the last 3 months

#### Endpoint

- **GET** `baseURL/orders/income`

#### Request

- **Auth**: Need Token.

#### Response

Status Code: 200 OK

Body:

```json
[
  {
    "month": 12,
    "totalIncome": 180
  },
  {
    "month": 11,
    "totalIncome": 3670
  },
  {
    "month": 10,
    "totalIncome": 3340
  }
]
```

### Acknowledgments

- Thanks to the Express.js framework, MongoDb, JWT, Stripe, Github, and vercel

Explore the E&H E-Commerce platform and redefine your online shopping experience!
