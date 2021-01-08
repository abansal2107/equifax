const { body, check } = require('express-validator')

exports.validate = (method) => {

    switch (method) {
        case 'add': {
            return [
                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
                check('firstName').not().isEmpty().withMessage('The first name is required.'),
                check('middleName').not().isEmpty().withMessage('The middle name is required.'),
                check('lastName').not().isEmpty().withMessage('The last name is required.'),
                check('suffix').not().isEmpty().withMessage('The suffix is required.'),
                check('ssn').not().isEmpty().withMessage('The Social Security Number is required.'),
                check('dob').not().isEmpty().withMessage('The Date of birth is required.'),
                check('citizenship').not().isEmpty().withMessage('The Citizenship is required.'),
                check('maritalStatus').not().isEmpty().withMessage('The marital status is required.'),
                check('noOfDependantChilds').not().isEmpty().withMessage('The no Of dependant childs is required.'),
                check('agesDependantChilds').not().isEmpty().withMessage('The ages dependant childs is required.'),
                check('contactInfo').not().isEmpty().withMessage('The contact info is required.'),
            ]
        }
        case 'detail': {
            return [
               // check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
                check('id').not().isEmpty().withMessage('The id filed is required.'),     
            ]
        }
        case 'delete': {
            return [
                check('id').not().isEmpty().withMessage('The id filed is required.'),     
                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
            ]
        }
        case 'update': {
            return [
                check('id').not().isEmpty().withMessage('The id filed is required.'),     
                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
            ]
        }
    }
}