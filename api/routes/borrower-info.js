'use strict'

const passport = require('passport');

module.exports = function (app) {

    //Controllers
    // let BorrowerController = require('../controllers/borrowerInfo/Borrower')
    let EmploymentController = require('../controllers/borrowerInfo/Employment')
    let LiabilityController = require('../controllers/borrowerInfo/Liability')
    let AssetController = require('../controllers/borrowerInfo/Asset')
    let BorrowerDeclarationsController = require('../controllers/borrowerInfo/BorrowerDeclarations')
    let DemographicInfo = require('../controllers/borrowerInfo/DemographicInfo')
    let BorrowerController = require('../controllers/borrowerInfo/Borrower')

    //Requests
    let BorrowerRequest = require('../../requests/borrowerInfo/Borrower')
    let LiabilityRequest = require('../../requests/borrowerInfo/Liability')
    const joi = require('../schema/middleware');

    //BORROWERS
    const borrowerInfoSchema = require('../schema/borrowerInfo/borrowerInfoSchema');
    app.route('/borrowers')

        .post(
            passport.authenticate('jwt', {session: false}),
         joi.check(borrowerInfoSchema.addBorrowerInfo), BorrowerController.add)
        .put(
            passport.authenticate('jwt', {session: false}),
             joi.check(borrowerInfoSchema.updateBorrowerInfo), BorrowerController.update)
        .get(
            passport.authenticate('jwt', {session: false}),
            joi.check(borrowerInfoSchema.details),
            
             BorrowerController.detail)
        .delete(
            passport.authenticate('jwt', {session: false}),
             joi.check(borrowerInfoSchema.id), BorrowerController.delete)

    //ASSET
    const assetSchema = require('../schema/borrowerInfo/assetSchema');
    app.route('/borrowers/assets')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.createAsset), AssetController.addAsset)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.updateAsset), AssetController.updateAsset)
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.getListAsset), AssetController.listAsset)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.deleteAsset), AssetController.deleteAsset)

    //Other Asset or credit
    app.route('/borrowers/other-assets-or-credit')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.createOtherAsset), AssetController.addOtherAsset)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.updateOtherAsset), AssetController.updateOtherAsset)
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.getListOtherAsset), AssetController.listOtherAsset)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.deleteOtherAsset), AssetController.deleteOtherAsset)

    //Assets Gift and Grants
    app.route('/borrowers/gift-and-grants')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.createGiftsOrGrant), AssetController.addGiftandGrants)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.updateGiftsOrGrant), AssetController.updateGiftandGrants)
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.getListGiftsOrGrant), AssetController.listGiftandGrants)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(assetSchema.deleteGiftsOrGrant), AssetController.deleteGiftandGrants)

    //Employments
    const employmentSchema = require('../schema/borrowerInfo/employmentSchema');
    app.route('/borrowers/employment')
        .post(passport.authenticate('jwt', {
            session: false
        }), joi.check(employmentSchema.createEmployement), EmploymentController.add)
        .get(passport.authenticate('jwt', {
            session: false
        }), joi.check(employmentSchema.getEmployementDetail), EmploymentController.detail)
        .delete(passport.authenticate('jwt', {
            session: false
        }), joi.check(employmentSchema.deleteEmployement), EmploymentController.delete)
        .put(passport.authenticate('jwt', {
            session: false
        }), joi.check(employmentSchema.updateEmployement), EmploymentController.update)
    app.route('/borrowers/employment-list')
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(employmentSchema.getEmployementList),
            EmploymentController.list
        )

    //Liabities
    const liabilitySchema = require('../schema/borrowerInfo/liabilitySchema');
    app.route('/borrowers/liability')
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.addLiability),
            LiabilityController.add
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.updateLiability),
            LiabilityController.update
        )
        .get(passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.getListLiability),
            LiabilityController.list
        )
        .delete(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.deleteLiability),
            LiabilityController.delete
        )

    app.route('/borrowers/other-liability')
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.getListOtherLiability),
            LiabilityController.listOtherLiability
        )
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.addOtherLiability),
            LiabilityController.addOtherLiability
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.updateOtherLiability),
            LiabilityController.updateOtherLiability
        )
        .delete(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(liabilitySchema.deleteOtherLiability),
            LiabilityController.deleteOtherLiability
        )

    // Borrower Declarations Question
    const DeclarationsSchema = require('../schema/borrowerInfo/borrowerDeclarationsSchema');
    app.route('/borrowers/declarations-question')
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.addQuestion),
            BorrowerDeclarationsController.addUpdateQuestion
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.updateQuestion),
            BorrowerDeclarationsController.addUpdateQuestion
        )
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.getListQuestion),
            BorrowerDeclarationsController.listQuestion
        )
        .delete(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.deleteQuestion),
            BorrowerDeclarationsController.deleteQuestion
        )

    // Borrower Declarations Answer
    app.route('/borrowers/declarations-answer')
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.addAnswer),
            BorrowerDeclarationsController.addUpdateAnswer
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.updateAnswer),
            BorrowerDeclarationsController.addUpdateAnswer
        )
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.getListAnswer),
            BorrowerDeclarationsController.listAnswer
        )
        .delete(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DeclarationsSchema.deleteAnswer),
            BorrowerDeclarationsController.deleteAnswer
        )

    //REAL ESTATE OWNED
    const BorrowerRealEstateController = require('../controllers/borrowerInfo/BorrowerRealEstate')
    const BorrowerRealEstateSchema = require('../schema/borrowerInfo/BorrowerRealEstateSchema')
    app.route('/borrowers/real-estate-owned')
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(BorrowerRealEstateSchema.addRealEstateOwned),
            BorrowerRealEstateController.addBorrowerRealEstateOwned
        )
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(BorrowerRealEstateSchema.id),
            BorrowerRealEstateController.getBorrowerRealEstateOwnedDetails
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(BorrowerRealEstateSchema.updateRealEstateOwned),
            BorrowerRealEstateController.updateBorrowerRealEstateOwnedDetails
        )
    // Borrower Demographic info
    const DemographicSchema = require('../schema/borrowerInfo/demographicInfoSchema');
    app.route('/borrowers/demographic-info')
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DemographicSchema.addDemographic),
            DemographicInfo.addUpdateDemographicInfo
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DemographicSchema.updateDemographic),
            DemographicInfo.addUpdateDemographicInfo
        )
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DemographicSchema.getListDemographic),
            DemographicInfo.listDemographicInfo
        )
        .delete(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(DemographicSchema.deleteDemographic),
            DemographicInfo.deleteDemographicInfo
        )
    // Borrower Military service
    const MilitaryController = require('../controllers/borrowerInfo/BorrowerMilitary')
    const MilitarySchema = require('../schema/borrowerInfo/borrowerMilitary');
    app.route('/borrowers/military')
        .post(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(MilitarySchema.addMilitary),
            MilitaryController.addUpdateMilitary
        )
        .put(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(MilitarySchema.updateMilitary),
            MilitaryController.addUpdateMilitary
        )
        .get(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(MilitarySchema.getListMilitary),
            MilitaryController.listMilitary
        )
        .delete(
            passport.authenticate('jwt', {
                session: false
            }),
            joi.check(MilitarySchema.deleteMilitary),
            MilitaryController.deleteMilitary
        )


}