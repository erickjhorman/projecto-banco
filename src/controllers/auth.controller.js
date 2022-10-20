import User from '../model/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../model/Role'

export const signup = async (req, res) => {
  const {typeId, idNumber, lastname, username, email, password, roles } = req.body
  const newUser = new User({
    typeId,
    idNumber,
    lastname,
    username,
    email,
    password: await User.encryptPassword(password),
    roles
  })

    if (roles) {
      const foundRolers = await Role.find({ name: { $in: roles } })
      newUser.roles = foundRolers.map(role => role._id)
    } else {
      const role = await Role.findOne({ name: "user" })
      newUser.roles = [role._id];
    }
    await newUser.save();
    res.redirect("/api/auth/dashboard")
  }

export const renderSignUpForm = (req, res) => {
  res.render("signup");
}

export const renderSigninForm = (req, res) => res.render("signin");

export const signin = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate("roles")
  if (!userFound) return res.status(404).json({ message: "User not found" })
  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) {
    console.log("invalid pasword")
    req.flash('error_msg', "Nombre de usuario o contraseña invalido")
    res.redirect("signin")
    //return res.status(400).json({ token: null, message: 'Nombre de usuario o contraseña invalido'})
  
  }
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400
  })
  console.log(token)
  res.cookie('jwt', token,{maxAge:2 * 60 * 60 * 1000,httpOnly:true})
  res.redirect("/api/auth/dashboard");
}

export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
  };