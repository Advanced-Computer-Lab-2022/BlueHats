import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
const GradeInd = () =>{
  const params = new URLSearchParams(window.location.search);
  const idCourse = params.get('idCourse');
  const idTrainee = params.get('idTrainee');
  console.log(idCourse,idTrainee)
  const [grade,setGrade] = useState(0)
  const [loading,setLoading] = useState(true)
  const [exam,setExam] = useState([])
  // const [flag,setFlag] = useState(true)
  useEffect(() =>  {
    setLoading(true)
   
       axios({
        method: "GET",
        url : `/api/indTrainee/gradeExam/${idCourse}/${idTrainee}`
      }).then(
     (res) => { 
        setLoading(false)
        const grade = res.data
        console.log(grade)
        setGrade(grade)  
     }
      );
      setLoading(true)
      axios({
        method: "GET",
        url : `/api/indTrainee/viewSolution/${idCourse}`
      }).then(
     (res) => { 
      setLoading(false)
        const exam = res.data
        console.log(exam)
        setExam(exam)  

      });
    
 },[idTrainee])
 console.log(grade)
 
     
    return(
      //loop on final exam and print it
        <div className="grade">
            <form>
             <h1> Final Grade: {grade}/ {exam.length}</h1>
             </form>
              <h2> Final Exam Solution:</h2>
              <ol>
                { exam.map((exercise) => <li exercise={exercise} key={exercise.id}> Question: {exercise.question} <br>
                </br> Solution:{exercise.answer} </li>)}
              </ol>
               </div>
    );


}

export default GradeInd; 
