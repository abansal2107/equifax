const { body, check } = require('express-validator')

exports.validate = (method) => {

  switch (method) {
    
    case 'cooperating-mlo': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),
      ]   
    }
    case 'add': {
  		return [
  			check('userId').not().isEmpty().withMessage('The user Id field is required.'),
  			check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),
  		]   
    }
    case 'update': {
  		return [
        check('id').not().isEmpty().withMessage('The id field is required.'),     
  			check('userId').not().isEmpty().withMessage('The user Id field is required.'),
  			check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),
  		]   
    }
    case 'delete': {
      return [  
        check('id').not().isEmpty().withMessage('The id field is required.'),     
      ]   
    }
  }
}