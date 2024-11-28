


module.exports={
    adminAuth :(req, res, next) => {
        const { role } = req.body.data;
        if (role !== 'admin') {
        return res.status(403).json({ error: "Access forbidden: Admins only" });
    }
    next();
},


}
