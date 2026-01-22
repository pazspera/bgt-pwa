import { ref, type Ref } from "vue";
import { StatusColors, IconKey } from "../types/general";
 
export function useAppSnackbar() {
  /* 
    variables:
    isSnackbarVisible
    message
    color
    icon
    timeout?
  */

  const isSnackbarVisible: Ref<boolean> = ref(false);
  const message: Ref<string> = ref("");
  const color: Ref<StatusColors> = ref(StatusColors.Info); 
  const icon: Ref<IconKey> = ref("info");
  const timeout: Ref<number> = ref(5000);
}