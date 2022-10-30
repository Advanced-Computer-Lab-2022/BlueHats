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
                <span class="material-symbols-outlined">currency_exchange</span>
            </div>
            
        </header>
    )
}

export default Navbar;