import { Router } from "express";
import { ListUsers } from "./controllers/users/ListUsers";
import { CreateUser } from "./controllers/users/CreateUser";
import { Login } from "./controllers/users/Login";
import { PersistenceLogin } from "./controllers/users/PersistenceLogin";
import AuthUser from "./middleware/AuthUser";
import { AddSkill } from "./controllers/profile/AddSkill";
import { GetUser } from "./controllers/users/GetUser";
import { AddExperience } from "./controllers/profile/AddExperience";
import { AddAcademic } from "./controllers/profile/AddAcademic";

const router = Router()

const listUsers = new ListUsers()
const createUser = new CreateUser()
const login = new Login()
const persistenceLogin = new PersistenceLogin()
const addSkill = new AddSkill()
const addExperience = new AddExperience()
const addAcademic = new AddAcademic()



const getUser = new GetUser()



router.get("/listUsers", listUsers.handle)
router.get("/GetUser/:userId", getUser.handle)

router.post("/createUser", createUser.handle)
router.post("/login", login.handle)
router.get("/persistenceLogin", AuthUser, persistenceLogin.handle)

router.put("/AddSkill", AuthUser, addSkill.handle)
router.put("/AddExperience", AuthUser, addExperience.handle)
router.put("/AddAcademic", AuthUser, addAcademic.handle)


export { router }