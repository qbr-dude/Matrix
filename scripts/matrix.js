import { calculateAverageForCol, calculateSumsForRow, fillWithCells, rerenderCells } from "./helpers.js";
import TableInfo from "./table-info.js";

export default class Matrix {

    constructor() {
        this.cells = [];
    }

    createMatrix(M, N) {
        this.M = M;
        this.N = N;
        this.render();
    }

    // Создание и рендер (рисуется 1 раз, по задумке)
    render() {
        this._matrix = document.createElement('div');
        this._matrix.classList.add('matrix-main');
        this._matrix.setAttribute('id', 'matrix');
        document.getElementById('matrix-field').prepend(this._matrix);
        this._handlers = { clickHandler: this.clickHandle, hoverHandler: this.matrixCellHoverHandle, deleteHandler: this.deleteHandle, addHandle: this.addHandle }
        this.cells = fillWithCells(this._matrix, this.M, this.N, this._handlers);
        this.table = new TableInfo(this.tableCellHoverHandle);
        // Костыль, чтобы отрисовать в первый раз
        this.clickHandle();
    }

    // Обработка нажатия на ячейку матрицы
    clickHandle = () => {
        const sums = calculateSumsForRow(this.cells, this.M, this.N);
        const avgs = calculateAverageForCol(this.cells, this.M, this.N);
        this.table.recalculateValues(sums, avgs);
    }

    // Обработка наведения: подсвечиваются близкие, либо снимается подсветка со всех
    matrixCellHoverHandle = (event, cell) => {
        if (event.type === 'mouseenter')
            for (let index = 0; index < event.id && cell.id !== index; index++) {
                if (Math.abs(cell.value - this.cells[index].value) < 10) {
                    document.getElementById(`cell-${index}`).classList.add('cell-with-highlight');
                }
            }
        else if (event.type === 'mouseleave')
            this.cells.forEach(cell => {
                document.getElementById(`cell-${cell.id}`).classList.remove('cell-with-highlight');
            });
    }

    // Вызов кастомного ивента
    tableCellHoverHandle = (event, rowIndex, sum) => {
        const row = this.cells.slice(rowIndex * this.N, rowIndex * this.N + this.N);
        let details = { sum: sum };
        if (event.type === 'mouseenter') {
            details.isHover = true;
        } else if (event.type === 'mouseleave') {
            details.isHover = false;
        }
        row.forEach(rowItem => {
            document.getElementById(`cell-${rowItem.id}`).dispatchEvent(new CustomEvent('tablehover', {
                detail: details
            }))
        });
    }

    deleteHandle = (row) => {
        this.M -= 1;
        this.cells.splice(row * this.N, this.N);
        rerenderCells(this._matrix, this.M, this.N, this._handlers, this.cells);
        this.clickHandle();
    }

    addHandle = () => {
        // without it
    }
}
