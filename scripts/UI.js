// Некоторая отрисовка, несвязанная напрямую с файлом (как пример, рисовка Cell в cell.js)

export const DeleteButton = ({ id, handler }) => {
    const delButton = document.createElement('button');
    delButton.classList.add('del-row-btn');
    delButton.setAttribute('id', `btn-${id}`);
    delButton.addEventListener('click', () => handler(id));
    return delButton
}

export const CellLevel = (value) => {
    const level = document.createElement('div');
    level.classList.add('cell-level');
    let height = Math.floor(value);
    if (height > 10)
        height *= 5;
    else if (height >= 100)
        height *= 7;
    level.style.height = `${height}%`;
    return level;
}

export const TableRowInfo = (position) => {
    const rows = document.createElement('div');
    rows.classList.add('table-rows');
    rows.setAttribute('id', 'table-rows');
    rows.style.top = '5px';
    rows.style.left = `${position.rigth + 5}px`;
    return rows;
}

export const TableColInfo = (position) => {
    const cols = document.createElement('div');
    cols.classList.add('table-cols');
    cols.setAttribute('id', 'table-cols');
    cols.style.top = `${position.bottom + 50}px`;
    cols.style.left = '5px';
    return cols;
}