import mongoose, { Document, Schema } from "mongoose";

// Define interfaces for the model
interface IResponseQuestion {
  question: string;
  answer: string;
  answer_type: string;
}

export interface IUserFormResponse extends Document {
  userId: string;
  formId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  questions: IResponseQuestion[];
}

// Define the schema
const UserFormResponseSchema = new Schema<IUserFormResponse>({
  userId: {
    type: String,
    required: true,
  },
  formId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
      },
      answer_type: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create a unique compound index on userId and formId
UserFormResponseSchema.index({ userId: 1, formId: 1 }, { unique: true });

// Create and export the model
const UserFormResponse = (mongoose.models.UserFormResponse as mongoose.Model<IUserFormResponse>) || 
  mongoose.model<IUserFormResponse>("UserFormResponse", UserFormResponseSchema);

export default UserFormResponse; 