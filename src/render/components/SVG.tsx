import React from "react";

interface IProps {
    type: "switchArrow"
}

const SVG = ({type}: IProps) => {

    return <>
        {type === "switchArrow" &&
            <svg width="30" height="30" viewBox={`0 0 30 30`} fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M22.0999 13.5624L26.7499 8.91241L22.0999 4.26245" stroke="#DCD8D8" strokeWidth="1.875"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.25 8.9126H26.75" stroke="#DCD8D8" strokeWidth="1.875" strokeLinecap="round"
                      strokeLinejoin="round"/>
                <path d="M8.89996 17.4375L4.25 22.0876L8.89996 26.7376" stroke="#DCD8D8" strokeWidth="1.875"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.75 22.0874H4.25" stroke="#DCD8D8" strokeWidth="1.875" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </svg>
        }
    </>
};

export default SVG;
