const Products = require("./models/productSchema");
const produstsdata = require("./constant/productdata");


const DefaultData = async () => {
    try {
        await Products.deleteMany({});
        const storeData = await Products.insertMany(produstsdata);
        // console.log(storeData)
    } catch (error) {
        console.log("Error" + ":" + error.message)
    }
}

module.exports = DefaultData;