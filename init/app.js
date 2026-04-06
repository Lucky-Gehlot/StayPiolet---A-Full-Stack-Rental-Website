const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../Models/listing.js")
const Review = require("../Models/review.js")


// 1. Connection logic
async function main(){
    await mongoose.connect("mongodb+srv://luckygehlot1400_db_user:Lucky12345@cluster0.dmldlra.mongodb.net/?appName=Cluster0");
}


// 2. Initialization logic
const initDB = async () =>{
    console.log("Starting DB initialization...");
    // first of all clean the data which is already there
    await Listing.deleteMany({});
    await Review.deleteMany({});
    // The data is likely an array in initData.js, so we iterate and insert individual documents
    // If initData.data is already an array of valid documents, this is fine:
    
    // initData.data = initData.data.map((obj) => ({...obj,owner:"6945b1c2279d706fa1c1f807"}))
    // await Listing.insertMany(initData.data); 
    console.log("Initialization complete!");
}


// 3. Execution: Call main(), and on success, call initDB()
main()
    .then(() => {
        console.log("**Connection successful!**");
        // CALL initDB() HERE to ensure the connection is open
        initDB(); 
    })
    .catch((err) => {
        console.error("Database connection or initialization failed:", err);
    });

// REMOVE the standalone initDB(); call from the end of the file.
// The problematic line: initDB();