import { Response, Request } from "express";
import Subject, { Isubject } from '../Model/subject';
import mongoose from 'mongoose';
import { log } from 'console';
import QuestionPaper from '../Model/questionPaper';

export async function addSubject(req: Request, res: Response): Promise<Response> {

  try {
    console.log("Req Body", req.body)

    const subjectName = req.body.subjectName;

    console.log(subjectName)
    const subjectAlreadyExist: Isubject = await Subject.findOne({ subjectName });
    if (subjectAlreadyExist) {
      return res.status(400).json({ Success: true, message: "Subject Already Exist" });
    }

    const subject = new Subject();
    subject.subjectName = subjectName;

    console.log(subject);
    subject.save();
    res.status(201).json({
      Success: true,
      message: " Subject Created", data: subject
    })
  } catch (error) {
    res.status(400).json({ Success: false, message: error.message })
  }
}

export async function getAllSubject(req: Request, res: Response): Promise<Response> {

  try {
    const allSubject = await Subject.find();

    const subjectWithPapercount = await Promise.all(
      allSubject.map(async (subject) => {
          const paperCount = await QuestionPaper.countDocuments({ subjectId: subject._id });
          return {
              ...subject.toObject(),
              paperCount // Include the count of questions
          };
      })
  );


    if (!allSubject) {
      res.status(400).json({ Success: false, message: "No Available Subject" })
    } else {
      // console.log(allSubject)
      const countquestionPaper = await 
      res.status(200).json({ Success: true, message: "All Subject Displayed", data: subjectWithPapercount })
    }
  } catch (error) {
    console.log("Error in catch", error);
    res.status(400).json({ Success: false, message: error.message })

  }
}
export async function deleteSubject(req: Request, res: Response): Promise<Response> {
  const subjectId = req.params._id;
  console.log("Request parameters: ", subjectId);
  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
    return res.status(400).json({ Success: false, message: "Invalid ID format" });
  }

  try {
    const finded_id: Isubject = await Subject.findOne({ _id: subjectId.trim() }); // Ensure we're querying with the right ID
    console.log("Subject found: ", finded_id);

    if (!finded_id) {
      return res.status(404).json({ Success: false, message: "Subject not found" });
    }

    const result = await Subject.deleteOne({ _id: subjectId });

    if (result.deletedCount === 0) {
      return res.status(400).json({ Success: false, message: "No Available Subject" });
    }

    console.log("Delete result: ", result);
    return res.status(200).json({ Success: true, message: "Deleted Subject", data: result });
  } catch (error) {
    console.log("Error in delete operation: ", error);
    return res.status(500).json({ Success: false, message: error.message });
  }
}

