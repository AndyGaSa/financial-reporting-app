const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Position = require("../models/Position");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Position.deleteMany({});
});

describe("Position Model Test", () => {
  it("create & save position successfully", async () => {
    const validPosition = new Position({
      accrued_interest: 0,
      number_of_shares: 10,
      balance: 1000,
      capital_gain: 100,
      cost: 900,
      currency: "USD",
      entity: "Bank of America",
      expiration_date: "2025-01-01",
      initial_date: "2023-01-01",
      interest_rate: 2.5,
      is_nominal: true,
      isin: "US0378331005",
      market: "NASDAQ",
      name: "Apple Inc.",
      portfolio_id: 1,
      type: "Equity",
      valuation_date: "2023-06-20",
      rate_to_euro: 0.85,
    });
    const savedPosition = await validPosition.save();
    console.log("🚀 ~ it ~ savedPosition:", savedPosition);
    expect(savedPosition._id).toBeDefined();
    expect(savedPosition.accrued_interest).toBe(0);
    expect(savedPosition.number_of_shares).toBe(10);
    expect(savedPosition.balance).toBe(1000);
  });

  it("create position without required field should fail", async () => {
    const positionWithoutRequiredField = new Position({ name: "Apple Inc." });
    let err;
    try {
      await positionWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.currency).toBeDefined();
  });
});
