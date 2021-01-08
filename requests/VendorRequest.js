const { body, check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {

    case 'vendors': {
      return [
        check('page').not().isEmpty().withMessage('The page field is required.'),        
      ]   
    }
    case 'add-vendor': {
      return [        
        check('company').not().isEmpty().withMessage('The company field is required.'),        
        check('contact').not().isEmpty().withMessage('The contact field is required.'),        
        check('email').not().isEmpty().withMessage('The email field is required.'),        
        check('phone').not().isEmpty().withMessage('The phone field is required.'),        
        check('vendor_type').not().isEmpty().withMessage('The vendor_type field is required.'),        
        check('last_contacted').not().isEmpty().withMessage('The last_contacted field is required.'),     
      ]   
    }
    case 'update-vendor': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),
        check('company').not().isEmpty().withMessage('The company field is required.'),        
        check('contact').not().isEmpty().withMessage('The contact field is required.'),        
        check('email').not().isEmpty().withMessage('The email field is required.'),        
        check('phone').not().isEmpty().withMessage('The phone field is required.'),        
        check('vendor_type').not().isEmpty().withMessage('The vendor_type field is required.'),        
        check('last_contacted').not().isEmpty().withMessage('The last_contacted field is required.'),                   
      ]   
    }
    case 'delete': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
    case 'vendor-detail': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
  }
}