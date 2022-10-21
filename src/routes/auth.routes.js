import {Router} from 'express'
import * as authCtrl from '../controllers/auth.controller'
import {verifySignup} from '../middleware'
import {authJwt} from '../middleware'

const router = Router()

router.get("/signup", [authJwt.isAdmin], authCtrl.renderSignUpForm);
router.get("/signin", authCtrl.renderSigninForm);
router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail], authCtrl.signup)
router.post('/signin', authCtrl.signin)
router.get("/logout", authCtrl.logout);

export default router;