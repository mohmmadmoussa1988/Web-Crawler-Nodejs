const { validationResult } = require('express-validator/check');
const validUrl = require('valid-url');

const checkReqValidation = (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return({ error: errors.array()});
    }
    return true;
}

const checkUrl = (url) =>{
    if(!validUrl.isUri(url)){
        return false;
    }
    return true;

}

module.exports ={checkReqValidation,checkUrl};