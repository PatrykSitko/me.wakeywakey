import tick from "../sounds/buttons/tick.mp3";
import mouseEnterLeave from "../sounds/buttons/mouse-enter-leave.mp3";

export const sounds = { tick, mouseEnterLeave };
export function playSound(sound, mute) {
  if (mute) {
    return true;
  }
  const player = document.createElement("audio");
  player.setAttribute("src", sound);
  player.play();
  return true;
}
