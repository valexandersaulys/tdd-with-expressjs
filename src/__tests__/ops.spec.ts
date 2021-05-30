import request from "supertest";

import app from "../index";


// @ts-ignore
import db from "../../models";
const { Nom } = db;

jest.spyOn(Nom, 'create').mockResolvedValue({
    id: 1,
    "number": 987654321,
    squared: 987654321 ** 2,
    cubed: 987654321 ** 3,
    prime: true
})
jest.spyOn(Nom, 'findOne').mockResolvedValue({
    toJSON: () => ({
        id: 1,
        "number": 987654321,
        squared: 987654321 ** 2,
        cubed: 987654321 ** 3,
        prime: true
    })
});

// jest.disableAutomock();
//const db = require("../../models");

describe("Check Mocks", () => {
    it("can load the mock", (done) => {
        expect(db.Nom.create._isMockFunction).toBeTruthy();
        expect(db.Nom.findOne._isMockFunction).toBeTruthy();
        done();
    });
});


describe("POST /api/v1/number", () => {
    it("will call create Nom", (done) => {
        request(app)
            .post("/api/v1/number")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .send({ "number": 987654321 })
            .then(res => {
                expect(Nom.create).toHaveBeenCalledTimes(1);
                expect(Nom.create).toHaveBeenCalledWith({ number: 987654321 });
                expect(res.body?.id).toBe(1);
            })
            .then(() => done())
            .catch(err => done(err))
    });
});

describe("GET /api/v1/number", () => {
    it("will call findOne on Nom", (done) => {
        request(app)
            .get("/api/v1/number")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .send({ id: 1 })
            .then(res => {
                expect(Nom.findOne).toHaveBeenCalledTimes(1);
                expect(Nom.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
                expect(res.body?.id).toBe(1);
            })
            .then(() => done())
            .catch(err => done(err));
    });
});
