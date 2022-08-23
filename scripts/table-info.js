import { getBoundsOfMatrix } from "./helpers.js";
import { TableColInfo, TableRowInfo } from "./UI.js";

export default class TableInfo {

    constructor(handler) {
        this.rowSum = [];
        this.colAvg = [];
        this.render();
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

        if (document.getElementById('table-rows'))
            document.getElementById('table-rows').remove();
        this._rows = TableRowInfo(position);
        document.getElementById('matrix').after(this._rows);

        if (document.getElementById('table-cols'))
            document.getElementById('table-cols').remove();
        this._cols = TableColInfo(position);
        document.getElementById('table-rows').after(this._cols);
    }

    // рисовка
    render() {
        this._createHTML();
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