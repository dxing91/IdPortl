import React from 'react'

export default function SelectInput({id, label, value, options, onChange, errors}) {
  let dobStyle
  if (id === 'dobDay' || id === 'dobMonth' || id === 'dobYear') {
    dobStyle = {
      display: 'inline-block',
      marginRight: '15px'
    }
  }
  return (
    <div className='input' style={dobStyle}>
      <label className='input__label' for={id}>{label}</label>
      <select className='input__select' id={id} value={value} onChange={onChange}>
        <option disabled style={{display: 'none'}} />
        {options.map((option, index) => <option className='input__option' key={index}>{option}</option>)}
      </select>
      {errors ? <span className='alert--red'>{errors.join(' ')}</span> : null}
    </div>
  )
}
