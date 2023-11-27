import styled from "styled-components"
export const Cuerpo = styled.div`
text-align: center;
background-color: black;
height: 100%;
width: 100%;
`;

export const TheButton = styled.button`
    background-color: black;
    color: white;
    width: 300px;
    height: 50px;
    left: 0; 
    right: 0; 
    border: 3px solid white;
    margin-top: 30px;
    margin-left: auto; 
    margin-right: auto; 
    position: absolute;
    z-index: 1;
    transition: background-color 0.3s ease;
    font-size: 16px;
    font-family: verdana;
    font-weight: bold;

    &:hover {
        background-color: white;
        color: black;
        border: 0px;
        cursor: pointer;
    }
`