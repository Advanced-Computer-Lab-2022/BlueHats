import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios"

export const useLogin = () =>
{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext()

    const login = async (username,password) => 
    {
        setIsLoading(true)
        setError(null)

        // const data= {username , password}
        // const response = await axios({
        //     method:"POST",
        //     url:`/api/user/login`,
        //     data:data,
        //     headers:{'Content-Type':'application/json'}
        //   })
        //   .then(() => 
        //   {
        //     console.log("done")
        //    // setLoading(false)
         
        //   })
        //   .catch(error => 
        //         {
        //         console.log(error)
        //         })
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
          })
          const json = await response.json()
      
          if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
          }
          if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
      
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
      
            // update loading state
            setIsLoading(false)
          }
        }
      
    return{login,isLoading,error}
}

// import { useState } from 'react'
// import {useIndTraineesContext} from './useIndTraineesContext'

// export const useLogin = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useIndTraineesContext()

//   const login = async (username, password) => {
//     setIsLoading(true)
//     setError(null)

//     const response = await fetch('/api/user/login', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ username, password })
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }
//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json))

//       // update the auth context
//       dispatch({type: 'LOGIN', payload: json})

//       // update loading state
//       setIsLoading(false)
//     }
//   }

//   return { login, isLoading, error }
// }