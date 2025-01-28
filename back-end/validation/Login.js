const isEmpty = require('./isEmpty') ;
const validator = require('validator')


module.exports = function ValidateLogin(data){
    let errors = {} ;


    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""


    // check email type :
    if(!validator.isEmail(data.email)){
        errors.email = "Required format email"
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Required email"
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Required password"
    }
    

    return {
        errors,
        isValid : isEmpty(errors) //etkoun valid kan ma3anach 7atta errors
    }
}