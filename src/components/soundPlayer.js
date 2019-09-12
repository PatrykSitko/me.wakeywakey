import tick from "../sounds/buttons/tick.mp3";
import confirm from "../sounds/buttons/confirm.mp3";
import select from "../sounds/buttons/select.mp3";
import deselect from "../sounds/buttons/deselect.mp3";
import mouseEnterLeave from "../sounds/buttons/mouse-enter-leave.mp3";

export const sounds = { tick, mouseEnterLeave, confirm, select, deselect };
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