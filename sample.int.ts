import request from "supertest";

import app from "../index";

describe("POST /api/v1/number", () => {
    /*
      app.user(express.json());
      app.post("/", (req, res) => {
          res.json(req.body);
      });
     */

    it("_", (done) => {
        request(app)
            .post("/")
            .send({ "_number": 132123123, "_string": "egah" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        _number: expect.any(Number),
                        _string: expect.any(String)
                    }),
                );
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
});
