# Project Structure

- **config/**
  - `config.js`: Configuration settings (database connection, environment variables)

- **controllers/**
  - `commentController.js`: Handles comment-related actions 
  - `userController.js`: Handles user-related actions
  - `postController.js`: Handles post-related actions
  - `reelController.js`: Handles reel-related actions

- **middleware/**
  - `authMiddleware.js`: Authentication middleware
  - `postUpload.js`: Post Upload middleware using multer
  - `profileUpload.js`: Profile Upload middleware using multer
  - `reelUpload.js`: Reel Upload middleware using multer

- **models/**
  - `User.js`: User data model
  - `Post.js`: Post data model
  - `Comment.js`: Comment data model
  - `Reel.js`: Reel data model

- **routes/**
  - `authRouter.js`: Authentication routes
  - `userRouter.js`: User-related routes
  - `postRouter.js`: Post-related routes
  - `reelRouter.js`: Reel-related routes

 - **uploads/**
    - **posts/** : Storing posts of all users
    - **profilePhoto** : Storing profile photo of all users
    - **reels/** : Storing reels of all users
  <br></br>
- `app.js`: Main Express application setup
- `package.json`: Project dependencies
- `README.md`: Project documentation
- `.gitignore`: List of ignored files/folders for Git containing node_modules and env variables
- `ProjectStructure.md`: This file containing structure of project