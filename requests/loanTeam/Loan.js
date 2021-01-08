const { body, check } = require('express-validator')

exports.validate = (method) => {

  switch (method) {
    
    case 'assign-sales-user': {
      return [
        check('user').not().isEmpty().withMessage('The user field is required.'),        
      ]   
    }
    case 'fullfillment-list': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number field is required.'),        
      ]   
    }
    case 'fullfillment-add': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number field is required.'),        
      ]   
    }
    case 'compliance-list': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number field is required.'),        
      ]   
    }
    case 'compliance-add': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number field is required.'),        
        check('postClosingReviewer').not().isEmpty().withMessage('The post closing reviewer field is required.'),        
        check('roleId').not().isEmpty().withMessage('The role id field is required.'),        
      ]   
    }
    
    case 'add-office-location': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number field is required.'),        
        check('location').not().isEmpty().withMessage('The location field is required.'),        
        check('roleId').not().isEmpty().withMessage('The role id field is required.'),        
      ]   
    }
    case 'office-locations': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number field is required.'),        
        check('postClosingReviewer').not().isEmpty().withMessage('The post closing reviewer field is required.'),        
        check('roleId').not().isEmpty().withMessage('The role id field is required.'),        
      ]   
    }
  }
}