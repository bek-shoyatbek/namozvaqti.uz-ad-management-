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

    clicks: {
        day: {
            type: Array,
            default: []
        }
    },

    views: {
        day: {
            type: Array,
            default: []
        }
    },
    active: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true
    }
);



export default model("Ad", adSchema);