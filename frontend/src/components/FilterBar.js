import { useCoursesContext } from '../hooks/useCoursesContext'
import { useEffect, useState /*setCounter*/ } from 'react'



const FilterBar = ({ course }) => {
    const { dispatch } = useCoursesContext();
    const [subject, setSubject] = useState('')
  
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/sortBy/subject')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'FILTER_SUBJECT', payload: json})
      }
    }
    fetchCourses()
  }, [dispatch])

    const handleSubject = async (e) => {
        e.preventDefault()
        const course = {subject}
        const response = await fetch('/sortBy/' + course.subject, {
          method: 'GET',
          body: JSON.stringify(course),
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
   
        const response = await fetch('/sortBy/' + course.price, {
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
    <div className='row'>
      <div className= 'col-md-3 border - right'>
        <div className = 'text-muted mb-2' >
            Subject <i className="fa-solid fa-sliders"></i>
        </div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light border-top p-3'>
						<form className='form-inline my-2 my-lg-0' onSubmit={handleSubject} >
            <input
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            />
							<button
								className='btn btn-outline-success my-2 my-sm-0'
								type='submit'
								disabled={true}
                onClick={handleSubject}>
							Search </button>
						</form>
            <br></br>
            <div className="dropdown">
                <button onClick="myFunction()" className="dropbtn">Price</button>
                <div id="myDropdown" className="dropdown-content">
                  <a href="/instructor" onClick={handlePrice}>100$</a>
                  <a href="/instructor">200$</a>
                  <a href="/instructor">Free</a>
                </div>
            </div>
					</nav>  
      </div>
    </div>
  
  )
}

  
  export default FilterBar;