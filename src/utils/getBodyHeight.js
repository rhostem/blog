export const getBodyHeight = () => {
  const body = document.body,
    html = document.documentElement

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )

  return height
}
