const validate = (formEl) => {
  if (formEl.checkValidity() === false) {
    for (let i = 0; i < formEl.length; i++) {
      const elem = formEl[i]
      // const errorLabel = elem.parentNode.parentNode.querySelectorAll('.invalid-feedback')[i]
      const errorLabel = formEl.querySelectorAll('.invalid-feedback')[i]
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        if (!elem.validity.valid) {
          elem.classList.add('form-invalid')
          errorLabel.innerHTML = 'Ups! Por favor, completa este campo.'
        } else {
          elem.classList.remove('form-invalid')
          errorLabel.textContent = ''
        }
      }
    }
    return false
  } else {
    for (let i = 0; i < formEl.length; i++) {
      const elem = formEl[i]
      const errorLabel = elem.parentNode.querySelectorAll('.invalid-feedback')[i]
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        elem.classList.remove('form-invalid')
        errorLabel.textContent = ''
      }
    }
    return true
  }
  // return false
}

export {validate}
