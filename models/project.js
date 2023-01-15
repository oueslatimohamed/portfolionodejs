import mongoose, { SchemaType } from "mongoose";

const { Schema, model} = mongoose;

const projectSchema =  new Schema(
    {
        titre :{
            type: String,
            required: true
        },
        description :{
            type: String,
            required: true
        },
        technologie :{
            type: String,
            required: true
        },
        image :{
            type: String,
            required: false
        },
        portfolioId:{
            type: Schema.Types.ObjectId,
            ref: 'Portfolio',
            required: false
        },
        idowner:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },


    },
    {
        timestamps: true
    }
);

export default model('Project',projectSchema);