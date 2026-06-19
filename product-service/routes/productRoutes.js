const express = require("express");

const router = express.Router();


const {createProduct, getProducts, getProductById, updateProduct, deleteProduct, updateStock} = require("../controllers/productController");


router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.put("/:id/stock", updateStock);

module.exports = router;