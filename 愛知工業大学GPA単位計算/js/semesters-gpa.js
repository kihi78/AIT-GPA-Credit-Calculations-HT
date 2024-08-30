import credits from "../data-json/credits.json" with { type: "json" };
import grades from "../data-json/grades.json" with { type: "json" };
import semesters from "../data-json/semesters.json" with { type: "json" };
import gpaTarget from "../data-json/gpa-calculation-target.json" with { type: "json" };


const gradeMap = { 1: "可", 2: "良", 3: "優", 4: "秀", 0: "F" };

const yearSemesterMap = {
    'first-year-first-semester': '一年\n前期',
    'first-year-second-semester': '一年\n後期',
    'second-year-first-semester': '二年\n前期',
    'second-year-second-semester': '二年\n後期',
    'third-year-first-semester': '三年\n前期',
    'third-year-second-semester': '三年\n後期',
    'fourth-year-first-semester': '四年\n前期',
    'fourth-year-second-semester': '四年\n後期'
};

const tablesMap = {
    11: document.getElementById('first-year-first-semester'),
    12: document.getElementById('first-year-second-semester'),
    21: document.getElementById('second-year-first-semester'),
    22: document.getElementById('second-year-second-semester'),
    31: document.getElementById('third-year-first-semester'),
    32: document.getElementById('third-year-second-semester'),
    41: document.getElementById('fourth-year-first-semester'),
    42: document.getElementById('fourth-year-second-semester')
};

const creditsObject = {
    ...credits.specialized.required,
    ...credits.specialized.elective,
    ...credits.specialized.restricted,
    ...credits.general.required,
    ...credits.general.restricted6,
    ...credits.general.restricted8,
    ...credits.general.elective
};

const gradesObject = {
    ...grades.specialized.required,
    ...grades.specialized.elective,
    ...grades.specialized.restricted,
    ...grades.general.required,
    ...grades.general.restricted6,
    ...grades.general.restricted8,
    ...grades.general.elective
};

const semestersObject = {
    ...semesters.specialized.required,
    ...semesters.specialized.elective,
    ...semesters.specialized.restricted,
    ...semesters.general.required,
    ...semesters.general.restricted6,
    ...semesters.general.restricted8,
    ...semesters.general.elective
};

const gpaTargetObject = {
    ...gpaTarget.specialized.required,
    ...gpaTarget.specialized.elective,
    ...gpaTarget.specialized.restricted,
    ...gpaTarget.general.required,
    ...gpaTarget.general.restricted6,
    ...gpaTarget.general.restricted8,
    ...gpaTarget.general.elective
};

function mkList(semesterData, creditsData, gradesData, year) {
    return Object.keys(semesterData)
        .map(key => semestersObject[key] === year ? key : null)
        .filter(key => key !== null)
        .map(key => ([
            key,
            creditsData[key],
            gradeMap[gradesData[key]] || null
        ]));
}

function mktable(tableId, data) {
    let firstRow = tableId.insertRow(0);
    let firstCell = firstRow.insertCell(0);
    firstCell.className = "course-name";
    firstCell.rowSpan = data.length + 1;
    firstCell.textContent = yearSemesterMap[tableId.id];
    data.forEach((rowData, rowIndex) => {
        const row = tableId.insertRow(rowIndex + 1);
        rowData.forEach((cellData, cellIndex) => {
            const cell = row.insertCell(cellIndex);
            cell.textContent = cellData;
        });
    });
}

function gpaFilters(year) {
    return Object.keys(semestersObject)
        .map(key => semestersObject[key] === year ? key : null)
        .filter(key => key !== null)
        .map(key => gpaTargetObject[key] === "o" ? key : null)
        .filter(key => key !== null);
}

function gpaCalculation(year) {
    return gpaFilters(year).reduce(
        ([totalGp, totalCredit], gpaValue) => [
            totalGp + creditsObject[gpaValue] * gradesObject[gpaValue],
            totalCredit + creditsObject[gpaValue]
        ],
        [0, 0]
    );
};

const decimalPlaces = 4;

function truncateDecimal(gpa, credit) {
    return Math.floor((gpa / credit) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}


Object.entries(tablesMap).forEach(
    ([year, tableId]) => {
        const dataList = mkList(semestersObject, creditsObject, gradesObject, Number(year))
        mktable(tableId, dataList);
    }
);

const gpaResult = {};

['11', '12', '21', '22', '31', '32', '41', '42'].forEach(semester => {
    const [gpaNumerator, gpaDenominator] = gpaCalculation(Number(semester));
    gpaResult[`gpa-${semester}`] = truncateDecimal(gpaNumerator, gpaDenominator);
});

const gpaYears = ['1', '2', '3', '4'].map(year => {
    const gpaNumerator = gpaCalculation(Number(`${year}1`))[0] + gpaCalculation(Number(`${year}2`))[0];
    const gpaDenominator = gpaCalculation(Number(`${year}1`))[1] + gpaCalculation(Number(`${year}2`))[1];
    gpaResult[`gpa-${year}`] = truncateDecimal(gpaNumerator, gpaDenominator);
    return [gpaNumerator, gpaDenominator];
});

gpaResult['gpa-1-and-2'] = truncateDecimal(...gpaYears.slice(0, 2).reduce(
    ([totalGpaNumerator, totalGpaDenominator], [gpaNumerator, gpaDenominator]) => [
        totalGpaNumerator + gpaNumerator, totalGpaDenominator + gpaDenominator
    ], [0, 0]
));

gpaResult['gpa-all'] = truncateDecimal(...gpaYears.reduce(
    ([totalGpaNumerator, totalGpaDenominator], [gpaNumerator, gpaDenominator]) => [
        totalGpaNumerator + gpaNumerator, totalGpaDenominator + gpaDenominator
    ], [0, 0]
));

document.getElementById(`first-year-first-semester-gpa`).innerText = `${gpaResult[`gpa-11`]}`;
document.getElementById(`first-year-second-semester-gpa`).innerText = `${gpaResult[`gpa-12`]}`;
document.getElementById(`second-year-first-semester-gpa`).innerText = `${gpaResult[`gpa-21`]}`;
document.getElementById(`second-year-second-semester-gpa`).innerText = `${gpaResult[`gpa-22`]}`;
document.getElementById(`third-year-first-semester-gpa`).innerText = `${gpaResult[`gpa-31`]}`;
document.getElementById(`third-year-second-semester-gpa`).innerText = `${gpaResult[`gpa-32`]}`;
document.getElementById(`fourth-year-first-semester-gpa`).innerText = `${gpaResult[`gpa-41`]}`;
document.getElementById(`fourth-year-second-semester-gpa`).innerText = `${gpaResult[`gpa-42`]}`;
document.getElementById(`first-gpa`).innerText = `${gpaResult['gpa-1']}`;
document.getElementById(`second-gpa`).innerText = `${gpaResult['gpa-2']}`;
document.getElementById(`third-gpa`).innerText = `${gpaResult['gpa-3']}`;
document.getElementById(`fourth-gpa`).innerText = `${gpaResult['gpa-4']}`;
document.getElementById('first-second-gpa').innerText = `${gpaResult['gpa-1-and-2']}`;
document.getElementById('cumulative-gpa').innerText = `${gpaResult['gpa-all']}`;