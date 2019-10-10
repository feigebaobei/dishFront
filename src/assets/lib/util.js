let propComposeArray = (arr, prop) => {
  if (Array.isArray(arr)) {
    return arr.reduce((r, c) => {
      if (c.toString() === '[object Object]') {
        r.push(c[prop])
      } else {
        throw new Error('element of arr is not Object')
      }
      return r
    }, [])
  } else {
    throw new Error('pramas arr is not Array')
  }
}

let utcToString = (string) => {
  let [date, time] = string.split('T')
  let [y, M, d] = date.split(/-|\//)
  let [h, m, s] = time.replace(/\.\d*Z$/, '').split(':')
  return `${y}/${M}/${d} ${h}:${m}:${s}`
}

export default {
  propComposeArray: propComposeArray,
  utcToString: utcToString
}
