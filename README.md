# WebD-Selection-Task-2

**Name:** Bhupesh Dewangan

**Enrollment Number:** IIT2022042

**WhatsApp Number:** 7000230166




# Social Media Backend Application

Welcome to the documentation for the Social Media Backend Application. This application provides the backend functionality for a simplified social media platform.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#1-configure-the-application)
  - [Applicaton Start](#2-start-the-application)
- [API Endpoints](#api-endpoints)

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Database

### Installation

#### 1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/WebD-Selection-Task-2.git
   cd WebD-Selection-Task-2
   ```

#### 2. Install the dependencies:
   ```cmd
   npm install
   ```

## Usage

### 1. Configure the application:
Edit the `config/configDB.js` file and provide the necessary database connection details and any other required configurations.
Remember, this will be a new environment, so to run you need to have your own mongoURI,JWT_SECRET_KEY,PORT,CLOUD_NAME,CLOUD_API_KEY,CLOUD_API_SECRET.Cloud stuff is for cloudinary. It is designed to run bydefault on `localhost`, change `config/envConfig.js` and NODE_ENV to host on any web service provider.

### 2. Start the Application:
   ```cmd
   npm start
   ```

### PS:
This server will start running at `http://localhost:8080` by default. But, environment variables need to be changed for full functionality.

## API Endpoints


- Authentication Routes:
  - `POST /auth/signup:` Register a new user.
    ```json
    {
      "username" : YOUR_USERNAME,
      "email" : YOUR_EMAILID,
      "password" : YOUR_PASSWORD
    }
    ```
    **Response:**
    ```json
    {
      "message": "User has been Created",
      "user": {
        "profilePicture": {
          "URL": "https://res.cloudinary.com/dfwcmubxu/image/upload/v1692381808/profilePhoto/profilePhoto-64df344ec1e263a6a296ce0a.png",
          "publicId": "profilePhoto/profilePhoto-64df344ec1e263a6a296ce0a"
        },
        "username": "Test",
        "email": "test@gmail.com",
        "description": "",
        "followers": [],
        "followings": [],
        "_id": "64df344ec1e263a6a296ce0a",
      }
    }
    ```
  - `POST /auth/signin:` User login.
    ```json
    {
      "email" : YOUR_EMAILID,
      "password" : YOUR_PASSWORD
      //Minimum length: 8
    }
    ```
    **Response:**
    ```json
    {
    "message": "User has been logged In",
    "user": {
        "profilePicture": {
          "URL": "https://res.cloudinary.com/dfwcmubxu/image/upload/v1692381808/profilePhoto/profilePhoto-64df344ec1e263a6a296ce0a.png",
          "publicId": "profilePhoto/profilePhoto-64df344ec1e263a6a296ce0a"
        },
        "_id": "64df344ec1e263a6a296ce0a",
        "username": "Test",
        "email": "test@gmail.com",
        "description": "",
        "followers": [],
        "followings": [],
      }
    }
    ```
  - `POST /auth/logout: ` User logout.<br>
    **Response:**
    ```json
    {
      "message": "You have been logged out"
    }
    ```
- Comment Routes:
  - `POST /comment/:postId/add:` Add a comment in post of postId.
    ```json
    {
      "comment" : YOUR_COMMENT,
    }
    ```
    **Response:**
    ```json
    {
      "message": "Comment has been created",
      "data": {
        "comment": "Hii...",
        "user": "64dca484eb4c70c49f8b535f",
        "postId": "64dca76ceb4c70c49f8b5362"
      }
    }
    ```
    
  - `GET /comment/:postId/view:` View all comments in post of postID.
    **Response:**
    ```json
    {
    "comments": [
        {
          "_id": "64dcad620fd7962f3558de03",
          "user": "64dca484eb4c70c49f8b535f",
          "postId": "64dca76ceb4c70c49f8b5362",
          "comment": "Hii...",
          "createdAt": "2023-08-16T11:05:06.551Z",
          "updatedAt": "2023-08-16T11:05:06.551Z",
        }
      ]
    }
    ```
    
- Post Routes:
  - `POST /post/add:` Create a new post. (form-data to be used as input in postman)
    ```json
    {
      "image": POST_IMAGE,
      "caption": POST_CAPTION
    }
    ```
    **Response:**
    ```json
    {
    "message": "Post has been created",
    "data": {
        "caption": "Hello test world",
        "postImage": {
          "URL": "https://res.cloudinary.com/dfwcmubxu/image/upload/v1692383938/posts/1692383923303-post-64df344ec1e263a6a296ce0a.png",
          "publicId": "posts/1692383923303-post-64df344ec1e263a6a296ce0a"
        },
        "category": "test",
        "likes": [],
        "comment": [],
        "_id": "64dca76ceb4c70c49f8b5362",
        "createdAt": "2023-08-16T10:39:40.013Z",
        "updatedAt": "2023-08-16T10:39:40.013Z",
        "__v": 0
      }
    }
    ```

  - `GET /post/:postId/view:` Get a specific post.
    **Response:**
    ```json
    {
      "postImage": {
        "URL": "https://res.cloudinary.com/dfwcmubxu/image/upload/v1692383938/posts/1692383923303-post-64df344ec1e263a6a296ce0a.png",
        "publicId": "posts/1692383923303-post-64df344ec1e263a6a296ce0a"
      },
      "_id": "64dca76ceb4c70c49f8b5362",
      "caption": "Hello test world",
      "category": "test",
      "likes": [],
      "comment": [],
      "createdAt": "2023-08-16T10:39:40.013Z",
      "updatedAt": "2023-08-16T10:39:40.013Z",
    }
    ```
    
  - `GET /post/:postId/like:` Like or unlike a post.
    **Response:**
    *1st Time*
    ```json
    {
      "message": "Post has been liked",
      "numberOfLikes": 1
    }
    ```

    *2nd Time*
    ```json
    {
      "message": "Post has been unliked",
      "numberOfLikes": 0
    }
    ```

  - `DELETE /post/:postId/delete:` Delete a post.
    **Response:**
    ```json
    {
      "message": "Post has been deleted"
    }
    ```

  - `GET /post/:userId/allPost:` Get posts(all post of that user will be given).

    **Response:**
    ```json
    {
    "posts": [
        {
          "postImage": {
            "URL": "https://res.cloudinary.com/dfwcmubxu/image/upload/v1692383938/posts/1692383923303-post-64df344ec1e263a6a296ce0a.png",
            "publicId": "posts/1692383923303-post-64df344ec1e263a6a296ce0a"
          },
          "_id": "64dca76ceb4c70c49f8b5362",
          "user": "64dca484eb4c70c49f8b535f",
          "caption": "Hello test world",
          "category": "test",
          "likes": [
              "64dca484eb4c70c49f8b535f"
          ],
          "comment": [
              "64dcad620fd7962f3558de03"
          ],
          "createdAt": "2023-08-16T10:39:40.013Z",
          "updatedAt": "2023-08-16T11:05:06.726Z",
          "__v": 0
        }
      ]
    }
    ```

  - `GET /post/:category:` Get community post with pagination. (If you don't want to set category, use "all" in :category).limit is set to 10 per request from new to older. If it ends, no more community post message is sent and if requested again it'll start from top to show posts.(Cookie used for this)


- Reel Routes:
  - `POST /reel/add:` Create a new reel.
    ```json
    {
      "video": REEL_IMAGE,
      "caption": REEL_CAPTION
    }
    ```
    **Response:**
    ```json
    {
      "message": "Reel has been created",
      "data": {
        "user": "64df344ec1e263a6a296ce0a",
        "caption": "Hello...test reel",
        "reelVideo": {
            "URL": "https://res.cloudinary.com/dfwcmubxu/video/upload/v1692384445/reels/1692384420466-reel-64df344ec1e263a6a296ce0a.mp4",
            "publicId": "reels/1692384420466-reel-64df344ec1e263a6a296ce0a"
        },
        "likes": [],
        "_id": "64dfbcc03b369e54292f11b8",
        "createdAt": "2023-08-18T18:47:28.239Z",
        "updatedAt": "2023-08-18T18:47:28.239Z"
      }
    }
    ```

  - `GET /reel/:reelId/view:` Get a specific reel.<br>
    **Response:**
    ```json
    {
      "reelVideo": {
        "URL": "https://res.cloudinary.com/dfwcmubxu/video/upload/v1692384445/reels/1692384420466-reel-64df344ec1e263a6a296ce0a.mp4",
        "publicId": "reels/1692384420466-reel-64df344ec1e263a6a296ce0a"
      },
      "_id": "64dfbcc03b369e54292f11b8",
      "user": "64df344ec1e263a6a296ce0a",
      "caption": "Hello...test reel",
      "likes": [],
      "createdAt": "2023-08-18T18:47:28.239Z",
      "updatedAt": "2023-08-18T18:47:28.239Z"
    }
    ```

  - `GET /reel/:reelId/like:` Like or unlike a reel.<br>
    **Response:**
    *1st Time*
    ```json
    {
      "message": "reel has been liked",
      "numberOfLikes": 1
    }
    ```

    *2nd Time*
    ```json
    {
      "message": "reel has been unliked",
      "numberOfLikes": 0
    }
    ```

  - `DELETE /reel/:reelId/delete:` Delete a reel.<br>
    **Response:**
    ```json
    {
      "message": "Reel has been deleted"
    }
    ```

  - `GET reel/:userId/allReel:` Get reels of a user.<br>
    **Response:**
    ```json
    {
    "reels": [
        {
          "reelVideo": {
            "URL": "https://res.cloudinary.com/dfwcmubxu/video/upload/v1692384445/reels/1692384420466-reel-64df344ec1e263a6a296ce0a.mp4",
            "publicId": "reels/1692384420466-reel-64df344ec1e263a6a296ce0a"
          },
          "_id": "64dfbcc03b369e54292f11b8",
          "user": "64df344ec1e263a6a296ce0a",
          "caption": "Hello...test reel",
          "likes": [],
          "createdAt": "2023-08-18T18:47:28.239Z",
          "updatedAt": "2023-08-18T18:47:28.239Z"
        }
      ]
    }
    ```  

- User Routes:
  - `GET /user/profile/:username/view:` Get user profile.<br>
    **Response:**
    ```json
    {
      "status": "success",
      "user": {
        "profilePicture": {
          "URL": "https://res.cloudinary.com/dfwcmubxu/image/upload/v1692381808/profilePhoto/profilePhoto-64df344ec1e263a6a296ce0a.png",
          "publicId": "profilePhoto/profilePhoto-64df344ec1e263a6a296ce0a"
        },
        "_id": "64df344ec1e263a6a296ce0a",
        "username": "Test",
        "email": "test@gmail.com",
        "description": "",
        "followers": [],
        "followings": []
      }
    }
    ```


  - `PUT /user/profile/update` Update user profile. (If sending image alongwith other updates use form-data)
    ```json
    {
      "username": NEW_USERNAME,
      "email": NEW_EMAIL,
      "password": NEW_PASSWORD,
      "description": YOUR_BIO,
      "image": YOUR_PROFILE_PIC
    }
    //Everything is optional here
    ```
    **Response:**
    ```json
    {
      "message": "Profile updated successfully",
    }
    ```

    
  - `PUT /user/:username/follow` Follow a user.<br>
    **Response:**
    ```json
    {
      "message": "User has been followed"
    }
    ```
    
  - `PUT /user/:username/unfollow` Unfollow a user.<br>
    **Response:**
    ```json
    {
      "message": "User has been unfollowed"
    }
    ```
