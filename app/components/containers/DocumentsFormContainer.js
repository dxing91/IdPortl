import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormState from 'forms/FormState'
import { DOCUMENTS_FORM_SCHEMA_AUS, DOCUMENTS_FORM_SCHEMA_FOREIGN } from 'forms/schema'
import { UserDetails, UploadInput } from 'components/ui'
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
    this.forceUpdate()
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
        .then((res) => {
          if (res.data !== 'Successfully uploaded.') throw new Error()
          this.setState({uploadSuccess: true})
        })
        .catch((error) => this.setState({uploadError: true}))
    } else {
      this.forceUpdate()
    }
  }

  _renderUserDetails() {
    const { firstName, lastName, dob, address, passportNumber, isAustralianPassport } = this.props.location.state.details
    return (
      <UserDetails
        firstName={firstName}
        lastName={lastName}
        dob={dob}
        address={address}
        passportNumber={passportNumber}
        isAustralianPassport={isAustralianPassport} />
    )
  }

  _renderForm() {
    const form = this.formState.form
    const errors = this.formState.errors
    const isAustralianPassport = this.props.location.state.details.isAustralianPassport
    return (
      <form>
        <UploadInput
          id='lease'
          label='Lease'
          value={form.lease.name}
          onChange={this.onFileInputChange}
          errors={errors.lease}/>
        <UploadInput
          id='licence'
          label='Licence'
          value={form.licence.name}
          onChange={this.onFileInputChange}
          errors={errors.licence} />
        <UploadInput
          id='passport'
          label='Passport'
          value={form.passport.name}
          onChange={this.onFileInputChange}
          errors={errors.passport} />
        {isAustralianPassport
          ? null
          : <UploadInput
              id='supportingDoc'
              label='Utility Bill or Rate Receipt'
              value={form.supportingDoc.name}
              onChange={this.onFileInputChange}
              errors={errors.supportingDoc} />}
        <button className='button' onClick={this.onSubmit}>Upload Documents</button>
        {this.state.uploadSuccess ? <span className='alert'>'Successfully uploaded.'</span> : null}
        {this.state.uploadError ? <span className='alert--red'>'There was an error. Please try again.'</span> : null}
      </form>
    )
  }

  render() {
    
    return (
      <div className='documents-form-container'>
        <div>
          {this._renderUserDetails()}
          <p className='instruction'>Please upload the following documents to complete your ID verification. All documents are required.</p>
          <p className='instruction'>Only .jpg, .jpeg, .pdf or .png files are allowed.</p>
          {this._renderForm()}
        </div>
      </div>
    )
  }
}

DocumentsFormContainer.contextTypes = {
  router: PropTypes.object
}

//TODO: submit button reusuable component
