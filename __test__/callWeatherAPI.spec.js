import { callWeatherAPI } from "../src/client/js/app";

describe("Testing the Weather Api", () => {
  test("Testing the calWeatherAPI()", () => {
    let latitude = 30.37;
    let longitude = 40.12;
    const mockFetchPromise = Promise.resolve({
      json: () => {
        test: "val";
      },
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
