import { useState } from 'react'
import { useCoursesContext } from '../hooks/useCoursesContext'


export var InputPrice = 0;


const CourseForm = () => {
  const { dispatch } = useCoursesContext()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [subtitle, setSubtitle] = useState([{ name: '', hours: '' },])
  const [price, setPrice] = useState('')
  const [summary, setSummary] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const course = {title, subject, subtitle, price, summary}

    // (InputPrice = price)
    
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
      setSubtitle([{ name: '', hours: '' },])
      setPrice('')
      setSummary('')
      setSubject('')
      dispatch({type: 'CREATE_COURSE', payload: json})
    }

  }

  const handleChangeInput = (index, event) => {
    const values = [...subtitle];
    values[index][event.target.name] = event.target.value;
    setSubtitle(values);
  }

  const handleAddFields = () => {
    setSubtitle([...subtitle, { name: '', hours: 0 }])
  }

  const handleRemoveFields = (index) => {
    const values = [...subtitle];
    values.splice(index, 1);
    setSubtitle(values);
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

      <label>Subject:</label>
      <input 
        type="text" 
        onChange={(e) => setSubject(e.target.value)} 
        value={subject}
        className={emptyFields.includes('subject') ? 'error': ''}
      />

      {subtitle.map((subtitles, index) => (
        <div key={index}>
          <label>Subtitle: 
            { subtitle.length>1 && (<span className="material-symbols-outlined first" onClick={() => handleRemoveFields(index)}>delete</span>)}
          </label>
          <input
            name="name"
            type="text"
            onChange={(e) => {handleChangeInput(index, e)}}
            value={subtitles.name}
            className={emptyFields.includes('subtitle.name') ? 'error' : ''} 
          />

          <label>Subtitle Number of Hours:</label>
          <input 
            name="hours"
            type="number" 
            step="1" 
            pattern="\d+"
            onChange={(e) => {handleChangeInput(index, e)}}
            value={subtitles.hours}
            className={emptyFields.includes('subtitle.hours') ? 'error': ''}
          />
        </div>
      ))}

      <label>Add another subtitle: {<span className="material-symbols-outlined" onClick={() => handleAddFields()}>add_circle</span>} </label>
      <br/>
      
      <label>Price: [Please enter price in USD $]</label>
      <input
        type="number" 
        prefix={'$'}
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

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CourseForm