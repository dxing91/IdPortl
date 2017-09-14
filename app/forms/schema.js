import validate from 'validate.js'

validate.validators.presence.message = 'is required.'

export const DETAILS_FORM_SCHEMA = {
  firstName: {
    presence: true,
    format: {
      pattern: '[A-z|-]+',
      message: 'must be a valid name.'
    }
  },
  lastName: {
    presence: true,
    format: {
      pattern: '[A-z|-]+',
      message: 'must be a valid name.'
    }
  },
  dobDay: {
    presence: true
  },
  dobMonth: {
    presence: true
  },
  dobYear: {
    presence: true
  },
  address: {
    presence: true
  },
  passportNumber: {
    presence: true
  },
  isAustralianPassport: {
    presence: true
  }
}

export const DOCUMENTS_FORM_SCHEMA_AUS = {
  lease: {
    presence: true
  },
  licence: {
    presence: true
  },
  passport: {
    presence: true
  }
}

export const DOCUMENTS_FORM_SCHEMA_FOREIGN = {
  ...DOCUMENTS_FORM_SCHEMA_AUS,
  supportingDoc: {
    presence: true
  }
}
