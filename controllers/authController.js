var exports = module.exports = {}
 
exports.signup = function(req, res) {
    console.log(`authcont 4 ${res}`);
    res.redirect('/')
    // res.render('signup');
    //toggle signup
 
}

exports.signin = function (req, res) {
    res.render('signin');
    //toggle signin
}