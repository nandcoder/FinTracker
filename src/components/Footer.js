import React from "react";

function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>Copyright © {currentYear} <a style={{ color: '#0e0ee9', fontWeight: '700' }} href='https://www.linkedin.com/in/nand-raj/'>FinTracker</a> </p>
            <p>Made with 💖 in India</p>
        </footer>
    );
}

export default Footer;