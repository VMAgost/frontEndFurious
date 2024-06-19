# Fast and Furious Racing Website

A web application for racing enthusiasts to add, manage, and race their cars in various categories. Built using the MERN stack.

Features:
    Add new cars with their specifications and picture.
    Automatically assigns cars into low-tier, mid-tier, or high-tier categories.
    Full CRUD operations (Create, Read, Update, Delete) for managing cars.
    Start races by choosing a category and racing against AI.
    Ensures even number of cars in the chosen category before starting a race.

##Installation Instructions
1. **Clone the Repository:**
```bash
git clone git@github.com:VMAgost/frontEndFurious.git
```

2. **Backend Setup:**

Ensure you have Node.js and npm installed.

Navigate to the backend directory:
```bash
cd frontEndFurious/backend
```
Install the dependencies:
```bash
npm install
```
Run the backend server:

```bash
npm start
```
3. **Frontend Setup:**
 
Navigate to the frontend directory:

```bash
cd ../frontend
```
Install the dependencies:
```bash
npm install
```
Start the React application:
```bash
npm start
```

4. **Access the Application:**

Open your web browser and go to http://localhost:3000.

Manage Cars

    Navigate to the "Add Car" section to add a new car with specifications and a picture.
    View, edit, or delete cars in the "Manage Cars" section.

Start a Race

    Choose a category (low-tier, mid-tier, or high-tier) for the race.
    The website will ensure an even number of cars in the selected category before starting the race.
    If there's an odd number of cars, you will be prompted to add or remove one.
    Once the race starts, the backend algorithm will calculate and display the winner.

##Technologies Used
Backend

    Node.js
    Express
    MongoDB

Frontend

    JavaScript
    React

Contact Information

For support or inquiries, please contact:

    Email: vmagost@gmail.com
