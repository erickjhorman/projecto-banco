import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  renderAccounts,
  AccountToggleDone,
  renderAccountEdit,
  editAccount,
} from "../controllers/accounts.controllers";

const router = Router();

// Render all tasks
router.get("/", renderAccounts);

router.post("/accounts/add", createAccount);

//router.get("/accounts/:id/toggleDone", AccountToggleDone);

//router.get("/accounts/:id/edit", renderAccountEdit);

//router.post("/accounts/:id/edit", editAccount);

//router.get("/accounts/:id/delete", deleteAccount);

export default router;
