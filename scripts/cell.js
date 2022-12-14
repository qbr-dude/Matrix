import { CellLevel } from "./UI.js";

/* literally cell */
export default class Cell {

    // Отвечает за уникальное ID, никак не сбрасывается
    static _id = 0;

    // Инициализация
    constructor(row, col) {
        this.id = Cell._id++;
        this.value = Math.round(Math.random() * 100);
        this.row = row;
        this.col = col;
    }

    // Рисуется ячейка и присваеваются обработчики
    createHTML(parent, { clickHandler, hoverHandler }) {
        const cell = document.createElement('div');
        cell.setAttribute('id', `cell-${this.id}`);
        cell.innerHTML = `<span>${this.id + 1}</span>`;
        cell.classList.add('cell');
        cell.addEventListener('click', () => this._clickOnCell(clickHandler));
        cell.addEventListener('mouseenter', (e) => this._hoverOnCell(e, hoverHandler));
        cell.addEventListener('mouseleave', (e) => this._hoverOnCell(e, hoverHandler));
        cell.addEventListener('tablehover', (e) => this._handleTableHover(e));
        parent.append(cell);
    }

    _renderValue() {
        document.getElementById(`cell-${this.id}`).innerHTML = `<span>${this.value}</span>`;
    }

    // Обработчик нажатия
    _clickOnCell(callback) {
        this.value += 1;
        this._renderValue();
        callback(this);
    }

    // Обработчик наведения
    _hoverOnCell(event, callback) {
        if (event.type === 'mouseenter') {
            this._renderValue();
        } else if (event.type === 'mouseleave') {
            document.getElementById(`cell-${this.id}`).innerHTML = `<span>${this.id + 1}</span>`;
        }
        event.id = Cell._id; // Добавка к ивенту id, чтобы было
        callback(event, this);
    }

    _handleTableHover(event) {
        const cell = document.getElementById(`cell-${this.id}`);
        if (event.detail.isHover) {
            const value = ((this.value / event.detail.sum) * 100);
            cell.innerHTML = `<span>${value.toFixed(2)}</span>`;
            cell.prepend(CellLevel(value));
        } else {
            cell.innerHTML = `<span>${this.id + 1}</span>`;
        }
    }
}


