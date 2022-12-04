import {useState} from "react"
import {useIndTraineesContext} from './useIndTraineesContext'

export const useSignup = () =>
{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch} = useIndTraineesContext()

    const signup = async (email,password) => 
    {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/indTrainee/signup' , {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email,password})
        })
        const json=await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok)
        {
            localStorage.setItem('indTrainee',JSON.stringify(json))
            dispatch({type: 'LOGIN' ,payload: json})
            setIsLoading(false)
        }

    }
    return{signup,isLoading,error}
}
