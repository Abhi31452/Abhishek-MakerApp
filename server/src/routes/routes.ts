const express = require("express");
import { login } from "../Controller/login.controller";
import { signup } from "../Controller/signup.controller";
import { addSubject, deleteSubject, getAllSubject } from '../Controller/subject.controller';
import { addQuestionPaper, deleteQuestionPaper, getAllQuestionPaper, updateQuestionPaper } from '../Controller/questionPaper.contoller';
import { addQuestion, deleteQuestion, getAllQuestions, getAllQuestionswithID, updateQuestion } from '../Controller/questions.controller';
import { isLoggedin } from '../util/auth.middleware';
import { logout } from '../Controller/logout.controller';
import { generateAccessthroughRefresh } from '../Controller/generaterefresh.controller';


export const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout",logout)
route.get("/refreshToken", generateAccessthroughRefresh)



route.get("/getAllSubject", isLoggedin, getAllSubject);
route.post("/addSubject", isLoggedin, addSubject);
route.delete("/deleteSubject/:_id", isLoggedin, deleteSubject);


route.get("/getAllQuestionPaper", isLoggedin, getAllQuestionPaper)
route.post("/addQuestionPaper", isLoggedin, addQuestionPaper)
route.put("/updatequestionPaper/:_id", isLoggedin, updateQuestionPaper)
route.delete("/deleteQuestionPaper/:_id", isLoggedin, deleteQuestionPaper)

route.get("/getAllQuestion", isLoggedin, getAllQuestions)
route.get("/getAllQuestion/:_id", isLoggedin, getAllQuestionswithID)
route.post("/addQuestion", isLoggedin, addQuestion)
route.put("/updatequestion/:_id", isLoggedin, updateQuestion)
route.delete("/deleteQuestion/:_id", isLoggedin, deleteQuestion)