const { body, check } = require('express-validator')

exports.validate = (method) => {

  switch (method) {
    case 'buyers-agents-list': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),     
      ]   
    }
    case 'add': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number filed is required.'),     
        check('roleId').not().isEmpty().withMessage('The role id is required.'),     
        check('name').not().isEmpty().withMessage('The name filed is required.'),     
        check('location').not().isEmpty().withMessage('The location is required.'),     
      ] 
    }
    case 'list': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),     
      ]  
    }
    case 'update': {
      return [
        check('id').not().isEmpty().withMessage('The id filed is required.'),     
      ]  
    }
     case 'delete': {
      return [
        check('id').not().isEmpty().withMessage('The id filed is required.'),           
      ]  
    }
  }
}