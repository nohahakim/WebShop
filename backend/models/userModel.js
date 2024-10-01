import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

// Define the user schema using the mongoose.Schema class
// The schema represents the structure of a user document in the MongoDB database
// The schema includes fields for the user's name, email, password, and isAdmin status
// The timestamps option adds createdAt and updatedAt fields to the schema
// The timestamps fields store the creation and update times of the document
// The timestamps fields are automatically managed by Mongoose
// The timestamps fields are updated when the document is created or modified
// The timestamps fields are useful for tracking changes to the document
// The timestamps fields are useful for auditing and versioning
// The timestamps fields are useful for caching and performance optimization
// The timestamps fields are useful for synchronization and replication
// The timestamps fields are useful for data consistency and integrity
// The timestamps fields are useful for data analysis and reporting
// The timestamps fields are useful for data migration and transformation
const userSchema = new mongoose.Schema(
  {
    // Define the user schema using the mongoose.Schema class
    name: { type: String, required: true },
    // The schema represents the structure of a user document in the MongoDB database
    // The schema includes fields for the user's name, email, password, and isAdmin status
    // The timestamps option adds createdAt and updatedAt fields to the schema
    // The timestamps fields store the creation and update times of the document x
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
// Define a method called matchPassword on the user schema
// The matchPassword method compares the entered password with the hashed password stored in the database

// The matchPassword method is defined as an asynchronous function
// The matchPassword method takes the entered password as an argument
// The matchPassword method uses bcrypt.compare to verify the password's validity
// The matchPassword method returns true if the passwords match, false otherwise
// The matchPassword method is used for user authentication
// The matchPassword method is used to compare the entered password with the hashed password
// The matchPassword method is used to verify the user's identity
// The matchPassword method is used to authenticate the user
// The matchPassword method is used to validate the user's credentials
// The matchPassword method is used to check if the password is correct
// The matchPassword method is used to prevent unauthorized access
// The matchPassword method is used to protect sensitive information
// The matchPassword method is used to secure user accounts
// The matchPassword method is used to ensure data privacy and security
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the hashed password stored in the database
  // Use bcrypt.compare to verify the password's validity
  // Return true if the passwords match, false otherwise
  // The matchPassword method is used for user authentication
  //
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash the password before saving the user
//
// The pre-save middleware function is executed before saving the user document
// It checks if the password field has been modified
// It generates a salt using bcrypt.genSalt
// It hashes the password using bcrypt.hash
// The hashed password is stored in the database
// The salt is stored with the hashed password

// The pre-save middleware function is executed before saving the user document
// It checks if the password field has been modified

userSchema.pre("save", async function (next) {
  // Check if the password field has been modified
  // If the password has not been modified, skip the hashing process
  // If the password has been modified, generate a salt and hash the password
  // The salt is used to prevent rainbow table attacks
  if (!this.isModified("password")) {
    next();
  }
  // Generate a salt and hash the password using bcrypt
  // The salt is used to prevent rainbow table attacks
  // The hashed password is stored in the database
  // The salt is stored with the hashed password
  // The salt is unique for each password hash
  // The salt is generated using bcrypt.genSalt
  // The password is hashed using bcrypt.hash
  // The password is hashed with the salt to create a secure hash
  // The hashed password is stored in the database
  // The salt is stored with the hashed password
  // The salt is unique for each password hash
  //

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
// In this snippet, we define a user schema using the mongoose.Schema class to represent the structure of a user document in the MongoDB database. The schema includes fields for the user's name, email, password, and isAdmin status, along with timestamps for when the document was created and updated.

// We define a method called matchPassword on the user schema to compare the entered password with the hashed password stored in the database. This method uses bcrypt.compare to verify the password's validity.

// We also define a pre-save middleware function on the user schema to hash the password before saving the user document. This function checks if the password field has been modified and generates a salt using bcrypt.genSalt before hashing the password using bcrypt.hash.

// The User model is created using mongoose.model, which compiles the user schema into a model that can be used to interact with the MongoDB database. The model is exported as the default export from the user model file.

// This user model encapsulates the user schema, methods, and middleware functions for interacting with user data in the application. It provides a structured way to define and manage user documents in the database, including password hashing and authentication functionality.

// By using the user model, we can perform CRUD operations on user data, validate user input, and implement user authentication features in the application. The model serves as a central component for managing user-related functionality and data in the backend of the application.

// Overall, the user model plays a critical role in defining the structure of user data, implementing user authentication logic, and interacting with the database to store and retrieve user information. It serves as a foundational component for user management in the application's backend architecture.
