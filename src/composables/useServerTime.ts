import { ref } from "vue";

const timeOffset = ref(0);

export function useServerTime() {

  const syncWithServer = (serverTime: string) => {
    const serverTimeInMilliseconds = new Date(serverTime).getTime();
    const clientTimeInMilliseconds = new Date().getTime();
    
    if(isNaN(serverTimeInMilliseconds)) {
      timeOffset.value = 0;
      return;
    }

    timeOffset.value = serverTimeInMilliseconds - clientTimeInMilliseconds;
  };

  const getSyncedDate = () => {
    const now = new Date(Date.now() + timeOffset.value);
    now.setHours(0, 0, 0, 0);
    return now;
  }; 

  return { syncWithServer, getSyncedDate, timeOffset }
}