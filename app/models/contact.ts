import mongoose, { Schema } from 'mongoose';
import { ContactDocument } from '../types/modelTypes';
import { isEmail, isPhoneNumber } from '../utils/utils';

const ContactSchema = new Schema<ContactDocument>(
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
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
      trim: true,
      validate: {
        validator: isPhoneNumber,
        message: 'Invalid Phone Number Format',
      },
    },
    address: {
      city: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: isEmail,
        message: 'Invalid email format',
      },
    },
    description: {
      type: String,
      required: false,
      maxlength: 512,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model<ContactDocument>('Contact', ContactSchema);
export { Contact };
