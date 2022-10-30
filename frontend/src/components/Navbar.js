import { Link } from 'react-router-dom'

/*<div>
<a href= "/instructor">View Instructors</a>
</div>*/
const Navbar = () => {

    return (
        <header>
            <div className="container">
            <div>
            <Link to="/">
                <img src="../logo.png" alt="logo"/>
            </Link>
            </div>
            
            <div>
            <ul id="menu">
                <li class="parent"><a href="/Courses">Available Course</a>
                </li>
            </ul>
            <ul id='button'>
            <li class="parent"><a href="/instructor"> View Instructors</a></li>
            </ul>
            </div>
                <span class="material-symbols-outlined">currency_exchange</span>
            </div>
            
        </header>
    )
}

export default Navbar;