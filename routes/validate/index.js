const { body,query } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'SearchTerm': {
     return [ 
        body('SearchTerm', `Search term dosen't exit`).exists(),
       ]   
    }
    case 'timestamp':{
        return [ 
            query('timestamp', `Timestamp dosen't exit`).exists(),
           ]   
    }
    case 'count':{
      return [ 
          query('count', `count dosen't exit`).exists(),
         ]   
  }
  }
}