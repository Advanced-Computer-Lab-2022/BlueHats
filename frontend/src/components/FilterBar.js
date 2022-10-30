import { useCoursesContext } from '../hooks/useCoursesContext'
// import { useEffect, /*setCounter*/ } from 'react'



const FilterBar = ({ course }) => {
    const { dispatch } = useCoursesContext();
      
//   useEffect(() => {
//     const fetchCourses = async () => {
//       const response = await fetch('/sortBy')
//       const json = await response.json()

//       if (response.ok) {
//         dispatch({type: 'SET_COURSES', payload: json})
//       }
//     }
//     fetchCourses()
//   }, [dispatch])

    const handleSubject = async (e) => {
        e.preventDefault()
            
        const response = await fetch('/sortBy' + course.subject, {
          method: 'GET',
          body: JSON.stringify(course.subject),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {          
        }
        else {
    
          dispatch({type: 'FILTER_SUBJECT', payload: json})
        }
      }
      const handlePrice = async (e) => {
        e.preventDefault()
   
        const response = await fetch('/sortBy' + course.price, {
          method: 'GET',
          body: JSON.stringify(course.price),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {          
        }
        else {
    
          dispatch({type: 'FILTER_PRICE', payload: json})
        }
      }

  return (
    <div>
        <div className="dropdown">
         <button onClick= "myFunction()" className="dropbtn">Subject</button>
            <div id="myDropdown" className="dropdown-content">
                <button href="CS" onClick={handleSubject}>CS</button>
                <button href="English" onClick={handleSubject}>English</button>
                <button href="Business" onClick={handleSubject}>Business</button>
            </div>
        </div> 
        <div className="dropdown">
            <button onClick= {handlePrice}  className="dropbtn">Price</button>
                <div id="myDropdown" className="dropdown-content">
                <button href="Price1" onClick={handlePrice}>50</button>
                <button href="Price2" onClick={handlePrice}>90</button>
                <button href="Price3" onClick={handlePrice}>70 </button>
            </div>
      </div>
    </div>
   
  )
}

  
  export default FilterBar;