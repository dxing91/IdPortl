import React from 'react'

export default function UploadInput({id, label, value, onChange, errors}) {
  return (
    <div className='input'>
      <div className='input__label'>{label}</div>
      <div className='input__label--button'>
        <label className='input__label--label-tag' for={id}>
          Add
          <input
            id={id}
            className='input__value--upload-button'
            type='file'
            accept='.png, .jpg, .jpeg, .pdf, .mkv'
            onChange={onChange} />
        </label>
      </div>
      {value ? <span className='alert'>{value}</span> : null}
      {errors ? <span className='alert--red'>{errors.join(' ')}</span> : null}
    </div>
  )
}

//TODO: remove mkv file type after testing
