import express from "express";
// @ts-ignore
import db from "../models";

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());


// test route only
// app.post("/", (req, res) => { res.json(req.body); });


app.post("/api/v1/number", (req, res) => {
    if (!req.body?.number)
        return res.status(400).json({
            status: "garbled",
            message: `Unknown POST request ${req.body}`
        });

    return db.Nom
        .create({ number: req.body.number })
        .then((nom: db.Nom) => (
            res.status(201)
                .json({
                    status: "accepted",
                    message: `Received number ${req.body.number}`,
                    id: nom.id
                })
        ))
        .catch((err: Error) => (
            res.status(500).send("")
        ));
});

app.get("/api/v1/number", (req, res) => {
    if (!req.body?.id)
        return res.status(400).json({
            status: "user error",
            message: "missing id"
        });

    return db.Nom
        .findOne({ where: { id: req.body.id } })
        .then((nom: db.Nom) => {
            return res.status(200).json(nom.toJSON());
        })
        .catch((err: Error) => {
            return res
                .status(404)
                .json({
                    status: "cannot find",
                    message: `cannot find id ${req.body.id}`
                })
        });
});

if (process.env.NODE_ENV != "TEST") {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
}

export default app;
