const waitForFormToLoad = () => {
  const form = document.querySelector('[name="answerform"]')
  if (form) {
    // Form loaded, we can clear the interval
    formLoadedClearInterval(intervalId)

    // We don't need this functionality for answer forms that do not have input text
    const input = document.querySelector('.perseus-input')
    if (!input) return false

    // If there is an input field, we create a button to handle the submit
    const customCheckBtn: HTMLButtonElement = document.createElement('button')
    customCheckBtn.id = 'check-your-answer-twice-button'
    customCheckBtn.textContent = 'First Check 🎉'

    const checkBtn = document.querySelector(
      '[data-test-id="exercise-check-answer"]'
    )
    checkBtn?.insertAdjacentElement('beforebegin', customCheckBtn)
    customCheckBtn.addEventListener('click', enableEnter(input))

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        console.log(mutation.type)
        if (mutation.type === 'childList')
          (input as HTMLElement).addEventListener('keydown', disableEnter)
      })
    })

    const config = { childList: true }
    observer.observe(input, config)
  }
}

// @param function, @param number
const intervalId = setInterval(waitForFormToLoad, 1000)

// @param NodeJS.Timer
const formLoadedClearInterval = (intervalId: NodeJS.Timer) => {
  clearInterval(intervalId)
}

// @param event
const disableEnter = (e?: KeyboardEvent): void => {
  if (e?.code === 'Enter') {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
}

// @param HTMLButtonElement, @param MouseEvent
const enableEnter = (
  input: any
): ((this: HTMLButtonElement, ev: MouseEvent) => any) => {
  return input.removeEventListener('keydown', disableEnter)
}
