import React from 'react'
import logo from '../logo.svg'
const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" width="100" height="50" class="d-inline-block align-text-top" />
                        Bootstrap
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Header