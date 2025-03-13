import mongoose, { Document, Schema } from "mongoose";

// Define interfaces for the model
interface IQuestion {
  type: string;
  isRequired: boolean;
  text: string;
  options: string[];
}

export interface ICreatorForm extends Document {
  isAcceptingResponses: boolean;
  creatorId: string;
  title: string;
  description: string;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const CreatorFormSchema = new Schema<ICreatorForm>(
  {
    isAcceptingResponses: {
      type: Boolean,
      default: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        _id: false,
        type: {
          type: String,
          required: true,
        },
        isRequired: {
          type: Boolean,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const CreatorForm = (mongoose.models.CreatorForm as mongoose.Model<ICreatorForm>) || 
  mongoose.model<ICreatorForm>("CreatorForm", CreatorFormSchema);

export default CreatorForm; 