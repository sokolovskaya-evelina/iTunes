import {addZero} from "./supportScript.js";

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoTimeTotal = document.querySelector('.video-time__total')
    const videoVolume = document.querySelector('.video-volume')
    const videoFullscreen = document.querySelector('.video-fullscreen')
    const videoMute = document.querySelector('.video-mute')
    const videoMax = document.querySelector('.video-max-volume')
    const videoMin = document.querySelector('.video-min-volume')

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen()
    })
    
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause')
            videoButtonPlay.classList.add('fa-play')
        } else {
            videoButtonPlay.classList.add('fa-pause')
            videoButtonPlay.classList.remove('fa-play')
        }
    }

    const togglePlay = (event) => {
        event.preventDefault()
        if (videoPlayer.paused) {
            videoPlayer.play()
        } else {
            videoPlayer.pause()
        }
    }

    const stopPlay = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0
    }

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value * duration) / 100
    })

    const changeValue = () => {
        const valueVolume = videoVolume.value
        videoPlayer.volume = valueVolume / 100
        videoPlayer.muted = false
    }

    videoPlayer.addEventListener('fullscreenchange', () => {
        if (videoPlayer.fullscreen) {
            videoPlayer.controls = true
        } else {
            videoPlayer.controls = false
        }
    })

    videoPlayer.addEventListener('click', togglePlay)
    videoButtonPlay.addEventListener('click', togglePlay)

    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)

    videoButtonStop.addEventListener('click', stopPlay)

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        videoProgress.value = (currentTime / duration) * 100

        let minutePassed = Math.floor(currentTime / 60)
        let secondPassed = Math.floor(currentTime % 60)

        let minuteTotal = Math.floor(duration / 60)
        let secondTotal = Math.floor(duration % 60)

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondTotal)
    })

    videoVolume.addEventListener('input', changeValue)

    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = Math.round(videoPlayer.volume * 100)
    })

    videoMute.addEventListener('click', ()=>{
        videoPlayer.muted=!videoPlayer.muted
    })

    changeValue()

    videoPlayerInit.stop =() =>{
        videoPlayer.pause()
        toggleIcon()
    }
}

