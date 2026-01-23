import { ref, type Ref } from "vue";
import { StatusColors, SnackbarDisplayTimes } from "../types/general";
 
export function useAppSnackbar() {
  const isSnackbarVisible: Ref<boolean> = ref(false);
  const message: Ref<string> = ref("");
  const color: Ref<StatusColors> = ref(StatusColors.Info); 
  const timeout: Ref<number> = ref(SnackbarDisplayTimes.Short);

  const hide = () => {
    isSnackbarVisible.value = false;
  }

  const success = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Success;
    timeout.value = SnackbarDisplayTimes.Short;
    isSnackbarVisible.value = true;
  }

  const error = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Error;
    timeout.value = SnackbarDisplayTimes.Long;
    isSnackbarVisible.value = true;
  }

  const info = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Info;
    timeout.value = SnackbarDisplayTimes.Short;
    isSnackbarVisible.value = true;
  }

  const warning = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Warning;
    timeout.value = SnackbarDisplayTimes.Long;
    isSnackbarVisible.value = true;
  }

  return { isSnackbarVisible, message, color, timeout, hide, success, error, info, warning }
}