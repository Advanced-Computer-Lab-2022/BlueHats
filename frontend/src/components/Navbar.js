import { Link } from 'react-router-dom'
import { React, useState, useMemo, useEffect } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';  

export var countryValue = 'Egypt';

const Navbar = () => {
    const [value, setValue] = useState({value: 'EGY', label: 'Egypt'})
    const [label, setLabel] = useState('Egypt')
    const options = useMemo(() => countryList().getData(), [])

    const [title,setTitle] = useState(''); 
    

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

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="../logo.png" alt="logo"/>
                </Link>
                {//<input className="searchbar" type="text" placeholder='Search for a course, instructor, subject...'/>
}
              <form>
              <label>Search</label><input
               type="text"
               required
               value={title}
               onChange={(e) => setTitle(e.target.value)} />
               </form>

               <Box sx={{marginBottom: 2}}>
               <Button variant="contained"
               onClick={() => window.location.href=`/search?key=${title}`}
               margin="normal"
               padding="normal"
               >Load Courses</Button>
               {/* margin */}
               </Box>

                <Select className="CountrySelector" options={options} value={value} onChange={changeHandler} placeholder='Select a Country...'/>
                <p>Log in</p>
                <p>Sign up</p>
                <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            
        </header>
    )
}

export default Navbar;