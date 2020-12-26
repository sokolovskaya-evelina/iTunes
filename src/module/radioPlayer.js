export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio')
    const radioCoverImg = document.querySelector('.radio-cover__img')
    const radioHeaderBig = document.querySelector('.radio-header__big')
    const radioNavigation = document.querySelector('.radio-navigation')
    const radioItem = document.querySelectorAll('.radio-item')
    const radioStop = document.querySelector('.radio-stop')
    const radioVolume = document.querySelector('.radio-volume')
    const radioMute = document.querySelector('.radio-mute')
    const radioMax = document.querySelector('.radio-max-volume')
    const radioMin = document.querySelector('.radio-min-volume')

    const audio = new Audio()
    audio.type = 'audio/aac'

    radioStop.disabled = true

    const changeValue = () => {
        const valueVolume = radioVolume.value
        audio.volume = valueVolume / 100
        audio.muted=false
    }

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play')
            radioStop.classList.remove('fa-stop')
        } else {
            radio.classList.add('play')
            radioStop.classList.add('fa-stop')
            radioStop.classList.remove('fa-play')
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'))
        elem.classList.add('select')
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target
        const parent = target.closest('.radio-item')
        selectItem(parent)

        radioHeaderBig.textContent = parent.querySelector('.radio-name').textContent
        radioCoverImg.src = parent.querySelector('.radio-img').src

        radioStop.disabled = false
        audio.src = target.dataset.radioStantion

        audio.play()
        changeIconPlay()
    })

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
        changeIconPlay()
    })

    radioMute.addEventListener('click', ()=>{
        audio.muted=!audio.muted
    })

    radioMax.addEventListener('click', ()=>{
        audio.volume=1
    })

    radioMin.addEventListener('click', ()=>{
        audio.volume=0
    })

    radioVolume.addEventListener('input', changeValue)

    changeValue()

    radioPlayerInit.stop =() =>{
        audio.pause()
        changeIconPlay()
    }
}