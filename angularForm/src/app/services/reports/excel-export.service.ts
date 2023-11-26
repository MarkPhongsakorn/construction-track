import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})

export class ExcelExportService {
  constructor() { }

  exportToExcel(
    project_name: string,
    dr_time: string,
    comp_name: string,
    period_name1: string,
    sta_name1: string,
    sta_time1: string,
    period_name2: string,
    sta_name2: string,
    sta_time2: string,
    labor_name: string[],
    labor_num: number[],
    work_num: number[],
    work_detail: string[],
    tool_name: string[],
    tool_num: number[],
    unit_tool: string[],
    mat_name: string[],
    mat_num: number[],
    unit_mat: string[],
    fileName: string,
    sheetName: string
  ): void {


    console.log(labor_name);
    console.log(labor_num);
    console.log(work_num);


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    const font18 = { name: 'TH SarabunPSK', size: 18 };
    const font11 = { name: 'TH SarabunPSK', size: 16 };

    worksheet.mergeCells('A4:I4');
    const cellA4 = worksheet.getCell('A4');
    cellA4.value = 'บันทึกการควบคุมงานประจำวัน';
    cellA4.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA4.font = font18;

    worksheet.mergeCells('A5:C7');
    const cellA5 = worksheet.getCell('A5');
    cellA5.value = 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย สงขลา';
    cellA5.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA5.border = borderThin;
    cellA5.font = font11;

    worksheet.mergeCells('D6:F7');
    const cellD6 = worksheet.getCell('D6');
    cellD6.value = 'โครงการ: ' + project_name;
    cellD6.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD6.border = borderThin;
    cellD6.font = font11;

    worksheet.mergeCells('D5:I5');
    const cellD5 = worksheet.getCell('D5');
    cellD5.value = 'วันที่ ' + dr_time;
    cellD5.alignment = { horizontal: 'right', vertical: 'middle' };
    cellD5.border = borderThin;
    cellD5.font = font11;

    worksheet.mergeCells('G6:I7');
    const cellG6 = worksheet.getCell('G6');
    cellG6.value = 'บริษัทรับจ้าง: ' + comp_name;
    cellG6.alignment = { horizontal: 'center', vertical: 'middle' };
    cellG6.border = borderThin;
    cellG6.font = font11;

    worksheet.mergeCells('A8:D9');
    const cellA8 = worksheet.getCell('A8');
    cellA8.value = 'ช่วงเวลา: ' + period_name1 + ' สถานะ: ' + sta_name1 + ' เวลาฝนตก: ' + sta_time1;
    cellA8.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA8.border = borderThin;
    cellA8.font = font11;

    worksheet.mergeCells('E8:I9');
    const cellE8 = worksheet.getCell('E8');
    cellE8.value = 'ช่วงเวลา: ' + period_name2 + ' สถานะ: ' + sta_name2 + ' เวลาฝนตก: ' + sta_time2;
    cellE8.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE8.border = borderThin;
    cellE8.font = font11;

    worksheet.mergeCells('A10:D10');
    const cellA10 = worksheet.getCell('A10');
    cellA10.value = 'ปริมาณแรงงาน';
    cellA10.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA10.border = borderThin;
    cellA10.font = font11;

    worksheet.mergeCells('E10:I10');
    const cellE10 = worksheet.getCell('E10');
    cellE10.value = 'ปริมาณงานที่ทำประจำวัน';
    cellE10.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE10.border = borderThin;
    cellE10.font = font11;

    worksheet.mergeCells('A11:C11');
    const cellA11 = worksheet.getCell('A11');
    cellA11.value = 'รายละเอียด';
    cellA11.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA11.border = borderThin;
    cellA11.font = font11;

    const cellD11 = worksheet.getCell('D11');
    cellD11.value = 'จำนวน';
    cellD11.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD11.border = borderThin
    cellD11.font = font11;

    const cellE11 = worksheet.getCell('E11');
    cellE11.value = 'อันดับ';
    cellE11.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE11.border = borderThin;
    cellE11.font = font11;

    worksheet.mergeCells('F11:I11');
    const cellF11 = worksheet.getCell('F11');
    cellF11.value = 'รายละเอียด';
    cellF11.alignment = { horizontal: 'center', vertical: 'middle' };
    cellF11.border = borderThin;
    cellF11.font = font11;

    // const cellI11 = worksheet.getCell('I11');
    // cellI11.value = 'ปริมาณ';
    // cellI11.alignment = { horizontal: 'center', vertical: 'middle' };
    // cellI11.border = borderThin;

    let laborNameRow = 12;
    for (let i = 0; i < 19; i++) {
      const mergeToRow = Math.min(laborNameRow, 30);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      worksheet.mergeCells(`A${laborNameRow}:C${laborNameRow}`);
      const cellLaborName = worksheet.getCell(`A${laborNameRow}`);
      cellLaborName.value = labor_name[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font11;
      if (laborNameRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(laborNameRow + 1).height = worksheet.getRow(laborNameRow).height;
        laborNameRow = mergeToRow + 1;
      } else {
        laborNameRow++;
      }
    }

    let laborNumRow = 12;
    for (let i = 0; i < 19; i++) {
      const mergeToRow = Math.min(laborNumRow, 30);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      const cellLaborNum = worksheet.getCell(`D${laborNumRow}`);
      cellLaborNum.value = labor_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellLaborNum.alignment = { horizontal: 'center', vertical: 'middle' };
      cellLaborNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborNum.font = font11;
      if (laborNumRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(laborNumRow + 1).height = worksheet.getRow(laborNumRow).height;
        laborNumRow = mergeToRow + 1;
      } else {
        laborNumRow++;
      }
    }

    let workNumRow = 12;
    for (let i = 0; i < 19; i++) {
      const mergeToRow = Math.min(workNumRow, 30);

      const cellWorkNum = worksheet.getCell(`E${workNumRow}`);
      cellWorkNum.value = work_num[i] || '';
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle' };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font11;
      if (workNumRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNumRow + 1).height = worksheet.getRow(workNumRow).height;
        workNumRow = mergeToRow + 1;
      } else {
        workNumRow++;
      }
    }

    let workDetailRow = 12;
    for (let i = 0; i < 19; i++) {
      const mergeToRow = Math.min(workDetailRow, 30)

      worksheet.mergeCells(`F${workDetailRow}:I${workDetailRow}`);
      const cellWorkDetail = worksheet.getCell(`F${workDetailRow}`);
      cellWorkDetail.value = work_detail[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font11;
      if (workDetailRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow + 1).height = worksheet.getRow(workDetailRow).height;
        workDetailRow = mergeToRow + 1;
      } else {
        workDetailRow++;
      }
    }

    let workRow = 12;
    for (let i = 0; i < 19; i++) {
      const mergeToRow = Math.min(workRow, 30)

      // worksheet.mergeCells(`F${workRow}:H${workRow}`);
      const cellWork = worksheet.getCell(`I${workRow}`);
      cellWork.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWork.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWork.font = font11;
      if (workRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workRow + 1).height = worksheet.getRow(workRow).height;
        workRow = mergeToRow + 1;
      } else {
        workRow++;
      }
    }

    worksheet.mergeCells('A31:C31');
    const cellA31 = worksheet.getCell('A31');
    cellA31.value = 'รวม';
    cellA31.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA31.border = borderThin;
    cellA31.font = font11;

    const cellD31 = worksheet.getCell('D31');
    cellD31.value = { formula: 'SUM(D12:D30)' };
    cellD31.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD31.border = borderThin;
    cellD31.font = font11;

    const cellE31 = worksheet.getCell('E31');
    cellE31.value = '';
    cellE31.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE31.border = borderThin;
    cellE31.font = font11;

    worksheet.mergeCells('F31:I31');
    const cellF31 = worksheet.getCell('F31');
    cellF31.value = '';
    cellF31.alignment = { horizontal: 'center', vertical: 'middle' };
    cellF31.border = borderThin;
    cellF31.font = font11;

    // const cellI31 = worksheet.getCell('I31');
    // cellI31.value = '';
    // cellI31.alignment = { horizontal: 'center', vertical: 'middle' };
    // cellI31.border = borderThin;

    worksheet.mergeCells('A32:D32');
    const cellA32 = worksheet.getCell('A32');
    cellA32.value = 'ปริมาณเครื่องมือและเครื่องจักร';
    cellA32.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA32.border = borderThin;
    cellA32.font = font11;

    worksheet.mergeCells('A33:B33');
    const cellB33 = worksheet.getCell('B33');
    cellB33.value = 'รายละเอียด';
    cellB33.alignment = { horizontal: 'center', vertical: 'middle' };
    cellB33.border = borderThin;
    cellB33.font = font11;

    const cellC33 = worksheet.getCell('C33');
    cellC33.value = 'จำนวน';
    cellC33.alignment = { horizontal: 'center', vertical: 'middle' };
    cellC33.border = borderThin;
    cellC33.font = font11;

    const cellD33 = worksheet.getCell('D33');
    cellD33.value = 'หน่วย';
    cellD33.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD33.border = borderThin;
    cellD33.font = font11;

    worksheet.mergeCells('E32:I32');
    const cellE32 = worksheet.getCell('E32');
    cellE32.value = 'ปริมาณวัสดุที่เข้าหน่วยงาน';
    cellE32.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE32.border = borderThin;
    cellE32.font = font11;

    worksheet.mergeCells('E33:G33');
    const cellE33 = worksheet.getCell('E33');
    cellE33.value = 'รายละเอียด';
    cellE33.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE33.border = borderThin;
    cellE33.font = font11;

    const cellH33 = worksheet.getCell('H33');
    cellH33.value = 'ปริมาณ';
    cellH33.alignment = { horizontal: 'center', vertical: 'middle' };
    cellH33.border = borderThin;
    cellH33.font = font11;

    const cellI33 = worksheet.getCell('I33');
    cellI33.value = 'หน่วย';
    cellI33.alignment = { horizontal: 'center', vertical: 'middle' };
    cellI33.border = borderThin;
    cellI33.font = font11;

    let toolNameRow = 34;
    for (let i = 0; i < 7; i++) {
      const mergeToRow = Math.min(toolNameRow, 7)

      worksheet.mergeCells(`A${toolNameRow}:B${toolNameRow}`);
      const cellToolName = worksheet.getCell(`A${toolNameRow}`);
      cellToolName.value = tool_name[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellToolName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellToolName.font = font11;
      if (toolNameRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolNameRow + 1).height = worksheet.getRow(toolNameRow).height;
        toolNameRow = mergeToRow + 1;
      } else {
        toolNameRow++;
      }
    }

    let toolNumRow = 34;
    for (let i = 0; i < 7; i++) {
      const mergeToRow = Math.min(toolNumRow, 7)

      // worksheet.mergeCells(`A${toolNumRow}:B${toolNumRow}`);
      const cellToolNum = worksheet.getCell(`C${toolNumRow}`);
      cellToolNum.value = tool_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellToolNum.alignment = { horizontal: 'center', vertical: 'middle' };
      cellToolNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellToolNum.font = font11;
      if (toolNumRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolNumRow + 1).height = worksheet.getRow(toolNumRow).height;
        toolNumRow = mergeToRow + 1;
      } else {
        toolNumRow++;
      }
    }

    let unitToolRow = 34;
    for (let i = 0; i < 7; i++) {
      const mergeToRow = Math.min(unitToolRow, 7)

      // worksheet.mergeCells(`A${unitToolRow}:B${unitToolRow}`);
      const cellUnitTool = worksheet.getCell(`D${unitToolRow}`);
      cellUnitTool.value = unit_tool[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellUnitTool.alignment = { horizontal: 'center', vertical: 'middle' };
      cellUnitTool.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellUnitTool.font = font11;
      if (unitToolRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(unitToolRow + 1).height = worksheet.getRow(unitToolRow).height;
        unitToolRow = mergeToRow + 1;
      } else {
        unitToolRow++;
      }
    }

    let matNameRow = 34;
    for (let i = 0; i < 7; i++) {
      const mergeToRow = Math.min(matNameRow, 7)

      worksheet.mergeCells(`E${matNameRow}:G${matNameRow}`);
      const cellMatName = worksheet.getCell(`E${matNameRow}`);
      cellMatName.value = mat_name[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellMatName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellMatName.font = font11;
      if (matNameRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(matNameRow + 1).height = worksheet.getRow(matNameRow).height;
        matNameRow = mergeToRow + 1;
      } else {
        matNameRow++;
      }
    }

    let matNumRow = 34;
    for (let i = 0; i < 7; i++) {
      const mergeToRow = Math.min(matNumRow, 7)

      // worksheet.mergeCells(`A${matNumRow}:B${matNumRow}`);
      const cellMatNum = worksheet.getCell(`H${matNumRow}`);
      cellMatNum.value = mat_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellMatNum.alignment = { horizontal: 'center', vertical: 'middle' };
      cellMatNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellMatNum.font = font11;
      if (matNumRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(matNumRow + 1).height = worksheet.getRow(matNumRow).height;
        matNumRow = mergeToRow + 1;
      } else {
        matNumRow++;
      }
    }

    let unitMatRow = 34;
    for (let i = 0; i < 7; i++) {
      const mergeToRow = Math.min(unitMatRow, 7)

      // worksheet.mergeCells(`A${unitMatRow}:B${unitMatRow}`);
      const cellUnitMat = worksheet.getCell(`I${unitMatRow}`);
      cellUnitMat.value = unit_mat[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellUnitMat.alignment = { horizontal: 'center', vertical: 'middle' };
      cellUnitMat.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellUnitMat.font = font11;
      if (unitMatRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(unitMatRow + 1).height = worksheet.getRow(unitMatRow).height;
        unitMatRow = mergeToRow + 1;
      } else {
        unitMatRow++;
      }
    }

    worksheet.getColumn('A').width = 15;
    worksheet.getColumn('B').width = 15;
    worksheet.getColumn('C').width = 15;
    worksheet.getColumn('D').width = 15;
    worksheet.getColumn('E').width = 15;
    worksheet.getColumn('F').width = 15;
    worksheet.getColumn('G').width = 15;
    worksheet.getColumn('H').width = 9;
    worksheet.getColumn('I').width = 9;

    worksheet.getRow(2).height = 26.5;
    worksheet.getRow(3).height = 26.5;
    worksheet.getRow(4).height = 34;
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber >= 5 && rowNumber <= 7) {
        row.height = 30; // กำหนดความสูงของแถวที่ 5-10 เป็น 20
      }
    });
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber >= 8 && rowNumber <= 40) {
        row.height = 30; // กำหนดความสูงของแถวที่ 5-10 เป็น 20
      }
    });

    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(blob, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}