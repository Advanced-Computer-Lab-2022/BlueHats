import { Link } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { getParamByParam } from 'iso-country-currency'

import axios from 'axios'

import { InputPrice } from './CourseForm'

export var countryValue = 'Egypt';
export var ViewCurrency = InputPrice;


const Navbar = () => {
    const [value, setValue] = useState({value: 'EGY', label: 'Egypt'})
    const [label, setLabel] = useState('Egypt')
    const options = useMemo(() => countryList().getData(), [])

    //var currency = getParamByParam('countryName', label, 'currency');

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
        //currency = getParamByParam('countryName', value.label, 'currency');
        // setSourceCurrency(InputPrice);
        // console.log(InputPrice)
        // setSelectToCurrency(currency);
        // selectTargetCurrency(currency);
        // convertRate();
    }
    
    // if(value) {
    //     countryValue = value.label;
        
    // }

    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [ratesList, setRatesList] = useState(null);
    const [selectFromCurrency, setFromSourceCurrency] = useState("USD");
    const [selectToCurrency, setSelectToCurrency] = useState("NZD");


    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await axios.get("https://api.exchangeratesapi.io/latest");
            setRatesList(data.data.rates);
        } catch (e) {
            console.log(e);
        }
        };
        fetchData();
    }, []);

    // const selectTargetCurrency = (targetCurr) => {
    //     setSelectToCurrency(targetCurr);
    // };

    // const convertRate = () => {
    //     if (isNaN(sourceCurrency) || !ratesList) return;

    //     setTargetCurrency(
    //     (ratesList[selectToCurrency] / ratesList[selectFromCurrency]) *
    //         sourceCurrency
    //     );

    //     ViewCurrency =  ((ratesList[selectToCurrency] / ratesList[selectFromCurrency]) *sourceCurrency);
    // };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="../logo.png" alt="logo"/>
                </Link>
                <input className="searchbar" type="text" placeholder='Search for a course, instructor, subject...'/>
                <Select className="CountrySelector" options={options} value={value} onChange={changeHandler} placeholder='Select a Country...'/>
                {/* <p>Log in</p>
                <p>Sign up</p> */}
                <a className = "Login" href = "/login">
                    login
                </a>
                <a className = "Register" href = "/signup">
                    signup
                </a>
                <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            
        </header>
    )
}

export default Navbar;