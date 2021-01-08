const { body, check } = require('express-validator')

exports.validate = (method) => {

  switch (method) {
    
    case 'list': {
    	return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),
    	]   
    }
    case 'add': {
  		return [
  			check('agentId').not().isEmpty().withMessage('The agent Id field is required.'),
  			check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),
  		]   
    }
    case 'update': {
  		return [
        check('id').not().isEmpty().withMessage('The id field is required.'),     
  			check('agentId').not().isEmpty().withMessage('The agent Id field is required.'),
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