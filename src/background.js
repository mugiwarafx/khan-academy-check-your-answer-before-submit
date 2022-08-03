let input, mathInput, target, checkBtn

// @param event
const disableEnter = (e) => {
  if (e.code === 'Enter') {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
  //console.log(e, 'enter disabled')
}

// @param void
const enableEnter = () => {
  target.removeEventListener('keydown', disableEnter)
  document.removeEventListener('keydown', disableEnter)
  checkBtn.removeAttribute('disabled')
  //console.log(target, checkBtn, 'document', 'enter enabled')
}

// @param void
const submitOnCtrlEnter = (e) => {
  //console.log(e)
  if (e.code === 'KeyS' && e.ctrlKey) {
    //console.log('SOCE if')
    target.removeEventListener('keydown', disableEnter)
    document.removeEventListener('keydown', disableEnter)
    checkBtn.removeAttribute('disabled')
    checkBtn.click()
  }
}

// @param void
const waitForFormToLoad = () => {
  const form = document.querySelector('[name="answerform"]')
  if (form) {
    // Form loaded, we can clear the interval
    formLoadedClearInterval(intervalId)

    // We don't need this functionality for answer forms that do not have input text
    input = document.querySelector('.perseus-input')
    mathInput = document.querySelector('.perseus-math-input')
    if (!input && !mathInput) return false

    // prettier-ignore
    checkBtn = document.querySelector('[data-test-id="exercise-check-answer"]')
    target = input ? (target = input) : (target = mathInput)
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        //console.log(mutation.type)
        if (mutation.type) {
          checkBtn.setAttribute('disabled', 'disabled')
          target.addEventListener('keydown', disableEnter)
          document.addEventListener('keydown', disableEnter)
          document.addEventListener('keydown', submitOnCtrlEnter)
        }
      })
    })

    const config = { attributes: true, childList: true, characterData: true }
    observer.observe(target, config)
  }
}

// @param function, @param number
const intervalId = setInterval(waitForFormToLoad, 1000)

// @param NodeJS.Timer
const formLoadedClearInterval = (intervalId) => {
  clearInterval(intervalId)
}
