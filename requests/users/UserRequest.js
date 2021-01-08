const { body, check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        check('full_name').not().isEmpty().withMessage('The name field is required.'),
        check('country_code').not().isEmpty().withMessage('The country code field is required.'),
        check('mobile_number').not().isEmpty().withMessage('The mobile number field is required.'),        
      ]   
    }
   
    case 'get-profile': {
      return [        
        check('user_id').not().isEmpty().withMessage('The user id field is required.'),        
      ]   
    }
    case 'check-exists': {
      return [        
        check('country_code').not().isEmpty().withMessage('The country code field is required.'),
        check('mobile_number').not().isEmpty().withMessage('The mobile number field is required.'),        
      ]   
    }
    case 'login': {
      return [
        check('email').not().isEmpty().withMessage('The name field is required.'),
        check('passport').not().isEmpty().withMessage('The pass field is required.')        
      ]   
    }    
  }
}