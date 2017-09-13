import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormState from 'forms/FormState'
import { DETAILS_FORM_SCHEMA } from 'forms/schema'
import { Input, SelectInput } from 'components/ui'
import validate from 'validate.js'

export default class DetailsFormContainer extends Component {
  constructor() {
    super()
    this.formState = new FormState(DETAILS_FORM_SCHEMA)
    this.state = {
      error: false
    }
  }

  onInputChange = (e) => {
    this.formState.setValue(e.target.id, e.target.value)
    this.forceUpdate()
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.formState.validateValues()
    const errors = this.formState.errors
    const noErrors = !Object.keys(errors).length
    if (noErrors) {
      this.context.router.pushState({details: this.formState.form}, '/upload')
    } else {
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div>
        <p>Please fill in the details below. Upon submission you will then be directed to upload the required documents.</p>
        <form>
          <Input
            id='firstName'
            label='First Name'
            value={this.formState.form.firstName}
            onChange={this.onInputChange}
            errors={this.formState.errors.firstName} />
          <Input
            id='lastName'
            label='Last Name'
            value={this.formState.form.lastName}
            onChange={this.onInputChange}
            errors={this.formState.errors.lastName} />
          <Input
            id='dob'
            label='Date of Birth'
            value={this.formState.form.dob}
            onChange={this.onInputChange}
            errors={this.formState.errors.dob} />
          <Input
            id='address'
            label='Address'
            value={this.formState.form.address}
            onChange={this.onInputChange}
            errors={this.formState.errors.address} />
          <Input
            id='passportNumber'
            label='Passport Number'
            value={this.formState.form.passportNumber}
            onChange={this.onInputChange}
            errors={this.formState.errors.passportNumber} />
          <SelectInput
            id='isAustralianPassport'
            label='Is Your Passport Australian?'
            value={this.formState.form.isAustralianPassport}
            options={['Yes', 'No']}
            onChange={this.onInputChange}
            errors={this.formState.errors.isAustralianPassport} />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

DetailsFormContainer.contextTypes = {
  router: PropTypes.object
}
