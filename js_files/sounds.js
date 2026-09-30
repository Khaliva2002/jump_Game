let sounds = [];

const path = "assets/mp3/";

let nextSoundId = 0;

function runSound(nameSound, repeat = 1) {
  var pathURL = path + nameSound;
  var audio = new Audio(pathURL);
  var isLoop = repeat === true;
  var totalPlays = 1;
  if (typeof repeat === "number" && isFinite(repeat)) {
    totalPlays = Math.max(1, Math.floor(repeat));
  }
  if (isLoop) {
    audio.loop = true;
  } else if (totalPlays > 1) {
    var extraPlays = totalPlays - 1;
    audio.addEventListener("ended", function () {
      if (extraPlays > 0) {
        extraPlays--;
        try {
          audio.currentTime = 0;
          var p = audio.play();
          if (p && p.catch) p.catch(function () {});
        } catch (e) {}
      }
    });
  }
  try {
    var first = audio.play();
    if (first && first.catch) first.catch(function () {});
  } catch (e) {}
  var id = nextSoundId;
  nextSoundId++;
  var entry = { id: id, name: nameSound, audio: audio, timer: null };
  sounds.push(entry);
  var stopAfterDuration = function () {
    if (isLoop) return;
    var ms = Math.ceil(audio.duration * 1000) * totalPlays;
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
