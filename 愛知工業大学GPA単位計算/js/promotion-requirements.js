import credits from "../data-json/credits.json" with { type: "json" };
import grades from "../data-json/grades.json" with { type: "json" };


function calculateTotalCredits(subject, grade) {
    return Object.keys(subject).filter(key => grade[key] !== null && grade[key] !== "0")
    .reduce((sum, key) => sum + subject[key], 0)
};


const specResTotal = calculateTotalCredits(credits.specialized.restricted, grades.specialized.restricted);

const specReqTotal = calculateTotalCredits(
    credits.specialized.required, grades.specialized.required
) + (specResTotal >= 2 ? 2 : specResTotal);

const specElecTotal = calculateTotalCredits(
    credits.specialized.elective, grades.specialized.elective
) + (specResTotal >= 2 ? specResTotal - 2 : 0);

const specTotal = specReqTotal + specElecTotal

const genRes6Total = calculateTotalCredits(credits.general.restricted6, grades.general.restricted6);

const englishTotal = calculateTotalCredits(
    credits.general.required, grades.general.required
) + genRes6Total;

const genRes8Total = calculateTotalCredits(credits.general.restricted8, grades.general.restricted8);

let addForGenReq;
if (genRes6Total >= 5) {
    addForGenReq = 5;
} else if (genRes8Total >= 2) {
    if (genRes6Total + genRes8Total >= 5) {
        addForGenReq = 5;
    } else {
        addForGenReq = genRes6Total + 2;
    }
} else {
    addForGenReq = genRes6Total + genRes8Total;
}
const genReqTotal = calculateTotalCredits(credits.general.required, grades.general.required) + addForGenReq;

const genTotal = calculateTotalCredits(credits.general.required, grades.general.required)
+ genRes6Total + genRes8Total
+ calculateTotalCredits(credits.general.elective, grades.general.elective);

const genElecTotal = genTotal - genReqTotal;

const reqTotal = specReqTotal + genReqTotal;

const elecTotal = specElecTotal + genElecTotal;

const total = reqTotal + elecTotal;


document.getElementById('specialized-required').innerText = `${specReqTotal}/48`;
document.getElementById('general-required').innerText = `${genReqTotal}/8`;
document.getElementById('required-total').innerText = `${reqTotal}/56`;
document.getElementById('specialized-elective').innerText = `${specElecTotal}/52`;
document.getElementById('general-elective').innerText = `${genElecTotal}/16`;
document.getElementById('elective-total').innerText = `${elecTotal}/68`;
document.getElementById('specialized-total').innerText = `${specTotal}/100`;
document.getElementById('general-total').innerText = `${genTotal}/24`;
document.getElementById('total').innerText = `${total}/124`;

document.getElementById('total-credit').innerText = `現在: ${total} 単位`;
document.getElementById('specialized-restricted').innerText = `　${specResTotal}/2単位`;
document.getElementById('english').innerText = `　${englishTotal}/6単位`;