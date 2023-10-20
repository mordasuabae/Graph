import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    return (    
    <>
    <nav>
        <div style={{display:'flex',border:'1px solid black',alignItems:'center',justifyContent:'space-between'}}>
            <h1 style={{margin:'0 50px'}}>To Do List App</h1>
            <ul style={{display:'flex',justifyContent:'space-evenly',width:'20%'}}>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='reports'>
                    <li>Reports</li>
                </Link>
            </ul>
        </div>
    </nav>
    <Outlet/>
    </>
    )
}
export {Navbar}