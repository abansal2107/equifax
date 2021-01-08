"use strict";
exports.EQUIFAX = {
  // MERGE : "https://emsws-uat.equifax.com/emsws/services/post/MergeCreditWWW",
  // MERGE: "https://employment-uat.mconnect.equifax.com/talx/InteractionServlet",
  MERGE: "https://emsws-uat.equifax.com/emsws/services/post/MergeCreditWWW",
  HEADERS: { "Content-Type": `application/xml` },
};
exports.USER_ATTRIBUTES = [
  "id",
  "full_name",
  "location",
  "email",
  "user_type",
  "role_category_id",
  "country_code",
  "mobile_number",
  "status",
  "createdAt",
];
exports.INVESTOR_ATTRIBUTES = [
  "id",
  "name",
  "alias",
  "address",
  "phone",
  "website",
  "FHASponsorshipId",
  "VASponsorshipId",
  "executiveName",
  "executivePhone",
  "executiveEmail",
];
exports.LOCATION_ATTRIBUTES = [
  "id",
  "office",
  "manager",
  "address",
  "phone",
  "website",
  "status",
  "isDeleted",
];
(exports.HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  NOT_MODIFIED: 304,
  METHOD_NOT_ALLOWED: 405,
  PRE_CONDITION_ERROR: 412,
  SESSION_ERROR: 411,
  OK: 200,
  INSERT: 201,
  UPDATE: 200,
  DELETE: 204,
}),
  (exports.ERROR = {
    SESSION_EXPIRE: "Your session has been expired. Please login again.",
    SET_TOKEN: "Please set token in header",
    UNAVAILABLE_API: "Unavailable API",
    INACTIVE_OR_DELETED:
      "Your account seems to have been deactivated by the Administrator. Please contact We Scout Media team to find out how to reinstate your account. Thank you.",
    DELETE_BY_ADMIN:
      "Your account has been deleted. Contact your administrator for further assistance.",
    "#UNAUTHORIZED_EMAIL":
      "Your account is inactive. Contact your administrator to activate.",
    UNAUTHORIZED_EMAIL:
      "Account is not activated by admin, Please contact to administrator",
    INVALID_PASSWORD: "Invalid password",
    INVALID_EMAIL: "Entered email id does not exist.",
    INVALID_ID: "Id does not exist",
    INVALID_TOKEN: "Link incorrect or expired",
    INVALID_LINK: "Create password link has been either used once or expired.",
    OLD_PASSWORD: "Current password does not match",
    SET_PASSWORD: "Password already set",
    PASSWORD_ALREADY_SET:
      "Reset password link has been either used once or expired.",
    UNAUTHORIZED_USER: "you are not authorized user",
    EMAIL_NOT_SEND: "Email not send.",
    EMAIL_SEND: "Email  send.",
    DATA_UPDATE: "Data not updated",
    DATA_ALREADY_UPDATE: "Data already updated",
    DATA_EMPTY: "Data not found",
    DATA_ADDED: "Data not added",
    DATA_DELETE: "Data not deleted",
    DUPLICATE_DATA: "Duplicate name.",
    COMBINATION_EXIST: "Combination of entered state and city already exist",
  });
exports.DEMOGRAPHICINFO = {
  HISPANICOR_LATINO: "'mexican','puertoRican','cuban','other'",
  RACE:
    "'americanIndianOrAlaskaNative','asian','blackOrAfricanAmerican','nativeHawaiianOrOtherpacificIslander','white','doNotProvideinfo'",
  ASIAN:
    "'asianIndian','chinese','filiPino','japanese','korean','vietNamese','other'",
  NATIVEHAWAIIAN_OR_ALASKANATIVE:
    "'nativeHawaiian','guamanianOrChamorro','samoan','other'",
};
exports.MILITARY_STATUS = [
  "currentlyOnActiveDuty",
  "currentlyRetiredOrDischargedOrSeparatedFromService",
  "nonActivatedMember",
  "survivingSpouse",
];
// const Message = {
//     PRIMARYMLO_FOUND: 'Primary mlo found',
//     PRIMARYMLO_NOT_FOUND: 'Primary mlo not found',
//     PRIMARYMLO_ADDED: 'Great! Primary mlo has been added successfully.',
//     PRIMARYMLO_FAILED_TO_ADD: 'Oops! Failed to add primary mlo',
// }

// module.exports = Message
