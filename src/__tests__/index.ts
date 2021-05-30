import request from "supertest";

import app from "../index";

describe("basic", () => {

    it("works", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .then(() => done())
            .catch(err => done(err));
    });
});
