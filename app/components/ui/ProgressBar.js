import React from 'react'

export default function ProgressBar({progress}) {
  return (
    <span className='progress-bar'>
      <span className='progress-bar__progress' style={{width: `${progress}%`}} />
    </span>
  )
}
