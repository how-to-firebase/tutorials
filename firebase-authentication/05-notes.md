### Phone Auth

* `signInWithPhoneNumber('+1 1234567890', new
  window.firebase.auth.RecaptchaVerifier('recaptcha-id-from-element', {size: 'invisible', callback:
  () => {}}))`
* `window.firebase.auth().signInWithPhoneNumber(phoneNumber,
  recaptchaVerifier).then(confirmationResult => { myConfirmFunction = code =>
  confirmationResult.confirm(code) })`
