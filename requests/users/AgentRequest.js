const { body, check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {

    case 'agents': {
      return [
        check('page').not().isEmpty().withMessage('The page field is required.'),        
      ]   
    }
    case 'add-agent': {
      return [ 
        check('firstName').not().isEmpty().withMessage('The first name field is required.'),   
        check('lastName').not().isEmpty().withMessage('The last name field is required.'),   
        check('alias').not().isEmpty().withMessage('The alias field is required.'),   
        check('address').not().isEmpty().withMessage('The address field is required.'),        
        check('phone').not().isEmpty().withMessage('The phone field is required.'),
        check('website').not().isEmpty().withMessage('The website field is required.'),        
        check('email').not().isEmpty().withMessage('The email field is required.'),   
        check('qqId').not().isEmpty().withMessage('The qqId field is required.'),   
        check('status').not().isEmpty().withMessage('The status field is required.'),   
        check('companyId').not().isEmpty().withMessage('The companyId field is required.'),   
      ]   
    }
    case 'update-agent': {
      return [ 
        check('id').not().isEmpty().withMessage('The id field is required.'),
        check('firstName').not().isEmpty().withMessage('The first name field is required.'),   
        check('lastName').not().isEmpty().withMessage('The last name field is required.'),   
        check('alias').not().isEmpty().withMessage('The alias field is required.'),   
        check('address').not().isEmpty().withMessage('The address field is required.'),        
        check('phone').not().isEmpty().withMessage('The phone field is required.'),
        check('website').not().isEmpty().withMessage('The website field is required.'),        
        check('email').not().isEmpty().withMessage('The email field is required.'),   
        check('qqId').not().isEmpty().withMessage('The qqId field is required.'),   
        check('status').not().isEmpty().withMessage('The status field is required.'),   
        check('companyId').not().isEmpty().withMessage('The companyId field is required.'),     
      ]   
    }
    case 'delete': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
    case 'agent-detail': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
  }
}