import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormState from 'forms/FormState'
import { UPLOADS_FORM_SCHEMA } from 'forms/schema'
import { WelcomeMessage, UploadInput } from 'components/ui'

export default class UploadsFormContainer extends Component {
  constructor() {
    super()
    this.formState = new FormState(UPLOADS_FORM_SCHEMA)
    this.state = {
      errors: {},
      error: false
    }
  }

  componentWillMount() {
    if (!this.props.location.state) {
      this.context.router.push('/')
    }
  }

  onFileInputChange = (e) => {
    this.formState.setValue(e.target.id, e.target.files)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.formState.validateValues()
    const errors = this.formState.errors
    const noErrors = !Object.keys(errors).length
    if (noErrors) {
      console.log(this.formState.form)
    } else {
      this.forceUpdate()
    }
  }

  render() {
    const { firstName, lastName, dob, address, passportNumber, isAustralianPassport } = this.props.location.state.details
    const { errors } = this.formState
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
          <p>Please upload the following documents to complete your ID verification. All documents are required.</p>
          <form>
            <UploadInput
              id='lease'
              label='Lease'
              onChange={this.onFileInputChange}
              errors={errors.lease}/>
            <UploadInput
              id='licence'
              label='Licence'
              onChange={this.onFileInputChange}
              errors={errors.licence} />
            <UploadInput
              id='passport'
              label='Passport'
              onChange={this.onFileInputChange}
              errors={errors.passport} />
            {isAustralianPassport
              ? null
              : <UploadInput
                  id='supportingDoc'
                  label='Utility Bill or Rate Receipt'
                  onChange={this.onFileInputChange}
                  errors={errors.supportingDoc} />}
            <button onClick={this.onSubmit}>Upload Documents</button>
          </form>
        </div>
      </div>
    )
  }
}

UploadsFormContainer.contextTypes = {
  router: PropTypes.object
}

//TODO: submit button reusuable component
