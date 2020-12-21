import { performFunction } from "../src/client/js/app";

describe("Testing the submit functionality", () => {
  test("Testing the performFunction()", () => {
    const elementMock = { addEventListener: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockImplementation(() => elementMock);

    const mockFetchPromise = Promise.resolve({
      json: () => {
        test: "val";
      },
    });
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    performFunction(mockEvent);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
