import React from 'react';


const Button = ({value, onClick}:ButtonPropsType) => {

    const onClickButtonHandler = () => {
        onClick(value)
    }

    return (
        <button onClick={onClickButtonHandler}>{value}</button>
    )
}
export default Button


// types
type ButtonPropsType = {
    value: string
    onClick: (value: string)=>void
}