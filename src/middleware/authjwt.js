import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../model/User'
import Role from '../model/Role'

export const verifyToken = async (req, res, next) => {
    //console.log(req.headers.cookie)
    const cookies = req.headers.cookie.split(";")
    console.log("cookies", cookies)
    const token = cookies[1]
    try {
        const tokenStr = token.substring(5).trim()
        if (!tokenStr) {
            console.log("No token provided")
            return res.status(403).json({ message: "No token provided" })
        } else {
            const decoded = jwt.verify(tokenStr,"banco")
            req.userId = decoded.id;
            const user = await User.findById(req.userId, { password: 0 })
            const roles = await Role.find({ _id: { $in: user.roles } })
            if (!user) return res.status(404).json({ message: 'No user found' })
            res.locals.user = user;
            console.log("user in local" , res.locals.user)
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    console.log("her in roles")
                    res.locals.admin = roles[i].name
                    break
                }
            }
            next()
        }
    } catch (error) {
        console.log(error)
        res.redirect("/");
    }
};

export const isAsesor = async (req, res, next) => {

    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "asesor") {
            next();
            return;
        }
    }

    console.log("Require Asesor role")
    return res.status(403).json({ message: "Forbidden" });

};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })
    
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    console.log("Require Admin role")
    return res.status(403).json({ message: "Forbidden" });
}
