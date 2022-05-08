class InvalidArgumentError extends Error {
    constructor(mensagem) {
      super(mensagem);
      this.name = 'InvalidArgumentError';
      this.idError = 0
    }
  }
  
  class InternalServerError extends Error {
    constructor(mensagem) {
      super(mensagem);
      this.name = 'InternalServerError';
      this.idError = 1;
    }
  }
  
  module.exports = {
    InvalidArgumentError: InvalidArgumentError,
    InternalServerError: InternalServerError
  };