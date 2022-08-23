import Cell from './cell.js';

// Функция создания ячеек по заданным размерам (M x N)
export const fillWithCells = (matrix, M, N, handlers) => {
    let cells = [];
    for (let row = 0; row < M; row++) {
        const rowElem = document.createElement('div');
        rowElem.classList.add(`row`);
        for (let col = 0; col < N; col++) {
            const cell = new Cell(row, col);
            cell.createHTML(rowElem, handlers);
            cells.push(cell);
        }
        matrix.append(rowElem);
    }
    return cells;
}

export const getBoundsOfMatrix = () => {
    const values = document.getElementById('matrix').getBoundingClientRect();
    return { bottom: values.bottom, rigth: values.right };
}


export const calculateSumsForRow = (cells, M, N) => {
    const rowSums = [];
    for (let rowIndex = 0; rowIndex < M; rowIndex++) {
        const row = cells.slice(rowIndex * N, rowIndex * N + N);
        let sum = 0;
        for (let index = 0; index < row.length; index++) {
            sum += row[index].value;
        }
        rowSums.push(sum);
    }
    return rowSums;
}

export const calculateAverageForCol = (cells, M, N) => {
    const colAvg = [];
    for (let colIndex = 0; colIndex < N; colIndex++) {
        let avg = 0;
        for (let index = 0; index < M; index++) {
            avg += cells[index * N + colIndex].value;
        }
        colAvg.push(Math.round(avg / M));
    }
    return colAvg;
}