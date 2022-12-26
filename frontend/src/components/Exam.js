import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React, {useState} from 'react';
import 'react-dropdown/style.css';


const Exam = ({question, firstO, secondO, thirdO, fourthO, answer}) =>{

  const [ans,setAns] = useState('');

  const [flag,setFlag] = useState(false)
 // const [ansr,setAnsr] = useState(false)
  const [submit,setSubmit] = useState(false)
  const [a1,setA1] = useState(false)
  const [a2,setA2] = useState(false)
  const [a3,setA3] = useState(false)
  const [a4,setA4] = useState(false)
  const [t1,setT1] = useState(false)
  const [t2,setT2] = useState(false)
  const [t3,setT3] = useState(false)
  const [t4,setT4] = useState(false)


  const handleMenuOne = () => {
    setAns(firstO);
    setFlag(false);
    setSubmit(false);
    setA1(true);
    setA2(false);
    setA3(false);
    setA4(false);
  };

  const handleMenuTwo = () => {
    setAns(secondO);
    setFlag(false);    
    setSubmit(false);
    setA2(true);
    setA1(false);
    setA3(false);
    setA4(false);
  };
  const handleMenuThree = () => {
    setAns(thirdO);
    setFlag(false);
    setSubmit(false);
    setA3(true);
    setA1(false);
    setA2(false);
    setA4(false);
    
  };
  const handleMenuFour = () => {
    setAns(fourthO);
    setFlag(false);
    setSubmit(false);
    setA4(true);
    setA1(false);
    setA2(false);
    setA3(false);
  };
  const handleSubmit = async() => {  
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
         setAns('');
         if(flag==false){
          if(answer==firstO)
            {
              setT1(true)
            }
          else if (answer==secondO)
            {
              setT2(true)
            }
          else if (answer==thirdO)
            {
              setT3(true)
            }
          else 
            {
              setT4(true)
            }
         }
        
  }

    return(
        
    <div className="exam">
    <h2>Q-: {question}</h2>
      <Box sx={{marginBottom: 1}}>
      <button variant="contained"
      onClick={handleMenuOne}
      style={{ backgroundColor: submit?  (t1? "green" : (a1? (flag? "green" : "red") : "#a256e0"))  : (a1 ? "black"  : "#a256e0") }}
      >{firstO}</button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <button variant="contained"
      onClick={handleMenuTwo}
      style={{ backgroundColor: submit?  (t2? "green" : (a2? (flag? "green" : "red") : "#a256e0"))  : (a2 ? "black"  : "#a256e0") }}
      >{secondO}</button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <button variant="contained"
      onClick={handleMenuThree}
      style={{ backgroundColor: submit?  (t3? "green" : (a3? (flag? "green" : "red") : "#a256e0") ) : (a3 ? "black"  : "#a256e0") }}
      >{thirdO}</button>
      </Box>

      <Box sx={{marginBottom: 1}}>
      <button variant="contained"
      onClick={handleMenuFour}
      style={{ backgroundColor: submit? (t4? "green" : (a4? (flag? "green" : "red") : "#a256e0")) : (a4 ? "black"  : "#a256e0") }}
      >{fourthO}</button>
      </Box>
      
      <div className='submit'>
      <Box sx={{marginBottom: 1}}>
      <button variant="contained"
      onClick={handleSubmit}
      margin="normal"
      padding="normal">Submit Answer</button>
      </Box>
      </div>
      {
       submit==true? (flag==true? <h1>Correct Answer.</h1> : <h2>Incorrect Answer.</h2>): null
      }
      </div>
    )

}
export default Exam