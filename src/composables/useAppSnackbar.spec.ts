import { describe, expect, it } from "vitest";
import { useAppSnackbar } from "./useAppSnackbar";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { StatusColors, SnackbarDisplayTimes } from "../types/general";

const expectInitialValues = (isSnackbarVisible: boolean, message: string, color: string, timeout: number) => {
  expect(isSnackbarVisible).toBe(false);
  expect(message).toBe("");
  expect(color).toBe(StatusColors.Info);
  expect(timeout).toBe(SnackbarDisplayTimes.Short);
}

const expectSuccess = (isSnackbarVisible: boolean, message: string, color: string, timeout: number) => {
  expect(isSnackbarVisible).toBe(true);
  expect(message).toBe(API_ERROR_MESSAGES.HEALTH_SUCCESS);
  expect(color).toBe(StatusColors.Success);
  expect(timeout).toBe(SnackbarDisplayTimes.Short);
}

const expectError = (isSnackbarVisible: boolean, message: string, color: string, timeout: number) => {
  expect(isSnackbarVisible).toBe(true);
  expect(message).toBe(API_ERROR_MESSAGES.HEALTH_ERROR(500));
  expect(color).toBe(StatusColors.Error);
  expect(timeout).toBe(SnackbarDisplayTimes.Long);
}

describe("useAppSnackbar", () => {
  it("success() returns the correct values", () => {
    const { isSnackbarVisible, message, color, timeout, success } = useAppSnackbar();

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);
    
    success(API_ERROR_MESSAGES.HEALTH_SUCCESS);

    expectSuccess(isSnackbarVisible.value, message.value, color.value, timeout.value);
  });

  it("error() returns the correct values ", () => {
    const { isSnackbarVisible, message, color, timeout, error } = useAppSnackbar();

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);

    error(API_ERROR_MESSAGES.HEALTH_ERROR(500));

    expectError(isSnackbarVisible.value, message.value, color.value, timeout.value);
  });
  
  it("info() returns the correct values ", () => {
    const { isSnackbarVisible, message, color, timeout, info } = useAppSnackbar();
    const infoMessage = "Todo está ok";

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);

    info(API_ERROR_MESSAGES.HEALTH_OTHER(infoMessage));

    expect(isSnackbarVisible.value).toBe(true);
    expect(message.value).toBe(API_ERROR_MESSAGES.HEALTH_OTHER(infoMessage));
    expect(color.value).toBe(StatusColors.Info);
    expect(timeout.value).toBe(SnackbarDisplayTimes.Long);
  });

  it("warning() returns the correct values ", () => {
    const { isSnackbarVisible, message, color, timeout, warning } = useAppSnackbar();
    const infoWarning = "Pasó algo pero seguimos adelante";

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);

    warning(API_ERROR_MESSAGES.HEALTH_OTHER(infoWarning));

    expect(isSnackbarVisible.value).toBe(true);
    expect(message.value).toBe(API_ERROR_MESSAGES.HEALTH_OTHER(infoWarning));
    expect(color.value).toBe(StatusColors.Warning);
    expect(timeout.value).toBe(SnackbarDisplayTimes.Long);
  });

  it("hide() changes visibility of snackbar", () => {
    const { isSnackbarVisible, message, color, timeout, hide } = useAppSnackbar();

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);

    hide();

    expect(isSnackbarVisible.value).toBe(false);
  });

  it("hide() changes visibility of snackbar after success() has been called", () => {
    const { isSnackbarVisible, message, color, timeout, hide, success } = useAppSnackbar();

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);

    success(API_ERROR_MESSAGES.HEALTH_SUCCESS);

    expect(isSnackbarVisible.value).toBe(true);

    hide();

    expect(isSnackbarVisible.value).toBe(false);
  });
  
  it("values change after multiple calls: success() then error() is called", () => {
    const { isSnackbarVisible, message, color, timeout, error , success } = useAppSnackbar();

    // test default state
    expectInitialValues(isSnackbarVisible.value, message.value, color.value, timeout.value);

    success(API_ERROR_MESSAGES.HEALTH_SUCCESS);
    expectSuccess(isSnackbarVisible.value, message.value, color.value, timeout.value);
    
    error(API_ERROR_MESSAGES.HEALTH_ERROR(500));
    expectError(isSnackbarVisible.value, message.value, color.value, timeout.value);
  });
})