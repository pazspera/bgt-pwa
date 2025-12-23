import { expect } from "vitest";

export const expectSharedInitialState = (loading, error) => {
  expect(loading).toBe(false);
  expect(error).toBeNull();
}

export const expectLoadingState = (loading, error) => {
  expect(loading).toBe(true);
  expect(error).toBeNull();
}

export const expectSharedEndState = (spyFunction, loading) => {
  expect(spyFunction).toHaveBeenCalledTimes(1);
  expect(loading).toBe(false);
}
