import User from "../model/User";

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