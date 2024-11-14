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
import { DeleteSkill } from "./controllers/profile/DeleteSkill";
import { EditSkill } from "./controllers/profile/EditSkill";
import { ListPositionByUser } from "./controllers/Positions/ListPositionsByUser";
import { DeleteExperience } from "./controllers/profile/DeleteExperience";
import { DeleteAcademic } from "./controllers/profile/DeleteAcademic";
import { SendMessage } from "./controllers/Communication.ts/SendMessage";
import { GetConversation } from "./controllers/Communication.ts/GetConversation";
import { ListFreelancers } from "./controllers/users/ListFreelancers";
import { SendHelp } from "./controllers/Help/SendHelp";

const router = Router()

const sendMessage = new SendMessage();
const getConversation = new GetConversation();

const listUsers = new ListUsers()
const createUser = new CreateUser()
const login = new Login()
const persistenceLogin = new PersistenceLogin()


const addSkill = new AddSkill()
const editSkill = new EditSkill()
const deleteSkill = new DeleteSkill()

const addExperience = new AddExperience()
const deleteExperience = new DeleteExperience()

const addAcademic = new AddAcademic()
const deleteAcademic = new DeleteAcademic()


const getUser = new GetUser()
const updateUser = new UpdateUser()

const createPosition = new CreatePosition()
const listPositionByUser = new ListPositionByUser()
const deletePosition = new DeletePosition()
const listPosition = new ListPosition()
const listFreelancers = new ListFreelancers()
const updatePosition = new UpdatePosition()
const listJob = new ListJob()
const addCandidate = new AddCandidate()
const helpModel = new SendHelp()

router.post("/sendMessage", AuthUser, sendMessage.handle);
router.get("/getConversation/:userId/:recipientId", AuthUser, getConversation.handle);

router.get("/listUsers", listUsers.handle)
router.get("/GetUser/:userId", getUser.handle)
router.put("/UpdateUser", AuthUser, updateUser.handle)

router.post("/createUser", createUser.handle)
router.post("/login", login.handle)
router.get("/persistenceLogin", AuthUser, persistenceLogin.handle)

router.put("/AddSkill", AuthUser, addSkill.handle)
router.put("/EditSkill", AuthUser, editSkill.handle)
router.put("/DeleteSkill", AuthUser, deleteSkill.handle)

router.put("/AddExperience", AuthUser, addExperience.handle)
router.put("/DeleteExperience", AuthUser, deleteExperience.handle)


router.put("/AddAcademic", AuthUser, addAcademic.handle)
router.put("/DeleteAcademic", AuthUser, deleteAcademic.handle)


router.post("/AddPosition", AuthUser, createPosition.handle)
router.delete("/DeletePosition/:id", AuthUser, deletePosition.handle)
router.get("/ListPosition", AuthUser, listPosition.handle)
router.get("/ListPositionByUser", AuthUser, listPositionByUser.handle)
router.get("/ListJob/:jobId", listJob.handle)
router.put("/UpdatePosition", AuthUser, updatePosition.handle)
router.get("/ListFreelancers", AuthUser, listFreelancers.handle )

router.post("/SendHelp", helpModel.handle)

router.put("/AddCandidate", AuthUser, addCandidate.handle)


export { router }