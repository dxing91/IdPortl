import React from 'react'

export default function SelectInput({id, label, value, options, onChange, errors}) {
  return (
    <div>
      <span>{label}</span>
      <select id={id} value={value} onChange={onChange}>
        <option disabled style={{display: 'none'}} />
        {options.map((option, index) => <option key={index}>{option}</option>)}
      </select>
      {errors ? <span>{errors.join(' ')}</span> : null}
    </div>
  )
}
