// import { userController } from "./user.controller"

import { Router } from "express";
import { userController } from "./users.controller";


const router=Router()


router.post("/auth/signup",userController.createUser)
router.post("/auth/signin",userController.signInUser)
router.get("/users",userController.getAllUser)

// router.get("/",userController.getUser)
// router.get("/:id",userController.getSingleUser)
// router.put("/:id",userController.updatedUser)
// router.put("/:id",userController.updatedUser)
// router.delete("/:id",userController.deleteUser)

export const userRoute=router;