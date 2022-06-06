const { check } = require('express-validator');


exports.signupValidation=[
    check('name','Name is requied').not().isEmpty(),
    check('email','please enter valid email').isEmail().normalizeEmail({gmailremovedots:true}),
    check('username','UserName is requied').not().isEmpty(),
    check('password','password must be 6 or more characters').isLength({min:6})

]
exports.loginValidation=[
    check('email','please enter valid email').isEmail().normalizeEmail({gmailremovedots:true}),
    check('password','password must be 6 or more characters').isLength({min:6})

]