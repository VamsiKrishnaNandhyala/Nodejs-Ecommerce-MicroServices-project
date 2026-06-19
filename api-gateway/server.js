const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const {createProxyMiddleware} = require("http-proxy-middleware");

dotenv.config();
console.log(process.env.PRODUCT_SERVICE);

const app = express();


app.use(cors());

app.use(express.json());


app.use((req,res,next)=>{

    console.log("Method:",req.method);

    console.log("URL:",req.url);

    next();

});

// USER SERVICE

app.use("/api/users", createProxyMiddleware({

        target: process.env.USER_SERVICE,

        changeOrigin: true

    })

);


// PRODUCT SERVICE

app.use("/api/products", createProxyMiddleware({

        target: process.env.PRODUCT_SERVICE,

        changeOrigin: true

    })

);


// ORDER SERVICE

app.use("/api/orders", createProxyMiddleware({

        target: process.env.ORDER_SERVICE,

        changeOrigin: true

    })

);


app.get("/", (req, res) => {

    res.send(

        "API Gateway Running"

    );

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(

        `API Gateway Running On ${PORT}`

    );

});