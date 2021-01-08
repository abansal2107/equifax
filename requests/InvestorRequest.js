const { body, check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {



    /*<< Mortgage Clause >>*/

    case 'add-mortgage-clause': {
      return [
        check('investorId').not().isEmpty().withMessage('The investor id field is required.'),     
        check('coverageType').not().isEmpty().withMessage('The coverage type field is required.'),     
        check('name').not().isEmpty().withMessage('The name field is required.'),     
        check('address').not().isEmpty().withMessage('The address field is required.'),     
        check('loanType').not().isEmpty().withMessage('The loant type field is required.'),     
      ]
    }

    case 'edit-mortgage-clause': {
      return [
        check('id').not().isEmpty().withMessage('The id field is required.'),     
        check('investorId').not().isEmpty().withMessage('The investor id field is required.'),     
        check('coverageType').not().isEmpty().withMessage('The coverage type field is required.'),     
        check('name').not().isEmpty().withMessage('The name field is required.'),     
        check('address').not().isEmpty().withMessage('The address field is required.'),     
        check('loanType').not().isEmpty().withMessage('The loant type field is required.'),     
      ]
    }
  }
}