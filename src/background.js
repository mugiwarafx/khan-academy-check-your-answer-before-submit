let input, mathInput, target, checkBtn, mainIntervalId, recursiveInternalId

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
const main = () => {
  console.log('main triggered')
  const form = document.querySelector('[name="answerform"]')
  if (form) {
    // Form loaded, we can clear the interval
    if (mainIntervalId) clearInterval(mainIntervalId)
    if (recursiveInternalId) clearInterval(recursiveInternalId)

    // We don't need this functionality for answer forms that do not have input text
    input = document.querySelector('.perseus-input')
    mathInput = document.querySelector('.perseus-math-input')
    if (!input && !mathInput) return false

    // prettier-ignore
    checkBtn = document.querySelector('[data-test-id="exercise-check-answer"]')
    target = input ? (target = input) : (target = mathInput)
    // prevent enter mutation observer
    const inputObserver = new MutationObserver(function (mutations) {
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
    inputObserver.observe(target, config)

    // recursive mutation observer
    const taskContainer = document.querySelector('.task-container')

    const taskContainerObserver = new MutationObserver((mutations, mut) => {
      for (let i = 0; i < mutations.length; i++) {
        console.log(mutations[i], i)
        if (document.querySelector('[data-test-id="exercise-next-question"]')) {
          enableEnter()
          // prettier-ignore
          nextQuestionBtn = document.querySelector('[data-test-id="exercise-next-question"]')
          nextQuestionBtn.focus()
          nextQuestionBtn.addEventListener('click', recursiveMainInterval)
          nextQuestionBtn.addEventListener('keydown', recursiveMainInterval)
        }
      }
    })

    taskContainerObserver.observe(taskContainer, {
      attributes: true,
      characterData: true,
      subtree: true,
    })
  }

  // clearIntervals once the quiz is finished
  if (mainIntervalId) clearInterval(mainIntervalId)
  if (recursiveInternalId) clearInterval(recursiveInternalId)
}

// @param function, @param number
mainIntervalId = setInterval(main, 1000)

const recursiveMainInterval = () => {
  recursiveInternalId = setInterval(main, 1000)
}
