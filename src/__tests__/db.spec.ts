import request from "supertest";

import app from "../index";
// @ts-ignore
import * as db from "../../models";
// const db = require("../../models");
const { sequelize, Sequelize } = db;

jest.disableAutomock();

describe("Data Layer", () => {
    it("Sequelize Exists", (done) => {
        expect(sequelize).toBeDefined();
        expect(Sequelize).toBeDefined();
        done();
    });

    it("Expect Nom to exist", (done) => {
        expect(db.Nom).toBeDefined();
        done();
    });

    // is this necesary?
    it("Expect Nom to have appropriate attributes", (done) => {
        const { Nom } = db;
        expect(Nom).toHaveProperty("rawAttributes");
        expect(Nom.rawAttributes).toHaveProperty("number");
        expect(Nom.rawAttributes.number.type).toEqual(Sequelize.FLOAT());
        expect(Nom.rawAttributes).toHaveProperty("squared");
        expect(Nom.rawAttributes.squared.type).toEqual(Sequelize.FLOAT());
        expect(Nom.rawAttributes).toHaveProperty("cubed");
        expect(Nom.rawAttributes.cubed.type).toEqual(Sequelize.FLOAT());
        expect(Nom.rawAttributes).toHaveProperty("prime");
        expect(Nom.rawAttributes.prime.type).toEqual(Sequelize.BOOLEAN());
        done();
    });

    it("We can save to the database", (done) => {
        const { Nom } = db;
        expect(async () => {
            await Nom.create({
                "number": 987654321
            });
        }).not.toThrow();
        done();
    });
});
