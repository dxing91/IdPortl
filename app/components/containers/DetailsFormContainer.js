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
      error: false,
      passportType: null
    }
  }

  onInputChange = (e) => {
    if (e.target.id === 'isAustralianPassport') {
      const isAustralianPassport = e.target.value === 'Yes'
      this.formState.setValue(e.target.id, isAustralianPassport)
      this.setState({passportType: isAustralianPassport ? 'Australian' : 'Foreign'})
    } else {
      this.formState.setValue(e.target.id, e.target.value)
      this.forceUpdate()
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.formState.validateValues()
    const errors = this.formState.errors
    const noErrors = !Object.keys(errors).length
    if (noErrors) {
      this.context.router.pushState({details: this.formState.form}, '/documents')
    } else {
      this.forceUpdate()
    }
  }

  render() {
    const { form, errors } = this.formState
    return (
      <div>
        <p>Please fill in the details below. Upon submission you will then be directed to upload the required documents.</p>
        <form>
          <Input
            id='firstName'
            label='First Name'
            value={form.firstName}
            onChange={this.onInputChange}
            errors={errors.firstName} />
          <Input
            id='lastName'
            label='Last Name'
            value={form.lastName}
            onChange={this.onInputChange}
            errors={errors.lastName} />
          <Input
            id='dob'
            label='Date of Birth'
            value={form.dob}
            onChange={this.onInputChange}
            errors={errors.dob} />
          <Input
            id='address'
            label='Address'
            value={form.address}
            onChange={this.onInputChange}
            errors={errors.address} />
          <SelectInput
            id='isAustralianPassport'
            label='Do You Have An Australian Passport?'
            value={form.isAustralianPassport === '' ? '' : form.isAustralianPassport ? 'Yes' : 'No'}
            options={['Yes', 'No']}
            onChange={this.onInputChange}
            errors={errors.isAustralianPassport} />
          {this.state.passportType
            ? <Input
                id='passportNumber'
                label={`${this.state.passportType} Passport Number`}
                value={form.passportNumber}
                onChange={this.onInputChange}
                errors={errors.passportNumber} />
            : null}
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

DetailsFormContainer.contextTypes = {
  router: PropTypes.object
}
