import { useEffect, useState } from "react";
import { styled } from "styled-components?"

const Nav = () => {

  const [show, setShow] = useState("false");

  const listener = () => {
    if (window.scrollY > 50) {
      setShow("true");
    }else {
      setShow("false")
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    }
  }, [])

  return (
    <NavWrapper show={show}>
        <Logo>
            <img
            alt="logo"
            src="/images/apple-logo.png"
            onClick={()=> (window.location.href = "/")}
            />
        </Logo>
    </NavWrapper>
  )
}
const Lgo = styled.a`
padding: 0;
width: 70px;
font-size: 0;
display: inline-block;
margin-bottom: 10px;
`

const NavWrapper = styled.nav`
position: fixed;
top: 0;
lest: 0;
right: 0;
height 70px;
background-color: ${props => props.show === "true" ? "#000000": "transparent"};
display: flex;
justify-content: space-between;
align-item: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
`

export default Nav