import mongoose, { Schema, Model } from 'mongoose';
import { isEmail, isPhoneNumber } from '../libs/utils/utils';
import { ContactDocument } from '../libs/types/modelTypes';

const contactSchema = new Schema<ContactDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      city: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 64,
        required: false,
      },
      street: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 128,
        required: false,
      },
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: isEmail,
        message: 'Invalid email format',
      },
    },
    description: {
      type: String,
      trim: true,
      required: false,
      lowercase: true,
      maxlength: 512,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact: Model<ContactDocument> = mongoose.model<ContactDocument>('Contact', contactSchema);
