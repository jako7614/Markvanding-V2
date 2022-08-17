import React, { useState } from "react"
import { useRouter } from 'next/router'
import cookie from "cookie-cutter"

const Header = () => {
    const [title, setTitle] = useState()

    const router = useRouter(); 

    function slide(){
      const burger = document.querySelector(".burger");
      const nav = document.querySelector(".nav-links");
      const navLinks = document.querySelectorAll(".nav-links li");
  
      //Toggle Nav
      nav.classList.toggle("nav-active");
      
      //Animate Links
      navLinks.forEach(function(link, index){
        link.classList.toggle("nav-active-li");
        if(link.style.animation){
          link.style.animation = "";
        }
        else{
          link.style.animation = `0.5s ease forwards ${index / 7 + 0.5}s`
        }
      });

  
      //Animate Burger
      burger.classList.toggle("toggle");
    }

    const HandleNavClick = function(event, stage, text) {
      event.preventDefault();
      setTitle(event.target.innerHTML)
      router.push(stage)

  
      if (window.innerWidth <= 1280) slide();
    }



    return (   
      <>
        <header>
          <nav id="nav">
            <div className="logo">
              <h1>Markvanding</h1>
            </div>
            <ul className="nav-links">
                <li onClick={(e) => HandleNavClick(e, "../overview")}>OVERSIGT</li>
                <li onClick={(e) => HandleNavClick(e, "../startmachine")}>START VANDING</li>
                <li onClick={(e) => HandleNavClick(e, "../maintenance")}>VEDLIGEHOLDELSE</li>
                <li onClick={(e) => HandleNavClick(e, "../machinepark")}>MASKINPARK</li>
                <li style={{color: "red"}} onClick={() => {
                  cookie.set("loggedin", false)
                  router.push("/")
                }}>LOG UD</li>
            </ul>
            <div className="burger" onClick={slide}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </nav>
        </header>
      </>      

    )
}

export default Header;