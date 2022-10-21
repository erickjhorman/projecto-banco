import Account from "../model/Account";
import {renderUsers, renderUsersLog} from "../controllers/users.controller"

export const renderHome = async(req,res) => {
  res.render("index");
}

export const renderAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().lean();
    //console.log("response",accounts)
  
    const users = await renderUsers();
    const userLogs = await renderUsersLog();
    console.log("user logs in das", userLogs)
    //console.log("render users in account", users)
      res.render("dashboard", {
        accounts,
        users,
        userLogs
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createAccount = async (req, res, next) => {
  try {
    //console.log(req.body)
    const cookies = req.headers.cookie.split(";")
    let userId = 0 
    for(let i = 0;i<cookies.length;i++) {
      if(cookies[i].includes("userId")){
        userId = cookies[i].substring(8)
       }
   }
   
    const {accountType} = req.body
    const account = new Account({
      userId : userId,
      accountType,
      accountNumber: Math.floor(Math.random() * 1000000000)
    });
   console.log("save accounts",account)
    await account.save();
    req.flash('success_msg',"Cuenta creada")
    res.redirect("/api/auth/dashboard")
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};
export const AccountToggleDone = async (req, res, next) => {
  let { id } = req.params;
  const account = await Account.findById(id);
  account.done = !account.done;
  await account.save();
  res.redirect("/");
};



export const renderTaskEdit = async (req, res, next) => {
  const account = await Account.findById(req.params.id).lean();
  res.render("edit", { account });
};

export const editAccount = async (req, res, next) => {
  const { id } = req.params;
  await Account.updateOne({ _id: id }, req.body);
  res.redirect("/");
};

export const deleteAccount = async (req, res, next) => {
  let { id } = req.params;
  await Account.remove({ _id: id });
  res.redirect("/");
};

export const sendUserId = async (req, res) => {
  let { id } = req.params;
  res.cookie('userId', id,{maxAge:2 * 60 * 60 * 1000,httpOnly:true})
  res.redirect("/api/auth/dashboard");
};

