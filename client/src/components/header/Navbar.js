import { React, useContext } from 'react';
import "../header/navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { Logincontext } from '../context/ContextProvider';


const Navbar = () => {
    const { account, setAccount } = useContext(Logincontext);

    console.log(account);




    return (
        <header>
            <nav>
                <div className='left'>
                    <div className='navlogo'>
                        <img src="./amazon_PNG25.png" alt='logo' />
                    </div>
                    <div className='nav_searchbaar'>
                        <input type="text" name="" id="" />
                        <div className='search_icon'>
                            <SearchIcon id="search" />
                        </div>
                    </div>

                </div>
                <div className='right'>
                    <div className='nav_btn'>

                        <NavLink to="/login2">signin</NavLink>
                        {/* <a href='login2'>signin</a> */}
                    </div>
                    <div className='cart_btn'>
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account ? account.carts.length : "2"} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink> : <NavLink to='/login2'>
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>
                        }


                        <p> cart</p>
                    </div>
                    <Avatar className='avtar' />
                </div>
            </nav>
        </header>
    )
}

export default Navbar