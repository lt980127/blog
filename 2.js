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
  queue.push(v)
  this.marked[v] = true
  while (queue.length > 0) {
    let log = ''
    let curV = queue.shift()
    log = log.concat(`${curV} `)
    console.log(curV)

    this.adj[curV].forEach((w) => {
      if (!this.marked[w]) {
        this.marked[w] = true
        queue.push(w)
      }
    })
  }
}

const g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)

g.bfs(0)
