import User from '../model/User' 

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    
    if(user) {
        req.flash('error_msg',"Usuario ya existe")
        res.redirect("signup")
    }//return res.status(400).json({message: "User already exists"});
    console.log("here",req.body.email)
    const email = await User.findOne({email: req.body.email});
    console.log(email)
    if(email){
        req.flash('error_msg',"Email ya existe")
        res.redirect("signup")
        //return res.status(400).json({message: "Email already exists"});
    } 
    
    next();
}