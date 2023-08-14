const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    acc[item[key]] = acc[item[key]] || []
    acc[item[key]].push(item)
    return acc
  }, {})
}

export default groupBy