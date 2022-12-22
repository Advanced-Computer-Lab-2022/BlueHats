import {useState} from "react"
import axios from "axios"
import {useAuthContext} from './useAuthContext'

export const useSignup = () =>
{
    const[error,setError]=useState(null)
    const[isLoading,setLoading]=useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (firstName,lastName,username,email,password,confirmPassword,gender) => 
    {
        setLoading(true)
        setError(null)

    const data= {firstName ,lastName , username , email, password, confirmPassword,gender}
    const response = await axios({
      method:"POST",
      url:`/api/user/signup`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() => 
    {
      setLoading(false)
      alert("Check your email to activate your account");
    })
    .catch(error => 
          {
          setError(!null)
          console.log(error)
          })

   const json=await response.json()

   if(!response.ok)
    {
      setError(json.error)
    }
     if(response.ok)
    {
        localStorage.setItem('indTrainee',JSON.stringify(json))
        dispatch({type: 'CREATE_INDTRAINEE' ,payload: json})
        setLoading(false)
    }
  }
        // const response = await fetch ('/api/indTrainee/signup' , {
        //     method:'POST',
        //     headers:{'Content-Type': 'application/json'},
        //     body:JSON.stringify({email,password})
        // })
        // const json=await response.json()

        // if(!response.ok)
        // {
        //     setIsLoading(false)
        //     setError(json.error)
        // }

        // if(response.ok)
        // {
        //     localStorage.setItem('indTrainee',JSON.stringify(json))
        //     dispatch({type: 'LOGIN' ,payload: json})
        //     setIsLoading(false)
        // }

    return{signup,isLoading,error}
}