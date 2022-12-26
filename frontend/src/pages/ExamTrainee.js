import axios from 'axios';
//import button from '@mui/material/button';
import Box from '@mui/material/Box';
import React, {useState, useEffect, useRef} from 'react';
import 'react-dropdown/style.css';
import styled from 'styled-components';
// import Test from "../components/Test"
// import Option from "../components/Option"
// import Question from "../components/Question"
// import MultipleChoice from "../components/MultipleChoice"
// import QuestionGroup from "../components/QuestionGroup"

//import { Test, QuestionGroup, Question, Option } from 'react-multiple choice';


  const ExamTrainee = () => {

  const params = new URLSearchParams(window.location.search);
  const idCourse = params.get('idCourse');
  const idTrainee = params.get('idTrainee');
  console.log(idCourse,idTrainee)
  const [loading,setLoading] = useState(true)
  const [ans,setAns] = useState('');
  const [exam, setExam] = useState([])
  const [submit,setSubmit] = useState(false)
  const [flag,setFlag] = useState(false)
  const [a1,setA1] = useState(false)
  const [a2,setA2] = useState(false)
  const [a3,setA3] = useState(false)
  const [a4,setA4] = useState(false)
  const [t1,setT1] = useState(false)
  const [t2,setT2] = useState(false)
  const [t3,setT3] = useState(false)
  const [t4,setT4] = useState(false)
  const [id ,setId] = useState();
  const [ex,setEx] = useState();

  useEffect(() =>  {
    setLoading(true)
    axios({
      method: "GET",
      url : `/api/corporateTrainee/viewSolution/${idCourse}`
    }).then(
   (res) => { 
    setLoading(false)
      const exam = res.data
      console.log(exam)
      setExam(exam)  

    });
      
   },[idCourse])

 

  const handleMenuOne = event => {
    setAns('1');
    setFlag(false);
    setSubmit(false);
    setA1(true);
    setA2(false);
    setA3(false);
    setA4(false);
    setId(event.currentTarget.id);
  };

  const handleMenuTwo = event => {
    setAns('2');
    setFlag(false);    
    setSubmit(false);
    setA2(true);
    setA1(false);
    setA3(false);
    setA4(false);
    setId(event.currentTarget.id);
  };
  const handleMenuThree = event => {
    setAns('3');
    setFlag(false);
    setSubmit(false);
    setA3(true);
    setA1(false);
    setA2(false);
    setA4(false);
    setId(event.currentTarget.id);
  };
  const handleMenuFour = event => {
    setAns('4');
    setFlag(false);
    setSubmit(false);
    setA4(true);
    setA1(false);
    setA2(false);
    setA3(false);
    setId(event.currentTarget.id);
    };
  const handleSubmit = event => {  
    setSubmit(true);
    axios({
      method: "PUT",
      url : `/api/corporateTrainee/setAnswer/${idCourse}/${idTrainee}/${id}/${ans}`
    }).then(
      (res) => { 
         const flag = res.data
         console.log(flag)
         setFlag(flag)  
    
       });
      axios({
        method: "GET",
        url : `/api/corporateTrainee/getEx/${idCourse}/${id}`
      }).then(
        (res) => { 
           const exerc = res.data
           console.log(exerc)
           setEx(exerc)  
      
         });
    setAns('');
    if(flag==false){
      if(ex.answer==ex.firstChoice)
        {
          setT1(true)
          setT2(false)
          setT3(false)
          setT4(false)
        }
      else if (ex.answer==ex.secondChoice)
        {
          setT2(true)
          setT1(false)
          setT3(false)
          setT4(false)
        }
      else if (ex.answer==ex.thirdCHoice)
        {
          setT3(true)
          setT2(false)
          setT1(false)
          setT4(false)
        }
      else 
        {
          setT4(true)
          setT1(false)
          setT2(false)
          setT3(false)
        }
     }
   

  }
    return(
     
        <div className="exam">
<ol>
           {!loading && exam.length!=0 &&(exam.map((exercise)=> 
             
              
            <li exercise={exercise} key={exercise.id}>
            <h2>Q-: {exercise.question}</h2>
            <Box sx={{marginBottom: 1}}>
            <button id={exercise._id} variant="contained"
            onClick={handleMenuOne}
            style={{ backgroundColor: submit?  (t1? "green" : (a1? (flag? "green" : "red") : "#a256e0"))  : (a1 ? "black"  : "#a256e0") }}
            >{exercise.firstChoice}</button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <button id={exercise._id} variant="contained"
            onClick={handleMenuTwo}
            style={{ backgroundColor: submit?  (t2? "green" : (a2? (flag? "green" : "red") : "#a256e0"))  : (a2 ? "black"  : "#a256e0") }}
           >{exercise.secondChoice}</button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <button id={exercise._id} variant="contained"
            onClick={handleMenuThree}
            style={{ backgroundColor: submit?  (t3? "green" : (a3? (flag? "green" : "red") : "#a256e0") ) : (a3 ? "black"  : "#a256e0") }}
            >{exercise.thirdChoice}</button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <button id={exercise._id} variant="contained"
            onClick={handleMenuFour}
            style={{ backgroundColor: submit? (t4? "green" : (a4? (flag? "green" : "red") : "#a256e0")) : (a4 ? "black"  : "#a256e0") }}
            >{exercise.fourthChoice}</button>
            </Box>
           <div className='submit'>
            <Box sx={{marginBottom: 1}}>
            <button id={exercise._id} variant="contained"
            onClick={handleSubmit}
            margin="normal"
            padding="normal">Submit Answer</button>
            </Box>
            </div>
            </li>
       
      ))} 
      </ol>
        
            <Box sx={{marginBottom: 2}}>
            <button variant="contained"
            onClick={() => window.location.href=`/gradeExam?idCourse=${idCourse}&idTrainee=${idTrainee}`}
            margin="normal"
            padding="normal"
            >View Grade</button>
            </Box>
    
        
        </div>

    )
 }
export default ExamTrainee; 
