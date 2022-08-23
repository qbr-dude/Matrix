export const DeleteButton = ({ id, handler }) => {
    const delButton = document.createElement('button');
    delButton.classList.add('del-row-btn');
    delButton.setAttribute('id', `btn-${id}`);
    delButton.addEventListener('click', () => handler(id));
    return delButton
}