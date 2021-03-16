import config from ".";

test("it should have create=false", () => {
  expect(config.create).toBe(false);
});

test("it should have throughput=ON_DEMAND", () => {
  expect(config.throughput).toBe("ON_DEMAND");
});
