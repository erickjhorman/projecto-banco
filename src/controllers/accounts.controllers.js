import Account from "../model/Account";

export const renderAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().lean();
    console.log("response",accounts)
    res.render("index", {
      accounts,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createAccount = async (req, res, next) => {
  try {
    console.log(req.body)
    const account = new Account(req.body);
    await account.save();
    res.redirect("/");
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

