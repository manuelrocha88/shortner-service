const request = require('supertest');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Statistics = require('./models/Statistics');

const app = require('./app');

beforeEach(async () => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri(), mongooseOpts);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Test /api', () => {  
  it("list array should have one element", async () => {
    _ = await request(app).post("/api/encode").send({
      redirectToUrl: 'https://google.pt',
    });

    const res = await request(app).get("/api/list");
    expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should encode", async () => {
    const res = await request(app).post("/api/encode").send({
      redirectToUrl: 'https://google.pt',
    });
    expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(String),
        id: expect.any(String),
        shortId: expect.any(String),
        redirectToUrl: 'https://google.pt',
      })
    );
  });

  it("should decode", async () => {
    const encodeRes = await request(app).post("/api/encode").send({
      redirectToUrl: 'https://google.pt',
    });

    const res = await request(app).post("/api/decode").send({
      shortId: encodeRes.body.shortId,
    });
    expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(String),
        id: expect.any(String),
        shortId: expect.any(String),
        redirectToUrl: 'https://google.pt',
      })
    );
  });

  it("should get statistics", async () => {
    const encodeRes = await request(app).post("/api/encode").send({
      redirectToUrl: 'https://google.pt',
    });

    // mock statistics
    const newStats = new Statistics({ 
      linkId: encodeRes.body.id,
      userAgent: 'user-agent-mock-test',
      ipAddress: '0.0.0.0',
    });
    _ = await newStats.save();

    const res = await request(app).get("/api/statistic/" + encodeRes.body.shortId);
    expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});