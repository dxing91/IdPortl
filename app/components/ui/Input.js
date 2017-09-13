import React from 'react'

export default function Input({id, label, value, onChange, errors}) {
  return (
    <div>
      <span>{label}</span>
      <input id={id} value={value} onChange={onChange} type='text' />
      {errors ? <span>{errors.join(' ')}</span> : null}
    </div>
  )
}
