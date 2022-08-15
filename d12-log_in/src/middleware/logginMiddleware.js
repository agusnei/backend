const logginMiddleware = (req, res, next) => {
    if(!req.session.user) {
        console.log("Primero debes loguearte")
        res.redirect("/api/login")
    } else {
        console.log(`Ingreso el usuario ${req.session.user}`)
        return next()
    }
}

export { logginMiddleware }