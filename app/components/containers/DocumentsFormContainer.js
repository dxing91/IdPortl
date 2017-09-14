import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as uploadActions from 'store/upload'
import FormState from 'forms/FormState'
import { DOCUMENTS_FORM_SCHEMA_AUS, DOCUMENTS_FORM_SCHEMA_FOREIGN } from 'forms/schema'
import { UserDetails, UploadInput, ProgressBar } from 'components/ui'
import { uploadDocs } from 'helpers/api'
import { ACCEPTED_FILE_EXTENSIONS } from 'config/constants'

class DocumentsFormContainer extends Component {
  constructor(props) {
    super()
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
      const fileData = this.formState.form
      const userDetails = this.props.location.state.details
      this.props.isUploading()
      uploadDocs(fileData, userDetails)
        .then((res) => {
          if (!res) throw new Error()
          this.props.uploadSuccess()
        })
        .catch((error) => {
          this.props.uploadError()
        })
    } else {
      this.forceUpdate()
    }
  }

  _renderUserDetails() {
    const { firstName, lastName, dobDay, dobMonth, dobYear,
      address, passportNumber, isAustralianPassport } = this.props.location.state.details
    return (
      <UserDetails
        firstName={firstName}
        lastName={lastName}
        dobDay={dobDay}
        dobMonth={dobMonth}
        dobYear={dobYear}
        address={address}
        passportNumber={passportNumber}
        isAustralianPassport={isAustralianPassport} />
    )
  }

  _renderInstruction() {
    return (
      <div>
        <p className='instruction'>Please upload the following documents to complete your ID verification. All documents are required.</p>
        <p className='instruction'>Accepted file types: {ACCEPTED_FILE_EXTENSIONS.join(', ')}</p>
      </div>
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
      </form>
    )
  }

  _renderUploadStatus() {
    const upload = this.props.upload
    return (
      <div className='documents-form-container__status'>
        {upload.isUploading ? <ProgressBar progress={upload.progressBar} /> : null}
        {upload.uploadSuccess ? <span className='alert'>'Successfully uploaded.'</span> : null}
        {upload.uploadError ? <span className='alert--red'>{upload.uploadError}</span> : null}
      </div>
    )
  }

  render() {
    return (
      <div className='documents-form-container'>
        <div>
          {this._renderUserDetails()}
          {this._renderInstruction()}
          {this._renderForm()}
          {this._renderUploadStatus()}
        </div>
      </div>
    )
  }
}

DocumentsFormContainer.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({upload}) {
  return {
    upload
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(uploadActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsFormContainer)
