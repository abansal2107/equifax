'use strict'

const passport = require('passport');

module.exports = function (app) {

    const joi = require('../schema/middleware');
    //Controllers
    let PropertyInfoController = require('../controllers/propertyAndLoan/PropertyInfo');
    let PropertyLoanController = require('../controllers/propertyAndLoan/PropertyLoan');
    let PropertyMortgageLoanController = require('../controllers/propertyAndLoan/PropertyMortgageLoan');
    let LoanQuestionCategoryController = require('../controllers/propertyAndLoan/LoanQuestionCategory');
    let PropertyAndLoanQuestionController = require('../controllers/propertyAndLoan/PropertyAndLoanQuestion');
    let PropertyAndLoanAnswerController = require('../controllers/propertyAndLoan/PropertyAndLoanAnswer');
    let LoanHousingPaymentController = require('../controllers/propertyAndLoan/LoanHousingPayment');
    let LoanTransactionDetailController = require('../controllers/propertyAndLoan/LoanTransactionDetail');
    //Schemas
    const propertyInfoSchema = require('../schema/propertyAndLoan/propertyInfo');
    const propertyLoanSchema = require('../schema/propertyAndLoan/propertyLoan');
    const propertyMortgageLoanSchema = require('../schema/propertyAndLoan/propertyMortgageLoan');
    const loanQuestionCategorySchema = require('../schema/propertyAndLoan/loanQuestionCategory');
    const propertyAndLoanQuestionSchema = require('../schema/propertyAndLoan/propertyAndLoanQuestion');
    const propertyAndLoanAnswerSchema = require('../schema/propertyAndLoan/propertyAndLoanAnswer');
    const loanHousingPaymentSchema = require('../schema/propertyAndLoan/loanHousingPayment');
    const loanTransactionDetailSchema = require('../schema/propertyAndLoan/loanTransactionDetail');

    app.route('/property-info')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(propertyInfoSchema.addPropertyInfo),
            PropertyInfoController.add)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(propertyInfoSchema.updatePropertyInfo),
            PropertyInfoController.update)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(propertyInfoSchema.getListPropertyInfo),
            PropertyInfoController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(propertyInfoSchema.deletePropertyInfo),
            PropertyInfoController.delete);

    app.route('/property-loan')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(propertyLoanSchema.addPropertyLoan),
            PropertyLoanController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(propertyLoanSchema.updatePropertyLoan),
            PropertyLoanController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(propertyLoanSchema.getListPropertyLoan),
            PropertyLoanController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(propertyLoanSchema.deletePropertyLoan),
            PropertyLoanController.delete);

    app.route('/property-mortgage-loan')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(propertyMortgageLoanSchema.addPropertyMortgageLoan),
            PropertyMortgageLoanController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(propertyMortgageLoanSchema.updatePropertyMortgageLoan),
            PropertyMortgageLoanController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(propertyMortgageLoanSchema.getListPropertyMortgageLoan),
            PropertyMortgageLoanController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(propertyMortgageLoanSchema.deletePropertyMortgageLoan),
            PropertyMortgageLoanController.delete);

    app.route('/question-category')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(loanQuestionCategorySchema.addQuestionCategory),
            LoanQuestionCategoryController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(loanQuestionCategorySchema.updateQuestionCategory),
            LoanQuestionCategoryController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(loanQuestionCategorySchema.getListQuestionCategory),
            LoanQuestionCategoryController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(loanQuestionCategorySchema.deleteQuestionCategory),
            LoanQuestionCategoryController.delete);

    app.route('/property-loan-question')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanQuestionSchema.addPropertyAndLoanQuestion),
            PropertyAndLoanQuestionController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanQuestionSchema.updatePropertyAndLoanQuestion),
            PropertyAndLoanQuestionController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanQuestionSchema.getListPropertyAndLoanQuestion),
            PropertyAndLoanQuestionController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanQuestionSchema.deletePropertyAndLoanQuestion),
            PropertyAndLoanQuestionController.delete);

    app.route('/property-loan-answer')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanAnswerSchema.addPropertyAndLoanAnswer),
            PropertyAndLoanAnswerController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanAnswerSchema.updatePropertyAndLoanAnswer),
            PropertyAndLoanAnswerController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanAnswerSchema.getListPropertyAndLoanAnswer),
            PropertyAndLoanAnswerController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(propertyAndLoanAnswerSchema.deletePropertyAndLoanAnswer),
            PropertyAndLoanAnswerController.delete);

    app.route('/loan-housing-payment')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(loanHousingPaymentSchema.addHousingPayment),
            LoanHousingPaymentController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(loanHousingPaymentSchema.updateHousingPayment),
            LoanHousingPaymentController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(loanHousingPaymentSchema.getListHousingPayment),
            LoanHousingPaymentController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(loanHousingPaymentSchema.deleteHousingPayment),
            LoanHousingPaymentController.delete);

    app.route('/loan-transaction-detail')
        .post(passport.authenticate('jwt', { session: false }),
            joi.check(loanTransactionDetailSchema.addTransactionDetail),
            LoanTransactionDetailController.addupdate)
        .put(passport.authenticate('jwt', { session: false }),
            joi.check(loanTransactionDetailSchema.updateTransactionDetail),
            LoanTransactionDetailController.addupdate)
        .get(passport.authenticate('jwt', { session: false }),
            joi.check(loanTransactionDetailSchema.getListTransactionDetail),
            LoanTransactionDetailController.list)
        .delete(passport.authenticate('jwt', { session: false }),
            joi.check(loanTransactionDetailSchema.deleteTransactionDetail),
            LoanTransactionDetailController.delete);

}