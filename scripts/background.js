const elem = document.getElementById('background')
const projectBackgrounds = [
  ['fill-a', '#FFDDDD'],
  ['fill-b', '#FF8770'],
  ['fill-c', '#FFAC59'],
  ['fill-d', '#C73838'],
  ['fill-e', '#4A5E82'],
  ['fill-f', '#95D4E9'],
  ['fill-g', '#F46568'],
  ['fill-h', '#91BBB3'],
]
const projectCount = projectBackgrounds.length

const constructBox = (width, height) => ({
  width: () => width,
  height: () => height,
  widthPercent: p => width * p,
  heightPercent: p => height * p,
})

const box = constructBox(elem.clientWidth, elem.clientHeight)
const params = { width: box.width(), height: box.height() }

elem.innerHTML = ''
const two = new Two(params).appendTo(elem)

const curve = two.makeCurve(
  box.widthPercent(0.5),
  box.heightPercent(-0.1),
  box.widthPercent(0.5),
  box.heightPercent(0),
  box.widthPercent(0.54),
  box.heightPercent(0.25),
  box.widthPercent(0.47),
  box.heightPercent(0.5),
  box.widthPercent(0.52),
  box.heightPercent(0.75),
  box.widthPercent(0.5),
  box.heightPercent(1),
  box.widthPercent(0.5),
  box.heightPercent(1.1),
  box.width(),
  box.height(),
  box.width(),
  -0.1,
  true,
  true,
)
curve.linewidth = 0

const setFill = index => {
  const nextPane = projectBackgrounds[index % projectCount]
  curve.fill = nextPane[1]
  projectBackgrounds.forEach(bgClass => elem.classList.remove(bgClass[0]))
  elem.classList.add(nextPane[0])
}

setFill(0)

const base = constructBox(curve.vertices[1].x, box.height())
const rate = 1 / 150

two.bind('update', frame => {
  const sample = Math.sin(frame * rate)
  const width = base.width()
  curve.vertices[1].x = width + sample * box.widthPercent(0.09)
  curve.vertices[2].x = width - sample * box.widthPercent(0.12)
  curve.vertices[3].x = width + sample * box.widthPercent(0.05)
  curve.vertices[4].x = width - sample * box.widthPercent(0.03)
  curve.vertices[5].x = width + sample * box.widthPercent(0.07)
})

two.play()

const setBackgroundFillColor = () => {
  const paneIndex = Math.round(
    document.scrollingElement.scrollTop /
      document.scrollingElement.clientHeight,
  )
  setFill(paneIndex)
}

window.addEventListener('scroll', setBackgroundFillColor, { passive: true })
