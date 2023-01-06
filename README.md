 
# Amelio
 
Amelio is an Online Learning System website that creates a robust learning experience that feels like a classroom experience, offering the traditional classroom characteristics (like instructor-student interaction, Q&As, discussion).
 
## Motivation
 
Amelio was built as an integrated set of interactive online services that provide trainers, learners, and others involved in education with information, tools, and resources to support and enhance education delivery and management. These important learning environments are achieved through a learning platform’s features and tools that create the level of interaction and engagement students need. include content modules, learning modules, evaluation modules, and communication modules. These modules allow for your training program to incorporate a variety of teaching styles for every learner, and allows for learners to boost their performance level and knowledge-retention levels.
## Build Status
 
- can't search in filtered results
- can't filter in search results
- can't update the progress based on the minutes watched in the video
- can't receive the money in the wallet
- can't see grades for exercises done previously
- can't see the average mark scored on the exercises of the course
- can't ask the course instructor questions about the course
## Code Style
 
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
- Use lowercase hex colors (e.g. #fff) instead of color names (e.g. white).
- Use * {box-sizing: border-box;}.
- Use hyphens between class names, not camelCase or under_scores.
- Use only classes for styling most of the time (no #ids, elems etc).
- Don't use inline styling.
- Profile your selectors with webkit inspector.
- Use tree-style indentation.
 
```
.signup-page {
  background: #0d0; }
  .signup-button {
    padding: 10px;
    background-image: url("../img/signup.png"); }
 
/* This looks cool if you use Stylus etc. */
.chat-page {
  font-size: 0.9em; }
  .identity {
    margin-bottom: 20px; }
    .identity-profile {
      height: 4em; }
    .identity-nickname {
      float: left;
      width: 165px; }
    .identity-avatar {
      float: right; }
    .identity-updates {
      margin-top: 10px; }
    .identity-status {
      height: 30px; }
    .identity-current-mood {
      padding-left: 5px; }
    .identity-button {
      float: right; }
```
- Use this sequence of properties
```
.item {
  position: static;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
 
  display: block;
  visibility: hidden;
  float: none;
  clear: none;
  overflow: hidden;
  clip: rect(0 0 0 0);
 
  box-sizing: content-box;
  width: auto;
  min-width: 0;
  max-width: 0;
  height: auto;
  min-height: 0;
  max-height: 0;
  margin: 0;
  padding: 0;
 
  table-layout: fixed;
  empty-cells: show;
  border-spacing: 0;
  border-collapse: collapse;
  list-style: none;
 
  font: 1em sans-serif;
  font-family: Arial, sans-serif;
  font-size: 1em;
  font-weight: normal;
  font-style: normal;
  font-variant: normal;
 
  content: "";
  cursor: default;
  text-align: left;
  vertical-align: top;
  line-height: 1;
  white-space: normal;
  text-decoration: none;
  text-indent: 1;
  text-transform: uppercase;
  letter-spacing: 1;
  word-spacing: normal;
 
  opacity: 1;
  color: #d00;
  text-shadow: 5px 5px 5px #d59;
  border: 1px solid #d00;
  border-radius: 15px;
  box-shadow: inset 1px 0 0 #fff;
  background: #fff url("../i/bg.png") no-repeat 0 0; }
```
 
 
 
 
 
 
## Screenshots
 
Login Page
[![2023-01-02-3.png](https://i.postimg.cc/CKDVPk4L/2023-01-02-3.png)](https://postimg.cc/LqH7hq7r)
 
Admin Course View Page
[![Screenshot-2023-01-02-at-4-31-21-AM.png](https://i.postimg.cc/NMmfHZnD/Screenshot-2023-01-02-at-4-31-21-AM.png)](https://postimg.cc/8JkS8XNf)
 
Payment Page
[![Screenshot-2023-01-02-at-4-29-42-AM.png](https://i.postimg.cc/5tjX671K/Screenshot-2023-01-02-at-4-29-42-AM.png)](https://postimg.cc/sBdjLJM5)
 
Course View Page
[![Screenshot-2023-01-02-at-4-25-17-AM.png](https://i.postimg.cc/L4J3rD1T/Screenshot-2023-01-02-at-4-25-17-AM.png)](https://postimg.cc/PNkDDmKp)
 
 
 
 
 
 
## Tech Stack
**Client:**
- React
- Axios
- MUI
- Mongoose
- React Stripe
- JSPDF
- Bootstrap

**Server:**
- Node
- Express
- MongoDB
- Bcrypt
- Cors
- JWT
- Nodemailer
- Stripe
- Validator
 
## Features
 
- Write notes while watching your course lessons and download it
- Download and receive by mail your dynammic certificate upon completion
- Fullscreen mode
- Instructors can redeem their salary from a smart wallet
- Evaluate instructors and courses using ratings/reviews
- Instructors can see the number of enrolled students in their courses
- Trainees can request a refund if less than 50% of the course was not a satsifactory
- Report problems to be resolved by admins
- Trainees can see a preview lesson of the course they're interested in
- Trainees have the ability to test their knowledge by solving quizzes for the lesson they're taking
 
 
## Code Examples
 
- This function searches for the search key in the title,subject and instructors
 
```
const getCoursesBySearch = async (req,res) => {
    const key = req.params.key
    const result = await course.find({}).populate('instructor');
    const titleRes = await course.find({title: key})
    console.log(titleRes)
    if(titleRes.length==0){
        const subjRes = await course.find({subject: key})
        console.log(subjRes)
        if(subjRes.length==0){
            let i = 0;
            let resTemp = [];
            while(i<result.length){
                if(result[i].instructor != null && result[i].instructor.name == key){
                    resTemp=resTemp.concat([result[i]])
                    console.log(result[i])
                }
                i++;
            }
            const instRes =resTemp
            console.log(instRes)
            if(instRes.length==0){
               const empty = []
                res.status(200).json(empty)
            }
            else{
                 res.status(200).json(instRes)
            }
        }
        else{
             res.status(200).json(subjRes)
        }
       
    }
    else if (titleRes.length!=0){
         res.status(200).json(titleRes)
    }
    else{
         res.status(200).json([])
    }
}
```
- This function updates a response to a problem by the admin
```
const addResponse = async (req,res) => {
  const idProblem = req.params.idProblem
  const resp = req.params.response
 
  console.log(idProblem)
 
    if(!mongoose.Types.ObjectId.isValid(idProblem)) {
        return res.status(404).json({error: 'No such Problem'})
    }
 
  const problem = await Problem.findOneAndUpdate({_id: idProblem},{response: resp})
 
  if(!problem) {
    return res.status(404).json({error: 'No such Problem'})
  }
 
  return res.status(200).json(problem);
}
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
 
1- Make sure you download VScode \
2- Clone the repository from the master branch and save it in some folder (FolderX)\
3- Open the your terminal and type in the next commands
 
 
```bash
  cd <FolderX's path folder by folder until you get there>
  npm install //this installs missing dependencies
```
Go to 'Backend' Folder> create a new file call it '.env' and add the following code lines:
```bash
PORT = <port number>
MONGO_URL = "<your MongoDB collection's URL>"
AUTH_EMAIL = "<your company email>"
AUTH_PASS = "<password of the previous email>"
SERVICE = "gmail"
SECRET = <your secret pass>
STRIPE_SECRET_KEY= "<Your Stripe Secret Key"
```
 
 
Now add another terminal to your VScode.\
In one terminal add the next commands:
 
```bash
  cd backend
  npm run dev
```
 
In the other terminal add the next commands:
 
```bash
  cd frontend
  npm start
```
A webpage will be opened automatically in your default browser.\
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
 
 
## Tests
search by title,subject,instructor or something that doesn't exist in the database.
http
  GET /api/courses/search/${key}
 
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `string` | *Required*. search key |
 
 
login with wrong password.
http
  POST /api/user/login
 
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password` | `string` | *Required*. password of user |
 
 
signup with username that already exists.
http
  POST /api/user/signup
 
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | *Required*. username of registering user |
 
creating a form without accepting the contract
 
http
  GET /api/instructor/getAccepted/${id}
 
 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `Number` | *Required*. Id of instructor |
 
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