import Cell from './cell.js';
import { DeleteButton } from './UI.js';

// Функция создания ячеек по заданным размерам (M x N)
// Отрисовывается в первый раз, лень переделывать
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
        rowElem.append(DeleteButton({ id: row, handler: handlers.deleteHandler }));
        matrix.append(rowElem);
    }
    return cells;
}

export const rerenderCells = (matrix, M, N, handlers, cells) => {
    matrix.innerHTML = '';
    for (let row = 0; row < M; row++) {
        const rowElem = document.createElement('div');
        rowElem.classList.add(`row`);
        for (let col = 0; col < N; col++) {
            cells[row * N + col].createHTML(rowElem, handlers);
        }

        rowElem.append(DeleteButton({ id: row, handler: handlers.deleteHandler }));
        matrix.append(rowElem);
    }
}

export const getBoundsOfMatrix = () => {
    const values = document.getElementById('matrix').getBoundingClientRect();
    return { bottom: values.bottom, rigth: values.right };
}

// вычисление суммы по строкам
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

// вычисление среднего значения по столбцам
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