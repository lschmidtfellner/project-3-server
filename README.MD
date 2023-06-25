

### **REV RADAR**  ###
Overview
This README will guide you through  the RevRadar backend. The app is a React.js application using functional components and hooks, leveraging the react-router-dom library for routing, and implementing Context API for managing global state related to user authentication and car data.



### **Motivation** ###

Showcase React app with seeded database that creates a marketplace for user to buy or sell product. 

### **Pre-code Build** ###

Include, wireframes, schemas, routes, user stories, team roles, sprints

* Notion:https://www.notion.so/Running-with-the-90s-f796135f92e6481c8a14f66736121ea5
* Figma: https://www.figma.com/files/project/96547153/Project---Unit--3?fuid=1251579006598339582

### **Technology Used** ### 

* Express.js
*  MongoDB
* bcrypt
* jwt
* logger
* path
* express 



### **Models** ###

User: This model represents a user in the application, and it is used for user authentication.
CarListing: This model represents a car listing posted by a user. It contains information about the car make, model, year, category, mileage, condition, and description, along with the user who posted the listing and the images associated with the listing.

```

CAR LISTING MODEL

import mongoose from 'mongoose';

const carListingSchema = new mongoose.Schema({
  Make: {
    type: String,
  },
  Model: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Category: {
    type: String,
  },
  Mileage: {
    type: Number,
  },
  Condition: {
    type: String,
  },
  Description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [{
    type: String,
  }],
});

const CarListing = mongoose.model('CarListing', carListingSchema);

export default CarListing;

```


CarInfo: This model represents general car information in the application, such as make, model, year, and category.


### **Routes** ###
Auth Routes: These routes are used for managing user authentication, which includes sign up, sign in, checking token validity, updating username, and deleting username.
SalePost Routes: These routes are used for managing car sale posts. They support creating, updating, getting, and deleting car sale posts.
CarInfo Routes: These routes provide information about cars, such as make, model, year, and category.
Upload Routes: These routes are used to handle file upload.

### Controllers Functions ###
auth.js contains functions for sign up, sign in, checking token validity, updating username, and deleting username, which are used in the auth routes.

createSalePost: This is a controller function that is responsible for creating a new car listing (a sale post). It extracts data from the request body (req.body) and creates a new CarListing object with it. This data might come from a form that the user submits on the front end of your application. It also attaches images to the listing. Once the car listing is created, it is saved to the database. If the operation is successful, the new car listing is returned in the response.

```
async function createSalePost(req, res) {
    try {
      const postData = req.body;
      const images = req.files.map(file => 'uploads/compressed/' + file.filename);
      const carListing = new CarListing({ ...postData, images });
      await carListing.save();
      res.status(201).json(carListing);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create sale post' });
    }
  }
  ```

getsalePostbyID: This function is responsible for fetching a specific car listing by its ID. It gets the ID from the request parameters (req.params.id), finds the car listing with that ID in the database, and returns it. If no such car listing exists, it sends a 404 error.

uploadimages:
This function is responsible for handling image uploads. It receives one or multiple images, compresses them, and stores them on the server. These images can later be attached to car listings. The image files come from a form on the front end of your application.

```
async function uploadImages(req, res) {
  try {
    console.log('Received request to upload images');

    const compressedDirectory = 'uploads/compressed';
    const compressedFilePaths = await Promise.all(
      req.files.map(async (file) => {
        const compressedFilename = `${file.filename.split('.')[0]}_compressed.${file.filename.split('.')[1]}`;
        const compressedFilePath = path.join(compressedDirectory, compressedFilename);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(compressedDirectory)) {
          fs.mkdirSync(compressedDirectory, { recursive: true });
        }

        await sharp(file.path)
          .resize({ width: 800 }) // Optional: Resize the image to a desired width
          .jpeg({ quality: 80 }) // Compress the image and set JPEG quality
          .toFile(compressedFilePath);

        return compressedFilePath;
      })
    );

 ```


### **Workflow** ### 
Authentication
When a user attempts to sign up, the server checks if the email already exists. If it does not, a new user is created with the username, hashed password, and email. The password is hashed using bcrypt for security purposes.

For sign-in, the server checks if the username exists and if the password matches the hashed password stored in the database. If it does, a JWT token is generated and returned to the user. This token is used for further authenticated requests.

API Requests
When a user makes a request, it is first handled by the Express server. Depending on the request URL and method, the appropriate router handles the request. For instance, if a user sends a GET request to '/api/carinfo', the car info router will handle the request.

Each route specifies which controller function should be used to handle the request. This function will contain the logic for handling the request, such as fetching data from the database, creating a new document, updating an existing document, etc.

Database
The MongoDB database is connected using mongoose. It stores user information for authentication and car sale posts.

The server also uses cookie-parser for handling cookies and cors for handling CORS.


### **Beyond MVP** ###

* Add further authentication via verifyAuth


### **REFERENCES** ### 

* Twutter Clone
* https://tuts.alexmercedcoder.dev/2021/11/Auth_with_express_JWT/
