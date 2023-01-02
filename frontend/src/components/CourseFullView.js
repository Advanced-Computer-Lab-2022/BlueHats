import React, { useState, useEffect } from "react";
import Notes from "../components/Notes";
import { Link } from "react-router-dom";
import YoutubeEmbed from "./YoutubeEmbed";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Exam from "./Exam";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import SenDownloadCertificate from "./SenDownloadCertificate";
import SendCertificate from "./SendCertificate";

const CourseFullView = ({ course }) => {

    const [myembedID, setMyembedID] = useState('');
    const [quest, setQuest] = useState('');
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [fourth, setFourth] = useState('');
    const [ans, setAns] = useState('');
    const [active, setActive] = useState("default");
    const [downloadCert ,setDownloadCert] = useState(0)
    const [sendCert ,setSendCert] = useState(0)
    const [finishCourse ,setFinishCourse] = useState(0)



    const mylink1 = (course.previewLink);
    const myembed1 = mylink1.split('=');
    const myembedID1 = myembed1[1];

    const add = Math.round(100/((course.subtitle).length*2));
    const [value, setValue] = useState(0);

    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const userID = loggedinUser.id;

    const [progress, setProgress] = useState(0); 

    useEffect(() =>  {
      const data1={courseID: course._id, userID: userID};
      axios({
        method: "PUT",
        url : `/api/indTrainee/getProgress`,
        data:data1,
        headers:{'Content-Type':'application/json'}
      })
      .then( (res) => { 
        const progress = res.data
        console.log(progress)
        setProgress(progress)  
        setValue(progress)
      });
    },[course._id, userID])

    const handleClick = () => {
      setValue(oldValue => {
        const newValue = oldValue + add;

        if (newValue >= 100) {
          const data={progress: 100, courseID: course._id, userID: userID};
          axios({
            method:"PATCH",
            url:`/api/indTrainee/progress`,
            data:data,
            headers:{'Content-Type':'application/json'}
          })
          return 100;
        }
        else 
        {
          const data={progress: newValue, courseID: course._id, userID: userID};
          axios({
            method:"PATCH",
            url:`/api/indTrainee/progress`,
            data:data,
            headers:{'Content-Type':'application/json'}
          })
          return newValue;
        }
      });
    };

    return (
      <div>
        <div className="progress">
        <ProgressBar key={course._id} bgcolor={"#2bb638"} completed={value} /> 
        </div>
        <div className="course-view">
        <Sidebar className="course-view-sidebar">
            <Menu className="sidebar11">
            <MenuItem> Lessons </MenuItem>
            {(course.subtitle).map((mycourse,index)=>
                <SubMenu key={index} defaultOpen={true} label={(mycourse.name).toUpperCase()}>
                  <MenuItem  routerLink={<Link to= {`/course/view?id=${course._id}`} onClick={() => {  
                    const mylink = (mycourse.link);
                    const myembed = mylink.split('=');
                    setMyembedID(myembed[1]);
                    setActive("video");}} />}> 
                    <span className="material-symbols-outlined"> play_circle </span>  Watch the lesson  </MenuItem>
                  <MenuItem routerLink={<Link to= {`/course/view?id=${course._id}`} onClick={() => {  
                    setQuest(mycourse.question);
                    setFirst(mycourse.firstChoice);
                    setSecond(mycourse.secondChoice);
                    setThird(mycourse.thirdChoice);
                    setFourth(mycourse.fourthChoice);
                    setAns(mycourse.answer);
                    setActive("question");}} />}> 
                  <span className="material-symbols-outlined"> quiz </span> Test your knowledge  </MenuItem> 
                </SubMenu>)}
            <MenuItem> <span className="material-symbols-outlined"> quiz </span> Final Exam </MenuItem>
            {(value===100) && <MenuItem>  <SenDownloadCertificate course={course}/>  </MenuItem>}
            </Menu>
          
        </Sidebar>
        <div className="course-view-video">
            {active === "default" &&  <YoutubeEmbed embedId={ myembedID1}/>}
            {active === "video" &&  <YoutubeEmbed embedId={ myembedID}/>}
            {active === "question" &&  <Exam question={quest} firstO={first} secondO={second} thirdO={third} fourthO={fourth} answer={ans} />}
        </div>
        <div className="done-button">
        {/* {(active === "question" || active === "video" ) && <button onClick={handleClick}>Done</button>} */}
          {((active === "question" || active === "video" ) || (sendCert===0) || (finishCourse===0)) ? <button onClick={handleClick}>Done</button> : <SendCertificate course={course}/>}
        </div>
        <Notes />
       </div>
      </div>
    )
      
}
export default CourseFullView