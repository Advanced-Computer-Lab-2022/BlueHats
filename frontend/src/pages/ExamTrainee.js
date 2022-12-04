import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React, {useState, useEffect, useRef} from 'react';
import 'react-dropdown/style.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const ExamTrainee = () => {

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  
  
  const params = new URLSearchParams(window.location.search);
  const idCourse = params.get('idCourse');
  const idTrainee = params.get('idTrainee');
  console.log(idCourse,idTrainee)
  const [loading,setLoading] = useState(true)
  const [ans,setAns] = useState('');
  const [exam, setExam] = useState([])

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

 

  const handleMenuOne = () => {
    setActive1(!active1);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setAns('1');
      
  };

  const handleMenuTwo = () => {
    setActive2(!active2);
    setActive1(false);
    setActive3(false);
    setActive4(false);
    setAns('2');
    
  };
  const handleMenuThree = () => {
    setActive3(!active3);
    setActive2(false);
    setActive1(false);
    setActive4(false);
    setAns('3');
    
  };
  const handleMenuFour = () => {
    setActive4(!active4);
    setActive2(false);
    setActive1(false);
    setActive3(false);
    setAns('4');

  };
  const handleSubmit = async() => {  
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    axios({
      method: "PUT",
      url : `/api/corporateTrainee/setAnswer/${idTrainee}/${ans}`
    })
   

  }
  const handleNextQuestion = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setAns('');
  }
  //get the final exam
    return(
     
        <div className="exam">
          <ol>
           {!loading && exam.length!=0 &&(exam.map(exercise => 
            <li exercise={exercise} key={exercise.id}>
              <h2>Q-: {exercise.question}</h2>
              <Box sx={{marginBottom: 1}}>
            <Button variant="contained"
            onClick={handleMenuOne}
            margin="normal"
            padding="normal"
            style={{ backgroundColor: active1 ? "black" : "blue" }}>{exercise.firstChoice}</Button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <Button variant="contained"
            onClick={handleMenuTwo}
            margin="normal"
            padding="normal"
            style={{ backgroundColor: active2 ? "black" : "blue" }}>{exercise.secondChoice}</Button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <Button variant="contained"
            onClick={handleMenuThree}
            margin="normal"
            padding="normal"
            style={{ backgroundColor: active3 ? "black" : "blue" }}>{exercise.thirdChoice}</Button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <Button variant="contained"
            onClick={handleMenuFour}
            margin="normal"
            padding="normal"
            style={{ backgroundColor: active4 ? "black" : "blue" }}>{exercise.fourthChoice}</Button>
            </Box>

            <Box sx={{marginBottom: 1}}>
            <Button variant="contained"
            onClick={handleSubmit}
            margin="normal"
            padding="normal">Submit Answer</Button>
            </Box>

            {handleNextQuestion}
            

            </li>
       
      ))} </ol>

            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={() => window.location.href=`/gradeExam?idCourse=${idCourse}&idTrainee=${idTrainee}`}
            margin="normal"
            padding="normal"
            >View Grade</Button>
            </Box>
    
        
        </div>

    )
 }
export default ExamTrainee; 
