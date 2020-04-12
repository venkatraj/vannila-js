import Validator from './validator.js'

const form = document.getElementById('form')
const config = {
  username: {
    required: true,
    length: {
      min: 3,
      max: 15,
    },
  },
  email: {
    required: true,
    pattern: 'email',
  },
  password: {
    required: true,
    length: {
      min: 6,
      max: 25,
    },
  },
  password2: {
    required: true,
    match: 'password',
  },
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const validator = new Validator(form, config)
  if (!validator.isError) {
    console.log('Sending form data to server')
  }
})
