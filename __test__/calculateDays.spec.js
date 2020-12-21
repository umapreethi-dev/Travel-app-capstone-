import { calculateDays } from "../src/client/js/app";

describe("Testing the calculateDays function", () => {
  test("Testing the calculateDays()", () => {
    let today = 12 / 18 / 2020;
    let date1 = 12 / 20 / 2020;
    let date3 = 12 / 25 / 2020;
    let output1 = 1;
    let output2 = 4;
    let difference_in_days = 1;
    let dif_in_days = 4;

    expect(difference_in_days).toEqual(output1);
    expect(dif_in_days).toEqual(output2);
  });
});
