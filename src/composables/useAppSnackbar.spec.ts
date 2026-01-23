import { describe, expect, it } from "vitest";
import { useAppSnackbar } from "./useAppSnackbar";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { StatusColors } from "../types/general";

const expectInitialValues = (isSnackbarVisible: boolean, message: string, color: string, timeout: number) => {
  expect(isSnackbarVisible).toBe(false);
  expect(message).toBe("");
  expect(color).toBe("info");
  expect(timeout).toBe(5000);
}

describe("useAppSnackbar", () => {
  it("success() returns the correct values", async () => {
    const { isSnackbarVisible, message, color, timeout, hide, success, error, warning, info } = useAppSnackbar();

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);
    
    success(API_ERROR_MESSAGES.HEALTH_SUCCESS);

    expect(isSnackbarVisible.value).toBe(true);
    expect(message.value).toBe(API_ERROR_MESSAGES.HEALTH_SUCCESS);
    expect(color.value).toBe(StatusColors.Success);
    expect(timeout.value).toBe(5000);
  });

  it.todo("error() returns the correct values ", async () => {});
  it.todo("info() returns the correct values ", async () => {});
  it.todo("warning() returns the correct values ", async () => {});
  it.todo("hide() changes visibility of snackbar", async () => {});
  it.todo("hide() changes visibility of snackbar after success() has been called", async () => {});
  it.todo("values change after multiple calls: success() then error() is called", async () => {});
})