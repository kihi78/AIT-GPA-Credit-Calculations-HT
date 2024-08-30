function adjustWidths() {
    const tableHeaderWidth = document.querySelector(".table-header").offsetWidth;
    document.getElementById('cumulative').style.width = tableHeaderWidth - 4 + "px";

    const fourthCellWidth = parseFloat(window.getComputedStyle(document.querySelector('.table-header tbody tr td:nth-child(4)')).width);

    const cumulativeWidth = document.getElementById("cumulative").offsetWidth;
    document.getElementById('cumulative-tables').style.width = cumulativeWidth - fourthCellWidth - 7 + "px";

    const cumulativeTablesWidth = document.getElementById("cumulative-tables").offsetWidth;
    document.getElementById('first-second-tables').style.width = cumulativeTablesWidth - fourthCellWidth - 3 + "px";
    document.getElementById('third-fourth-tables').style.width = cumulativeTablesWidth - fourthCellWidth - 3 + "px";

    const firstSecondTablesWidth = document.getElementById("first-second-tables").offsetWidth;
    document.querySelector('.first-tables').style.width = firstSecondTablesWidth - fourthCellWidth - 3 + "px";
    document.querySelector('.second-tables').style.width = firstSecondTablesWidth - fourthCellWidth - 3 + "px";
    document.querySelector('.third-tables').style.width = firstSecondTablesWidth - fourthCellWidth - 3 + "px";
    document.querySelector('.fourth-tables').style.width = firstSecondTablesWidth - fourthCellWidth - 3 + "px";

    const firstTablesWidth = document.querySelector('.first-tables').offsetWidth;
    document.getElementById('first-year-first-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";
    document.getElementById('first-year-second-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";

    document.getElementById('second-year-first-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";
    document.getElementById('second-year-second-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";

    document.getElementById('third-year-first-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";
    document.getElementById('third-year-second-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";

    document.getElementById('fourth-year-first-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";
    document.getElementById('fourth-year-second-semester').style.width = firstTablesWidth - fourthCellWidth - 1 + "px";

    document.querySelectorAll('.gpa-div').forEach(element => { element.style.width = fourthCellWidth + "px"; });
    
    const thirdCellWidth = window.getComputedStyle(document.querySelector('#first-year-first-semester tbody tr:nth-child(2) td:nth-child(3)')).width;
    document.querySelector('.table-header tbody tr td:nth-child(2)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(3)').style.width = thirdCellWidth;

    const firstYearFirstSemesterHeight = document.getElementById("first-year-first-semester-gpa").offsetHeight;
    document.querySelectorAll('.gpa-div').forEach(element => { element.style.maxHeight = firstYearFirstSemesterHeight + "px"; });
}

window.addEventListener("load", adjustWidths);
window.addEventListener("resize", adjustWidths);