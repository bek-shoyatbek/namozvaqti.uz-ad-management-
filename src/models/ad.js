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

    clicks: [
        {
            day: {
                type: String
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],

    views: [
        {
            day: {
                type: String
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],
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