const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")


router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log(productsdata)
        res.status(201).json(productsdata)
    } catch (error) {
        console.log("Error" + ":" + error.message);
    }
});

///get single product data

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);

        const individualData = await Products.findOne({ id: id });
        // console.log(individualData)

        res.status(201).json(individualData)
    } catch (error) {
        res.status(400).json(individualData);
        console.log("Error" + ":" + error.message);
    }
})

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "complete all the fields" });
        console.log("not data completed");
    };

    try {
        const preusercheck = await USER.findOne({ email: email });

        if (preusercheck) {
            res.status(422).json({ error: "this user is already exists" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password & confirm password is not matching" })
        } else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });

            //hashing proccess


            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata)
        }
    } catch (error) {

    }
})

//login route

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "fill the data" })
    };

    try {
        const userlogin = await USER.findOne({ email: email })
        // console.log(userlogin);

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);

            //token generate

            const token = await userlogin.generatAuthtoken()
            // console.log(token);
            res.cookie("amazoneweb", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid creadentials" })
            } else {
                res.status(201).json(userlogin)
            }
        } else {
            res.status(400).json({ error: "Invalid creadentials" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid details" })
    }
})

//add data into cart

router.post("/addcart/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id })
        console.log(cart + "cart value");

        const UserContact = await USER.findOne({ _id: req.userID });
        console.log(UserContact);

        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart)
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact)
        } else {
            res.status(401).json({ error: "Invalid user" })
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid user" })
    }
})


module.exports = router;