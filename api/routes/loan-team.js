'use strict'

const passport = require('passport');

module.exports = function (app) {

    //Controllers
    let LoanTeamController = require('../controllers/loanTeam/LoanTeam')
    let SellerController = require('../controllers/loanTeam/Seller')
    let SalesController = require('../controllers/loanTeam/sales')
    let BuyerController = require('../controllers/loanTeam/Buyer')
    let PrimaryMLOController = require('../controllers/loanTeam/PrimaryMLO')
    let CooperatingMLOController = require('../controllers/loanTeam/CooperatingMLO')
    let FullfillmentController = require('../controllers/loanTeam/Fullfillment');
    let BuyersAgentController = require('../controllers/loanTeam/BuyersAgent')
    let SellersAgentController = require('../controllers/loanTeam/SellersAgent')
    let ComplianceController = require('../controllers/loanTeam/Compliance');
    let loanSourceController = require('../controllers/loanTeam/loanSource');

    //Requests
    let LoanRequest = require('../../requests/loanTeam/Loan')
    const joi = require('../schema/middleware');

    //Middleware
    let CheckAuthorization = require('../middlewares/CheckAuthorization')

    app.route('/sales-user-roles')
        .get(passport.authenticate('jwt', {
            session: false
        }), LoanTeamController.salesUserRoles)

    app.route('/assign-sales-user')
        .post(passport.authenticate('jwt', {
            session: false
        }), LoanRequest.validate('assign-sales-user'), LoanTeamController.assignSalesUser)

    //PrimaryMLO
    const primaryMLOSchema = require('../schema/loanTeam/primaryMLO');
    app.route('/primary-mlo')
        .get(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(primaryMLOSchema.listPrimaryMLO), PrimaryMLOController.list)
        .post(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(primaryMLOSchema.addPrimaryMLO), PrimaryMLOController.add)
        .put(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(primaryMLOSchema.updatePrimaryMLO), PrimaryMLOController.update)
        .delete(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(primaryMLOSchema.deletePrimaryMLO), PrimaryMLOController.delete);

    //CooperatingMlo  getCooperatingMLO
    const cooperatingMloSchema = require('../schema/loanTeam/cooperatingMloSchema')
    app.route('/cooperating-mlo')
        .get(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(cooperatingMloSchema.getCooperatingMLO), CooperatingMLOController.get)
        .post(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(cooperatingMloSchema.addCooperatingMLO), CooperatingMLOController.add)
        .put(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(cooperatingMloSchema.addCooperatingMLO), CooperatingMLOController.update)
        .delete(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(cooperatingMloSchema.id), CooperatingMLOController.delete)


    //Fullfillment  
    const fullfillmentSchema = require('../schema/loanTeam/fullfillmentSchema')
    app.route('/fullfillment')
        .get(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(fullfillmentSchema.getFullfillment), FullfillmentController.list)
        .post(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(fullfillmentSchema.addFullfillment), FullfillmentController.add)
        .put(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(fullfillmentSchema.updateFullfillment), FullfillmentController.update)
        .delete(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(fullfillmentSchema.id), FullfillmentController.delete)

    //Compliance
    const complianceSchema = require('../schema/loanTeam/complianceSchema')
    const Authorization = require('../controllers/Roles/Authorization')
    app.route('/compliance')
        .get(passport.authenticate('jwt', {
            session: false
        }),joi.check(complianceSchema.getCompliance), ComplianceController.list)
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(complianceSchema.addCompliance), ComplianceController.add)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(complianceSchema.updateCompliance), ComplianceController.update)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(complianceSchema.id), ComplianceController.delete);

    //BuyersAgents
    const buyerAgentSchema = require('../schema/loanTeam/buyerAgentSchema')
    app.route('/buyers-agents')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerAgentSchema.getBuyerAgent), BuyersAgentController.list)
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerAgentSchema.addBuyerAgent), BuyersAgentController.add)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerAgentSchema.updateBuyerAgent), BuyersAgentController.update)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerAgentSchema.id), BuyersAgentController.delete);

    //SellersAgents
    const sellersAgentSchema = require('../schema/loanTeam/sellersAgent');
    app.route('/sellers-agents')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersAgentSchema.listSellersAgent), SellersAgentController.list)
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersAgentSchema.addSellersAgent), SellersAgentController.add)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersAgentSchema.updateSellersAgent), SellersAgentController.update)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersAgentSchema.deleteSellersAgent), SellersAgentController.delete);

    //BUYER'S TEAM
    const buyerSchema = require('../schema/loanTeam/buyerSchema')
    app.route('/buyers-team')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerSchema.getBuyersDetails), BuyerController.details)
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerSchema.addBuyer), BuyerController.add)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerSchema.updateBuyer), BuyerController.update)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerSchema.id), BuyerController.delete)

    app.route('/buyers-agents-list')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(buyerSchema.getBuyersByLoanId), BuyerController.buyersAgent)

    // SELLER'S TEAM
    const sellersTeamSchema = require('../schema/loanTeam/sellersTeam');
    app.route('/sellers-team')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersTeamSchema.listSeller), SellerController.details)
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersTeamSchema.addSeller), SellerController.add)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersTeamSchema.updateSeller), SellerController.update)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(sellersTeamSchema.deleteSeller), SellerController.delete)

    // app.route('/seller-agents-list')        
    //     .get(passport.authenticate('jwt', {session: false}), SellerRequest.validate('seller-agents-list'), SellerController.sellersAgent)    

    const salesSchema = require('../schema/loanTeam/salesSchema');
    app.route('/sales')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(salesSchema.getSales), SalesController.salesList)
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(salesSchema.addSales), SalesController.addSales)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(salesSchema.updateSales), SalesController.updateSales)
    // .delete(passport.authenticate('jwt', { session: false }), joi.check(sellersTeamSchema.deleteSeller), SellerController.delete)

    const loanSourceSchema = require('../schema/loanTeam/loanSourceSchema');

    app.route('/loan-source-master')
    .get(passport.authenticate('jwt', {session: false}), loanSourceController.getMaster)



    app.route('/loan-source-user')
        .get(passport.authenticate('jwt', {session: false}),  SalesController.salesList)
        .post(passport.authenticate('jwt', {session: false}),joi.check(loanSourceSchema.addLoanSourceUser),
        loanSourceController.addLoanSourceUser)

        // .put(passport.authenticate('jwt', {
        //     session: false
        // }), SalesController.updateSales)
}