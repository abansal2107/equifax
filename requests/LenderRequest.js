const { body, check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {

    case 'lenders': {
      return [
        check('page').not().isEmpty().withMessage('The page field is required.'),        
      ]   
    }  
  }
}