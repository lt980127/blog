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

Graph.prototype.dfs = function (v = 0) {
  this._dfs(v)
}
Graph.prototype._dfs = function (v) {
  this.marked[v] = true
  console.log(v)
  this.adj[v].forEach((w) => {
    if (!this.marked[w]) {
      this._dfs(w)
    }
  })
}

const g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(1, 2)
g.addEdge(0, 2)
g.addEdge(0, 3)
g.addEdge(0, 4)

g.dfs()
