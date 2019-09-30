import tick from "../sounds/buttons/tick.mp3";
import confirm from "../sounds/buttons/confirm.mp3";
import select from "../sounds/buttons/select.mp3";
import deselect from "../sounds/buttons/deselect.mp3";
import mouseEnterLeave from "../sounds/buttons/mouse-enter-leave.mp3";
import _switch from "../sounds/buttons/switch.mp3";
import snooze from "../sounds/buttons/snooze.mp3";
import facebook from "../sounds/buttons/facebook-sound-effect.mp3";

export const sounds = {
  tick,
  mouseEnterLeave,
  confirm,
  select,
  deselect,
  _switch,
  snooze,
  facebook
};
export function playSound(sound, mute, volume) {
  const soundVolume = typeof volume === "number" ? volume : 0.3;
  if (mute) {
    return true;
  }
  new Promise(resolve => {
    let player = document.createElement("audio");
    player.setAttribute("src", sound);
    player.volume = soundVolume;
    player.play();
    player.addEventListener("ended", () => (player = null));
    resolve({ resolved: true });
  });
  return true;
}
