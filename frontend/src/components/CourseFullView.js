import React, { useState } from "react";
import { Link } from "react-router-dom";
import YoutubeEmbed from "./YoutubeEmbed";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Exam from "./Exam";

const CourseFullView = ({ course }) => {

    const [myembedID, setMyembedID] = useState('');
    const [quest, setQuest] = useState('');
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [fourth, setFourth] = useState('');
    const [ans, setAns] = useState('');
    const [active, setActive] = useState("default");

    const mylink1 = (course.previewLink);
    const myembed1 = mylink1.split('=');
    const myembedID1 = myembed1[1];

    return (
        <div className="course-view">
        <Sidebar className="course-view-sidebar">
            <Menu className="sidebar11">
            <MenuItem> Lessons </MenuItem>
            {(course.subtitle).map((mycourse,index)=>
                <SubMenu key={index} label={(mycourse.name).toUpperCase()}>
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
            </Menu>
        </Sidebar>
        <div className="course-view-video">
            {active === "default" &&  <YoutubeEmbed embedId={ myembedID1}/>}
            {active === "video" &&  <YoutubeEmbed embedId={ myembedID}/>}
            {active === "question" &&  <Exam question={quest} firstO={first} secondO={second} thirdO={third} fourthO={fourth} answer={ans} />}
        </div>
       
       </div>
    )
      
}
export default CourseFullView