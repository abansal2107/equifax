'use strict'
const errorHandler = require('../../../exceptions/error')
const sequelize = require('../../../db/connection');
const models = require('../../models/index')
const BorrowerInfo = models.borrower_info
const BorrowerAddresses = models.borrower_addresses
const PropertyAddresses = models.property_info
const BorrowerOthers = models.borrower_others
const BorrowerTypeOfCredit = models.borrower_type_of_credit
const Addresses = models.addresses
const LoanMasters = models.loan_tracking_masters
const LoanUsers = models.loan_status_user
const BorrowerUnmarriedAddendum = models.borrower_unmarried_addendum

const constants = require('../../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE } = constants.HTTP_STATUS

const {
    Op
} = require("sequelize");

//Add Borrower Info First Module
//ADD 
exports.add = async function (req, res, next) {
    const t = await sequelize.transaction();
    try {

        let params = req.body;
        if (params.addBorrowerInfo.borrowerInfo) {
            var borrowerInfoData = await BorrowerInfo.create(params.addBorrowerInfo.borrowerInfo, {
                transaction: t
            });
        }

        //Other Borrowers
        if (params.addBorrowerInfo.borrowerOthers) {
            params.addBorrowerInfo.borrowerOthers.borrowerInfoId =borrowerInfoData.id
            var borrowerOthersData =await BorrowerOthers.create(params.addBorrowerInfo.borrowerOthers, {
                transaction: t
            });
        }

        //Type of Credit
        if (params.addBorrowerInfo.typeOfCredit) {
            params.addBorrowerInfo.typeOfCredit.borrowerInfoId =borrowerInfoData.id
            var borrowerTypeOfCreditData = await BorrowerTypeOfCredit.create(params.addBorrowerInfo.typeOfCredit, {
                transaction: t
            });
        }
        //Borrower Address

        if (params.addBorrowerInfo.address || params.addBorrowerInfo.borrowerAddress) {
            var addressData = await Addresses.create(params.addBorrowerInfo.address, {
                transaction: t
            });
            params.addBorrowerInfo.borrowerAddress.addressId = addressData.id
            params.addBorrowerInfo.borrowerAddress.borrowerinfoId = borrowerInfoData.id
              var borrowerAddressesData=  await BorrowerAddresses.create(params.addBorrowerInfo.borrowerAddress, {
                  transaction: t
                });
            }
        // Martial Status
        if (params.addBorrowerInfo.borrowerMartial.typeOfRelationship == 3) {
           params.addBorrowerInfo.borrowerMartial.borrowerInfoId= borrowerInfoData.id
           var borrowerUnmarriedAddendumData = await BorrowerUnmarriedAddendum.create( params.addBorrowerInfo.borrowerMartial, {
               transaction: t
            });
            console.log('BorrowerUnmarriedAddendumData:>>>>>>>>>>>>>>>>6 ', borrowerUnmarriedAddendumData.id);
        }

        if (borrowerInfoData && borrowerOthersData && borrowerTypeOfCreditData && addressData && borrowerAddressesData && borrowerUnmarriedAddendumData) {
           console.log('++++++++++++++++++++')
            await t.commit();
            res.status(INSERT).json({
                success: true,
                data: params.body,
                message: 'Borrower added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false,
                data: [],
                message: 'Oops! Failed to add Borrower.'
            });
        }
    } catch (error) {
        if (t) {
            await t.rollback();
          }
          console.log(error)
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//DETAIL

exports.detail = async function (req, res, next) {

    try {
    
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let search = '%%';
        
        if (req.query.search) {
            search = '%' + req.query.search + '%';
        }
    
        if(page > 1) {
            skip = parseInt(perPage * (page - 1));
        } 
        let params = req.query;
        let where =''
        if(params && params.loanAppNo){
            where= {loanAppNo: params.loanAppNo,isDeleted:0}
        }else{
            where= {isDeleted:0}
        }
        
        var check = await BorrowerInfo.findAndCountAll({
            where:where,
            include: [
                // {
                //     required:false,
                //     model: BorrowerOthers,
                //     as: 'borrower_others',
                // },
                // {
                //     model: Addresses,
                //     required:false,
                //     through: {
                //         model: BorrowerAddresses,
                //         attributes:[]
                //     }
                    //    as: 'borrower_addresses',

                // },
                // {
                //     model: BorrowerTypeOfCredit,
                //     required:false,
                // }, {
                //     model: BorrowerUnmarriedAddendum,
                //     required:false,
                // }

                {
                    model: Addresses,
                    required:false,
                    through: {
                        model: PropertyAddresses,
                        attributes:[]
                    },
                    as:'propertyDetails'
                },
                {
                    model: LoanUsers,
                    required:false,
                    attributes:['id','loanAppId'],
                   include:[{
                       model:LoanMaster
                   }]
                }
            ],
            distinct:true,
            limit: perPage, offset: skip
        });
        if (check === null) {
            res.status(200).json({
                success: false,
                data: [],
                count:0,
                message: 'Borrower not found.'
            });
        } else {
            res.status(200).json({
                success: true,
                data: check.rows,
                count:check.count,
                message: 'Borrower detail found.'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        next(error)
    }
}

//DELETE
exports.delete = async function (req, res) {

    const t = await sequelize.transaction();

    let params = req.body;
    var check = await BorrowerInfo.findOne({
        where: {
            id: params.id
        },
    });

    console.log(check);
    if (check === null) {

        res.status(200).json({
            success: false,
            data: null,
            message: 'Borrower not found.'
        });

    } else {

       let BorrowerInfoData= await BorrowerInfo.destroy({
           where: {
               id: params.id
            }
        }, {
            transaction: t
        });
        console.log('BorrowerInfoData: ', BorrowerInfoData);
        let BorrowerUnmarriedAddendumData = await BorrowerUnmarriedAddendum.destroy({
            where: {
                BorrowerInfoId: params.id
            }
        }, {
            transaction: t
        });
        console.log('BorrowerUnmarriedAddendumData: ', BorrowerUnmarriedAddendumData);
        let BorrowerAddressesData=await BorrowerAddresses.destroy({
            where: {
                BorrowerInfoId: params.id
            }
        }, {
            transaction: t
        });
       let BorrowerTypeOfCreditData= await BorrowerTypeOfCredit.destroy({
            
            where: {
                BorrowerInfoId: params.id
            }
        }, {
            transaction: t
        });
       let BorrowerOthersData = await BorrowerOthers.destroy({
            where: {
                BorrowerInfoId: params.id
            }
        }, {
            transaction: t
        });

        res.status(200).json({
            success: true,
            message: 'Borrower deleted successfully.'
        });
    }
}

//UPDATE
exports.update = async function (req, res, next) {

    const errors = validationResult(req);
    const t = await sequelize.transaction();

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    try {
        let params = req.body;
        let ReqData = {
            loanAppNo: params.loanAppNo,
            firstName: params.firstName,
            middleName: params.middleName,
            lastName: params.lastName,
            suffix: params.suffix,
            ssn: params.ssn,
            dob: params.dob,
            citizenship: params.citizenship,
            maritalStatus: params.maritalStatus,
            noOfDependantChilds: params.noOfDependantChilds,
            agesDependantChilds: params.agesDependantChilds,
            contactInfo: params.contactInfo,
        }

        let where = {
            id: params.id,
            loanAppNo: params.loanAppNo
        }

        var check = await BorrowerInfo.update(ReqData, {
            where: where
        }, {
            transaction: t
        });

        let borrowerInfoId = params.id;

        //Other Borrowers
        if (params.BorrowerOthersJson) {

            var borrowerOthersDecode = JSON.parse(params.BorrowerOthersJson);

            let borrowerOthersInsert = {

                firstName: borrowerOthersDecode.firstName,
                middleName: borrowerOthersDecode.middleName,
                lastName: borrowerOthersDecode.lastName,
                suffix: borrowerOthersDecode.suffix
            }

            var checkOther = await BorrowerOthers.findOne({
                where: {
                    borrowerInfoId: borrowerInfoId
                },
            });

            if (checkOther === null) {
                await BorrowerOthers.create(borrowerOthersInsert, {
                    transaction: t
                });
            } else {
                await BorrowerOthers.update(borrowerOthersInsert, {
                    where: {
                        borrowerInfoId: borrowerInfoId
                    },
                }, {
                    transaction: t
                });
            }
        }
        //Type of Credit
        if (params.typeOfCreditJson) {

            var typeOfCreditDecode = JSON.parse(params.typeOfCreditJson);
            let typeOfCreditInsert = '';

            if (typeOfCreditDecode.type == 2) {

                typeOfCreditInsert = {
                    type: typeOfCreditDecode.type,
                    noOfBorrowers: typeOfCreditDecode.noOfBorrowers,
                    initials: typeOfCreditDecode.initials
                }
            } else {
                typeOfCreditInsert = {
                    BorrowerInfoId: borrowerInfoId,
                    type: typeOfCreditDecode.type,
                }
            }
            var checkType = await BorrowerTypeOfCredit.findOne({
                where: {
                    BorrowerInfoId: borrowerInfoId
                },
            });

            if (checkType === null) {
                await BorrowerTypeOfCredit.create(typeOfCreditInsert, {
                    transaction: t
                });
            } else {
                await BorrowerTypeOfCredit.update(typeOfCreditInsert, {
                    where: {
                        BorrowerInfoId: borrowerInfoId
                    },
                }, {
                    transaction: t
                });
            }
        }

        //Borrower Address
        if (params.borrowerAddressJson) {

            var borrowerAddressDecode = JSON.parse(params.borrowerAddressJson);
            var addressDecode = borrowerAddressDecode.address;

            let borrowerAddressInsert = '';

            let addressInsert = {

                street: addressDecode.street,
                unit: addressDecode.unit,
                city: addressDecode.city,
                state: addressDecode.state,
                zip: addressDecode.zip,
                country: addressDecode.country
            }
            var checkAddress = await BorrowerAddresses.findOne({
                where: {
                    BorrowerInfoId: borrowerInfoId
                },
            });

            if (checkAddress === null) {

                let AddressData = await Addresses.create(addressInsert);
                borrowerAddressInsert = {
                    BorrowerInfoId: borrowerInfoId,
                    type: borrowerAddressDecode.type,
                    addressId: AddressData.id,
                    howLongAtCurrentAddress: borrowerAddressDecode.howLongAtCurrentAddress,
                    housing: borrowerAddressDecode.housing,
                    rentPerMonth: borrowerAddressDecode.rentPerMonth
                }
                await BorrowerAddresses.create(borrowerAddressInsert, {
                    transaction: t
                });

            } else {
                await Addresses.update(addressInsert, {
                    where: {
                        id: addressDecode.id
                    },
                }, {
                    transaction: t
                });
                borrowerAddressInsert = {

                    BorrowerInfoId: borrowerInfoId,
                    type: borrowerAddressDecode.type,
                    addressId: addressDecode.id,
                    howLongAtCurrentAddress: borrowerAddressDecode.howLongAtCurrentAddress,
                    housing: borrowerAddressDecode.housing,
                    rentPerMonth: borrowerAddressDecode.rentPerMonth
                }
                await BorrowerAddresses.update(borrowerAddressInsert, {
                    where: {
                        BorrowerInfoId: borrowerInfoId
                    },
                }, {
                    transaction: t
                });
            }
        }
        //Martial Status
        if ((params.maritalStatus == 3) && (params.borrowerUnmarriedAddendumJson)) {

            var borrowerUnmarriedAddendumDecode = JSON.parse(params.borrowerUnmarriedAddendumJson);

            let borrowerMartialInsert = {

                BorrowerInfoId: borrowerInfoId,
                OtherPerson: borrowerUnmarriedAddendumDecode.OtherPerson,
                TypeOfRelationship: borrowerUnmarriedAddendumDecode.TypeOfRelationship,
                State: borrowerUnmarriedAddendumDecode.State,
                housing: borrowerUnmarriedAddendumDecode.housing,
                Other: borrowerUnmarriedAddendumDecode.Other
            }

            var checkMartial = await BorrowerUnmarriedAddendum.findOne({
                where: {
                    BorrowerInfoId: borrowerInfoId
                },
            });

            if (checkMartial === null) {
                await BorrowerUnmarriedAddendum.create(borrowerMartialInsert, {
                    transaction: t
                });
            } else {
                await BorrowerUnmarriedAddendum.update(borrowerMartialInsert, {
                    where: {
                        BorrowerInfoId: borrowerInfoId
                    },
                }, {
                    transaction: t
                });
            }
        }
        if (check) {
            res.status(200).json({
                success: true,
                data: ReqData,
                message: 'Borrower updated successfully.'
            });

        } else {
            res.status(200).json({
                success: false,
                data: [],
                message: 'Oops! Failed to update borrower.'
            });
        }
    } catch (error) {
        next(error)
    }
}