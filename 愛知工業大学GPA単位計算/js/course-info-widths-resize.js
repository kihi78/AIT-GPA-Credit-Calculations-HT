function adjustWidths() {
    const thirdCellWidth = window.getComputedStyle(document.querySelector('#specialized-required tbody tr:nth-child(2) td:nth-child(3)')).width;
    document.querySelector('.table-header tbody tr td:nth-child(2)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(3)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(4)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(5)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(6)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(7)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(8)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(9)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(10)').style.width = thirdCellWidth;

    const elevenCellWidth = window.getComputedStyle(document.querySelector('#specialized-required tbody tr:nth-child(2) td:nth-child(11)')).width;
    document.querySelector('.table-header tbody tr td:nth-child(11)').style.width = elevenCellWidth;
}

window.addEventListener("load", adjustWidths);
window.addEventListener("resize", adjustWidths);