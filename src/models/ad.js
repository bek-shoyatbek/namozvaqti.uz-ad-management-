import { Schema, model } from "mongoose";


const adSchema = new Schema({
    name: {
        type: String, required: true
    },
    link: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    location: {
        type: String,
        enum: ["header", "popup"],
        required: true
    },

    clicked: Number,

    seen: Number,
},
    {
        timestamps: true
    }
);



export default model("Ad", adSchema);