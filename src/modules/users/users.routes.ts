// import { userController } from "./user.controller"

import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
import verifyAdmin from "../../middleware/verifyAdmin";
import verifyAccess from "../../middleware/verifyAccess";


const router=Router()


router.post("/auth/signup",userController.createUser)
router.post("/auth/signin",userController.signInUser)
router.get("/users",auth(),verifyAdmin(),userController.getAllUser)
router.put("/users/:userId",auth(),verifyAccess(),userController.updateUser)
router.delete("/users/:userId",auth(),verifyAccess(),userController.deleteUser)

// router.get("/",userController.getUser)
// router.get("/:id",userController.getSingleUser)
// router.put("/:id",userController.updatedUser)
// router.put("/:id",userController.updatedUser)
// router.delete("/:id",userController.deleteUser)

export const userRoute=router;