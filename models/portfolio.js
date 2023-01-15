import mongoose, { SchemaType } from "mongoose";

const { Schema, model} = mongoose;

const portfolioSchema =  new Schema(
    {
        nom :{
            type: String,
            required: true
        },
        prenom :{
            type: String,
            required: true
        },
        email :{
            type: String,
            required: true
        },
        image :{
            type: String,
            required: true
        },
        tel :{
            type: Number,
            required: true
        },
        bio :{
            type: String,
            required: true
        },
        idowner:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        skills:[{
            type: String,
            required: false
        }],
        languages:[{
            type: String,
            required: false
        }],
        projects: [{
            type:Schema.Types.ObjectId,
            ref: 'Project',
            required: false
        }],

    },
    {
        timestamps: true
    }
);

export default model('Portfolio',portfolioSchema);