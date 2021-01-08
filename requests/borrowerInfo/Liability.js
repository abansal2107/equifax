const { body, check } = require('express-validator')

exports.validate = (method) => {
    switch (method) {

        case 'add': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.'),
                check('accountType').not().isEmpty().withMessage('The account type field is required.'),
                check('companyName').not().isEmpty().withMessage('The company name field is required.'),
                check('accountNumber').not().isEmpty().withMessage('The account number field is required.'),
                check('unpaidBalance').not().isEmpty().withMessage('The unpaid balance field is required.'),
                check('toBePaidOff').not().isEmpty().withMessage('The to be paid off field is required.'),
                check('monthlyPayment').not().isEmpty().withMessage('The monthly payment field is required.'),
            ]
        }

        case 'update': {
            return [
                check('borrowerLiabilityId').not().isEmpty().withMessage('The borrower liability id field is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.'),
                check('accountType').not().isEmpty().withMessage('The account type field is required.'),
                check('companyName').not().isEmpty().withMessage('The company name field is required.'),
                check('accountNumber').not().isEmpty().withMessage('The account number field is required.'),
                check('unpaidBalance').not().isEmpty().withMessage('The unpaid balance field is required.'),
                check('toBePaidOff').not().isEmpty().withMessage('The to be paid off field is required.'),
                check('monthlyPayment').not().isEmpty().withMessage('The monthly payment field is required.'),
            ]
        }

        case 'delete': {
            return [
                check('borrowerLiabilityId').not().isEmpty().withMessage('The borrower liability id field is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.')
            ]
        }

        case 'list': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.')
            ]
        }

        case 'add-other-liability': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.'),
                check('type').not().isEmpty().withMessage('The type field is required.'),
                check('monthlyPayment').not().isEmpty().withMessage('The monthlyPayment field is required.'),
            ]
        }

        case 'update-other-liability': {
            return [
                check('id').not().isEmpty().withMessage('The borrower other liabilities  id field is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.'),
                check('type').not().isEmpty().withMessage('The type field is required.'),
                check('monthlyPayment').not().isEmpty().withMessage('The monthlyPayment field is required.'),
            ]
        }

        case 'list-other-liability': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.')
            ]
        }

        case 'delete-other-liability' : {
            return [
                check('id').not().isEmpty().withMessage('The id field is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('The borrower info id field is required.')
            ]
        }
    }
}