import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="../logo.png" alt="logo"/>
                </Link>
                <span class="material-symbols-outlined">currency_exchange</span>
            </div>
        </header>
    )
}

export default Navbar;