setTimeout(() => {
  const body = document.querySelector('body')
  const paragraph = document.createElement('p')
  paragraph.innerHTML = 'This is my paragraph'
  body.append(paragraph)
}, 5000)
