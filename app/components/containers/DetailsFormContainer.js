import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormState from 'forms/FormState'
import { DETAILS_FORM_SCHEMA } from 'forms/schema'
import { Input, SelectInput } from 'components/ui'
import validate from 'validate.js'
import { days, months, years } from 'helpers/constants'

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

  _renderInstruction() {
    return (
      <p className='instruction'>Please fill in the details below. Upon submission you will then be directed to upload the required documents.</p>
    )
  }

  _renderForm() {
    const { form, errors } = this.formState
    return (
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
        <div>
          <span className='input__label'>Date of Birth</span>
          <SelectInput
            id='dobDay'
            value={form.dobDay}
            options={days}
            onChange={this.onInputChange}
            errors={errors.dobDay} />
          <SelectInput
            id='dobMonth'
            value={form.dobMonth}
            options={months}
            onChange={this.onInputChange}
            errors={errors.dobMonth} />
          <SelectInput
            id='dobYear'
            value={form.dobYear}
            options={years}
            onChange={this.onInputChange}
            errors={errors.dobYear} />
        </div>
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
        <button className='button' onClick={this.onSubmit}>Submit</button>
      </form>
    )
  }

  render() {
    return (
      <div className='details-form-container'>
        {this._renderInstruction()}
        {this._renderForm()}
      </div>
    )
  }
}

DetailsFormContainer.contextTypes = {
  router: PropTypes.object
}
