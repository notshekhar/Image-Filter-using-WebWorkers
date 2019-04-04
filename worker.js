this.onmessage = e => {
  let d = e.data.data
  if (d) {
    //start
    if (!e.data.type) {
      let v = e.data.value
      for (let i = 0; i < v.length; i++) {
        v[i] = parseInt(v[i])
      }
      for (let i = 0; i < d.data.length; i += 4) {
        d.data[i] += v[0] + v[3]
        d.data[i + 1] += v[1] + v[3]
        d.data[i + 2] += v[2] + v[3]
      }
      this.postMessage(d)
    }
    //end
  }
}
