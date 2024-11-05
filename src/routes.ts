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
import { UpdateUser } from "./controllers/users/UpdateUser";
import {CreatePosition} from "./controllers/Positions/CreatePosition";
import {DeletePosition} from "./controllers/Positions/DeletePosition";
import {ListPosition} from "./controllers/Positions/ListPosition";
import {ListJob} from "./controllers/Positions/ListJob";
import {UpdatePosition} from "./controllers/Positions/UpdatePosition";
import { AddCandidate } from "./controllers/Positions/AddCandidate";

const router = Router()

const listUsers = new ListUsers()
const createUser = new CreateUser()
const login = new Login()
const persistenceLogin = new PersistenceLogin()
const addSkill = new AddSkill()
const addExperience = new AddExperience()
const addAcademic = new AddAcademic()


const getUser = new GetUser()
const updateUser = new UpdateUser()

const createPosition = new CreatePosition()
const deletePosition = new DeletePosition()
const listPosition = new ListPosition()
const updatePosition = new UpdatePosition()
const listJob = new ListJob()
const addCandidate = new AddCandidate()


router.get("/listUsers", listUsers.handle)
router.get("/GetUser/:userId", getUser.handle)
router.put("/UpdateUser", AuthUser, updateUser.handle)

router.post("/createUser", createUser.handle)
router.post("/login", login.handle)
router.get("/persistenceLogin", AuthUser, persistenceLogin.handle)

router.put("/AddSkill", AuthUser, addSkill.handle)
router.put("/AddExperience", AuthUser, addExperience.handle)
router.put("/AddAcademic", AuthUser, addAcademic.handle)

router.post("/AddPosition", AuthUser, createPosition.handle)
router.delete("/DeletePosition/:title", AuthUser, deletePosition.handle)
router.get("/ListPosition", AuthUser, listPosition.handle)
router.get("/ListJob/:jobId", listJob.handle)
router.put("/UpdatePosition", AuthUser, updatePosition.handle)

router.put("/AddCandidate", AuthUser, addCandidate.handle)


export { router }