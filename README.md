# Expense-Tracker

## Overview

The Expense Tracker API provides endpoints for managing user accounts and financial transactions. It includes features for user registration, authentication, and transaction management, including adding, editing, and deleting transactions.

## Project Structure

The project is organized into several directories, each responsible for different aspects of the application:

- **handlers**: Contains middleware for handling errors.
- **managers**: Manages external services like email and JWT authentication.
- **middleware**: Includes middleware for authentication.
- **models**: Defines Mongoose schemas for users and transactions.
- **modules**: Contains controllers and routes for managing transactions and users.
- **app.js**: Main application file, sets up the Express server and connects to MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/RazElbaz/Expense-Tracker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Expense-Tracker
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO_USERNAME=your_mongo_username
    MONGO_PASSWORD=your_mongo_password
    jwt_salt=your_jwt_salt
    ```

5. Start the application:
    ```bash
    npm start
    ```

## API Endpoints

### User Routes

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in a user.
- **POST /api/users/forgotpw**: Send a password reset code to the user's email.
- **POST /api/users/resetpw**: Reset the user's password using the reset code.
- **GET /api/users/dashboard**: Retrieve the user’s dashboard including recent transactions.

### Transaction Routes

- **POST /api/transactions/addIncome**: Add a new income transaction.
- **POST /api/transactions/addExpense**: Add a new expense transaction.
- **GET /api/transactions**: Get a list of transactions for the logged-in user.
- **DELETE /api/transactions/:transaction_id**: Delete a transaction.
- **PATCH /api/transactions**: Edit an existing transaction.

## Error Handling

Errors are handled by the `errorHandler` middleware, which responds with a JSON object containing the status and error message.

## Middleware

- **auth**: Middleware for verifying JWT tokens and protecting routes.

## Models

- **User**: Defines user schema with fields for name, email, password, balance, and reset code.
- **Transaction**: Defines transaction schema with fields for user ID, amount, transaction type, and remarks.

## Managers

- **emailManager**: Handles sending emails using Nodemailer.
- **jwtManager**: Manages JWT creation.

## Controllers

- Controllers handle the logic for each route and interact with the database models.



##  API Endpoints - Examples

### User Routes

#### **POST /api/users/register**
- **Request Body**:
    ```json
    {
        "name": "Ilan",
        "email": "ilan@gmail.com",
        "password": "123456",
        "confirm_password": "123456",
        "balance": 100
    }
    ```

#### **POST /api/users/login**
- **Request Body**:
    ```json
    {
        "email": "raz@gmail.com",
        "password": "123456"
    }
    ```

#### **POST /api/users/forgotpw**
- **Request Body**:
    ```json
    {
        "email": "ilan@gmail.com"
    }
    ```

#### **POST /api/users/resetpw**
- **Request Body**:
    ```json
    {
        "email": "bob@gmail.com",
        "new_password": "newpassword123",
        "reset_code": 123456
    }
    ```

#### **GET /api/users/dashboard**
- **Authorization**: Bearer Token (provided in `{{accessToken}}`)

### Transaction Routes

#### **POST /api/transactions/addIncome**
- **Request Body**:
    ```json
    {
        "amount": 10,
        "remarks": "Received from a friend"
    }
    ```

#### **POST /api/transactions/addExpense**
- **Request Body**:
    ```json
    {
        "amount": 100,
        "remarks": "Payment for groceries"
    }
    ```

#### **DELETE /api/transactions/:transaction_id**
- **Request Body**:
    ```json
    {
        "amount": 100,
        "remarks": "Removed transaction"
    }
    ```

#### **PATCH /api/transactions**
- **Request Body**:
    ```json
    {
        "transaction_id": "3244",
        "amount": 150,
        "remarks": "Updated transaction",
        "transaction_type": "expense"
    }
    ```

#### **GET /api/transactions**
- **Query Parameters** (optional):
    - `transaction_type`: Filter by transaction type (`income` or `expense`).
    - `amount`: Filter by amount.

### Example Endpoints with Query Parameters

#### **GET /api/transactions?transaction_type=income**
- **Description**: Retrieve transactions of type `income`.

#### **GET /api/transactions?transaction_type=expense**
- **Description**: Retrieve transactions of type `expense`.

#### **GET /api/transactions?transaction_type=expense&amount=10**
- **Description**: Retrieve `expense` transactions with a specific amount.

## Contributing

If you want to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

