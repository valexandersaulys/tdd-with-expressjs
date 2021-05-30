import express from "express";

const app = express();
const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
    res.send("TypeScript is working -- now I changed soasdfamething");
});

if (process.env.NODE_ENV != "TEST") {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
} 

export default app;
