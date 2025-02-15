const isEmpty = require('./isEmpty') ;
const validator = require('validator')


module.exports = function ValidateRegister(data){
    let errors = {} ;

    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    //confirmation password
    data.confirm = !isEmpty(data.confirm) ? data.confirm : ""


    if(validator.isEmpty(data.name)){
        errors.name = "Required name"
    }
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
    //confirmation password (the same 2 password)
    if(!validator.equals(data.password , data.confirm)){
        errors.confirm = "Passwords not matches"
    }
    if(validator.isEmpty(data.confirm)){
        errors.confirm = "Required confirm"
    }
    

    return {
        errors,
        isValid : isEmpty(errors) //etkoun valid kan ma3anach 7atta errors
    }
}