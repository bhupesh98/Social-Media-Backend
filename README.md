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
Edit the `config/config.js` file and provide the necessary database connection details and any other required configurations.
Remember, this will be a new environment, so to run you need to have your own <span style="color:red">PORT</span>, <span style="color:red">mongoURI</span>  URL and <span style="color:red">JWT_SECRET_KEY</span>.

### 2. Start the Application:
   ```cmd
   npm start
   ```

### PS:
This server will start running at `http://localhost:8080` by default.
But it is recommeded to enter <span style="color:red">PORT</span> in a .env file otherwise, link of uploaded files can't be generated as it used <span style="color:red">process.env.PORT</span> for generating link.

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
  - `POST /auth/signin:` User login.
    ```json
    {
      "email" : YOUR_EMAILID,
      "password" : YOUR_PASSWORD
    }
    ```
- Comment Routes:
  - `POST /comment/:postId/add:` Add a comment in post of postId.
    ```json
    {
      "comment" : YOUR_COMMENT,
    }
    ```
  - `GET /comment/:postId/view:` View all comments in post of postID.
- Post Routes:
  - `POST /post/add:` Create a new post. (form-data to be used as input in postman)
    ```json
    {
      "image": POST_IMAGE,
      "caption": POST_CAPTION
    }
    ```

  - `GET /post/:postId/view:` Get a specific post.
  - `GET /post/:postId/like:` Like or unlike a post.
  - `DELETE /post/:postId/delete:` Delete a post.
  - `GET /post/:userId/allPost:` Get posts with pagination.
  - `GET /post/:category:` Get community post. (If you don't want to set category, use "all" in :category)
- Reel Routes:
  - `POST /reel/add:` Create a new reel.
    ```json
    {
      "video": REEL_IMAGE,
      "caption": REEL_CAPTION
    }
    ```
  - `GET /reel/:reelId/view:` Get a specific reel.
  - `GET /reel/:reelId/like:` Like or unlike a reel.
  - `DELETE /reel/:reelId/delete:` Delete a reel.
  - `GET reel/:userId/allReel:` Get reels with pagination.
- User Routes:
  - `GET /user/profile/:username/view:` Get user profile.
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
  - `PUT /user/:username/follow` Follow a user.
  - `PUT /user/:username/unfollow` Unfollow a user.


**PS:** remember to use Bearer token when you register or login for all Routes except:
  - comment view
  - post view
  - get all posts
  - reel view
  - reel all reels
  - profile view