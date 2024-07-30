import './navBar.css';
import {Link} from 'react-router-dom'
const NavBar=()=>{

    return(
       <div className="navbar-container">
        <div className="logo">StockTradingPlatform</div>
        <div className="menu-items">
            <div className="item"><Link to='/home'>Home</Link></div>
            <div className="item"><Link to='/stocks'>Stocks</Link></div>
            <div className="item"><Link to='/crypto'>Crypto</Link></div>
            <div className="item"><Link to='/login'>Login</Link></div>
            <div className="item"><Link to='/register'>Register</Link></div>
        </div>
       </div>
    );
}

export default NavBar;