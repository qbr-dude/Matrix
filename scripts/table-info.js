import { getBoundsOfMatrix } from "./helpers.js";

export default class TableInfo {

    constructor(handler) {
        this.rowSum = [];
        this.colAvg = [];
        this._createHTML();
        this._hoverHandle = handler; // Не знаю как еще прокинуть обработчик
    }

    recalculateValues(sum, avg) {
        this.rowSum = sum;
        this.colAvg = avg; // значение меняется редко, но перерисовывается на изменение row
        this.render();
    }

    // Создание блоков отображения значений по строчкам и колонкам
    _createHTML() {
        const position = getBoundsOfMatrix();

        this._rows = document.createElement('div');
        this._rows.classList.add('table-rows');
        this._rows.style.top = '5px';
        this._rows.style.left = `${position.rigth + 50}px`;
        document.getElementById('matrix-field').append(this._rows);

        this._cols = document.createElement('div');
        this._cols.classList.add('table-cols');
        this._cols.style.top = `${position.bottom + 50}px`;
        this._cols.style.left = '5px';
        document.getElementById('matrix-field').append(this._cols);
    }

    // рисовка
    render() {
        this._renderRows();
        this._renderCols();
    }

    _renderRows() {
        if (this._rows.hasChildNodes()) {
            this._rows.innerHTML = '';
        }
        this.rowSum.forEach((row, index) => {
            const rowElem = document.createElement('div');
            rowElem.classList.add('table-rows-item');
            rowElem.innerHTML = `<span>${row}</span>`
            rowElem.addEventListener('mouseenter', (e) => this._hoverHandle(e, index, row));
            rowElem.addEventListener('mouseleave', (e) => this._hoverHandle(e, index, row));
            this._rows.append(rowElem);
        });
    }
    // Нужно будет уменьшить кол-во перерисовок, вызванных ROW
    _renderCols() {
        if (this._cols.hasChildNodes()) {
            this._cols.innerHTML = '';
        }
        this.colAvg.forEach(col => {
            const colElem = document.createElement('div');
            colElem.classList.add('table-cols-item');
            colElem.innerHTML = `<span>${col}</span>`
            //colElem.addEventListener('click', (e) => console.log(e));
            this._cols.append(colElem);
        });
    }

}