let sounds = [];

const path = "assets/mp3/";

let nextSoundId = 0;

function runSound(nameSound) {
  var pathURL = path + nameSound;
  var audio = new Audio(pathURL);
  audio.play();
  var id = nextSoundId;
  nextSoundId++;
  sounds.push({ id: id, name: nameSound, audio: audio });
  return id;
}

function stopSound(idSound) {
  for (let i = 0; i < sounds.length; i++) {
    if (sounds[i].id === idSound) {
      try {
        sounds[i].audio.pause();
        sounds[i].audio.currentTime = 0;
      } catch (e) {}
      sounds.splice(i, 1);
      break;
    }
  }
}

export { runSound, stopSound };
