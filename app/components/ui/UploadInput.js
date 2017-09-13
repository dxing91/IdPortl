import React from 'react'

export default function UploadInput({id, label, onChange, errors}) {
  return (
    <div>
      <span>{label}</span>
      <input id={id} type='file' onChange={onChange} />
      {errors ? <span>{errors.join(' ')}</span> : null}
    </div>
  )
}
