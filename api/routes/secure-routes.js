'use strict'

const passport = require('passport');

module.exports = function (app) {

    //Controllers    
    let InvestorController = require('../controllers/Investor')
    let UserController = require('../controllers/users/User')
    let RoleController = require('../controllers/Role')
    let LocationController = require('../controllers/Location')
    let StatesController = require('../controllers/States')
    let VendorController = require('../controllers/Vendor')
    let CompanyController = require('../controllers/users/Company')
    let AgentController = require('../controllers/users/Agent')

    const joi = require('../schema/middleware');

    //Roles
    const roleSchema = require('../schema/roleSchema');
    app.route('/logout')
        .get(passport.authenticate('jwt', {
            session: false
        }), UserController.logout)

    app.route('/update-role')
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(roleSchema.updateRoles), RoleController.updateRole)

    app.route('/roles')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(roleSchema.getRoles), RoleController.roles)

    app.route('/role-users')
        .get(
            // passport.authenticate('jwt', {session: false}),
             RoleController.roleUsers)

        app.route('/user-by-roles')
        .get(
            passport.authenticate('jwt', {session: false}),
            joi.check(roleSchema.userByRoles),
         RoleController.userByRoles)
        



    //COMPANY
    const companySchema = require('../schema/companySchema');
    app.route('/companies')
        .get(
            // passport.authenticate('jwt', {session: false}),
         joi.check(companySchema.getCompanies), CompanyController.companies);

    app.route('/add-company')
        .post(
            // passport.authenticate('jwt', {session: false}),
             joi.check(companySchema.createCompany), CompanyController.addCompany);

    app.route('/update-company')
        .put(
            // passport.authenticate('jwt', {session: false}),
             joi.check(companySchema.updateCompany), CompanyController.updateCompany);

    app.route('/company-detail')
        .get(
            // passport.authenticate('jwt', {session: false}),
             joi.check(companySchema.id), CompanyController.companyDetail);

    app.route('/delete-company')
        .delete(
            passport.authenticate('jwt', {session: false}),
             joi.check(companySchema.id), CompanyController.delete)



    //USER
    const userSchema = require('../schema/userSchema');
    // app.route('/user')        
    //     .post(passport.authenticate('jwt', {session: false}), joi.check(userSchema.createUsers), UserController.user)

    app.route('/users')
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(userSchema.getUsers), UserController.users)

    app.route('/add-user')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(userSchema.createUser), UserController.addUser);

    app.route('/update-user')
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(userSchema.updateUser), UserController.updateUser)




    //INVESTOR

    const investorSchema = require('../schema/investorSchema');
    app.route('/investors')
        .get(
            // passport.authenticate('jwt', {session: false}),
             joi.check(investorSchema.getInvestors), InvestorController.investors)

    app.route('/investor-detail')
        .get(
            // passport.authenticate('jwt', {session: false}), 
            joi.check(investorSchema.id), InvestorController.investorDetail)

    app.route('/add-investor')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(investorSchema.addInvestor), InvestorController.addInvestor);

    app.route('/update-investor')
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(investorSchema.updateInvestor), InvestorController.updateInvestor)

    app.route('/delete-investor')
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(investorSchema.id), InvestorController.delete)


    //AGENT
    const agentSchema = require('../schema/agentSchema');
    app.route('/agents')
        .get(
            // passport.authenticate('jwt', {session: false}),
         joi.check(agentSchema.getAgents), AgentController.agents)

    app.route('/agent-detail')
        .get(
            // passport.authenticate('jwt', {session: false}),
             joi.check(agentSchema.id), AgentController.agentDetail)

    app.route('/delete-agent')
        .delete(
            // passport.authenticate('jwt', {session: false}),
             joi.check(agentSchema.id), AgentController.delete)

    app.route('/add-agent')
        .post(
            // passport.authenticate('jwt', {session: false}), 
            joi.check(agentSchema.addAgent), AgentController.addAgent);

    app.route('/update-agent')
        .put(
            // passport.authenticate('jwt', {session: false}), 
        joi.check(agentSchema.updateAgent), AgentController.updateAgent)


    //MORTGAGECLAUSE
    app.route('/add-mortgage-clause')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(investorSchema.addMortgageClause), InvestorController.addMortgageClause);

    app.route('/update-mortgage-clause')
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(investorSchema.editMortgageClause), InvestorController.editMortgageClause);



    //LOCATION
    const locationSchema = require('../schema/locationSchema');
    app.route('/locations')
        .get(
        // passport.authenticate('jwt', {session: false}),
         joi.check(locationSchema.getLocations), LocationController.locations)

    app.route('/delete-location')
        .delete(
            // passport.authenticate('jwt', {session: false}), 
            joi.check(locationSchema.id), LocationController.delete)

    app.route('/add-location')
        .post(
            // passport.authenticate('jwt', {session: false}), 
            joi.check(locationSchema.addLocation), LocationController.addLocation)

    app.route('/location-detail')
        .get(
            // passport.authenticate('jwt', {session: false}),
             joi.check(locationSchema.id), LocationController.locationDetail)

    app.route('/update-location')
        .put(
            // passport.authenticate('jwt', {session: false}),
             joi.check(locationSchema.updateLocation), LocationController.updateLocation)


    
    //STATES
    app.route('/states').get(passport.authenticate('jwt', {session: false}), StatesController.getAllStates)




    //VENDOR
    const vendorSchema = require('../schema/vendorSchema');
    app.route('/vendors')
        .get(
            // passport.authenticate('jwt', {session: false}),
             joi.check(vendorSchema.getVendors), VendorController.vendors)

    app.route('/add-vendor')
        .post(
            // passport.authenticate('jwt', {session: false}), 
            joi.check(vendorSchema.addVendor), VendorController.addVendor)

    app.route('/vendor-detail')
        .get(
            // passport.authenticate('jwt', {session: false}), 
        joi.check(vendorSchema.id), VendorController.vendorDetail)

    app.route('/update-vendor')
        .put(
            // passport.authenticate('jwt', {session: false}), 
            joi.check(vendorSchema.updateVendor), VendorController.updateVendor)

    app.route('/delete-vendor')
        .delete(
            // passport.authenticate('jwt', {session: false}), 
        joi.check(vendorSchema.id), VendorController.delete)

    // // Lender
    // const LenderController = require('../controllers/lender/Lender')
    // const lenderSchema = require('../schema/lender/lenderSchema');
    // app.route('/lenders')
    //     .get(passport.authenticate('jwt', {
    //         session: false
    //     }), joi.check(lenderSchema.getLenders), LenderController.lenders)

    // app.route('/add-lender')
    //     .post(passport.authenticate('jwt', {
    //         session: false
    //     }), joi.check(lenderSchema.addLender), LenderController.add);

    // app.route('/update-lender')
    //     .put(passport.authenticate('jwt', {
    //         session: false
    //     }), joi.check(lenderSchema.updateLender), LenderController.update)
    // app.route('/lender-detail')
    //     .get(passport.authenticate('jwt', {
    //         session: false
    //     }), joi.check(lenderSchema.id), LenderController.lenderDetail)

    // app.route('/delete-lender')
    //     .delete(passport.authenticate('jwt', {
    //         session: false
    //     }), joi.check(lenderSchema.id), LenderController.delete)

}