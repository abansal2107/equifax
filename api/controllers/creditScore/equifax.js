"use strict";
const axios = require("axios");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
// const models = require('../../models/index')
// const Agent = models.agents
const { Op } = require("sequelize");
const errorHandler = require("../../../exceptions/error");

const constants = require("../../../config/strings/constant");
const { exist } = require("@hapi/joi");
const {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  INSERT,
  UPDATE,
  NOT_MODIFIED,
  DELETE,
} = constants.HTTP_STATUS;

const { MERGE, HEADERS } = constants.EQUIFAX;

exports.submitScore = async function (req, res) {
  try {


    let { request, applicantInfo, coborrowerInfo, formerAddress } = req.body.data;
    // console.log(applicantInfo.presentAddress);

    let abc = applicantInfo.ssn;

    abc = abc.replace('/', '');
    abc = abc.replace('    ', '');
    abc = abc.replace('/', '');
    abc = abc.replace('      ', '');

    console.log(abc)

    var reqData = `<?xml version="1.0" encoding="utf-8"?>
    <REQUEST_GROUP MISMOVersionID="2.3.1"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <SUBMITTING_PARTY _Name="${request.creditagency}" _SequenceIdentifier="WFFE1" />
        <REQUEST LoginAccountPassword="${process.env.EQ_PASSWORD}" 
               LoginAccountIdentifier="${process.env.EQ_ACCOUNT}" 
               InternalAccountIdentifier="${process.env.EQ_ACCOUNT}"
        RequestingPartyBranchIdentifier="QTP RPBranchId">
        <KEY _Name="TestCaseDescription" _Value="good generates report 1 borrower" />
        <KEY _Name="Cost_Center" _Value="${request.creditagency}" />
        <KEY _Name="HTMLFile" _Value="false" />
        <KEY _Name="EDI" _Value="true" />
        <KEY _Name="BranchId" _Value="QTP Branch" />
        <REQUEST_DATA>
          <CREDIT_REQUEST LenderCaseIdentifier="${applicantInfo.LenderCaseIdentifier || "LOANNUMBER4"}"
            RequestingPartyRequestedByName="req by QTP">
            <CREDIT_REQUEST_DATA CreditReportType="${request.reportType}"
              CreditRequestType="Individual"
              CreditRequestID="CreditRequest1"
              CreditReportRequestActionType="Submit"
              BorrowerID="B1">
              <CREDIT_REPOSITORY_INCLUDED
                _EquifaxIndicator="${request.Bureaus[0] == "EQUIFAX" ? "Y" : "N"}" _ExperianIndicator="${request.Bureaus[1] == "EXPERIAN" ? "Y" : "N"}" _TransUnionIndicator="${request.Bureaus[2] == "TRANSUNION" ? "Y" : "N"}" />
            </CREDIT_REQUEST_DATA>
            <LOAN_APPLICATION>
              <BORROWER BorrowerID="B1" _FirstName="${applicantInfo.firstName}" _LastName="${applicantInfo.lastName}"
                _PrintPositionType="Borrower" _SSN="${abc}">
                <_RESIDENCE _StreetAddress="${applicantInfo.presentAddress.Address}" _City="${applicantInfo.presentAddress.city}"
                  _State="${applicantInfo.presentAddress.state.abbreviation}" _PostalCode="${applicantInfo.presentAddress.zip}" BorrowerResidencyType="current" />
              </BORROWER>
            </LOAN_APPLICATION>
          </CREDIT_REQUEST>
        </REQUEST_DATA>
      </REQUEST>
    </REQUEST_GROUP>`;
    console.log("reqData>>>>>>>>>>>>>>>", reqData);

    var config = { headers: HEADERS };
    let response = await axios.post(MERGE, reqData, config);
    // res.status(200).send(response.data);
    parser.parseString(response.data, function (err, result) {
      console.log("result>>>>>>>>>>>>>>>", result);
      // result=JSON.stringify(result)
      res.status(200).send({
        success: true,
        data: result,
        message: "",
      });
    });


    console.log(req.body.data);
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.jointSubmitScore = async function (req, res) {
  try {


    let { request, applicantInfo, coborrowerInfo, formerAddress } = req.body.data;
    // console.log(applicantInfo.presentAddress);

    let abc = applicantInfo.ssn;

    abc = abc.replace('/', '');
    abc = abc.replace('    ', '');
    abc = abc.replace('/', '');
    abc = abc.replace('      ', '');

    console.log(abc)

    var reqData = `<?xml version="1.0" encoding="utf-8"?>
    <REQUEST_GROUP MISMOVersionID="2.3.1"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <SUBMITTING_PARTY _Name="${request.creditagency}" _SequenceIdentifier="WFFE1" />
        <REQUEST LoginAccountPassword="${process.env.EQ_PASSWORD}" 
               LoginAccountIdentifier="${process.env.EQ_ACCOUNT}" 
               InternalAccountIdentifier="${process.env.EQ_ACCOUNT}"
        RequestingPartyBranchIdentifier="QTP RPBranchId">
        <KEY _Name="TestCaseDescription" _Value="good generates report 1 borrower" />
        <KEY _Name="Cost_Center" _Value="${request.creditagency}" />
        <KEY _Name="HTMLFile" _Value="false" />
        <KEY _Name="EDI" _Value="true" />
        <KEY _Name="BranchId" _Value="QTP Branch" />
        <REQUEST_DATA>
          <CREDIT_REQUEST LenderCaseIdentifier="${request.LenderCaseIdentifier ? request.LenderCaseIdentifier : "LOANNUMBER4"}"
            RequestingPartyRequestedByName="req by QTP">
            <CREDIT_REQUEST_DATA CreditReportType="${request.reportType}"
              CreditRequestType="Joint"
              CreditRequestID="CreditRequest1"
              CreditReportRequestActionType="Submit"
              BorrowerID="B1 B2">
              <CREDIT_REPOSITORY_INCLUDED
                _EquifaxIndicator="${request.Bureaus[0] == "EQUIFAX" ? "Y" : "N"}" _ExperianIndicator="${request.Bureaus[1] == "EXPERIAN" ? "Y" : "N"}" _TransUnionIndicator="${request.Bureaus[2] == "TRANSUNION" ? "Y" : "N"}" />
            </CREDIT_REQUEST_DATA>
            <LOAN_APPLICATION>
              <BORROWER BorrowerID="B1" _FirstName="${applicantInfo.firstName}" _LastName="${applicantInfo.lastName}"
                _PrintPositionType="Borrower" _SSN="${abc}">
                <_RESIDENCE _StreetAddress="${applicantInfo.presentAddress.Address}" _City="${applicantInfo.presentAddress.city}"
                  _State="${applicantInfo.presentAddress.state.abbreviation}" _PostalCode="${applicantInfo.presentAddress.zip}" BorrowerResidencyType="current" />
              </BORROWER>
              <BORROWER BorrowerID="B2" _FirstName="${coborrowerInfo.firstName}" _LastName="${coborrowerInfo.lastName}"
                _PrintPositionType="Borrower" _SSN="301423221">
                <_RESIDENCE _StreetAddress="${coborrowerInfo.presentAddress.Address}" _City="${coborrowerInfo.presentAddress.city}"
                  _State="${coborrowerInfo.presentAddress.state.abbreviation}}" _PostalCode="${coborrowerInfo.presentAddress.zip}" BorrowerResidencyType="current" />
              </BORROWER>
            </LOAN_APPLICATION>
          </CREDIT_REQUEST>
        </REQUEST_DATA>
        
      </REQUEST>
    </REQUEST_GROUP>`;

    console.log("reqData", reqData);
    var config = { headers: HEADERS };
    let response = await axios.post(MERGE, reqData, config);
    parser.parseString(response.data, function (err, result) {
      // result=JSON.stringify(result)
      res.status(200).json({
        success: true,
        data: result,
        message: "",
      });
    });
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.preCloseSubmit = async function (req, res) {
  try {
    let { request, applicantInfo, coborrowerInfo, formerAddress } = req.body.data;
    // console.log(applicantInfo.presentAddress);

    let abc = applicantInfo.ssn;

    abc = abc.replace('/', '');
    abc = abc.replace('    ', '');
    abc = abc.replace('/', '');
    abc = abc.replace('      ', '');

    console.log(abc)

    // console.log("this is bodypart", body.data.Borrower.B1._FirstName);
    var reqData = `<REQUEST_GROUP MISMOVersionID="2.3.1">
    <SUBMITTING_PARTY _Name="${request.creditagency}" _SequenceIdentifier="WFFE1" />
      <REQUEST LoginAccountPassword="${process.env.EQ_PASSWORD}" 
           LoginAccountIdentifier="${process.env.EQ_ACCOUNT}" 
           InternalAccountIdentifier="${process.env.EQ_ACCOUNT}"
           RequestingPartyBranchIdentifier="QTP RPBranchId">
          <KEY _Name="LosID" _Value="eMortgage"></KEY>
    
        <REQUEST_DATA>
            <CREDIT_REQUEST 
            LenderCaseIdentifier="${request.LenderCaseIdentifier || "LOANNUMBER4"}" 
            MISMOVersionID="2.3.1" 
            RequestingPartyRequestedByName="req by QPT">

                <CREDIT_REQUEST_DATA 
                BorrowerID="Borrower" 
                CreditReportIdentifier="${request.creditRefrenceNumber}"  
                CreditReportRequestActionType="Submit" 
                CreditReportTransactionIdentifier="EFXMORT" 
                CreditReportType="${request.reportType}" 
                CreditReportTypeOtherDescription="Preclose" 
                CreditRequestDateTime="${request.CreditRequestDateTime}" 
                CreditRequestType="Individual">

                    <CREDIT_REPOSITORY_INCLUDED
                _EquifaxIndicator="${request.Bureaus[0] == "EQUIFAX" ? "Y" : "N"}" _ExperianIndicator="${request.Bureaus[1] == "EXPERIAN" ? "Y" : "N"}" _TransUnionIndicator="${request.Bureaus[2] == "TRANSUNION" ? "Y" : "N"}" />
            </CREDIT_REQUEST_DATA>
            <LOAN_APPLICATION>
              <BORROWER BorrowerID="Borrower" _FirstName="${applicantInfo.firstName}" _LastName="${applicantInfo.lastName}"
                _PrintPositionType="Borrower" _SSN="${abc}">
                <_RESIDENCE _StreetAddress="${applicantInfo.presentAddress.Address}" _City="${applicantInfo.presentAddress.city}"
                  _State="${applicantInfo.presentAddress.state.abbreviation}" _PostalCode="${applicantInfo.presentAddress.zip}" BorrowerResidencyType="current" />
              </BORROWER>
                </LOAN_APPLICATION>
            </CREDIT_REQUEST>
        </REQUEST_DATA>
    </REQUEST>
</REQUEST_GROUP>`;

    console.log("reqData", reqData);
    var config = { headers: HEADERS };
    let response = await axios.post(MERGE, reqData, config);
    parser.parseString(response.data, function (err, result) {
      // result=JSON.stringify(result)
      res.status(200).json({
        success: true,
        data: result,
        message: "",
      });
    });
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

//bureau
exports.singleUpgradeAdd = async function (req, res) {
  try {
    let { request, applicantInfo, coborrowerInfo, formerAddress } = req.body.data;
    // console.log(applicantInfo.presentAddress);

    let abc = applicantInfo.ssn;

    abc = abc.replace('/', '');
    abc = abc.replace('    ', '');
    abc = abc.replace('/', '');
    abc = abc.replace('      ', '');

    console.log(abc)

    // let str = body.data.Borrower.B2._SSN

    var reqData = `<?xml version="1.0" encoding="utf-8"?>
    <REQUEST_GROUP MISMOVersionID="2.3.1"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <SUBMITTING_PARTY _Name="${request.creditagency}" _SequenceIdentifier="WFFE1" />
        <REQUEST LoginAccountPassword="${process.env.EQ_PASSWORD}" 
               LoginAccountIdentifier="${process.env.EQ_ACCOUNT}" 
               InternalAccountIdentifier="${process.env.EQ_ACCOUNT}"
        RequestingPartyBranchIdentifier="QTP RPBranchId">
        <KEY _Name="TestCaseDescription" _Value="good generates report 1 borrower" />
        <KEY _Name="Cost_Center" _Value="${request.creditagency}" />
        <KEY _Name="HTMLFile" _Value="false" />
        <KEY _Name="EDI" _Value="true" />
        <KEY _Name="BranchId" _Value="QTP Branch" />
        <REQUEST_DATA>
          <CREDIT_REQUEST LenderCaseIdentifier="${request.LenderCaseIdentifier || "LOANNUMBER4"}"
            RequestingPartyRequestedByName="req by QTP">
            <CREDIT_REQUEST_DATA CreditReportType="${request.reportType}"
              CreditRequestType="Joint"
              CreditRequestID="CreditRequest1"
              CreditReportRequestActionType="Upgrade"
              CreditReportIdentifier="${request.creditRefrenceNumber}"
              BorrowerID="B1 B2">
              <CREDIT_REPOSITORY_INCLUDED
              _EquifaxIndicator="${request.Bureaus[0] == "EQUIFAX" ? "Y" : "N"}" _ExperianIndicator="${request.Bureaus[1] == "EXPERIAN" ? "Y" : "N"}" _TransUnionIndicator="${request.Bureaus[2] == "TRANSUNION" ? "Y" : "N"}" />
          </CREDIT_REQUEST_DATA>
            <LOAN_APPLICATION>
            <BORROWER BorrowerID="B1" _FirstName="${applicantInfo.firstName}" _LastName="${applicantInfo.lastName}"
              _PrintPositionType="Borrower" _SSN="${abc}">
              <_RESIDENCE _StreetAddress="${applicantInfo.presentAddress.Address}" _City="${applicantInfo.presentAddress.city}"
                _State="${applicantInfo.presentAddress.state.abbreviation}" _PostalCode="${applicantInfo.presentAddress.zip}" BorrowerResidencyType="current" />
            </BORROWER>
            <BORROWER BorrowerID="B2" _FirstName="${coborrowerInfo.firstName}" _LastName="${coborrowerInfo.lastName}"
              _PrintPositionType="Borrower" _SSN="301423221">
              <_RESIDENCE _StreetAddress="${coborrowerInfo.presentAddress.Address}" _City="${coborrowerInfo.presentAddress.city}"
                _State="${coborrowerInfo.presentAddress.state.abbreviation}" _PostalCode="${coborrowerInfo.presentAddress.zip}" BorrowerResidencyType="current" />
            </BORROWER>
            </LOAN_APPLICATION>
          </CREDIT_REQUEST>
        </REQUEST_DATA>
      </REQUEST>
    </REQUEST_GROUP>`;

    console.log("reqData", reqData);
    var config = { headers: HEADERS };
    let response = await axios.post(MERGE, reqData, config);
    parser.parseString(response.data, function (err, result) {
      // result=JSON.stringify(result)
      res.status(200).json({
        success: true,
        data: result,
        message: "",
      });
    });
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.echlUpdate = async function (req, res) {
  try {
    let { body } = req;
    var reqData = `<?xml version="1.0" encoding="UTF-8"?>
    <REQUEST_GROUP MISMOVersionID="2.3.1">
    <SUBMITTING_PARTY _Name="1183" /> 
       <REQUEST LoginAccountPassword="${process.env.EQ_PASSWORD}" 
               LoginAccountIdentifier="${process.env.EQ_ACCOUNT}" 
               InternalAccountIdentifier="${process.env.EQ_ACCOUNT}" RequestingPartyBranchIdentifier="BR0100" >
    
       <REQUEST_DATA>
         <CREDIT_REQUEST MISMOVersionID="2.3.1" LenderCaseIdentifier="{body.data.LenderCaseIdentifier}" 
           RequestingPartyRequestedByName="${body.data.reqPartyName}">
           <CREDIT_REQUEST_DATA BorrowerID="${body.data.BorrowerId}" 
             CreditReportIdentifier="VR5CQ9" CreditReportRequestActionType="Update" 
             CreditReportType="MergePlus" CreditRequestType="Individual"/>
            <CREDIT_LIABILITY CreditLiabilityID="TRD0000" BorrowerID="${body.data.BorrowerId}" 
                    _AccountIdentifier="${process.env.EQ_ACCOUNT}" _UnpaidBalanceAmount="${body.data.unpaidBalance}" 
                    CreditLoanType="${body.data.creditLoanType}">
                    <_CREDITOR _Name="${body.data.creditorName}"/>
                                  <CREDIT_COMMENT _SourceType="Lender">
                            <_Text>Account Balance History</_Text>
                            <_Text>PLEASE VERIFY ZERO BALANCE/STATUS</_Text>
                    </CREDIT_COMMENT>  
            </CREDIT_LIABILITY>
           <LOAN_APPLICATION>
             <BORROWER BorrowerID="Borrower" _BirthDate="1978-09-01" 
               _FirstName="Manpreet" _LastName="Saini" 
               _SSN="447287956"/>
           </LOAN_APPLICATION>
            <EXTENSION ExtensionID="EX0001">
                    <EXTENSION_SECTION ExtensionSectionID="ES0001" Organization="Amerigreat">
                            <EXTENSION_SECTION_DATA ExtensionSectionDataID="ESD0001">
                                    <EMBEDDED_FILE _Name="Authorization Buyer's Authorization" 
                                            _MimeType="application/pdf" _EncodingType="base64">
                                            <DOCUMENT>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LTE1NTYvUiA0L1N0bUYvU3RkQ0YvU3RyRi9TdGRDRi9VICg/2Ldzcb5u8IFG0jG4PTTPXDAwMFwwMDBcMDAwXDAwMFwwMDBcMDAwXDAwMFwwMDBcMDAwXDAwMFwwMDBcMDAwXDAwMFwwMDBcMDAwXDAwMCkvViA0Pj4KZW5kb2JqCnhyZWYKMCAyMAowMDAwMDAwMDExIDY1NTM1IGYgCjAwMDAwMDc1NzcgMDAwMDAgbiAKMDAwMDAwNzIwMCAwMDAwMCBuIAowMDAwMDA3NjM0IDAwMDAwIG4gCjAwMDAwMDcyNjAgMDAwMDAgbiAKMDAwMDAwODg1NSAwMDAwMCBuIAowMDAwMDA3NzYxIDAwMDAwIG4gCjAwMDAwMDc3OTQgMDAwMDAgbiAKMDAwMDAwNTg3NiAwMDAwMCBuIAowMDAwMDA3MDYwIDAwMDAwIG4gCjAwMDAwMDYwMTYgMDAwMDAgbiAKMDAwMDAwMDAxMiAwMDAwMSBmIAowMDAwMDAwMDEzIDAwMDAxIGYgCjAwMDAwMDAwMTUgMDAwMDEgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAxIGYgCjAwMDAwMDg1NTYgMDAwMDAgbiAKMDAwMDAwODY1NiAwMDAwMCBuIAowMDAwMDA4NzUzIDAwMDAwIG4gCjAwMDAwMTE1NTEgMDAwMDAgbiAKdHJhaWxlcgo8PC9FbmNyeXB0IDE5IDAgUi9JRCBbPDZlYzAwNzZlYjM1ZTk5ZDE0MDk4YmJjYTI0MDg4ZjFkPjxkMGVlNTA2OWU2Y2ZhZjViYTg1YWM5YzEyMmM2MjAwNj5dL0luZm8gNCAwIFIvUm9vdCAyIDAgUi9TaXplIDIwPj4KJWlUZXh0LTcuMC41CnN0YXJ0eHJlZgoxMTgzMAolJUVPRgo</DOCUMENT>
                                    </EMBEDDED_FILE>
                            </EXTENSION_SECTION_DATA>
                      </EXTENSION_SECTION>
            </EXTENSION>
         </CREDIT_REQUEST>
       </REQUEST_DATA>
     </REQUEST>
    </REQUEST_GROUP>
    `;
    console.log("reqData", reqData);
    var config = { headers: HEADERS };
    let response = await axios.post(MERGE, reqData, config);
    parser.parseString(response.data, function (err, result) {
      // result=JSON.stringify(result)
      res.status(200).json({
        success: true,
        data: result,
        message: "",
      });
    });
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

// exports.singleUpdate = async function (req, res) {
//     try {
// let {body.data}=req
// var reqData=`<?xml version="1.0" encoding="utf-8"?>
// <REQUEST_GROUP MISMOVersionID="2.3">
//   <REQUESTING_PARTY _City="Anaheim"
//                     _Name="Ameriquest Mortgage"
//                     _PostalCode="92806"
//                     _State="CA"
//                     _StreetAddress="1600 Douglass Road">
//     <CONTACT_DETAIL _Name="QTP Automation">
//       <CONTACT_POINT _Type="Email" _Value="test.qtp@equifax.com"/>
//       <CONTACT_POINT _RoleType="Home" _Type="Phone" _Value="770-740-0000"/>
//     </CONTACT_DETAIL>
//     <PREFERRED_RESPONSE _UseEmbeddedFileIndicator="N" _VersionIdentifier="2.1"/>
//   </REQUESTING_PARTY>
//     <REQUEST LoginAccountPassword="Password"
//            LoginAccountIdentifier="Account Number"
//            InternalAccountIdentifier="Account Number"
//            RequestingPartyBranchIdentifier="AMC123">
//     <KEY _Name="TestCaseDescription" _Value="amq supplement request public record no document" />
//     <KEY _Name="OrderNo" _Value="14443"/><KEY _Name="VMSProduct" _Value="SupplementReport-Liability"/>
//     <REQUEST_DATA>
//       <CREDIT_REQUEST LenderCaseIdentifier="1123223"
//                       MISMOVersionID="2.3"
//                       RequestingPartyRequestedByName="QTP Automation">
//         <CREDIT_REQUEST_DATA CreditReportIdentifier="J011B1"
//                              CreditReportRequestActionType="Update"
//                              CreditReportType="MergePlus"
//                              CreditRequestDateTime="Jul 24, 2006 10:49:35 AM"
//                              CreditRequestType="Individual"/>
//         <CREDIT_LIABILITY BorrowerID="Borrower"
//                           CreditLiabilityID="TRD0002"
//                           _AccountIdentifier="36104402555599"
//                           _UnpaidBalanceAmount="65975">
//           <_CREDITOR _Name="BANKAMERIC"/>
//           <CREDIT_COMMENT _SourceType="Lender">
//             <_Text>12 Months Payment History</_Text>
//             <_Text>Please Verfy Status of payments</_Text>
//           </CREDIT_COMMENT>
//         </CREDIT_LIABILITY>
//         <LOAN_APPLICATION>
//          <BORROWER BorrowerID="Borrower"
// 			 _FirstName="Robert"
// 			 _LastName="Ice"
// 			 _PrintPositionType="Borrower"
// 			 _SSN="301423221">
// 		<_RESIDENCE _StreetAddress="1404 SIMON KEEN RD"
// 				_City="ABBEVILLE"
// 				_State="GA"
// 				_PostalCode="31001" />
// 		<CONTACT_POINT _RoleType="Home"
// 				_Type="Phone"
// 				_Value="7705551234"
// 				_PreferenceIndicator="N" />
// 		<CONTACT_POINT _RoleType="Work"
// 				_Type="Phone"
// 				_Value="7705550011"
// 				_PreferenceIndicator="N" />
// 		<CONTACT_POINT _RoleType="Mobile"
// 				_Type="Phone"
// 				_Value="7705559876"
// 				_PreferenceIndicator="Y" />
// 		<CONTACT_POINT _RoleType="Mobile"
// 				_Type="Email"
// 				_Value="test.qtp@equifax.com"
// 				_PreferenceIndicator="Y" />
// 	  </BORROWER>
//         </LOAN_APPLICATION>
//         <EXTENSION/>
//       </CREDIT_REQUEST>
//     </REQUEST_DATA>
//   </REQUEST>
// </REQUEST_GROUP>`
//         console.log('reqData',reqData)
//         var config = {headers:HEADERS};
//        let response =await axios.post(MERGE,reqData, config);
//         parser.parseString(response.data, function (err, result) {
//         // result=JSON.stringify(result)
//         res.status(200).json({
//             success: true,
//             data: result,
//             message: ''
//         });
//     });

//     } catch (error) {
//         error = await errorHandler.errorCommon(error);
//         res.status(error.status);
//         res.json({
//             message: error.message
//         });
//     }
// }