import { Router } from "express";
import {
  createAccount,
  sendUserId,
  renderAccounts,
  AccountToggleDone,
  renderAccountEdit,
  editAccount,
  renderHome
} from "../controllers/accounts.controllers";


import {deleteUsers} from "../controllers/users.controller"

import {authJwt} from '../middleware'

const router = Router();

// Render all tasks
router.get("/", renderHome)
router.get("/api/auth/dashboard",[authJwt.verifyToken], renderAccounts);
router.post("/api/auth/dashboard/accounts/add", [authJwt.verifyToken, authJwt.isAdmin], createAccount);

//router.get("/accounts/:id/toggleDone", AccountToggleDone);

//router.get("/accounts/:id/edit", renderAccountEdit);

//router.post("/accounts/:id/edit", editAccount);

router.get("/accounts/:id", sendUserId);
router.get("/users/:id/delete", deleteUsers);
export default router;
