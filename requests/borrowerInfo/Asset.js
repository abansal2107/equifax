const { body, check } = require('express-validator')

exports.validate = (method) => {

    switch (method) {
        case 'add': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
                check('accountType').not().isEmpty().withMessage('account type is required.'),
                check('financialInstitution').not().isEmpty().withMessage('financial institution field is required.'),
                check('accountNumber').not().isEmpty().withMessage('account number is required.'),
                check('cashOrMarketValue').not().isEmpty().withMessage('cash or market value is required.'),
            ]
        }
        case 'update': {
            return [
                check('id').not().isEmpty().withMessage('id field is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
                check('accountType').not().isEmpty().withMessage('account type is required.'),
                check('financialInstitution').not().isEmpty().withMessage('financial institution field is required.'),
                check('accountNumber').not().isEmpty().withMessage('account number is required.'),
                check('cashOrMarketValue').not().isEmpty().withMessage('cash or market value is required.'),
            ]
        }
        case 'list': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
            ]
        }
        case 'delete': {
            return [
                check('id').not().isEmpty().withMessage('borrower info id is required.'),
            ]
        }
// Other Asset
        case 'addOtherAsset': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
                check('assetsOrCreditType').not().isEmpty().withMessage('assets or credit type is required.'),
                check('cashOrMarketValue').not().isEmpty().withMessage('cash or market value is required.'),
            ]
        }
        case 'updateOtherAsset': {
            return [
                check('id').not().isEmpty().withMessage('id is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
                check('assetsOrCreditType').not().isEmpty().withMessage('assets or credit type is required.'),
                check('cashOrMarketValue').not().isEmpty().withMessage('cash or market value is required.'),
            ]
        }
        case 'listOtherAsset': {
            return [            
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
            ]
        }
        case 'deleteOtherAsset': {
            return [
                check('id').not().isEmpty().withMessage('id is required.'),
            ]
        } 
//Gift and Grants
        case  'addGiftandGrants': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
                check('assetType').not().isEmpty().withMessage('Asset type field is required.'),
                check('isDeposited').not().isEmpty().withMessage('Deposited field is required.'),
                check('source').not().isEmpty().withMessage('source field is required.'),
                check('cashOrMarketValue').not().isEmpty().withMessage('cash Or Market Value is required.'),
            ]
        }  
        case 'updateGiftandGrants': {
            return [
                check('id').not().isEmpty().withMessage('id is required.'),
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
                check('assetType').not().isEmpty().withMessage('Asset type field is required.'),
                check('isDeposited').not().isEmpty().withMessage('Deposited field is required.'),
                check('source').not().isEmpty().withMessage('source field is required.'),
                check('cashOrMarketValue').not().isEmpty().withMessage('cash Or Market Value is required.'),
            ]
        }  
        case 'listGiftandGrants': {
            return [
                check('borrowerInfoId').not().isEmpty().withMessage('borrower info id is required.'),
            ]
        }  
        case 'deleteGiftandGrants': {
            return [
                check('id').not().isEmpty().withMessage('id is required.'),
            ]
        }  
    }
}