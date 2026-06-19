const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(

    {

        productId: {

            type: String,

            required: true

        },

        productName: {

            type: String,

            required: true

        },

        price: {

            type: Number,

            required: true

        },

        quantity: {

            type: Number,

            required: true

        },

        totalAmount: {

            type: Number,

            required: true

        }

    },

    {

        timestamps: true

    }

);


module.exports = mongoose.model("Order", orderSchema);