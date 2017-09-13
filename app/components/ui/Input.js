import React from 'react'

export default function Input({id, label, value, onChange, errors}) {
  return (
    <div className='input'>
      <label className='input__label' for={id}>{label}</label>
      <input id={id} className='input__value' value={value} onChange={onChange} type='text' />
      {errors ? <span className='alert--red'>{errors.join(' ')}</span> : null}
    </div>
  )
}
