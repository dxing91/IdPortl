import React from 'react'

export default function UserDetails({firstName, lastName, dob, address, passportNumber, isAustralianPassport}) {
  return (
    <div className='user-details'>
      <h2 className='user-details__h2'>Welcome {firstName} {lastName}!</h2>
      <h3 className='user-details__h3'>Your Details</h3>
      <p>Date of Birth: {dob}</p>
      <p>Address: {address}</p>
      <p>{isAustralianPassport ? 'Australian' : 'Foreign'} Passport Number: {passportNumber}</p>
    </div>
  )
}
