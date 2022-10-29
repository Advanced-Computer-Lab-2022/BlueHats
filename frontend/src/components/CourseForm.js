import React, { useEffect, useRef } from 'react';
import { useState } from 'react'
import { useCoursesContext } from '../hooks/useCoursesContext'
import axios from 'axios'


const CourseForm = () => {
  const { dispatch } = useCoursesContext()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [subtitle, setSubtitle] = useState([{ Mysubtitle: '', MyHours: '' },])
  const [price, setPrice] = useState('')
  const [summary, setSummary] = useState('')
  const [totalhours, setTotalhours] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const course = {title, subject, subtitle, price, summary, totalhours}
    
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
      setSubtitle([])
      setPrice('')
      setSummary('')
      setTotalhours('')
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
    setSubtitle([...subtitle, { Mysubtitle: '', MyHours: 0 }])
  }

  const handleRemoveFields = (index) => {
    const values = [...subtitle];
    values.splice(index, 1);
    setSubtitle(values);
  }
  
  // const [target_currency, setTargetCurrency] = useState("EGP");
  // const [from_currency, setFromCurrency] = useState("USD");
  // const [rate, setRate] = useState(null);

  // const from_select = useRef(),
  //   to_select = useRef(),
  //   from_input = useRef(),
  //   to_input = useRef();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://api.exchangeratesapi.io/latest?base=" + from_currency
  //       );
  //       //setRatesList(data);
  //       console.log(data.rates[target_currency]);
  //       setRate(data.rates[target_currency]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const convertRate = () => {
  //   const from_cur = from_select.current.value;
  //   const to_cur = to_select.current.value;
  //   const from_amount = from_input.current.value;
  //   console.log(from_cur);
  //   axios
  //     .get("https://api.exchangeratesapi.io/latest?base=" + from_cur)
  //     .then((result) => {
  //       const rate = result.data.rates[to_cur];
  //       const converted_amount = rate * from_amount;
  //       to_input.current.value = converted_amount;
  //     });
  // };

  // const setCurRate = () => {
  //   const from_cur = from_select.current.value;
  //   const to_cur = to_select.current.value;
  //   axios
  //     .get("https://api.exchangeratesapi.io/latest?base=" + from_cur)
  //     .then((result) => {
  //       const rate = result.data.rates[to_cur];
  //       setRate(rate);
  //     });
  // };
  
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
            name="Mysubtitle"
            type="text"
            onChange={(e) => {handleChangeInput(index, e)}}
            value={subtitles.Mysubtitle}
            className={emptyFields.includes('subtitle') ? 'error' : ''} 
          />

          <label>Subtitle Number of Hours:</label>
          <input 
            name="MyHours"
            type="number" 
            step="1" 
            pattern="\d+"
            onChange={(e) => {handleChangeInput(index, e)}}
            value={subtitles.MyHours}
            className={emptyFields.includes('subtitle') ? 'error': ''}
          />
        </div>
      ))}

      <label>Add another subtitle: {<span className="material-symbols-outlined" onClick={() => handleAddFields()}>add_circle</span>} </label>
      <br/>
      
      <label>Price: [Please enter price in USD $]</label>
      <input
        // ref={from_input}
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