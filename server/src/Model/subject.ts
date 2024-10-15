import mongoose, { Schema } from 'mongoose';

export interface Isubject {
  subjectName: String
}

const SubjectSchema = new Schema<Isubject>({
  subjectName: {
    type: String,
    required: true
  }
} ,{timestamps :true})

const Subject = mongoose.model("subject", SubjectSchema);

export default Subject;