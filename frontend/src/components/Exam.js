import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React, {useState} from 'react';
import 'react-dropdown/style.css';


const Exam = ({question, firstO, secondO, thirdO, fourthO, answer}) =>{
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const [ans,setAns] = useState('');

  const [flag,setFlag] = useState(true)
  const [submit,setSubmit] = useState(false)

  const handleMenuOne = () => {
    setActive1(!active1);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setAns(firstO);
      
  };

  const handleMenuTwo = () => {
    setActive2(!active2);
    setActive1(false);
    setActive3(false);
    setActive4(false);
    setAns(secondO);
    
  };
  const handleMenuThree = () => {
    setActive3(!active3);
    setActive2(false);
    setActive1(false);
    setActive4(false);
    setAns(thirdO);
    
  };
  const handleMenuFour = () => {
    setActive4(!active4);
    setActive2(false);
    setActive1(false);
    setActive3(false);
    setAns(fourthO);

  };
  const handleSubmit = async() => {  
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setAns('');
    setSubmit(true);
    axios({
      method: "PUT",
      url : `/api/corporateTrainee/compareAnswers/${answer}/${ans}`
    }).then(
        (res) => { 
           const flag = res.data
           console.log(flag)
           setFlag(flag)  
     
         });
  }

    return(
        
    <div className="subtitleExam">
    <h2>Q-: {question}</h2>
      <Box sx={{marginBottom: 1}}>
      <Button variant="contained"
      onClick={handleMenuOne}
      margin="normal"
      padding="normal"
      style={{ backgroundColor: active1 ? "black" : "blue" }}>{firstO}</Button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <Button variant="contained"
      onClick={handleMenuTwo}
      margin="normal"
      padding="normal"
      style={{ backgroundColor: active2 ? "black" : "blue" }}>{secondO}</Button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <Button variant="contained"
      onClick={handleMenuThree}
      margin="normal"
      padding="normal"
      style={{ backgroundColor: active3 ? "black" : "blue" }}>{thirdO}</Button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <Button variant="contained"
      onClick={handleMenuFour}
      margin="normal"
      padding="normal"
      style={{ backgroundColor: active4 ? "black" : "blue" }}>{fourthO}</Button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <Button variant="contained"
      onClick={handleSubmit}
      margin="normal"
      padding="normal">Submit Answer</Button>
      </Box>
      {
        submit==true ? (flag==true? <h1>Correct Answer.</h1> : <h2>Incorrect Answer.</h2>) :null
      }
      </div>
    )

}
export default Exam