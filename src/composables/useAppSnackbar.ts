import { ref, type Ref } from "vue";
import { StatusColors } from "../types/general";
 
export function useAppSnackbar() {
  const isSnackbarVisible: Ref<boolean> = ref(false);
  const message: Ref<string> = ref("");
  const color: Ref<StatusColors> = ref(StatusColors.Info); 
  const timeout: Ref<number> = ref(6000);

  const hide = () => {
    isSnackbarVisible.value = false;
  }

  const success = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Success;
    timeout.value = 6000;
    isSnackbarVisible.value = true;
  }

  const error = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Error;
    timeout.value = 9000;
    isSnackbarVisible.value = true;
  }

  const info = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Info;
    timeout.value = 4000;
    isSnackbarVisible.value = true;
  }

  const warning = (msg: string) => {
    message.value = msg;
    color.value = StatusColors.Warning;
    timeout.value = 9000;
    isSnackbarVisible.value = true;
  }

  return { isSnackbarVisible, message, color, timeout, hide, success, error, info, warning }
}