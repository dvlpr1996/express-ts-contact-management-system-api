import mongoose, { Schema, Model } from 'mongoose';
import CryptoJS from 'crypto-js';
import { RoleEnum } from '../types/types';
import { UserDocument } from '../types/modelTypes';
import { isEmail, isPhoneNumber } from '../utils/utils';

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 12,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
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
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: 8,
      maxlength: 128,
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
    role: {
      type: String,
      enum: [RoleEnum.ADMIN, RoleEnum.USER],
      required: true,
      default: RoleEnum.USER,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const hashedCandidate = CryptoJS.SHA256(candidatePassword).toString();
  return Promise.resolve(hashedCandidate === this.password);
};

userSchema.methods.softDelete = async function (): Promise<void> {
  this.isDeleted = true;
  await this.save();
};

userSchema.post('findOneAndDelete', async function (doc: UserDocument | null) {
  if (doc) {
    const Contact = mongoose.model('Contact');
    await Contact.deleteMany({ user: doc._id });
  }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = CryptoJS.SHA256(this.password).toString();
  next();
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export { User };
