const { body, check } = require('express-validator')

exports.validate = (method) => {

  switch (method) {
    case 'locations': {
      return [
        check('page').not().isEmpty().withMessage('The page field is required.'),        
      ]   
    }
    case 'add-location': {
      return [        
        check('manager').not().isEmpty().withMessage('The manager id field is required.'),     
        check('office').not().isEmpty().withMessage('The office name field is required.'),        
        check('address').not().isEmpty().withMessage('The country code field is required.'),        
        check('phone').not().isEmpty().withMessage('The mobile number field is required.'),    
        check('website').not().isEmpty().withMessage('The website field is required.'),
        check('status').not().isEmpty().withMessage('The status field is required.'),
      ]   
    }
    case 'update-location': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),
        check('manager').not().isEmpty().withMessage('The manager id field is required.'),     
        check('office').not().isEmpty().withMessage('The office name field is required.'),        
        check('address').not().isEmpty().withMessage('The country code field is required.'),        
        check('phone').not().isEmpty().withMessage('The mobile number field is required.'),    
        check('website').not().isEmpty().withMessage('The website field is required.'),
        check('status').not().isEmpty().withMessage('The status field is required.'),
      ]   
    }
    case 'delete': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
    case 'location-detail': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
  }
}