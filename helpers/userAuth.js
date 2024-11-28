


module.exports={
    adminAuth :(req, res, next) => {
        const { role } = req.payload;
        if (role !== 'admin') {
        return res.status(403).json({ error: "Access forbidden: Admins only" });
    }
    next();
},


}
