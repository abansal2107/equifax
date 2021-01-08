const { body, check } = require('express-validator')

exports.validate = (method) => {

  switch (method) {
    
    case 'seller-team': {
      return [
        check('seller_id').not().isEmpty().withMessage('The seller id field is required.'),        
      ]   
    }
    case 'seller-agents-list': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),     
      ]   
    }
    case 'list' : {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number is required.'),     
      ] 
    }
    case 'add': {
      return [
        check('loanAppNo').not().isEmpty().withMessage('The loan application number filed is required.'),     
        check('roleId').not().isEmpty().withMessage('The role id is required.'),     
        check('name').not().isEmpty().withMessage('The name filed is required.'),     
        check('email').not().isEmpty().withMessage('The email filed is required.'),     
        check('phone').not().isEmpty().withMessage('The phone filed is required.'),     
        check('location').not().isEmpty().withMessage('The location is required.'),     
      ] 
    }
    case 'update': {
      return [

        check('id').not().isEmpty().withMessage('The id is required.'),     
        check('loanAppNo').not().isEmpty().withMessage('The loan application number filed is required.'),     
        check('roleId').not().isEmpty().withMessage('The role id is required.'),     
        check('name').not().isEmpty().withMessage('The name filed is required.'),     
        check('email').not().isEmpty().withMessage('The email filed is required.'),     
        check('phone').not().isEmpty().withMessage('The phone filed is required.'),     
        check('location').not().isEmpty().withMessage('The location is required.'),     
      ] 
    }
    case 'delete': {
      return [
        check('id').not().isEmpty().withMessage('The id filed is required.'),           
      ]  
    }
  }
}