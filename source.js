let checkBtn = false

const intervalId = setInterval(waitForModalLoad, 1000)

function waitForModalLoad() {
  checkBtn = document.querySelector('[data-test-id="exercise-check-answer"]')

  if (checkBtn) {
    const customCheckBtn = document.createElement('button')

    customCheckBtn.id = 'check-your-answer-twice-button'
    customCheckBtn.textContent = 'Check 🦄'

    checkBtn.insertAdjacentElement('afterend', customCheckBtn)
    customCheckBtn.addEventListener('click', createCustomPopUp)

    modalLoadedClearInterval()
  }
}

function modalLoadedClearInterval() {
  clearInterval(intervalId)
}

function createCustomPopUp() {
  const div = document.createElement('div')

  div.id = 'check-your-answer-twice-modal'

  div.style.position = 'fixed'
  div.style.left = '50%'
  div.style.top = '50%'
  div.style.transform = 'translate(-50%, -50%)'
  div.style.zIndex = '1'
  div.style.background = 'yellow'
  div.style.padding = '50px'

  document.body.insertBefore(div, document.body.children[0])

  div.innerHTML =
    '<p>Is this the answer you would like to check?</p><button id="your-answer">Yes, this is my answer</button><button id="not-sure">Not sure yet</button>'

  const yesButton = document.getElementById('your-answer')
  const noButton = document.getElementById('not-sure')

  yesButton.addEventListener('click', function () {
    checkBtn.click()
    helperRemovePopUp(div)
  })

  noButton.addEventListener('click', function () {
    helperRemovePopUp(div)
  })
}

function helperRemovePopUp(div) {
  div.remove()
}
