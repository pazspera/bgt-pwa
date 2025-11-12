import { nextTick } from "vue";
import type { VueWrapper } from "@vue/test-utils";

/**
 * @param wrapper: main VueWrapper 
 * @param dataTestId: data-testid of the input field
 * @param value: string to set input value
 */
export const setTextInputValue = async (
  wrapper: VueWrapper<any>,
  dataTestId: string,
  value: string
) => {
  const inputWrapper = wrapper.find(`[data-testid="${dataTestId}"]`);
  const nativeInput = inputWrapper.find("input");
  await nativeInput.setValue(value);
  await nextTick();
}