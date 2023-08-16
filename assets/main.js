initStatus()
initTimer()
initFAQModal()

function initTimer() {
    const segments = timer.querySelectorAll('[data-value-type]')
    
    const dateDie = new Date('27 June 2025 21:07:08')

    calculateTime()
    setInterval(calculateTime, 1000)

    function calculateTime() {
        const dateNow = new Date()

        const substract = dateDie - dateNow
        
        segments.forEach(el => {
            const valueType = el.getAttribute('data-value-type')

            switch (valueType) {
                case 'days':
                    el.innerHTML = Math.floor(substract / 1000 / 60 / 60 / 24)
                    break
                case 'hours':
                el.innerHTML = Math.floor((substract / 1000 / 60 / 60) % 24)
                    break
                case 'minutes':
                el.innerHTML = Math.floor((substract / 1000 / 60) % 60)
                    break
                case 'seconds':
                el.innerHTML = Math.floor((substract / 1000) % 60)
                    break
            }
        })
    }
}

function initStatus() {
    const timerText = document.querySelector('#michael-timer-text')
    const pending = document.querySelector('#pending')

    fetch('assets/config.json').then(response => response.json()).then((json) => {
        switch (json?.michaelStatus) {
            // case 'dying':
            //     break
            case 'pending':
                pending.style.display = 'flex'
                timerText.innerText = 'Міша можливо помре від голоду через'
                break
            default:
                timerText.innerText = 'Міша помре від голоду через'
                break
        }
    }).catch(e => {
        console.error(e)

        timerText.innerText = 'Сталась помилка, але Міша помре від голоду через'
    })
}

function initFAQModal() {
    const faqButton = document.querySelector('#faq-button')
    const faqModal = document.querySelector('#faq-modal')
    const faqModalCloseButton = document.querySelector('#faq-close')

    faqButton.addEventListener('click', e => {
        e.preventDefault()
        faqModal.classList.add('active')
    })

    faqModalCloseButton.addEventListener('click', e => {
        e.preventDefault()
        faqModal.classList.remove('active')
    })
}