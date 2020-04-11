class Validator {
  constructor(form, config) {
    this.form = form;
    this.config = config;
    this.checkValidation();
  }

  checkValidation() {
    for (let field in this.config) {
      for (let condition in config[field]) {
        console.log(condition);
        let functionName = `check${
          condition.substring(0, 1).toUpperCase() + condition.substring(1)
        }`;
        console.log(this);
        this[functionName].call(this, field);
      }
    }
  }

  checkRequired(field) {
    if (field.value === "") {
      this.showError(field, `${this.getFieldName(field)} is required`);
    } else {
      this.showSuccess(field);
    }
  }

  checkEmail(field) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(field.value.toLowerCase())) {
      showSuccess(field);
    } else {
      showError(field, "Invalid Email");
    }
  }

  checkLength(field) {
    const fieldName = this.getFieldName(field);
    const value = field.value;
    console.log(this.config[fieldName]);
    // const minLength = this.config[fieldName].length.min;
    // const maxLength = this.config[fieldName].length.max;
    // if (value.length < minLength) {
    //   showError(field, `${fieldName} must be atleast ${minLength} characters`);
    // } else if (value.length > maxLength) {
    //   showError(
    //     field,
    //     `${fieldName} must be less than ${maxLength} characters`
    //   );
    // } else {
    //   showSuccess(field);
    // }
  }

  showSuccess(field) {
    const parent = form[field].parentElement;
    parent.classList.remove("error");
    parent.classList.add("success");
  }

  showError(field, message) {
    const parent = field.parentElement;
    parent.classList.remove("success");
    parent.classList.add("error");
    field.nextElementSibling.innerHTML = message;
  }

  getFieldName(field) {
    return field.id;
  }
}

const form = document.getElementById("form");
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
    pattern: "email",
  },
  password: {
    required: true,
    length: {
      min: 6,
      max: 25,
    },
  },
  password2: {
    match: "password",
  },
};

new Validator(form, config);
