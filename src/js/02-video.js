import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const KEY_TIME_VIDEO = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(KEY_TIME_VIDEO, JSON.stringify(data));
};
player.on('timeupdate', throttle(onPlay, 1000));

document.addEventListener('DOMContentLoaded', reload);
function reload() {
  player
    .setCurrentTime(JSON.parse(localStorage.getItem(KEY_TIME_VIDEO)).seconds)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
}
