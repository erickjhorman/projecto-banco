import {Router} from 'express'
import * as authCtrl from '../controllers/auth.controller'
import {verifySignup} from '../middleware'
import {authJwt} from '../middleware'

const router = Router()

router.get("/signup", authCtrl.renderSignUpForm);
router.get("/signin", authCtrl.renderSigninForm);
router.post('/signup', [authJwt.verifyToken,verifySignup.checkDuplicateUsernameOrEmail, authJwt.isAdmin], authCtrl.signup)
router.post('/signin', authCtrl.signin)
router.get("/logout", authCtrl.logout);

export default router;