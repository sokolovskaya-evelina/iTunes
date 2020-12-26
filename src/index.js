import {radioPlayerInit} from "./module/radioPlayer.js";
import {videoPlayerInit} from "./module/videoPlayer.js";
import {musicPlayerInit} from "./module/musicPlayer.js";

const playerBtn = document.querySelectorAll('.player-btn')
const playerBlock = document.querySelectorAll('.player-block')
const temp = document.querySelector('.temp')

const deactivationPlayer = () => {
    temp.style.display = 'none'
    playerBtn.forEach(item => item.classList.remove('active'))
    playerBlock.forEach(item => item.classList.remove('active'))

    radioPlayerInit.stop()
    videoPlayerInit.stop()
    musicPlayerInit.stop()
}

playerBtn.forEach((btn, index) => btn.addEventListener('click', () => {
        deactivationPlayer()
        btn.classList.add('active')
        playerBlock[index].classList.add('active')
    })
)


radioPlayerInit()
videoPlayerInit()
musicPlayerInit()
