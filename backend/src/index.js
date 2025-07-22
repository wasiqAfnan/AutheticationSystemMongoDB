import app from "./app.js";
import connectDb from "./db/config.js";

const port = process.env.PORT || 5000;

// connectiong to DB
connectDb().then(
    // starting the server only if DB connection has been established
    app.listen(port, () => {
        // for production
        // console.log(`Server is running.`);
        // for development
        console.log(`Server is running. URL: http://localhost:${port}`);
    })
);