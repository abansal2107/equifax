const { body, check } = require('express-validator')

exports.validate = (method) => {

    switch (method) {
        case 'add': {
            return [
                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
                check('employerName').not().isEmpty().withMessage('The employer name is required.'),
                check('phone').not().isEmpty().withMessage('The phone number is required.'),
                check('street').not().isEmpty().withMessage('The street is required.'),
                check('unit').not().isEmpty().withMessage('The unit is required.'),
                check('country').not().isEmpty().withMessage('The country is required.'),
                check('state').not().isEmpty().withMessage('The state is required.'),
                check('city').not().isEmpty().withMessage('The city is required.'),
                check('zip').not().isEmpty().withMessage('The zip is required.'),
                check('position').not().isEmpty().withMessage('The position is required.'),
                check('startDate').not().isEmpty().withMessage('The startDate is required.'),
                check('endDate').not().isEmpty().withMessage('The endDate is required.'),
                check('howLongWork').not().isEmpty().withMessage('The  Work experience is required.'),
                check('incomeType').not().isEmpty().withMessage('The  income type is required.'),
                check('q1').not().isEmpty().withMessage('you are the business owner or self-employed.'),
                check('q2').not().isEmpty().withMessage('The ownership share is required'),
                check('monthlyIncome').not().isEmpty().withMessage('The  monthly income is required.'),
                check('type').not().isEmpty().withMessage('The  type is required.'),
                check('base').not().isEmpty().withMessage('The  Base is required.'),
                check('overtime').not().isEmpty().withMessage('The  Overtime is required.'),
                check('bonus').not().isEmpty().withMessage('The  Bonus is required.'),
                check('commission').not().isEmpty().withMessage('The  Commission is required.'),
                check('militaryEntitlements').not().isEmpty().withMessage('The  MilitaryEntitlements is required.'),
                check('other').not().isEmpty().withMessage('The  other is required.'),
                check('total').not().isEmpty().withMessage('The  total is required.'),
                
            ]
        }
        case 'detail': {
            return [
                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
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
                // check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),

                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
                check('employerName').not().isEmpty().withMessage('The employer name is required.'),
                check('phone').not().isEmpty().withMessage('The phone number is required.'),
                check('street').not().isEmpty().withMessage('The street is required.'),
                check('unit').not().isEmpty().withMessage('The unit is required.'),
                check('country').not().isEmpty().withMessage('The country is required.'),
                check('state').not().isEmpty().withMessage('The state is required.'),
                check('city').not().isEmpty().withMessage('The city is required.'),
                check('zip').not().isEmpty().withMessage('The zip is required.'),
                check('position').not().isEmpty().withMessage('The position is required.'),
                check('startDate').not().isEmpty().withMessage('The startDate is required.'),
                check('endDate').not().isEmpty().withMessage('The endDate is required.'),
                check('howLongWork').not().isEmpty().withMessage('The  Work experience is required.'),
                check('incomeType').not().isEmpty().withMessage('The  income type is required.'),
                check('q1').not().isEmpty().withMessage('you are the business owner or self-employed.'),
                check('q2').not().isEmpty().withMessage('The ownership share is required'),
                check('monthlyIncome').not().isEmpty().withMessage('The  monthly income is required.'),
                check('type').not().isEmpty().withMessage('The  type is required.'),
                check('base').not().isEmpty().withMessage('The  Base is required.'),
                check('overtime').not().isEmpty().withMessage('The  Overtime is required.'),
                check('bonus').not().isEmpty().withMessage('The  Bonus is required.'),
                check('commission').not().isEmpty().withMessage('The  Commission is required.'),
                check('militaryEntitlements').not().isEmpty().withMessage('The  MilitaryEntitlements is required.'),
                check('other').not().isEmpty().withMessage('The  other is required.'),
                check('total').not().isEmpty().withMessage('The  total is required.'),
            ]
        }

        case 'list': {
            return [
                check('loanAppNo').not().isEmpty().withMessage('loan Application Number is required.'),
            ]
        }  

    }
}