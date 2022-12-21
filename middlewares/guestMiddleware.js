
const fs = require("fs");
const path = require("path");

function guestMiddleware (req, res, next){
    res.locals.isAnUserLogged = false;
    if( req.session.userLogged != undefined) {
			res.redirect('/');
        }
        next();
    }
    

module.exports = guestMiddleware;