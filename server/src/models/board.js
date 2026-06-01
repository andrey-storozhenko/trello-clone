import { Schema, model } from 'mongoose';

const boardSchema = newSchema(
    {
        title: {
            type: String,
            trim: true,
            maxLength: 32,
            required:true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref:'User'
        }]
    }
);

export const Board = model('Board', boardSchema);