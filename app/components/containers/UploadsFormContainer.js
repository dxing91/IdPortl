import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WelcomeMessage } from 'components/ui'

export default class UploadsFormContainer extends Component {
  constructor() {
    super()
    this.form = {
      errors: {},
      error: false
    }
  }

  componentWillMount() {
    if (!this.props.location.state) {
      this.context.router.push('/')
    }
  }

  render() {
    const { firstName, lastName, dob, address, passportNumber, isAustralianPassport } = this.props.location.state.details
    return (
      <div>
        <WelcomeMessage
          firstName={firstName}
          lastName={lastName}
          dob={dob}
          address={address}
          passportNumber={passportNumber}
          isAustralianPassport={isAustralianPassport} />
        <div>
          <p>Please upload the following documents to complete your ID verification.</p>
        </div>
      </div>
    )
  }
}

UploadsFormContainer.contextTypes = {
  router: PropTypes.object
}
