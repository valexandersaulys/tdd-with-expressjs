import request from "supertest";

import app from "../index";

jest.disableAutomock();

// @ts-ignore
import db from "../../models";
const { Nom } = db;

describe("Nom Model basic ops", () => {
    it("Nom exists", (done) => {
        expect(Nom).toBeDefined();
        done()
    });

    it("bulkDeletion can be called", (done) => {
        expect(Nom).toHaveProperty("destroy");
        done();
    });
});

describe("Nom Model getters & setters", () => {
    beforeAll(async () => {
        await Nom.destroy({ truncate: true });
    });

    it("Nom.create(987654321)", async () => {
        const _n: number = 987654321;
        let nom = await Nom.create({ number: _n });

        expect(nom).toMatchObject(
            expect.objectContaining({
                id: expect.any(Number),
                number: _n,
                squared: _n ** 2,
                cubed: _n ** 3,
                prime: false
            })
        );
        return;
    });

    it("Nom.create(7919)", async () => {
        const _n: number = 7919;
        let nom = await Nom.create({ number: _n });

        expect(nom).toMatchObject(
            expect.objectContaining({
                id: expect.any(Number),
                number: _n,
                squared: _n ** 2,
                cubed: _n ** 3,
                prime: true
            })
        );
        return;
    });

    describe("Nom.findOne(...)", () => {
        const _n: number = 7919;
        let _thisId: number;

        beforeAll(async () => {
            await Nom.destroy({ truncate: true });
            let nom = await Nom.create({ number: _n });
            _thisId = nom.id;
        });
        it("", async () => {
            let nom = await Nom.findOne({ where: { id: _thisId } });
            expect(nom).toMatchObject(
                expect.objectContaining({
                    id: expect.any(Number),
                    number: _n,
                    squared: _n ** 2,
                    cubed: _n ** 3,
                    prime: true
                })
            );
            return
        });
    });
});
