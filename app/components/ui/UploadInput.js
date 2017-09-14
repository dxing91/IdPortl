import React from 'react'
import { ACCEPTED_FILE_EXTENSIONS } from 'config/constants'

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
            accept={ACCEPTED_FILE_EXTENSIONS.join(', ')}
            onChange={onChange} />
        </label>
      </div>
      {value ? <span className='alert'>{value}</span> : null}
      {errors ? <span className='alert--red'>{errors.join(' ')}</span> : null}
    </div>
  )
}
