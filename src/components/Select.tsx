import React, {ChangeEvent} from 'react';

type SelectPropsType = {
    value: Array<string>
    onChange: (value: string)=>void
}

const Select = ({value, onChange}:SelectPropsType) => {

    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }

    return (
        <select onChange={onChangeSelectHandler}>
                    {value.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
    )
}

export default Select
