import alienImage from "../images/sound_alien.png";
import alienSound from "../sounds/alien.mp3";
import classicImage from "../images/sound_classic.png";
import classicSound from "../sounds/clock.mp3";
import cockImage from "../images/sound_cock.png";
import cockSound from "../sounds/cock.mp3";
import electronicImage from "../images/sound_electronic.png";
import electronicSound from "../sounds/electronic.mp3";
import guitarImage from "../images/sound_guitar.png";
import guitarSound from "../sounds/guitar.mp3";
import militaryImage from "../images/sound_military.png";
import militarySound from "../sounds/military.mp3";

export default [
  {
    name: "alien invasion",
    image: alienImage,
    src: alienSound,
    defaultSound: true,
    hidden: false
  },
  {
    name: "classic clock",
    image: classicImage,
    src: classicSound,
    defaultSound: true,
    hidden: false
  },
  {
    name: "cockerel",
    image: cockImage,
    src: cockSound,
    defaultSound: true,
    hidden: false
  },
  {
    name: "electronic",
    image: electronicImage,
    src: electronicSound,
    defaultSound: true,
    hidden: false
  },
  {
    name: "heavy metal guitar",
    image: guitarImage,
    src: guitarSound,
    defaultSound: true,
    hidden: false
  },
  {
    name: "military trumpet",
    image: militaryImage,
    src: militarySound,
    defaultSound: true,
    hidden: false
  }
];
