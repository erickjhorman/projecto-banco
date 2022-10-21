import User from "../model/User";
import UserLog from "../model/UserLog";

export const renderUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    //console.log("response",users)
    return users
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const renderUsersLog = async (req, res) => {
  try {
    const userLog = await UserLog.find().lean();
    console.log("userLog",userLog)
    return userLog
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const deleteUsers = async (req, res, next) => {
  let today = new Date();
  console.log(today)
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time)
  if (time >= "14:00:00" && (time <= "14:55:00")) {
    console.log("Invalid time to delete users")
    req.flash('error_msg', "Timpo no valido para eliminar usuarios")
    res.redirect("/api/auth/dashboard")
    return;
   }
      try {
      console.log("delete Users")
      let { id } = req.params;
      const {typeId,idNumber,username,lastname,email} = await User.findById({ _id: id})
     
      const userLog  =  new UserLog({
        typeId,
        idNumber,
        username,
        lastname,
        email
      })
      console.log("user found",userLog)
      await User.deleteOne({ _id: id });
      await userLog.save()
      req.flash('success_msg', "User eliminado")
      res.redirect("/api/auth/dashboard")
      
    } catch (error) {
      console.log("error",error)
        req.flash('error_msg', "Fallo al eliminar usuario")
        res.redirect("/api/auth/dashboard")
    }
};