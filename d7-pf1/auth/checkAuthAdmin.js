const checkAuthAdmin = async (req, res, next) => {
    if (!process.env.ADMIN){
        const error = new Error('Unauthorized');
        //status error 401 ->check valid authentication credentials
        return res.status(401).json({msg: error.message});
    }
    next();
}

export default checkAuthAdmin;