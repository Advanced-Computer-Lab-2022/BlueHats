import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react'
import { useCoursesContext } from '../hooks/useCoursesContext'


const CourseForm = () => {
  const { dispatch } = useCoursesContext()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [previewLink, setPreviewLink] = useState('')
  const [subtitle, setSubtitle] = useState([{ name: '', hours: '', link: '', linkDescription: '', question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }])
  const [price, setPrice] = useState('')
  const [promotion, setPromotion] = useState('')
  const [promotionDuration, setPromotionDuration] = useState('')
  const [summary, setSummary] = useState('')
  const [finalExam, setFinalExam] = useState([{ question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }])
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const course = {title, subject, previewLink, subtitle, price, promotion, promotionDuration, summary, finalExam}
    
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
      setSubtitle([{ name: '', hours: '', link: '', linkDescription: '', question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }])
      setPrice('')
      setPromotion('')
      setPromotionDuration('')
      setSummary('')
      setSubject('')
      setPreviewLink('')
      setFinalExam([{ question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }])
      dispatch({type: 'CREATE_COURSE', payload: json})
    }

  }

  const handleChangeInput = (index, event) => {
    const values = [...subtitle];
    values[index][event.target.name] = event.target.value;
    setSubtitle(values);
    console.log(subtitle)
  }

  const handleAddFields = () => {
    setSubtitle([...subtitle,{ name: '', hours: '', link: '', linkDescription: '', question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }])
  }

  const handleRemoveFields = (index) => {
    const values = [...subtitle];
    values.splice(index, 1);
    setSubtitle(values);
  }

  const handleChangeInput2 = (index, event) => {
    const values = [...finalExam];
    values[index][event.target.name] = event.target.value;
    setFinalExam(values);
  }

  const handleAddFields2 = () => {
    setFinalExam([...finalExam, { question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }])
  }

  const handleRemoveFields2 = (index) => {
    const values = [...finalExam];
    values.splice(index, 1);
    setFinalExam(values);
  }
  //checkbox
  const [state, setState] = useState({
    option1: true,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleChange1 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
      option2 :  false,
      option3 :  false,
      option4 :  false,
    });
  };

  const handleChange2 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
      option1 : false,
      option3 : false,
      option4 : false,
    });
  };

  const handleChange3 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
      option1 :  false,
      option2 : false,
      option4 :  false,
    });
  };

  const handleChange4 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
      option1 : false,
      option2 :  false,
      option3 :  false,
    });
  };

  const { option1, option2, option3, option4 } = state;
  const error1 = [ option1, option2, option3, option4].filter((v) => v).length !== 1;

  return (
   
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Course</h3>

        <label>Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''} />

        <label>Subject:</label>
        <input
          type="text"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          className={emptyFields.includes('subject') ? 'error' : ''} />

        <label>Course Preview Youtube Link:</label>
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=EXAMPLE"
          onChange={(e) => setPreviewLink(e.target.value)}
          value={previewLink}
          className={emptyFields.includes('previewLink') ? 'error' : ''} />

        {subtitle.map((subtitles, index) => (
          <div key={index}>
            <label>Subtitle:
              {subtitle.length > 1 && (<span className="material-symbols-outlined first" onClick={() => handleRemoveFields(index)}>delete</span>)}
            </label>
            <input
              name="name"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              value={subtitles.name}
              className={emptyFields.includes('subtitle.name') ? 'error' : ''} />

            <label>Subtitle Number of Hours:</label>
            <input
              name="hours"
              type="number"
              step="1"
              pattern="\d+"
              onChange={(e) => { handleChangeInput(index, e); } }
              value={subtitles.hours}
              className={emptyFields.includes('subtitle.hours') ? 'error' : ''} />

            <label>Subtitle Youtube Link:</label>
            <input
              name="link"
              type="url"
              placeholder="https://www.youtube.com/watch?v=EXAMPLE"
              onChange={(e) => { handleChangeInput(index, e); } }
              value={subtitles.link}
              className={emptyFields.includes('subtitle.link') ? 'error' : ''} />

            <label>Short description of the Youtube link provided above:</label>
            <input
              name="linkDescription"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              value={subtitles.linkDescription}
              className={emptyFields.includes('subtitle.linkDescription') ? 'error' : ''} />

            <label><strong>Create a quiz for this subtitle:</strong></label> <br />

            <label>Question:</label>
            <input
              name="question"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              defaultValue={subtitles.question}
              className={emptyFields.includes('subtitle.quiz.question') ? 'error' : ''} />

            <label>Option 1:</label>
            <input
              name="firstChoice"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              defaultValue={subtitles.firstChoice}
              className={emptyFields.includes('subtitle.quiz.firstChoice') ? 'error' : ''} />

            <label>Option 2:</label>
            <input
              name="secondChoice"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              defaultValue={subtitles.secondChoice}
              className={emptyFields.includes('subtitle.quiz.secondChoice') ? 'error' : ''} />

            <label>Option 3:</label>
            <input
              name="thirdChoice"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              defaultValue={subtitles.thirdChoice}
              className={emptyFields.includes('subtitle.quiz.thirdChoice') ? 'error' : ''} />

            <label>Option 4:</label>
            <input
              name="fourthChoice"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              defaultValue={subtitles.fourthChoice}
              className={emptyFields.includes('subtitle.quiz.fourthChoice') ? 'error' : ''} />

            <label>Correct Answer:</label>
            <input
              name="answer"
              type="text"
              onChange={(e) => { handleChangeInput(index, e); } }
              defaultValue={subtitles.answer}
              className={emptyFields.includes('subtitle.quiz.answer') ? 'error' : ''} />

          </div>
        ))}

        <label>Add another subtitle: {<span className="material-symbols-outlined" onClick={() => handleAddFields()}>add_circle</span>} </label>
        <br />

        <label>Price:</label>
        <input
          type="number"
          placeholder="Please enter price in USD $"
          prefix={'$'}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className={emptyFields.includes('price') ? 'error' : ''} />

        <label>Promotion% : [Optional]</label>
        <input
          type="number" 
          prefix={'%'}
          onChange={(e) => setPromotion(e.target.value)} 
          value={promotion} 
          className={emptyFields.includes('promotion') ? 'error': ''}
        />
        
        <label>Promotion is valid until: [Optional]</label>
        <input
          type="date" 
          onChange={(e) => setPromotionDuration(e.target.value)} 
          value={promotionDuration} 
          className={emptyFields.includes('promotionDuration') ? 'error': ''}
        />
        
        <label>Summary:</label>
        <input
          type="text"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          className={emptyFields.includes('summary') ? 'error' : ''} />

        <label><strong>Create Course Final Exam:</strong></label> <br />
        {finalExam.map((exercises, index) => (
          <div key={index}>
            <label>Question:
              {finalExam.length > 1 && (<span className="material-symbols-outlined first" onClick={() => handleRemoveFields2(index)}>delete</span>)}
            </label>
            <input
              name="question"
              type="text"
              onChange={(e) => { handleChangeInput2(index, e); } }
              value={exercises.question}
              className={emptyFields.includes('finalExam.question') ? 'error' : ''} />
            {/* <label><i>Enter the options then click on the checkbox to select the correct answer:</i></label> <br />
            <>
                <Box className="box" sx={{ display: 'flex'}}>
                  <FormControl
                    required
                    error={error1}
                    component="fieldset"
                    sx={{ m: 3 , margin: 0}}
                    variant="standard"
                  >
                  { error1 && <FormLabel component="legend">Pick one</FormLabel>}
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={option1} onChange={(e) => { handleChangeInput2(index, e); handleChange1() }} name="option1"  value={exercises.answer}/>}
                        label="Option 1" />
                          <input
                            name="firstChoice"
                            type="text"
                            onChange={(e) => { handleChangeInput2(index, e); } }
                            value={exercises.firstChoice}
                            className={emptyFields.includes('finalExam.firstChoice') ? 'error' : ''} />
                      <FormControlLabel
                        control={<Checkbox checked={option2} onChange={handleChange2} name="option2" />}
                        label="Option 2" />
                         <input
                          name="secondChoice"
                          type="text"
                          onChange={(e) => { handleChangeInput2(index, e); } }
                          value={exercises.secondChoice}
                          className={emptyFields.includes('finalExam.secondChoice') ? 'error' : ''} />
                      <FormControlLabel
                        control={<Checkbox checked={option3} onChange={handleChange3} name="option3" />}
                        label="Option 3" />
                          <input
                          name="thirdChoice"
                          type="text"
                          onChange={(e) => { handleChangeInput2(index, e); } }
                          value={exercises.thirdChoice}
                          className={emptyFields.includes('finalExam.thirdChoice') ? 'error' : ''} />
                      <FormControlLabel
                        control={<Checkbox checked={option4} onChange={handleChange4} name="option4" />}
                        label="Option 4" />
                         <input
                          name="fourthChoice"
                          type="text"
                          onChange={(e) => { handleChangeInput2(index, e); } }
                          value={exercises.fourthChoice}
                          className={emptyFields.includes('finalExam.fourthChoice') ? 'error' : ''} />
                    </FormGroup>
                  </FormControl>
                </Box>
            </> */}
              
            <label>Option 1:</label>
            <input
              name="firstChoice"
              type="text"
              onChange={(e) => { handleChangeInput2(index, e); } }
              value={exercises.firstChoice}
              className={emptyFields.includes('finalExam.firstChoice') ? 'error' : ''} />

            <label>Option 2:</label>
            <input
              name="secondChoice"
              type="text"
              onChange={(e) => { handleChangeInput2(index, e); } }
              value={exercises.secondChoice}
              className={emptyFields.includes('finalExam.secondChoice') ? 'error' : ''} />

            <label>Option 3:</label>
            <input
              name="thirdChoice"
              type="text"
              onChange={(e) => { handleChangeInput2(index, e); } }
              value={exercises.thirdChoice}
              className={emptyFields.includes('finalExam.thirdChoice') ? 'error' : ''} />

            <label>Option 4:</label>
            <input
              name="fourthChoice"
              type="text"
              onChange={(e) => { handleChangeInput2(index, e); } }
              value={exercises.fourthChoice}
              className={emptyFields.includes('finalExam.fourthChoice') ? 'error' : ''} />

            <label>Correct Answer:</label>
            <input
              name="answer"
              type="text"
              onChange={(e) => { handleChangeInput2(index, e); } }
              value={exercises.answer}
              className={emptyFields.includes('finalExam.answer') ? 'error' : ''} />
          </div>
        ))}

        <label>Add another question: {<span className="material-symbols-outlined" onClick={() => handleAddFields2()}>add_circle</span>} </label>
        <br />

        <button>Add Course</button>
        {error && <div className="error">{error}</div>}
      </form>
  )
}

export default CourseForm