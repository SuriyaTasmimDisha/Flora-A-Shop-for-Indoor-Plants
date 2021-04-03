import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return ( 
        <>
          <div className="footer-info">
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
            <div className="fabicons">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-pinterest"></i>
            </div>
            <div className="copyright">
                <p>
                  All rights reserved &copy; 2021, Suriya Tasmim Disha
                </p>
            </div>   
        </>
    )
}
