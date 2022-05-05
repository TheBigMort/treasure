import { getCumStats } from "../metadata/analyzer";

describe("analyzer", () => {
  it("get cum stats", async () => {
    await getCumStats();
  });
});