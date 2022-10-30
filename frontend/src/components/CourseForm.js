import { useState, /*setCounter*/ } from 'react'
import { useCoursesContext } from '../hooks/useCoursesContext'


const CourseForm = () => {
  const { dispatch } = useCoursesContext()

  const [title, setTitle] = useState('')
  const [numberOfSubtitles, setNumberOfSubtitles] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [subtitleHours, setSubtitleHours] = useState('')
  const [price, setPrice] = useState('')
  const [summary, setSummary] = useState('')
  const [totalhours, setTotalhours] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const course = {title, numberOfSubtitles, subtitle, subtitleHours, price, summary, totalhours}
    
    const response = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    else {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setNumberOfSubtitles('')
      setSubtitle('')
      setSubtitleHours('')
      setPrice('')
      setSummary('')
      setTotalhours('')
      dispatch({type: 'CREATE_COURSE', payload: json})
    }

  }

  function Subtitles() {
    // const subtitleNumber = numberOfSubtitles;
    // while(subtitleNumber > 0) {
      return (
        <>
          <label>Subtitle:</label>
          <input
            type="text"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
            className={emptyFields.includes('subtitle') ? 'error' : ''} 
          />
          <label>Subtitle Number of Hours:</label>
          <input 
            type="number" 
            onChange={(e) => setSubtitleHours(e.target.value)} 
            value={subtitleHours}
            className={emptyFields.includes('subtitleHours') ? 'error': ''}
          />
        </>
      );
    //   setCounter(subtitleNumber => subtitleNumber-1);
    // }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Course</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error': ''}
      />

      <label>Number of Subtitles:</label>
      <input 
        type="number" 
        onChange={(e) => setNumberOfSubtitles(e.target.value)} 
        value={numberOfSubtitles}
        className={emptyFields.includes('numberOfSubtitles') ? 'error': ''}
      />

      <Subtitles/>

      <label>Price:</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price} 
        className={emptyFields.includes('price') ? 'error': ''}
      />

      <label>Summary:</label>
      <input 
        type="text" 
        onChange={(e) => setSummary(e.target.value)} 
        value={summary} 
        className={emptyFields.includes('summary') ? 'error': ''}
      />

      <label>Total Hours:</label>
      <input 
        type="number" 
        onChange={(e) => setTotalhours(e.target.value)} 
        value={totalhours} 
        className={emptyFields.includes('totalhours') ? 'error': ''}
      />

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CourseForm