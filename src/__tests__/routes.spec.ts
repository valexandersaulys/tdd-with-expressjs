import request from "supertest";

import app from "../index";

describe("POST /api/v1/number", () => {
    it("incorrect headers & empty data returns 400", (done) => {
        request(app)
            .post("/api/v1/number")
            .expect(400)
            .then(res => res.body)
            .then(json => expect(json).toEqual(
                expect.objectContaining({
                    status: "garbled",
                    message: expect.any(String)
                })
            ))
            .then(() => done())
            .catch(err => done(err));
    });

    it("incorrect headers but has data returns 400", (done) => {
        request(app)
            .post("/api/v1/number")
            .send("asdfadf=asdfasdfasdf")
            .expect(400)
            .then(res => res.body)
            .then(json => expect(json).toEqual(
                expect.objectContaining({
                    status: "garbled",
                    message: expect.any(String)
                })
            ))
            .then(() => done())
            .catch(err => done(err));
    });

    it("correct headers but no data returns 400", (done) => {
        request(app)
            .post("/api/v1/number")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .then(res => res.body)
            .then(json => expect(json).toEqual(
                expect.objectContaining({
                    status: "garbled",
                    message: expect.any(String)
                })
            ))
            .then(() => done())
            .catch(err => done(err));
    });

    it("Returns 201 if valid number is passed", (done) => {
        const _number = 987654321;
        request(app)
            .post("/api/v1/number")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .send({ "number": _number })
            .then(res => res.body)
            .then(json => expect(json).toEqual(
                expect.objectContaining({
                    status: "accepted",
                    message: expect.stringContaining(String(_number)),
                    id: expect.any(Number)
                })
            ))
            .then(() => done())
            .catch(err => done(err))
    });
});

describe("GET /api/v1/number", () => {
    it("returns 400 if the id is not included", (done) => {
        request(app)
            .get("/api/v1/number")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .then(res => res.body)
            .then(json => expect(json).toEqual(
                expect.objectContaining({
                    status: "user error",
                    message: expect.stringContaining("missing id")
                })
            ))
            .then(() => done())
            .catch(err => done(err))
    })

    it("returns 404 if the id is provied but missing", (done) => {
        request(app)
            .get("/api/v1/number")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .send({ id: 9999 })
            .expect(404)
            .then(res => res.body)
            .then(json => expect(json).toEqual(
                expect.objectContaining({
                    status: "cannot find",
                    message: expect.stringContaining("9999")
                })
            ))
            .then(() => done())
            .catch(err => done(err))
    });
});
