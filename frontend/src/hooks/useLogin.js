import {useState} from "react"
import {useIndTraineesContext} from './useIndTraineesContext'
import {Navigate} from 'react-router-dom'

export const useLogin = () =>
{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch} = useIndTraineesContext()

    const login = async (email,password) => 
    {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/indTrainee/login' , {
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
            Navigate('/')
        }

    }
    return{login,isLoading,error}
}
