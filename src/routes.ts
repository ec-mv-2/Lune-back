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
import { GetConversation } from "./controllers/Communication.ts/GetConversation";
import { ListFreelancers } from "./controllers/users/ListFreelancers";
import { SendHelp } from "./controllers/Help/SendHelp";
import { Chat } from "./controllers/Communication.ts/chat";
import { NewMessage } from "./controllers/Communication.ts/newMessage";
import { ListMessages } from "./controllers/Communication.ts/listMessages";
import { ListContractors } from "./controllers/users/ListContractors";
import { ListHelp } from "./controllers/Help/ListHelp";
import { BanUser } from "./controllers/users/BanUser";

const chat = new Chat()

const router = Router()

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
const listHelp = new ListHelp()

const newMessage = new NewMessage()

const listMessages = new ListMessages()


const banUser = new BanUser()

const listContractors = new ListContractors()

router.post("/listMessages", AuthUser, listMessages.handle);

router.get("/listContractors", AuthUser, listContractors.handle);



router.post("/newMessage", AuthUser, newMessage.handle);


router.post("/getConversation", AuthUser, chat.handle);

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
router.get("/ListHelp", listHelp.handle)

router.delete("/BanUser/:userId", AuthUser, banUser.handle)


router.put("/AddCandidate", AuthUser, addCandidate.handle)


export { router }