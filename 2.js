function Graph(v) {
  this.vertices = v
  this.edges = 0
  this.marked = []

  this.adj = []
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = []
    this.marked[i] = false
  }
}

Graph.prototype.addEdge = function (v, w) {
  this.adj[v].push(w)
  this.adj[w].push(v)
  this.edges++
}

Graph.prototype.show = function () {
  let log = ''
  for (var i = 0; i < this.vertices; ++i) {
    log = `${i} -> `
    for (var j = 0; j < this.vertices; ++j) {
      const item = this.adj[i][j]
      if (item !== undefined) {
        log = log.concat(`${item}, `)
      }
    }
    console.log(log)
  }
}

Graph.prototype.bfs = function (v) {
  const queue = []
  const d = []
  const pred = []

  for (let i = 0; i < this.vertices; i++) {
    d[i] = 0
  }
  queue.push(v)
  this.marked[v] = true
  while (queue.length > 0) {
    let curV = queue.shift()
    this.adj[curV].forEach((w) => {
      if (!this.marked[w]) {
        d[w] = d[curV] + 1
        const predObj = {}
        predObj[w] = curV
        pred.push(predObj)
        this.marked[w] = true
        queue.push(w)
      }
    })
  }
  return { d, pred }
}

const g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)

const { d, pred } = g.bfs(0)
console.log(pred)

// const start = 0

// for (let i = 0; i < 4; i++) {
//   let end = i
//   const stack = []
//   while (end !== start) {
//     // console.log(pred[end])
//     end = pred[end][1]
//     stack.push(end)
//   }
//   let log = stack.pop()
//   while (stack.length > 0) {
//     log += ' - ' + stack.pop()
//   }
//   console.log(log)
// }
