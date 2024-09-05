function createDirectedMatrix(dimensions) {
  const matrix = [];

  for (let i = 0; i < dimensions; i++) {
    matrix[i] = [];
    for (let j = 0; j < dimensions; j++) {
      if (i !== j) {
        const distance = Math.floor(Math.random() * 46) + 5;
        matrix[i][j] = distance;
      } else {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}

module.exports = { createDirectedMatrix };
