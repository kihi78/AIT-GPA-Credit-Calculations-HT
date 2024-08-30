function adjustWidths() {
    const thirdCellWidth = window.getComputedStyle(document.querySelector('#specialized-required tbody tr:nth-child(2) td:nth-child(3)')).width;
    document.querySelector('.table-header tbody tr td:nth-child(2)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(3)').style.width = thirdCellWidth;
}

window.addEventListener("load", adjustWidths);
window.addEventListener("resize", adjustWidths);