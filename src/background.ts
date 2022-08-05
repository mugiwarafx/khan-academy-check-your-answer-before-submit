let input,
  mathInput,
  target: Node | null,
  checkBtn: HTMLButtonElement | null,
  nextQuestionBtn: HTMLButtonElement | null,
  mainIntervalId: NodeJS.Timer | undefined,
  recursiveInternalId

// @param event
const disableEnter = (e: any) => {
  if (e.code === 'Enter') {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
  //console.log(e, 'enter disabled')
}

// @param void
const enableEnter = () => {
  target?.removeEventListener('keydown', disableEnter)
  document.removeEventListener('keydown', disableEnter)
  checkBtn?.removeAttribute('disabled')
  //console.log(target, checkBtn, 'document', 'enter enabled')
}

// @param void
const submitOnCtrlEnter = (e: any) => {
  //console.log(e)
  if (e.code === 'KeyS' && e.ctrlKey) {
    //console.log('SOCE if')
    target?.removeEventListener('keydown', disableEnter)
    document.removeEventListener('keydown', disableEnter)
    checkBtn?.removeAttribute('disabled')
    checkBtn?.click()
  }
}

// @param void
const main = () => {
  //console.log('main triggered')
  const form = document.querySelector('[name="answerform"]')
  if (form) {
    //console.log('main form')
    // Form loaded, we can clear the interval
    //console.log('main', mainIntervalId)
    if (mainIntervalId) clearInterval(mainIntervalId)
    //if (recursiveInternalId) clearInterval(recursiveInternalId)

    // We don't need this functionality for answer forms that do not have input text
    input = document.querySelector('.perseus-input')
    mathInput = document.querySelector('.perseus-math-input')
    if (!input && !mathInput) return false

    // disable enter to prevent submission
    document.addEventListener('keydown', disableEnter)
    document.addEventListener('keydown', submitOnCtrlEnter)

    // prettier-ignore
    checkBtn = document.querySelector('[data-test-id="exercise-check-answer"]')
    target = input ? (target = input) : (target = mathInput)
    // prevent enter mutation observer
    const inputObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        //console.log(mutation.type)
        if (mutation.type) {
          checkBtn?.setAttribute('disabled', 'disabled')
          target?.addEventListener('keydown', disableEnter)
          document.addEventListener('keydown', disableEnter)
          document.addEventListener('keydown', submitOnCtrlEnter)
        }
      })
    })

    const config = { attributes: true, childList: true, characterData: true }
    if (target) inputObserver.observe(target, config)

    // recursive mutation observer
    const taskContainer = document.querySelector('.task-container')

    const taskContainerObserver = new MutationObserver((mutations, mut) => {
      for (let i = 0; i < mutations.length; i++) {
        //console.log(mutations[i], i)
        if (document.querySelector('[data-test-id="exercise-next-question"]')) {
          enableEnter()
          // prettier-ignore
          nextQuestionBtn = document.querySelector('[data-test-id="exercise-next-question"]')
          nextQuestionBtn?.focus()
          nextQuestionBtn?.addEventListener('click', run_main)
          nextQuestionBtn?.addEventListener('keydown', run_main)
        }
      }
    })

    if (taskContainer) {
      taskContainerObserver.observe(taskContainer, {
        attributes: true,
        characterData: true,
        subtree: true,
      })
    }
  }
}

// @param function, @param number
mainIntervalId = setInterval(main, 1000)

const run_main = () => setTimeout(main, 1000)

document.addEventListener('click', function (e) {
  let startBtn = e.target as HTMLElement
  if (e.target) {
    if (
      startBtn.innerText === 'Practice' ||
      startBtn.innerText === 'Start' ||
      startBtn.innerText === 'Start quiz' ||
      startBtn.innerText === "Let's go" ||
      startBtn.innerText === 'Try again'
    ) {
      //console.log(e)
      run_main()
    }
  }
})
