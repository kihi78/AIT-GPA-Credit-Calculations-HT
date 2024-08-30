function adjustWidths() {
    const genElecTableWidth = document.getElementById("general-elective").offsetWidth;
    const genReqRes6Res8ElecCreWidth = document.getElementById("general-required-restricted6-restricted8-elective-credits").offsetWidth;
    
    document.getElementById("gen-req-res6-table-div").style.width = genElecTableWidth + "px";
    document.getElementById("general-restricted8").style.width = genElecTableWidth + "px";

    document.getElementById("gen-req-res6-res8-div").style.width = (genElecTableWidth + (genReqRes6Res8ElecCreWidth * 3 / 4)) + "px";
    const genReqRes6Res8DivWidth = document.getElementById("gen-req-res6-res8-div").offsetWidth;
    document.getElementById("general-required-restricted6-restricted8-credits").style.width = (genReqRes6Res8DivWidth - genElecTableWidth - 2) + "px";
    
    document.getElementById("gen-req-res6-div").style.width = (genElecTableWidth + (genReqRes6Res8ElecCreWidth / 2)) + "px";
    const genReqRes6DivWidth = document.getElementById("gen-req-res6-div").offsetWidth;
    document.getElementById("general-required-restricted6-credits").style.width = (genReqRes6DivWidth - genElecTableWidth - 2) + "px";


    document.querySelector(".table-header tbody tr").children[3].style.width = genReqRes6Res8ElecCreWidth + 'px';

    const thirdCellWidth = window.getComputedStyle(document.querySelector('#specialized-required tbody tr:nth-child(2) td:nth-child(3)')).width;
    document.querySelector('.table-header tbody tr td:nth-child(2)').style.width = thirdCellWidth;
    document.querySelector('.table-header tbody tr td:nth-child(3)').style.width = thirdCellWidth;






}

window.addEventListener("load", adjustWidths);
window.addEventListener("resize", adjustWidths);