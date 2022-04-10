class UnimplementedError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnimplementedError'
  }
}

module.exports = UnimplementedError
