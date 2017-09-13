import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormState from 'forms/FormState'
import { DOCUMENTS_FORM_SCHEMA_AUS, DOCUMENTS_FORM_SCHEMA_FOREIGN } from 'forms/schema'
import { WelcomeMessage, UploadInput } from 'components/ui'
import { uploadDocs } from 'helpers/api'

export default class DocumentsFormContainer extends Component {
  constructor(props) {
    super()
    this.state = {
      errors: {},
      error: false,
      uploadSuccess: false,
      uploadError: false
    }
  }

  componentWillMount() {
    if (!this.props.location.state) {
      this.context.router.push('/')
    }
    const schema = this.props.location.state.details.isAustralianPassport ? DOCUMENTS_FORM_SCHEMA_AUS : DOCUMENTS_FORM_SCHEMA_FOREIGN
    this.formState = new FormState(schema)
  }

  onFileInputChange = (e) => {
    this.formState.setValue(e.target.id, e.target.files[0])
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.formState.validateValues()
    const errors = this.formState.errors
    const noErrors = !Object.keys(errors).length
    if (noErrors) {
      const form = this.formState.form
      let data = new FormData()
      const userDetails = this.props.location.state.details
      data.append('details', JSON.stringify(userDetails))
      for (let doc in form) {
        data.append(doc, form[doc])
      }
      uploadDocs(data)
        .then(() => this.setState({uploadSuccess: true}))
        .catch((error) => this.setState({uploadError: true}))
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
          <p>Only .jpg, .jpeg, .pdf or .png files are allowed.</p>
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
            {this.state.uploadSuccess ? 'Successfully uploaded.' : null}
            {this.state.uploadError ? 'There was an error. Please try again.' : null}
          </form>
        </div>
      </div>
    )
  }
}

DocumentsFormContainer.contextTypes = {
  router: PropTypes.object
}

//TODO: submit button reusuable component
