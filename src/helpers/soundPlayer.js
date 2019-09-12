import tick from "../sounds/buttons/tick.mp3";
import confirm from "../sounds/buttons/confirm.mp3";
import mouseEnterLeave from "../sounds/buttons/mouse-enter-leave.mp3";

export const sounds = { tick, mouseEnterLeave, confirm };
export function playSound(sound, mute, volume) {
  const soundVolume = typeof volume === "number" ? volume : 0.3;
  if (mute) {
    return true;
  }
  const player = document.createElement("audio");
  player.setAttribute("src", sound);
  player.volume = soundVolume;
  player.play();
  return true;
}
