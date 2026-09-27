let sounds = [];

const path = "assets/mp3/";

let nextSoundId = 0;

function runSound(nameSound) {
  var pathURL = path + nameSound;
  var audio = new Audio(pathURL);
  audio.play();
  var id = nextSoundId;
  nextSoundId++;
  var entry = { id: id, name: nameSound, audio: audio, timer: null };
  sounds.push(entry);
  var stopAfterDuration = function () {
    var ms = Math.ceil(audio.duration * 1000);
    if (!isFinite(ms) || ms <= 0) return;
    entry.timer = setTimeout(function () {
      stopSound(id);
    }, ms);
  };
  if (audio.readyState >= 1 && isFinite(audio.duration) && audio.duration > 0) {
    stopAfterDuration();
  } else {
    audio.addEventListener("loadedmetadata", stopAfterDuration, { once: true });
  }
  return id;
}

function stopSound(idSound) {
  for (let i = 0; i < sounds.length; i++) {
    if (sounds[i].id === idSound) {
      try {
        if (sounds[i].timer) clearTimeout(sounds[i].timer);
        sounds[i].audio.pause();
        sounds[i].audio.currentTime = 0;
      } catch (e) {}
      sounds.splice(i, 1);
      break;
    }
  }
}

export { runSound, stopSound };
