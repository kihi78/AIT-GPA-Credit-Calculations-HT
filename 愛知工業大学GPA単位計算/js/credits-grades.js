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
    ["specialized-required", credits.specialized.required, grades.specialized.required],
    ["specialized-elective", credits.specialized.elective, grades.specialized.elective],
    ["specialized-restricted", credits.specialized.restricted, grades.specialized.restricted],
    ["general-required", credits.general.required, grades.general.required],
    ["general-restricted6", credits.general.restricted6, grades.general.restricted6],
    ["general-restricted8", credits.general.restricted8, grades.general.restricted8],
    ["general-elective", credits.general.elective, grades.general.elective]
];

const specReqTarget = calculateTotal(credits.specialized.restricted, grades.specialized.restricted) >= 2
    ? 54 - calculateTotal(credits.specialized.restricted, grades.specialized.restricted)
    : 52;

const totalDataList = [
    ["specialized-required-credits", calculateTotal(credits.specialized.required, grades.specialized.required), 46],
    ["specialized-elective-credits", calculateTotal(credits.specialized.elective, grades.specialized.elective), specReqTarget],
    ["specialized-restricted-credits", calculateTotal(credits.specialized.restricted, grades.specialized.restricted), 2],
    ["general-required-restricted6-credits", calculateTotal(
        { ...credits.general.required, ...credits.general.restricted6 },
        { ...grades.general.required, ...grades.general.restricted6 }
    ), 6],
    ["general-required-restricted6-restricted8-credits", calculateTotal(
        { ...credits.general.required, ...credits.general.restricted6, ...credits.general.restricted8 },
        { ...grades.general.required, ...grades.general.restricted6, ...grades.general.restricted8 }
    ), 8],
    ["general-required-restricted6-restricted8-elective-credits", calculateTotal(
        { ...credits.general.required, ...credits.general.restricted6, ...credits.general.restricted8, ...credits.general.elective },
        { ...grades.general.required, ...grades.general.restricted6, ...grades.general.restricted8, ...grades.general.elective }
    ), 24]
];


function mkList(creditsData, gradesData) {
    return Object.keys(creditsData)
        .filter(key => gradesData[key] !== null)
        .map(key => ([
            key,
            creditsData[key],
            gradeMap[gradesData[key]]
        ]));
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

function calculateTotal(creditsData, gradesData) {
    return Object.keys(creditsData).reduce((sum, key) => {
        const grade = gradesData[key];
        return sum + (grade !== "0" && grade !== null ? creditsData[key] : 0);
    }, 0);
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

totalDataList.forEach(([totalCreditId, total, target]) => {
    const totalCreditElement = document.getElementById(totalCreditId);
    if (totalCreditElement) {
        totalCreditElement.innerText = `${total}/${target}`;
    } else {
        console.error(`total credit id ${totalCreditId} not found`);
    }
});