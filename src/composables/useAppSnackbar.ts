import { ref, type Ref } from "vue";
import { StatusColors } from "../types/general";
 
export function useAppSnackbar() {
  const isSnackbarVisible: Ref<boolean> = ref(false);
  const message: Ref<string> = ref("");
  const color: Ref<StatusColors> = ref(StatusColors.Info); 
  const timeout: Ref<number> = ref(5000);

  const hide = () => {
    isSnackbarVisible.value = false;
  }

  const success = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Success;
    timeout.value = 5000;
    isSnackbarVisible.value = true;
  }

  const error = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Error;
    timeout.value = 10000;
    isSnackbarVisible.value = true;
  }

  const info = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Info;
    timeout.value = 5000;
    isSnackbarVisible.value = true;
  }

  const warning = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Warning;
    timeout.value = 10000;
    isSnackbarVisible.value = true;
  }

  return { isSnackbarVisible, message, color, timeout, hide, success, error, info, warning }
}