function authMiddleware(req, res, next){
    if (!req.session.usuarioLogueado){
        return res.redirect('/user/login');       
    } 
    next();
}

module.exports = authMiddleware;


//Pendiente implementación en el método

//si hay un user en session, te dejará continuar
 ///debes estar autenticado (logueado) para avanzar sobre la ruta
 const authMiddleware = function (req, res, next){
    if(req.session.userlogged)
        return next
     else{
        return res.redirect("/cuenta/login")
 module. exports = authMiddleware;
