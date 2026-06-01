import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            requred: true,
            maxLength:32,
        },
        email: {
            type: String,
            required: true,
            maxLength:124,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength:128,
        }
    }
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const User = model('User', userSchema);