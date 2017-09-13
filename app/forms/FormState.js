import validate from 'validate.js'

export default class FormState {
  constructor(validationSchema) {
    this.validationSchema = validationSchema
    this.form = {}
    this.errors = {}
    const schemaKeys = Object.keys(validationSchema)
    schemaKeys.map((label) => this.form[label] = '')
  }

  reset() {
    for (let label in this.form) {
      this.form[label] = ''
    }
    this.errors = {}
  }

  setValue = (label, value) => {
    this.form[label] = value
  }

  resetValue = (label) => {
    this.form[label] = ''
  }

  validateValues = () => {
    this.errors = validate(this.form, this.validationSchema) || {}
  }
}
