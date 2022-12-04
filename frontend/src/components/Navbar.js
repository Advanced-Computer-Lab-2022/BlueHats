import { Link } from 'react-router-dom'
import { React, useState, useMemo, useEffect } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

export var countryValue = 'Egypt';

const Navbar = () => {
    const [value, setValue] = useState({value: 'EGY', label: 'Egypt'})
    const [label, setLabel] = useState('Egypt')
    const options = useMemo(() => countryList().getData(), [])

    useEffect(() => {
        const data =JSON.parse(window.localStorage.getItem('countryChosen') ?? "[]");
        if(data !== null) { 
            setValue(data);
            setLabel(data.label);
        }
    }, [])

    const changeHandler = value => {
        window.localStorage.setItem('countryChosen', JSON.stringify(value));
        setValue(value);
        setLabel(value.label);
    }
    
    if(value) {
        countryValue = value.label;
    }

    const [title,setTitle] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
         window.location.href=`/search?key=${title}`
        }
      };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="../logo.png" alt="logo"/>
                </Link>
                <div className='inputWithButton'>
                <input className="searchbar" type="text" value={title} onChange={(e) => setTitle(e.target.value)}  onKeyDown={handleKeyDown} placeholder='Search for a course, instructor, subject...' />
                <button  onClick={() => window.location.href=`/search?key=${title}`}><span className="material-symbols-outlined"> search </span></button>
                </div>
                <Select className="CountrySelector" options={options} value={value} onChange={changeHandler} placeholder='Select a Country...'/>
                <a className = "Login" href = "/login">
                    Log in
                </a>
                <a className = "Register" href = "/signup">
                    Sign up
                </a>
                <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            
        </header>
    )
}

export default Navbar;