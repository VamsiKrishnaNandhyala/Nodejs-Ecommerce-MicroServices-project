const Order = require("../models/Order");

const axios = require("axios");

const createOrder = async (req, res) => {

    try {

        const { productId, quantity } = req.body;


        const response = await axios.get(

            `${process.env.PRODUCT_SERVICE_URL}/api/products/${productId}`

        );


        const product = response.data;


        if (!product) {

            return res.status(404).json({

                message: "Product Not Found"

            });

        }

        await axios.put(`${process.env.PRODUCT_SERVICE_URL}/api/products/${productId}/stock`,{quantity});

        const total = product.price * quantity;


        const order = await Order.create({

            productId: product._id,

            productName: product.name,

            price: product.price,

            quantity,

            totalAmount: total

        });

        res.status(201).json(order);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

const getOrders = async (req, res) => {

    try {

        const orders = await Order.find();

        res.status(200).json(orders);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

module.exports = {createOrder, getOrders};
