// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import React, {useState} from 'react';
// import 'react-dropdown/style.css';


// const Exam = ({q1,q2,q3,q4,f11,f12,f13,f14,f21,f22,f23,f24,f31,f32,f33,f34,f41,f42,f43,f44,a1,a2,a3,a4}) =>{

//   const [submit,setSubmit] = useState(false)

//   const [flag1,setFlag1] = useState(false)
//   const [flag2,setFlag2] = useState(false)
//   const [flag3,setFlag3] = useState(false)
//   const [flag4,setFlag4] = useState(false)

  
//   const [a11,setA11] = useState(false)
//   const [a12,setA12] = useState(false)
//   const [a13,setA13] = useState(false)
//   const [a14,setA14] = useState(false)
//   const [t11,setT11] = useState(false)
//   const [t12,setT12] = useState(false)
//   const [t13,setT13] = useState(false)
//   const [t14,setT14] = useState(false)
//   const [a21,setA21] = useState(false)
//   const [a22,setA22] = useState(false)
//   const [a23,setA23] = useState(false)
//   const [a24,setA24] = useState(false)
//   const [t21,setT21] = useState(false)
//   const [t22,setT22] = useState(false)
//   const [t23,setT23] = useState(false)
//   const [t24,setT24] = useState(false)
//   const [a31,setA31] = useState(false)
//   const [a32,setA32] = useState(false)
//   const [a33,setA33] = useState(false)
//   const [a34,setA34] = useState(false)
//   const [t31,setT31] = useState(false)
//   const [t32,setT32] = useState(false)
//   const [t33,setT33] = useState(false)
//   const [t34,setT34] = useState(false)
//   const [a41,setA41] = useState(false)
//   const [a42,setA42] = useState(false)
//   const [a43,setA43] = useState(false)
//   const [a44,setA44] = useState(false)
//   const [t41,setT41] = useState(false)
//   const [t42,setT42] = useState(false)
//   const [t43,setT43] = useState(false)
//   const [t44,setT44] = useState(false)



//   const handleMenuOne1= () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/1/1`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a1}/${f11}`
//     }).then(
//         (res) => { 
//           const flag1 = res.data
//           console.log(flag1)
//           setFlag1(flag1) 
//          });
//     setSubmit(false);
//     setA11(true);
//     setA12(false);
//     setA13(false);
//     setA14(false);
//   };

//   const handleMenuTwo1 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/1/2`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a1}/${f12}`
//     }).then(
//         (res) => { 
//           const flag1 = res.data
//           console.log(flag1)
//           setFlag1(flag1) 
//          });    
//     setSubmit(false);
//     setA12(true);
//     setA11(false);
//     setA13(false);
//     setA14(false);
//   };
//   const handleMenuThree1 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/1/3`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a1}/${f13}`
//     }).then(
//         (res) => { 
//           const flag1 = res.data
//           console.log(flag1)
//           setFlag1(flag1) 
//          });
//     setSubmit(false);
//     setA13(true);
//     setA11(false);
//     setA12(false);
//     setA14(false);
    
//   };
//   const handleMenuFour1  = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/1/4`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a1}/${f14}`
//     }).then(
//         (res) => { 
//            const flag1 = res.data
//            console.log(flag1)
//            setFlag1(flag1)       
//          });
//     setSubmit(false);
//     setA14(true);
//     setA11(false);
//     setA12(false);
//     setA13(false);
//   };

//   const handleMenuOne2 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/2/1`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a2}/${f21}`
//     }).then(
//         (res) => { 
//           const flag2 = res.data
//            console.log(flag2)
//            setFlag2(flag2)  
//          });
//     setSubmit(false);
//     setA21(true);
//     setA22(false);
//     setA23(false);
//     setA24(false);
//   };

//   const handleMenuTwo2 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/2/2`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a2}/${f22}`
//     }).then(
//         (res) => { 
//           const flag2 = res.data
//            console.log(flag2)
//            setFlag2(flag2)  
//          });   
//     setSubmit(false);
//     setA22(true);
//     setA21(false);
//     setA23(false);
//     setA24(false);
//   };
//   const handleMenuThree2 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/2/3`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a2}/${f23}`
//     }).then(
//         (res) => { 
//           const flag2 = res.data
//           console.log(flag2)
//           setFlag2(flag2)  
//          });
//     setSubmit(false);
//     setA23(true);
//     setA21(false);
//     setA22(false);
//     setA24(false);
    
//   };
//   const handleMenuFour2 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/2/4`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a2}/${f24}`
//     }).then(
//         (res) => { 
//            const flag2 = res.data
//            console.log(flag2)
//            setFlag2(flag2)        
//          });
//     setSubmit(false);
//     setA24(true);
//     setA21(false);
//     setA22(false);
//     setA23(false);
//   };
//   const handleMenuOne3 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/3/1`
//     }) 
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a3}/${f31}`
//     }).then(
//         (res) => { 
//           const flag3 = res.data
//           console.log(flag3)
//           setFlag3(flag3)
//          });
//     setSubmit(false);
//     setA31(true);
//     setA32(false);
//     setA33(false);
//     setA34(false);
//   };

//   const handleMenuTwo3 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/3/2`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a3}/${f32}`
//     }).then(
//         (res) => { 
//           const flag3 = res.data
//           console.log(flag3)
//           setFlag3(flag3)
//          });  
//     setSubmit(false);
//     setA32(true);
//     setA31(false);
//     setA33(false);
//     setA34(false);
//   };
//   const handleMenuThree3 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/3/3`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a3}/${f33}`
//     }).then(
//         (res) => { 
//           const flag3 = res.data
//           console.log(flag3)
//           setFlag3(flag3)      
//          });
//     setSubmit(false);
//     setA33(true);
//     setA31(false);
//     setA32(false);
//     setA34(false);
    
//   };
//   const handleMenuFour3 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/3/4`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a3}/${f34}`
//     }).then(
//         (res) => { 
//           const flag3 = res.data
//           console.log(flag3)
//           setFlag3(flag3)  
     
//          });
//     setSubmit(false);
//     setA34(true);
//     setA31(false);
//     setA32(false);
//     setA33(false);
//   };

//   const handleMenuOne4 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/4/1`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a4}/${f41}`
//     }).then(
//         (res) => { 
//           const flag4 = res.data
//           console.log(flag4)
//           setFlag4(flag4)       
//          });
//     setSubmit(false);
//     setA41(true);
//     setA42(false);
//     setA43(false);
//     setA44(false);
//   };

//   const handleMenuTwo4 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/4/2`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a4}/${f42}`
//     }).then(
//         (res) => { 
//           const flag4 = res.data
//           console.log(flag4)
//           setFlag4(flag4)  
//          });  
//     setSubmit(false);
//     setA42(true);
//     setA41(false);
//     setA43(false);
//     setA44(false);
//   };
//   const handleMenuThree4 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/4/3`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a4}/${f43}`
//     }).then(
//         (res) => { 
//            const flag4 = res.data
//            console.log(flag4)
//            setFlag4(flag4)  
      
//          });
//     setSubmit(false);
//     setA43(true);
//     setA41(false);
//     setA42(false);
//     setA44(false);
    
//   };
//   const handleMenuFour4 = () => {
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/setAnswer/${idTrainee}/4/4`
//     })
//     axios({
//       method: "PUT",
//       url : `/api/corporateTrainee/compareAnswers/${a4}/${f44}`
//     }).then(
//         (res) => { 
//           const flag4 = res.data
//           console.log(flag4)
//           setFlag4(flag4)        
//          });
//     setSubmit(false);
//     setA44(true);
//     setA41(false);
//     setA42(false);
//     setA43(false);
//   };
//   //pass the content of the button

//   //compare answers and store the value in the array of answers and each value for the same id replaces the old one and have a function that checks if the grade is less than 50% or not
//   const handleSubmit = async() => {  
//     setSubmit(true);
//     setAns('');
//     if(flag1==false){
//     if(a1==f11)
//       {
//         setT11(true)
//       }
//     else if (a1==f12)
//       {
//         setT12(true)
//       }
//     else if (a1==f13)
//       {
//         setT13(true)
//       }
//     else 
//       {
//         setT14(true)
//       }
//     }
//     if(flag2==false){
//       if(a2==f21)
//         {
//           setT21(true)
//         }
//       else if (a2==f22)
//         {
//           setT22(true)
//         }
//       else if (a2==f23)
//         {
//           setT23(true)
//         }
//       else 
//         {
//           setT24(true)
//         }
//       }
//       if(flag3==false){
//         if(a3==f31)
//           {
//             setT31(true)
//           }
//         else if (a3==f32)
//           {
//             setT32(true)
//           }
//         else if (a3==f33)
//           {
//             setT33(true)
//           }
//         else 
//           {
//             setT34(true)
//           }
//         }
//         if(flag4==false){
//           if(a4==f41)
//             {
//               setT41(true)
//             }
//           else if (a4==f42)
//             {
//               setT42(true)
//             }
//           else if (a4==f43)
//             {
//               setT43(true)
//             }
//           else 
//             {
//               setT44(true)
//             }
//           }
//   }

//     return(
        
//     <div className="exam">
//     <h2>First Question: {q1}</h2>
//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuOne1}
//       style={{ backgroundColor: submit?  (t11? "green" : (a11? (flag1? "green" : "red") : "#a256e0"))  : (a11 ? "black"  : "#a256e0") }}
//       >{f11}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuTwo1}
//       style={{ backgroundColor: submit?  (t12? "green" : (a12? (flag1? "green" : "red") : "#a256e0"))  : (a12 ? "black"  : "#a256e0") }}
//       >{f12}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuThree1}
//       style={{ backgroundColor: submit?  (t13? "green" : (a13? (flag1? "green" : "red") : "#a256e0") ) : (a13 ? "black"  : "#a256e0") }}
//       >{f13}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuFour1}
//       style={{ backgroundColor: submit? (t14? "green" : (a14? (flag1? "green" : "red") : "#a256e0")) : (a14 ? "black"  : "#a256e0") }}
//       >{f14}</button>
//       </Box>
    
// {
// //----------------------------------------------------------------------------------------------------------------------
// }
//       <h2>Second Question: {q2}</h2>
//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuOne2}
//       style={{ backgroundColor: submit?  (t21? "green" : (a21? (flag2? "green" : "red") : "#a256e0"))  : (a21 ? "black"  : "#a256e0") }}
//       >{f21}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuTwo2}
//       style={{ backgroundColor: submit?  (t22? "green" : (a22? (flag2? "green" : "red") : "#a256e0"))  : (a22 ? "black"  : "#a256e0") }}
//       >{f22}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuThree2}
//       style={{ backgroundColor: submit?  (t23? "green" : (a23? (flag2? "green" : "red") : "#a256e0") ) : (a23 ? "black"  : "#a256e0") }}
//       >{f23}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuFour2}
//       style={{ backgroundColor: submit? (t24? "green" : (a24? (flag2? "green" : "red") : "#a256e0")) : (a24 ? "black"  : "#a256e0") }}
//       >{f24}</button>
//       </Box>
     
//       {
//       //---------------------------------------------------------------------------------------------------------------
//       }

// <h2>Third Question: {q3}</h2>
//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuOne3}
//       style={{ backgroundColor: submit?  (t31? "green" : (a31? (flag3? "green" : "red") : "#a256e0"))  : (a31 ? "black"  : "#a256e0") }}
//       >{f31}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuTwo3}
//       style={{ backgroundColor: submit?  (t32? "green" : (a32? (flag3? "green" : "red") : "#a256e0"))  : (a32 ? "black"  : "#a256e0") }}
//       >{f32}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuThree3}
//       style={{ backgroundColor: submit?  (t33? "green" : (a33? (flag3? "green" : "red") : "#a256e0") ) : (a33 ? "black"  : "#a256e0") }}
//       >{f33}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuFour3}
//       style={{ backgroundColor: submit? (t34? "green" : (a34? (flag3? "green" : "red") : "#a256e0")) : (a34 ? "black"  : "#a256e0") }}
//       >{f34}</button>
//       </Box>
     
//       {
//       //---------------------------------------------------------------------------------------------------------------
//       }

// <h2>Fourth Question: {q4}</h2>
//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuOne4}
//       style={{ backgroundColor: submit?  (t41? "green" : (a41? (flag4? "green" : "red") : "#a256e0"))  : (a41 ? "black"  : "#a256e0") }}
//       >{f41}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuTwo4}
//       style={{ backgroundColor: submit?  (t42? "green" : (a42? (flag4? "green" : "red") : "#a256e0"))  : (a42 ? "black"  : "#a256e0") }}
//       >{f42}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuThree4}
//       style={{ backgroundColor: submit?  (t43? "green" : (a43? (flag4? "green" : "red") : "#a256e0") ) : (a43 ? "black"  : "#a256e0") }}
//       >{f43}</button>
//       </Box>

//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleMenuFour4}
//       style={{ backgroundColor: submit? (t44? "green" : (a44? (flag4? "green" : "red") : "#a256e0")) : (a44 ? "black"  : "#a256e0") }}
//       >{f44}</button>
//       </Box>
     
//       {
//       //---------------------------------------------------------------------------------------------------------------
//       }

//       <div className='submit'>
//       <Box sx={{marginBottom: 1}}>
//       <button variant="contained"
//       onClick={handleSubmit}
//       margin="normal"
//       padding="normal">Submit Answer</button>
//       </Box>
//       </div>
//       {
//        submit==true? (flag==true? <h1>Correct Answer.</h1> : <h2>Incorrect Answer.</h2>): null
//       }
//       </div>
//     )

// }
// export default Exam