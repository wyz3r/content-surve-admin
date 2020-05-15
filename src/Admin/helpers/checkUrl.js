const checkUrl = (url) => {
  return (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null)
}

export default checkUrl
