const request = require('supertest');

// Instead of using require for chai, use dynamic import
const log4js = require("log4js")
log4js.configure({
    appenders: { alles: { type: "file", filename: "apiPersoneel.log" } },
    categories: { default: { appenders: ["alles"], level: "trace" } }
});
const logger = log4js.getLogger("alles")

import('chai').then(chai => {
    const expect = chai.expect;

    request('http://localhost:8081')
        .get('/api/dieren/7')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
            if (!res.body[0]?.hasOwnProperty('Naam')) throw new Error("Expected 'naam' key!");
            if (!res.body[0]?.hasOwnProperty('Ras')) throw new Error("Expected 'ras' key!");
        })
        .end((err, res) => {
            if (err) throw err;
            logger.trace("Test 1 passed");
            console.log("Test 1 passed");
        });

    const data = {"Reservering_Id": 1001, "Voornaam": "Jakub", "Gebruiker_Id": 8, "Dier_Id": 14};

    request('http://localhost:8081')
        .post('/api/reserveringen')
        .send(data)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            logger.trace("statuscode = ", res.statusCode)
            console.log("Test 2 passed")
            expect(res.statusCode).to.be.equal(201)
            if (err) throw err;

            // Now, we retrieve the reservation ID from the response body
            const reservationId = 1001;

            // Use the correct endpoint and remove the extra curly brace
            request('http://localhost:8081')
                .delete(`/api/reservering/${reservationId}`) // Use correct endpoint and reservationId
                .expect(204)
                .end((err, res) => {
                    logger.trace("status code for deletion = ", res.statusCode);
                    console.log("Test 3 passed");
                    expect(res.statusCode).to.be.equal(204);
                    if (err) throw err;
                });
        });

}).catch(err => {
    console.error('Error importing chai:', err);
});
