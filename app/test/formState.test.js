import FormState from '../forms/FormState'
import { expect } from 'chai'

describe('Form validation', () => {
  const schema = {
    doc1: {
      presence: true
    },
    doc2: {
      presence: true
    }
  }
  const testForm = new FormState(schema)
  const testFile = { filename: 'testfile.jpg' }

  it('should produce errors if all required files are not added.', () => {
    testForm.validateValues()
    expect(Object.keys(testForm.errors).length).to.equal(2)
    testForm.reset()
    testForm.setValue('doc1', testFile)
    testForm.validateValues()
    expect(Object.keys(testForm.errors).length).to.equal(1)
  })

  it('should return an empty error object if all required files are added.', () => {
    testForm.reset()
    testForm.setValue('doc1', testFile)
    testForm.setValue('doc2', testFile)
    testForm.validateValues()
    expect(testForm.errors).to.deep.equal({})
  })
})
