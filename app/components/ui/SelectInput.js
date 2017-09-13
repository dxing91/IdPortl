import React from 'react'

export default function SelectInput({id, label, value, options, onChange, errors}) {
  return (
    <div className='input'>
      <label className='input__label' for={id}>{label}</label>
      <select className='input__select' id={id} value={value} onChange={onChange}>
        <option disabled style={{display: 'none'}} />
        {options.map((option, index) => <option className='input__option' key={index}>{option}</option>)}
      </select>
      {errors ? <span className='alert--red'>{errors.join(' ')}</span> : null}
    </div>
  )
}
