import credits from "../data-json/credits.json" with { type: "json" };
import grades from "../data-json/grades.json" with { type: "json" };


const gradeMap = { 1: "可", 2: "良", 3: "優", 4: "秀", 0: "F" };

const courseNameMap = {
    "specialized-required": "専門必修",
    "specialized-elective": "専門選択",
    "specialized-restricted": "専門選択必修",
    "general-required": "総合必修",
    "general-restricted6": "総合選択必修",
    "general-restricted8": "総合選択必修",
    "general-elective": "総合選択"
};

const inputDataList = [
    ['specialized-required', credits.specialized.required, grades.specialized.required],
    ['specialized-elective', credits.specialized.elective, grades.specialized.elective],
    ['specialized-restricted', credits.specialized.restricted, grades.specialized.restricted],
    ['general-required', credits.general.required, grades.general.required],
    ['general-restricted6', credits.general.restricted6, grades.general.restricted6],
    ['general-restricted8', credits.general.restricted8, grades.general.restricted8],
    ['general-elective', credits.general.elective, grades.general.elective]
];


function mkList(creditsData, gradesData) {
    return Object.keys(creditsData).map(key => [
        key,
        creditsData[key],
        gradeMap[gradesData[key]] || null
    ]);
}

function mkTable(tableId, data) {
    let firstRow = tableId.insertRow(0);
    let firstCell = firstRow.insertCell(0);
    firstCell.className = "course-name";
    firstCell.rowSpan = data.length + 1;
    firstCell.textContent = courseNameMap[tableId.id];
    data.forEach((rowData, rowIndex) => {
        const row = tableId.insertRow(rowIndex + 1);
        rowData.forEach((cellData, cellIndex) => {
            const cell = row.insertCell(cellIndex);
            cell.textContent = cellData;
        });
    });
}


inputDataList.forEach(([tableId, creditData, gradeData]) => {
    const tableElement = document.getElementById(tableId);
    if (tableElement) {
        const dataList = mkList(creditData, gradeData);
        mkTable(tableElement, dataList);
    } else {
        console.error(`table id ${tableId} not found`);
    }
});