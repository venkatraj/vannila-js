class Validator {
  constructor(form, config) {
    this.form = form
    this.config = config
    this.isError = false
    this.checkValidation()
  }

  checkValidation() {
    for (let fieldName in this.config) {
      this.isError = false
      for (let condition in this.config[fieldName]) {
        let functionName = `check${
          condition.substring(0, 1).toUpperCase() + condition.substring(1)
        }`
        const field = this.form[fieldName]
        if (!this.isError) {
          this[functionName](field)
        }
      }
    }
  }

  checkRequired(field) {
    if (field.value === '') {
      this.showError(field, 'is required')
    } else {
      this.showSuccess(field)
    }
  }

  checkEmail(field) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(field.value.toLowerCase())) {
      this.showSuccess(field)
    } else {
      this.showError(field, 'is invalid ')
    }
  }

  checkLength(field) {
    const value = field.value
    const fieldName = this.getFieldName(field)
    const minLength = this.config[fieldName].length.min
    const maxLength = this.config[fieldName].length.max
    if (value.length < minLength) {
      this.showError(field, `must be at least ${minLength} characters`)
    } else if (value.length > maxLength) {
      this.showError(field, `must be less than ${maxLength} characters`)
    } else {
      this.showSuccess(field)
    }
  }

  checkPattern(field) {
    const fieldName = this.getFieldName(field)
    let pattern = this.config[fieldName].pattern
    pattern = pattern.substring(0, 1).toUpperCase() + pattern.substring(1)
    const functionName = `check${pattern}`
    this[functionName](field)
  }

  checkMatch(field) {
    const fieldName = this.getFieldName(field)
    let matchField = this.config[fieldName].match
    if (field.value === form[matchField].value) {
      this.showSuccess(field)
    } else {
      this.showError(field, `must match ${matchField}`)
    }
  }

  showSuccess(field) {
    const parent = field.parentElement
    parent.classList.remove('error')
    parent.classList.add('success')
    this.isError = false
  }

  showError(field, message) {
    const parent = field.parentElement
    const fieldName = this.firstCharUpperCase(this.getFieldName(field))
    parent.classList.remove('success')
    parent.classList.add('error')
    field.nextElementSibling.innerHTML = `${fieldName} ${message}`
    this.isError = true
  }

  getFieldName(field) {
    return field.id
  }

  firstCharUpperCase(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1)
  }
}

export default Validator
