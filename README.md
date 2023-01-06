 
# Online Learning System : Ameilo

Amelio is an Online Learning System website *implemented using MERN stack*  that creates a robust learning experience that feels like a classroom experience, offering the traditional classroom characteristics (Students have their lessons through online videos , Have to solve exercise(s) after each lesson and at the end have a certificate if he/she passes the course).
Also an admin manages the available instructors and corporate trainees from one end , instructors manage the courses they offer and the user (corporate trainee / individual trainee) is able to search and view the available courses to choose his/her desirable courses from the other end .

 
## Motivation
 
Amelio was built as an integrated set of interactive online services that provide trainers, learners, and others involved in education with information, tools, and resources to support and enhance education delivery and management. These important learning environments are achieved through a learning platform’s features and tools that create the level of interaction and engagement students need. include content modules, learning modules and  evaluation modules. These modules allow for your training program to incorporate a variety of teaching styles for every learner, and allows for learners to boost their performance level and knowledge-retention levels.


## Table of Content
1. Build Status
2. Code style 
3. Screenshots 
4. Tech/Framework used 
5. Extra Features 
6. Code examples
7. Installation 
8. API reference 
9. Tests
10. How to use 
11. Contribute 
12. Credits
13. Licence 

## Build status

- can't search in filtered results
- users can’t search by instructor name
- users can’t follow up on reported problems
- can't filter in search results
- can't update the progress based on the minutes watched in the video 
- can't receive the money in the wallet 
- can't see grades for exercises done previously 
- can't see the average mark scored on the exercises of the course
- can't ask the course instructor questions about the course

## Code Style
Consistent indentation should be used in the code along with following any established coding conventions or guidelines that are relevant to the language used.  Syntax highlighting is used to make the code easier to read by anyone and to help readers to understand what is happening in the code. It is also a good idea to include comments on your code to explain what is happening and to make it easier for other to understand.

 
**JavaScript**
- Two spaces indentation.
- Single quotes are preferred over double. Reason: HTML uses double quotes.
- Use void 0 instead of undefined, because undefined could have been redefined.
- Write code in functional style with minimum side effects. See coffeescript section for more info.
- Don't use function statements. Instead, create anonymous functions and assing them to vars for consistency with other vars.
```http
// No
function doThing(a, b) {return a * b;}
 
// Yes
var doThing = function(a, b) {return a * b;};
```
- Avoid global vars where you can. If you use them, specify it explicitly.
```http
window.globalVar = ...;
```
- Use one ```var``` per variable.
```
var a = 5;
var b = 6;
var $this = $(this);
// Exception.
var a, b, c, d, $this;
```
- Event callback should name event data variable as 'e', not 'event' etc.
 
```
$('#item').click(function(e) {
  $.storage.set('item', $(this).val());
});
```
 
- Use quotes in object keys.
```
// Yes
{'a': 'testtest'}
 
// Yes
{a: 'testtest'}
```
- Use '===' for comparing instead of '=='. JavaScript is weakly typed language, so 5 == '5'. This ambiguity could lead to hard-to-find bugs.
 
```
if (a === 5) {
  ...
}
if ($(this).val() === 'something') {
  ...
}
if (typeof a === 'undefined') {
  ...
}
 
// Exception: this compares both to 'null' and 'undefined'.
if (item == null) {
 
}
```
**CSS**
 
- Two spaces indentation.
- Use lowercase hex colours (e.g. #fff) instead of colour names (e.g. white).
- Use * {box-sizing: border-box;}.
- Use hyphens between class names, not camelCase or under_scores.
- Use only classes for styling most of the time (no #ids, elems etc).
 
 
 
 
## Screenshots
 
Login Page
[![2023-01-02-3.png](https://i.postimg.cc/CKDVPk4L/2023-01-02-3.png)](https://postimg.cc/LqH7hq7r)
 
Payment Page
[![Screenshot-2023-01-02-at-4-29-42-AM.png](https://i.postimg.cc/5tjX671K/Screenshot-2023-01-02-at-4-29-42-AM.png)](https://postimg.cc/sBdjLJM5)
 
Course View Page
[![Screenshot-2023-01-02-at-4-25-17-AM.png](https://i.postimg.cc/L4J3rD1T/Screenshot-2023-01-02-at-4-25-17-AM.png)](https://postimg.cc/PNkDDmKp)

Course Preview Page
![preview](https://user-images.githubusercontent.com/105923198/211103977-e84fe272-908a-47bc-94c0-d134829b4a67.png)
 
Indiviual/Corporate Trainee Courses Page
![my courses](https://user-images.githubusercontent.com/105923198/211104805-eb18a05b-77a7-449e-8874-513979ddfa3e.png)
 
No Courses Found for this search Page
![no courses](https://user-images.githubusercontent.com/105923198/211105660-65af4b82-d475-4c0a-9f30-c7ada296de15.png)

Add Admin Page
![add admin](https://user-images.githubusercontent.com/105923198/211106393-9f7527b0-9c10-4e47-8a85-fcd085c4991e.png)
 
 
 
## Tech Stack
**Client:**
- React : A free and open-source front-end JavaScript library for building user interfaces based on UI components
- Axios :A way of fetching APIs in React
- MUI : provides a simple, customizable, and accessible library of React components.
- Mongoose : is a schema-less NoSQL document database used to store data 
- React Stripe : Payment API
- JSPDF : convert an html to pdf


**Server:**
- Node.js : A back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser
- Express : is a back end web application framework for building APIs with Node.js
- MongoDB : is a schema-less NoSQL document database used to store data 
- Bcrypt : To avoid the sensitive data being visible from anyone(hashing passwords)
- Cors : a system consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.
- JWT : used for authentication. After a user signs in to an application, the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. 
- Nodemailer :  module that allows you to send emails from your server
- Stripe : Payment API
- Validator : ensuring that user input is correct, and useful (correct email format , strong password)
 
## Features
- Write notes while watching your course lessons and download it
- Download and receive by mail your dynamic certificate upon completion
- Full Screen mode
- Instructors can redeem their salary from a smart wallet
- Evaluate instructors and courses using ratings/reviews 
- /*Instructors can see the number of enrolled students in their courses*/
- Trainees can request a refund if less than 50% of the course was not a satisfactory 
- Report problems to be resolved by admins 
- Trainees can see a preview lesson of the course they're interested in 
- Trainees have the ability to test their knowledge by solving quizzes for the lesson they are taking
- Any user who forgot his/her password while logging in can click on the forget password link in the login page, he/she will be redirected to a page to enter his/her registered email and then a link will be sent to the user by email in order to reset his/her password.

 
 
## Code Examples

1)![1](https://user-images.githubusercontent.com/116211733/211104382-dd89a072-52c3-4ead-82cc-f103b675ffd4.png)

:

Search function takes the search keyword and tries matching it to the subject attribute in the course schema and if no matches were found it tries matching the search keyword to the instructor name attribute after populating the course by the instructor id and if no matches are found then it tries to match the search keyword with the title attribute in the course schema. In any step if anything matches add this course to the result array that is printed to the user in the end.




2)![2](https://user-images.githubusercontent.com/116211733/211104549-746b06bc-6cfc-41df-8c7b-9ca173cbeb49.png)

:

AddResponse function takes the response written by the admin and updates the response attribute in the problem schema with it using the idProblem to fetch the requested problem. The trainee or instructor who reported that problem will see the updated response from the admin.



3)![3](https://user-images.githubusercontent.com/116211733/211104897-f77816ae-f3f3-4830-940c-936475e59bf8.png)

![4](https://user-images.githubusercontent.com/116211733/211104924-e6fb400e-eabc-4520-9710-b56b5f1af39e.png)

:

This function allows a new user (guest) to sign up as an indtrainee . The user is required to fill in all fields so if some fields are empty an error message will be displayed for the user (“please fill in all fields”) .

.The user enters his/her first name , last name , username , email , password , confirm password and gender.

.The user should enter a valid email (in the correct format) so in case of entering a non valid email  an error message will be displayed (“email is not valid”) in order to enter a valid email.

.The user should enter a strong password so in case of entering a weak password  an error message will be displayed (“password is not strong enough”) in order to enter a valid email.

.The email should not be used by any other user so if the user entered a used email, an error message will be displayed (“This email is already in use”) in order to enter another email

.The username should be unique and not used by any other user so if the user entered a used username , an error message will be displayed (“This username is already taken”) in order to enter another username.

.The password and confirm password should match so in case of different passwords an error message will be displayed (“Passwords do not match”) in order to enter matching passwords.


.Then passwords are hashed to avoid the sensitive data being visible from anyone. 

.At the end the individual trainee is added to the database and an email with the login link is sent to the user to verify his/her account and the user is asked to login to the system.


4)![5](https://user-images.githubusercontent.com/116211733/211104977-fa605de8-190f-404b-a19e-70e23f37daad.png)


:


The user is asked to enter his/her email and this email should be registered so we look for this email in all our databases as the user who forgot his/her password may be admin,instructor,individual trainee or a corporate trainee .

If the user did not enter his/her email and tried to receive the email  an error message will be displayed (“Please write your email”) .

If this email exists and email is sent to the user with the reset password link .

If this email does not exist  an error message will be displayed (“this email is not correct”) .


```
- Function that allows the trainee to pay for a course to register
```
const payWithWallet = async (req, res) => {
    const { userID } = req.body;
    const { price } = req.body;
    const { courseID } = req.body;
 
    const trainee = await indTrainee.findById(userID);
    console.log(trainee);
 
    const traineeWallet = trainee.wallet - price;
    console.log(trainee.wallet);
 
    const updateTraineeWallet = await indTrainee.findOneAndUpdate({_id: userID}, {wallet: traineeWallet});
    console.log(updateTraineeWallet);
 
    const mycourse = await course.findById(courseID);
 
    const enrolled = mycourse.enrolled + 1;
 
    const updateCourse = await course.findOneAndUpdate({_id: courseID}, {enrolled : enrolled});
 
    const object = { course: courseID, progress: 0 };
 
    const newCourses = trainee.courses.concat([object]);  
 
    const updatedTrainee = await indTrainee.findOneAndUpdate({_id: userID} , {courses: newCourses});
}
```
 
 
 
## Installation
 
1- Make sure you download VScode 
2- Clone the repository from the master branch and save it in some folder (FolderX)
3- Open the your terminal and type in the next commands

  cd <FolderX's path folder by folder until you get there>
  npm install //this installs missing dependencies
  npm install node
  npm install express
  npm install mongoose
  npm install react
  npm install @mui/material
  npm install react-icons
  npm install nodeMailer 
  npm install jsonwebtoken
  npm install bcrypt
  npm install stripe
  npm install cors
  npm install axios 
  npm install react-router-dom

Go to 'Backend' Folder> create a new file call it '.env' and add the following code lines: 

PORT = <port number> 
MONGO_URL = "<your MongoDB collection's URL>"
AUTH_EMAIL = "<your company email>"
AUTH_PASS = "<password of the previous email>"
SERVICE = "gmail"
SECRET = <your secret pass>
STRIPE_SECRET_KEY= "<Your Stripe Secret Key"



Now add another terminal to your VScode.\
In one terminal add the next commands: 

  cd backend
  npm run dev


In the other terminal add the next commands:
  
  cd frontend
  npm start

A web page will be opened automatically in your default browser.\
YOU GUESSED RIGHT! It's AMELIO!! 🤩

## API Reference
 
#### Get all courses
 
```http
  GET /api/courses?(some attribute)=(some value)
```
The query filters the courses based on the attributes given\
If the query is empty, this request will get all courses NOT FILTERED
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
 
#### Get item
 
```http
  GET /api/items/${id}
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
 
 
```http
  POST /api/courses
```
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course attributes` | `JSON` | **Required**. All courses attributes |
 
```http
  PUT /api/courses/:id
```
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course attributes` | `JSON` | **Required**. Attributes to be updated |
 
```http
  DELETE /api/courses/:id
```
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course attributes` | `JSON` | **Required**. Attributes to be updated |
 
#### Get all instructors
 
```http
  GET /api/instructor/
```
#### Get one instructor
 
```http
  GET  /api/instructor/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of instructor to fetch |
#### Get accepted contract state of an instructor
 
```http
  GET  /api/instructor/getAccepted/:id
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of instructor to fetch |

#### Get searched courses of an instructor
 
```http
  GET  /api/instructor/search/:key
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of instructor to fetch | 
| `key`      | `string` | **Required**. Key of course instructor tries to fetch | 

#### Delete Instructor
 
```http
  DELETE  /api/instructor/:id
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of instructor to fetch |

#### Update Instructor Email
 
```http
  PATCH  /api/instructor/changeEmail
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of instructor to fetch |
| `username`      | `string` | **Required**. Username of instructor to fetch |

#### Update Instructor Biography
 
```http
  PATCH  /api/instructor/updateProfile
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `biography`      | `string` | **Required**. Biography of instructor to fetch |
| `username`      | `string` | **Required**. Username of instructor to fetch |

#### Update Instructor Accepted Contract State
 
```http
  PATCH  /api/instructor/updateAccepted
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of instructor to fetch |
| `acceptedContract`      | `boolean` | **Required**. AcceptedContract of instructor to fetch |

#### Get Instructor Courses
 
```http
  PUT  /api/instructor/myCourses
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of instructor to fetch |

#### SignUp User
 
```http
  POST  /api/user/signup
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname`      | `string` | **Required**. FirstName of user to fetch |
| `lastname`      | `string` | **Required**. LastName of user to fetch |
| `username`      | `string` | **Required**. Username of user to fetch |
| `email`      | `string` | **Required**. Email of user to fetch |
| `password`      | `string` | **Required**. Password of user to fetch |
| `confirmpassword`      | `string` | **Required**. ConfirmPassword of user to fetch |
| `gender`      | `string` | **Required**. Gender of user to fetch |

#### Login User
 
```http
  POST  /api/user/login
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user to fetch |
| `password`      | `string` | **Required**. Password of user to fetch |

#### Logout User
 
```http
  GET  /api/user/logout
```

####  User forgot password
 
```http
  POST  /api/user/forgotPassword
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of user to fetch |

####  Update user password
 
```http
  PATCH  /api/user/changePassword
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of user to fetch |
| `password`      | `string` | **Required**. Password of user to fetch |
| `confirmpassword`      | `string` | **Required**. ConfirmPassword of user to fetch |

####  Update user password
 
```http
  PATCH  /api/user/resetPassword
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of user to fetch |
| `password`      | `string` | **Required**. Password of user to fetch |
| `confirmpassword`      | `string` | **Required**. ConfirmPassword of user to fetch |

####  Get Admins
 
```http
  GET  /api/admin/
```
####  Get One Admin
 
```http
  GET  /api/admin/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of admin to fetch |

####  Add Admin
 
```http
  POST  /api/admin/
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname`      | `string` | **Required**. FirstName of admin to fetch |
| `lastname`      | `string` | **Required**. LastName of admin to fetch |
| `username`      | `string` | **Required**. Username of admin to fetch |
| `email`      | `string` | **Required**. Email of admin to fetch |
| `password`      | `string` | **Required**. Password of admin to fetch |
| `gender`      | `string` | **Required**. Gender of admin to fetch |

####  Delete Admin
 
```http
  DELETE  /api/admin/:id
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of admin to fetch |

####   Admin Refund Course
 
```http
  PUT  /api/admin/refund
```
 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseID`      | `string` | **Required**. ID of course to fetch |
| `refundID`      | `string` | **Required**. ID of refund to fetch |
| `indTraineeID`      | `string` | **Required**. ID of indTrainee to fetch |

####   Get all Corproate Trainee Requested Courses
 
```http
  PUT  /api/requestCourse/
```

####    Delete Corproate Trainee Accepted Courses Requests
 
```http
  DELETE  /api/requestCourse/accept/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of admin to fetch |
####    Delete Corproate Trainee Rejected Courses Requests
 
```http
  DELETE  /api/requestCourse/reject/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of course to fetch |

####    Get a Course Review
 
```http
  GET  /api/reviews/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of review to fetch |

####    Delete a Course Review
 
```http
  DELETE  /api/reviews/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of review to fetch |

####    Get a Course Review
 
```http
  GET  /api/reviews/viewcReviews/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of course to fetch |

####    Get an Instructor Review
 
```http
  PUT  /api/reviews/viewiReviews/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of instructor to fetch |

####    Get an Instructor Review
 
```http
  PUT  /api/reviews/viewiReviews/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of instructor to fetch |

####    View All Course Reviews
 
```http
  GET  /api/reviews/viewall/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of course to fetch |

####    Get All Course Request Status
 
```http
  GET  /api/requeststatus/
```
 ####    Delete a Course Request Status
 
```http
  DELETE  /api/requeststatus/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of request to fetch |


 ####    Update a Course Request Status
 
```http
  PATCH  /api/requeststatus/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of request status to fetch |

 ####    Get All Course Request Status
 
```http
  GET  /api/requeststatus/viewrequests/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of corporate trainee to fetch |

#### Get all corporate trainees
 
```http
  GET /api/corporateTrainee/
```
The query gets all corporate trainees in the system.
 
 
 
#### Get a corporate trainee
 
```http
  GET /api/corporateTrainee/:id
```
 The query gets the requested corporate trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of corporate trainee to fetch |
 
 
 
 #### Add a corporate trainee
 
```http
  Post /api/corporateTrainee/
```
 The query adds a new corporate trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of corporate trainee to be added|
| `username`      | `string` | **Required**. username of corporate trainee to be added|
| `email`      | `string` | **Required**. email of corporate trainee to be added|
| `password`      | `password` | **Required**. password of corporate trainee to be added|
 
 
 
 #### Delete a corporate trainee
 
```http
  Delete /api/corporateTrainee/:id
```
 The query deletes the corporate trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of corporate trainee to be deleted|
 
 
 
 #### patch an email
 
```http
  Patch /api/corporateTrainee/changeEmail
```
 The query updates the corporate trainee's email.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of corporate trainee to update his/her email|
| `email`      | `string` | **Required**. updated email of corporate trainee|
 
 
 
 #### patch new corporate trainee attributes 
 
```http
  Patch /api/corporateTrainee/updateProfile
```
 The query updates the corporate trainee's profile.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of corporate trainee to update his/her profile|
| `corporate trainee attributes`      | `JSON` | **Required**. Attributes to be updated|
 
 
 
#### post a password
 
```http
  Post /api/corporateTrainee/forgotPassword
```
 The query changes the corporate trainee's password.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of corporate trainee to update his/her password|
 
 
 
#### get courses of a corporate trainee
 
```http
  Get /api/corporateTrainee/getCourses/:id
```
 The query gets the corporate trainee's courses.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of corporate trainee to be fetched|
 
 
 
#### put an answer
 
```http
  Put /api/corporateTrainee/compareAnswers/:solution/:answer
```
 The query adds the answer of a corporate trainee to an exercise.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `solution`      | `string` | **Required**. solution of the exercise|
| `answer`      | `string` | **Required**. answer of the exercise submitted by the corporate trainee|
 
 
 
#### put a problem
 
```http
  Put /api/corporateTrainee/addProblem/:problem
```
 The query adds the reported problem of a corporate trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problem`      | `string` | **Required**. reported problem submitted by corporate trainee|
 
 
 
#### get a problem
 
```http
  Get /api/corporateTrainee/viewProblem/:id
```
 The query views the reported problems by a corporate trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of corporate trainee to be fetched|
 
 
 
 
#### patch a course's rating
 
```http
  Patch /api/corporateTrainee/rateCourse
```
 The query adds a rating to a course.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. id of course to be rated|
 
 
 
#### patch an instructor's rating
 
```http
  Patch /api/corporateTrainee/rateInstructor
```
 The query adds a rating to an instructor.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `instructorId`      | `string` | **Required**. id of instructor to be rated|
 
 
 
#### patch a review of a course
 
```http
  Patch /api/corporateTrainee/addRev
```
 The query adds a review to a course.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. id of course to be reviewed|
 
 
 
#### post a corporate trainee's request to access a course
 
```http
  Post /api/corporateTrainee/requestCourse
```
 The query requests a course by the corporate trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. id of course to be requested|
 
 
 
#### get a corporate trainee's courses 
 
```http
  Get /api/corporateTrainee/availableCourses/:id
```
 The query gets a corporate trainee's courses.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of corporate trainee to be fetched|
 
 
 
==================================================================
 
#### Get all individual trainees
 
```http
  GET /api/indTrainee/
```
The query gets all individual trainees in the system.
 
 
 
#### Get a individual trainee
 
```http
  GET /api/indTrainee/:id
```
 The query gets the requested individual trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of individual trainee to fetch |
 
 
 
 #### Add a individual trainee
 
```http
  Post /api/indTrainee/
```
 The query adds a new individual trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of individual trainee to be added|
| `username`      | `string` | **Required**. username of individual trainee to be added|
| `email`      | `string` | **Required**. email of individual trainee to be added|
| `password`      | `password` | **Required**. password of individual trainee to be added|
 
 
 
 #### Delete a individual trainee
 
```http
  Delete /api/indTrainee/:id
```
 The query deletes the individual trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of individual trainee to be deleted|
 
 
 
 #### patch an email
 
```http
  Patch /api/indTrainee/changeEmail
```
 The query updates the individual trainee's email.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of individual trainee to update his/her email|
| `email`      | `string` | **Required**. updated email of individual trainee|
 
 
 
 #### patch new corporate trainee attributes 
 
```http
  Patch /api/indTrainee/updateProfile
```
 The query updates the individual trainee's profile.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of individual trainee to update his/her profile|
| `individual trainee attributes`      | `JSON` | **Required**. Attributes to be updated|
 
 
 
#### post a password
 
```http
  Post /api/indTrainee/forgotPassword
```
 The query changes the individual trainee's password.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of individual trainee to update his/her password|
 
 
 
#### get courses of a individual trainee
 
```http
  Get /api/indTrainee/getCourses/:id
```
 The query gets the individual trainee's courses.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of individual trainee to be fetched|
 
 
 
#### put an answer
 
```http
  Put /api/indTrainee/compareAnswers/:solution/:answer
```
 The query adds the answer of a individual trainee to an exercise.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `solution`      | `string` | **Required**. solution of the exercise|
| `answer`      | `string` | **Required**. answer of the exercise submitted by the individual trainee|
 
 
 
#### put a problem
 
```http
  Put /api/indTrainee/addProblem/:problem
```
 The query adds the reported problem of a individual trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problem`      | `string` | **Required**. reported problem submitted by individual trainee|
 
 
 
#### get a problem
 
```http
  Get /api/indTrainee/viewProblem/:id
```
 The query views the reported problems by a individual trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of individual trainee to be fetched|
 
 
 
 
#### patch a course's rating
 
```http
  Patch /api/indTrainee/rateCourse
```
 The query adds a rating to a course.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. id of course to be rated|
 
 
 
#### patch an instructor's rating
 
```http
  Patch /api/indTrainee/rateInstructor
```
 The query adds a rating to an instructor.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `instructorId`      | `string` | **Required**. id of instructor to be rated|
 
 
 
#### patch a review of a course
 
```http
  Patch /api/indTrainee/addRev
```
 The query adds a review to a course.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. id of course to be reviewed|
 
 
 
#### post a individual trainee's request to access a course
 
```http
  Post /api/indTrainee/requestCourse
```
 The query requests a course by the individual trainee.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. id of course to be requested|
 
 
 
#### get a individual trainee's courses 
 
```http
  Get /api/indTrainee/availableCourses/:id
```
 The query gets a individual trainee's courses.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of individual trainee to be fetched|
 
 
 
 
#### put the progress of a trainee in a course
 
```http
  Put /api/indTrainee/progress
```
 The query updates the progress of an individual trainee in a course.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `prpgress`      | `number` | **Required**. progress of individual trainee in a course|
| `courseID`      | `string` | **Required**. id of course to be fetched|
| `userID`      | `string` | **Required**. id of individual trainee to be fetched|
 
 
 
#### get the progress of a trainee in a course
 
```http
  Get /api/indTrainee/getProgress
```
 The query gets the progress of an individual trainee in a course.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseID`      | `string` | **Required**. id of course to be fetched|
| `userID`      | `string` | **Required**. id of individual trainee to be fetched|

#### get a problem
 
http
  Get /api/problem/:id

 The query gets the reported problem with this id
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | *Required*. id of problem to be fetched|

                   
#### create a problem
                   
 http
  POST /api/problem

 The query creates new problem
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `problem attributes` | `JSON` | **Required**. All problem attributes |

                   
#### delete a problem
                   
http
  DELETE /api/problem/:id

The query deletes the problem with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | *Required*. id of problem to be deleted|


#### update a problem
                   
http
  PATCH /api/problem/:id

The query updates the problem with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | *Required*. id of problem to be fetched|
| `problem attributes` | `string` | **Required**. Attributes to be updated|


#### get pending problems
                   
http
  GET /api/problem/

The query gets all pending problems 


#### update Status
                   
http
  PUT /api/problem/updateStatus/:idProblem

The query updates the status of a problem to be resolved
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idProblem`      | `string` | *Required*. id of problem to be updated|


#### update Seen
                   
http
  PUT /api/problem/updateSeen/:idProblem

The query mark a problem as seen
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idProblem`      | `string` | *Required*. id of problem to be updated|


#### get unseen
                   
http
  GET /api/problem/getUnseen/:idProblem

The query gets the unseen attribute value of a problem
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idProblem`      | `string` | *Required*. id of problem to be fetched|

               
#### add response
                   
http
  PUT /api/problem/addResponse/:idProblem/:response

The query updates the response to a problem
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idProblem`      | `string` | *Required*. id of problem to be updated|
| `response` | `string` | **Required**. response of the problem|


------------------------------------------------------------------------------
                   
#### get search results
 
```http
  Get /api/courses/search/:key
```
 The query gets search results of the entered search keyword.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `key`      | `string` | **Required**. Search keyword|
                   
#### get courses
                   
http
  Get /api/courses

The query gets all courses                 

 #### Get a single course
                   
http
  GET /api/courses/:id

The query gets the course with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | *Required*. id of course to be fetched|

    
                   
 #### create a new course
                   
http
  POST /api/courses/

The query creates a new course
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course attributes` | `JSON` | *Required*. All courses attributes |
                   

#### delete a course
                   
http
  DELETE /api/courses/:id

The query deletes the course with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | *Required*. id of course to be deleted|

 
#### update a course
                   
http
  PATCH /api/courses/:id

The query updates the course with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | *Required*. id of course to be fetched|
| `course attributes` | `string` | **Required**. Attributes to be updated|
 

#### pay for a course
                   
http
  POST /api/courses/payment

The query pays the course with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount `      | `string` | *Required*. amount to be payed|
| `courseID ` | `string` | **Required**. course id paying for|
| `userID  ` | `string` | **Required**. user id paying for the course|
                   

#### Request Refund
                   
http
  POST /api/courses/requestRefund

The query pays the course with this id
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount `      | `string` | *Required*. amount to be payed|
| `courseID ` | `string` | **Required**. course id paying for|
| `userID  ` | `string` | **Required**. user id paying for the course|


#### Get user wallet
                   
http
  PUT /api/courses/wallet

The query gets the user wallet
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type `      | `string` | *Required*. type of user either instructor or individual trainee|
| `userID  ` | `string` | **Required**. user id paying for the course|
                   
                   
#### Get amount to be refunded
                   
http
  PUT /api/courses/getCoursePrice

The query gets the amount to be refunded
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refundID `      | `string` | *Required*. id of the refund requested|

                   
#### Get refund course name
                   
http
  PUT /api/courses/getCourseName

The query gets the name of the course refund was requested for
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refundID `      | `string` | *Required*. id of the refund requested|
                   
                   
#### Get the name of the trainee requested a refund
                   
http
  PUT /api/courses/getTraineeName

The query gets the name of the trainee requested a refund
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refundID `      | `string` | *Required*. id of the refund requested|
                   
                   
#### Get all refund requests
                   
http
  PUT /api/courses/getRefundRequests

The query gets all refund requests

 
 
## Tests
//search//
search by title or subject.
http
  GET /api/courses/search?key=ACL

returns course with id = "63b6a8664658a566c5b6e3ce"


search by a word that doesn't exist in the database.
http
  GET /api/courses/search?key=mechanics
  
returns "This course doesn't exist"



//take an exercise//
answer the exercise with a correct answer.
http
  PUT /api/corporateTrainee/compareAnswers?answer=sun&?ans=sun
  
  returns true


answer the exercise with a wrong answer.
http
  PUT /api/corporateTrainee/compareAnswers?answer=sun&?ans=moon
 
  returns false



//report a problem//
report a problem with a correct problem id and a correct corporate trainee id
http
  PUT /api/corporateTrainee/addProblem?problem=63b6c0810c9939204d273f1c
  data: {id:63b6a5bf4658a566c5b6e2f2}
  
  returns "Problem submitted successfully!", the problem is added to the array of problems of the corporate trainee with that id
 

report a problem with a correct problem id but a wrong corporate trainee id
http
  PUT /api/corporateTrainee/addProblem?problem=63b6c0810c9939204d273f1c
  data: {id:63b6a5bf4658a566c5b6e255}
  
  returns "No such corporate trainee.", nothing is added to the array of problems of the corporate trainee with that id
  
  
  
 //view reported problems//
 view reported problems by a corporate trainee using a correct id
 http
  GET /api/corporateTrainee/viewProblem?id=63b6a5bf4658a566c5b6e2f2
 
 returns all problems reported by the corporate trainee with the pending problems at the top and the resolved problems at the bottom
 

 view reported problems by a corporate trainee using a wrong id
 http
  GET /api/corporateTrainee/viewProblem?id=63b6a5bf4658a566c5b6e255
 
 returns "No such corporate trainee."



//update the status of a problem//
update the status of a problem using a correct problem id 
http
  PUT /api/problem/updateStatus?idProblem=63b6c0810c9939204d273f1c
  
  returns "Problem is resolved successfully!" , resolves the problem to the corporate trainee
  
  
  update the status of a problem using a wrong problem id 
http
  PUT /api/problem/updateStatus?idProblem=63b6c0810c9939204d273f2f
  
  returns "No such Problem" , the problem remains pending
  
  
  
  //add a response to a problem//
  add a response to a problem using a correct problem id
 http
  PUT /api/problem/addResponse?idProblem=63b6c0810c9939204d273f1c&?response="working on it"
  
  returns "Response is updated successfully!" , updates the problem's response to the corporate trainee 
  
  
    add a response to a problem using a wrong problem id
 http
  PUT /api/problem/addResponse?idProblem=63b6c0810c9939204d273f2f&?response="working on it"
  
  returns "No such problem!" , doesn't update the problem's response to the corporate trainee 
 

 add a response to a problem using a correct problem id but no response
 http
  PUT /api/problem/addResponse?idProblem=63b6c0810c9939204d273f1c&?response=
  
  returns "Please enter a response" , doesn't update the problem's response to the corporate trainee 



//view all pending problems//
 view pending reported problems and there are reported problems
 http
  GET /api/problem/
  
  returns all pending reported problems 
  
  
  
  view pending reported problems and there aren't reported problems
 http
  GET /api/problem/
  
  returns "No reported problems." 



 //checking if a problem was visited before by the admin//
  check if a problem was visited before using a correct problem id
 http
  GET /api/problem/getUnseen?idProblem=63b6c0810c9939204d273f1c
  returns false if the problem was visited before and true if it wasn't
  
  
  check if a problem was visited before using a wrong problem id
 http
  GET /api/problem/getUnseen?idProblem=63b6c0810c9939204d273f25
  returns "No such problem."



//take an exercise//
answer the exercise with a correct answer.
http
  PUT /api/indTrainee/compareAnswers?answer=sun&?ans=sun
  
  returns true


answer the exercise with a wrong answer.
http
  PUT /api/indTrainee/compareAnswers?answer=sun&?ans=moon
 
  returns false



//report a problem//
report a problem with a correct problem id and a correct individual trainee id
http
  PUT /api/indTrainee/addProblem?problem=63b6c0810c9939204d273f1c
  data: {id:639ba3f7f3c05775d538e990}
  
  returns "Problem submitted successfully!", the problem is added to the array of problems of the individual trainee with that id
 

report a problem with a correct problem id but a wrong individual trainee id
http
  PUT /api/indTrainee/addProblem?problem=63b6c0810c9939204d273f1c
  data: {id:63b6a5bf4658a566c5b6e255}
  
  returns "No such individual trainee.", nothing is added to the array of problems of the individual trainee with that id
  
  
  
 //view reported problems//
 view reported problems by a individual trainee using a correct id
 http
  GET /api/indTrainee/viewProblem?id=639ba3f7f3c05775d538e990
 
 returns all problems reported by the individual trainee with the pending problems at the top and the resolved problems at the bottom
 

 view reported problems by a individual trainee using a wrong id
 http
  GET /api/indTrainee/viewProblem?id=63b6a5bf4658a566c5b6e255
 
 returns "No such individual trainee."




//forgot password//
                   
enter correct email to receive the reset password link on email.
http
  POST/api/user/forgotPassword
                   
data:{email:"ameliohelpteam@gmail.com"}
                   
returns :email sent to user with the reset password link

                   
enter incorrect email so error message will be displayed.
http
  POST/api/user/forgotPassword

data:{email:"ameliohelp@gmail.com"}
                   
returns : "This email is not correct"             

                   
//reset password//
enter matching strong password and confirm password.
http
  PATCH/api/user/resetPassword

data:{password:"abcABC123!" , confirmPassword:"abcABC123!"}
                   
returns : password changed successfully and the user is redirected to the login page to login with the new password      

                   
enter not matching password and confirm password.
  PATCH/api/user/resetPassword
  
data:{password:"abcABC123!" , confirmPassword:"abcABC23!"}
                   
returns : "Passwords do  not match"  
             
                   
//login//

enter correct username and correct password.
  POST/api/user/login
  
data:{username:"gana.khaled" , password:"abcABC23!"}
                   
returns : logged in successfully and user will be navigated to his/her homepage  
                   
                   
enter incorrect username and correct password.
  POST/api/user/login
  
data:{username:"gana.khale" , password:"abcABC23!"}
                   
returns : "This username is incorrect" 
                   
                   
enter correct username and incorrect password.
  POST/api/user/login
  
data:{username:"gana.khaled" , password:"abcABC23"}
                   
returns :  "wrong password "

                                      
enter correct username and not entering password
  POST/api/user/login
  
data:{username:"gana.khaled"}
                   
returns :  "please fill in all fields"
                   

//signup//
                                                                           
enter all fields correctly
  POST/api/user/signup
  
data:{firstName:"omar",lastName:"mohamed",username:"omar.mohamed", email:"omar.mohamed@gmail.com", password:"abcABC123!",confirmPassword:"abcABC123!",gender:"male"}
                   
returns : user will be signed up successfully and will receive a verification mail with the log in link
                   
                   
enter a used username by other user
  POST/api/user/signup
  
data:{firstName:"ganna",lastName:"hany",username:"gana.khaled", email:"gana.hany@gmail.com", password:"abcABC123!",confirmPassword:"abcABC123!",gender:"female"}
                   
returns : "This username is already taken"

                   
enter a non valid email
  POST/api/user/signup
  
data{firstName:"ganna",lastName:"hany",username:"gana.hany", email:"gana.hany", password:"abcABC123!",confirmPassword:"abcABC123!",gender:"female"}
                   
returns : "This username is not valid"
                   
  
enter a weak password
  POST/api/user/signup
  
data{firstName:"ganna",lastName:"hany",username:"gana.hany", email:"gana.hany@gmail.com", password:"abc123",confirmPassword:"abc123",gender:"female"}
                   
returns : "This password is not strong enough"
                   
                   
enter non matching passwords
  POST/api/user/signup
  
data{firstName:"ganna",lastName:"hany",username:"gana.hany", email:"gana.hany@gmail.com", password:"abcABC123!",confirmPassword:"abcABC123",gender:"female"}
                   
returns : "Passwords do not match"
                   
Missing fields
  POST/api/user/signup
  
data{firstName:"ganna",lastName:"hany",username:"gana.hany", email:"gana.hany@gmail.com", password:"abcABC123!",confirmPassword:"abcABC123!"}
                   
returns : "please fill in all fields"


//change password//
                   
Missing fields
  PATCH/api/user/changePassword
  
data{password:"abcABC123!"}
                   
returns : "please fill in all fields"
                   
                   
Weak password
  PATCH/api/user/changePassword
  
data{password:"abc123",confirmPassword:"abc123"}
                   
returns : "Password is not strong enough"
                   
                   
Password and confirm password do not match
  PATCH/api/user/changePassword
  
data:{password:"abcABC123!",confirmPassword:"abcABC123"}
                   
returns : "Passwords do not match"
  
Password and confirm password match and strong enough
PATCH/api/user/changePassword
  
data:{password:"abcABC123!",confirmPassword:"abcABC123!"}
                   
returns : password changed successfully and user should login with the new password now 

 
## How To Use

- As an indiviual trainee, 
  - sign up using your first name, last name, email, password, and gender. 
  - login with your username and password.
  - preview available coures on the website.
  - enroll in any course they are interested in by paying using their wallet or credit card.
  - watch each subtitle video of the course they enrolled in and solve its exercise 
  - check whether they solved the exercise correctly or not and view the correct solution
  - take notes while watching the course subtitle videos
  - check their progress in the coures they are enrolled in
  - get a certificate sent to their email when their progress of the course reaches 100% and download it as a PDF
  - refund a course they are enrolled in if their progress is less than 50%
  - receive a full refund into their wallet of the course they requested to refund after being accepted by the admin
  - rate courses they enrolled in 
  - rate the instructors of the courses they enrolled in
  - write a review for the courses they enrolled in 
  - delete a review for the courses they enrolled in 
  - edit a review for the courses they enrolled in 
  - change their account password
  - report any problem in the website and reseive a response from the admin
  - logout from their account

- As a Corporate trainee, 
  - login with your username and password set by the admin.
  - preview available coures on the website.
  - request any course they are interested in.
  - check whether the courses they requested are accepted or rejected by the admin
  - watch each subtitle video of the course they requested (and the request was accepted) in and solve its exercise 
  - check whether they solved the exercise correctly or not and view the correct solution
  - take notes while watching the course subtitle videos
  - check their progress in the coures they are enrolled in
  - get a certificate sent to their email when their progress of the course reaches 100% and download it as a PDF
  - rate courses they enrolled in 
  - rate the instructors of the courses they enrolled in
  - write a review for the courses they enrolled in 
  - delete a review for the courses they enrolled in 
  - edit a review for the courses they enrolled in 
  - change their account password
  - report any problem in the website and reseive a response from the admin
  - logout from their account

- As an Instructor, 
  - login with your username and password set by the admin.
  - preview available coures on the website.
  - accept the contract of uploaded video licence and payment policy
  - add a course (after accepting the contract) by entering
    the course title, subject, summary, price, promotion, promotion start date, promotion end date(or no promotion at all),
    each subtitles title, youtube video link, video  summary, exercise and their correct answer
  - add promotion to any of their courses or all their courses at any time after course publish
  - view the rating and reviews of their courses
  - change their account password
  - report any problem in the website and reseive a response from the admin
  - logout from their account

- As an Admin, 
  - login with your username and password.
  - preview available coures on the website.
  - apply promotion to any course or all courses at any time
  - add Corporate trainee and set their  username and password
  - add indiviual trainee and set their username and password
  - add another admin and set their username and password
  - view reported problems, resolve them, and set their status 
  - view requested course refunds and accept them
  - view requested courses from Corporate trainees and accept or reject them
  - change their account password
  - logout from their account
## Contributing
 
Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.
 
1- Fork the repo on GitHub\
2- Clone the project to your own machine\
3- Commit changes to your own branch\
4- Push your work back up to your fork\
5-Submit a Pull request so that we can review your changes
 
**NOTE**: Be sure to merge the latest from "upstream" before making a pull request!
 

 
## Credits
This project is made possible by the community surrounding it and especially the wonderful people and projects listed in this document.
 
 
Main contributors to the project:\
-[Mariam El Madbouly](https://github.com/MariamMadbouly)\
-[Mohamed Magdy](https://github.com/MuhammadMagdyy)\
-[Yasmin Hossam](https://github.com/yasminhossamm)\
-[Dina Mohamed](https://github.com/dinamuhamedd)\
-[Abdelrahman Amgad](https://github.com/abdelrahmanamgad1)
 
**Resources**

[MERN STACK](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)

[MERN STACK Authentication tutorial](https://www.youtube.com/watch?v=WsRBmwNkv3Q&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT)

[MUI React Library](https://v4.mui.com/getting-started/installation/)
## License
 
MIT License
 
Copyright (c) [2023] [AMELIO©️]

Apatch 2.0 licence for Stripe.
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.