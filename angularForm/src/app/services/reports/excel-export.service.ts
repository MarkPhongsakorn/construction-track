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
    rain_level1: string,
    rain_start1: string,
    rain_end1: string,
    period_name2: string,
    sta_name2: string,
    rain_level2: string,
    rain_start2: string,
    rain_end2: string,
    inspect_start: string,
    inspect_end: string,
    work_start: string,
    work_end: string,
    labor_name: string[],
    labor_num: number[],
    work_num: number[],
    work_detail: string[],
    tool_name: string[],
    tool_num: number[],
    mat_name: string[],
    mat_num: number[],
    mat_unit: string[],
    problem: string,
    strike_detail: string,
    strike_cause: string,
    inspec_result: string,
    od_detail: string,
    fileName: string,
    sheetName: string
  ): void {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    const font18 = { name: 'TH SarabunPSK', size: 18, bold: true };
    const font11 = { name: 'TH SarabunPSK', size: 13 };
    const font12 = { name: 'TH SarabunPSK', size: 13, bold: true };
    const font14 = { name: 'TH SarabunPSK', size: 14 };

    const cellJ1 = worksheet.getCell('J1');
    cellJ1.value = 'หน้า(1/2)'
    cellJ1.alignment = { horizontal: 'center', vertical: 'middle' };
    cellJ1.font = font11;

    worksheet.mergeCells('A4:J4');
    const cellA4 = worksheet.getCell('A4');
    cellA4.value = 'บันทึกการควบคุมงานประจำวัน';
    cellA4.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA4.font = font18;

    worksheet.mergeCells('A5:C7');
    const cellA5 = worksheet.getCell('A5');
    cellA5.value = 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย สงขลา';
    cellA5.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA5.border = borderThin;
    cellA5.font = font14;

    worksheet.mergeCells('D6:F7');
    const cellD6 = worksheet.getCell('D6');
    cellD6.value = 'โครงการ: ' + project_name;
    cellD6.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD6.border = borderThin;
    cellD6.font = font14;

    worksheet.mergeCells('D5:J5');
    const cellD5 = worksheet.getCell('D5');
    cellD5.value = dr_time;
    cellD5.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD5.border = borderThin;
    cellD5.font = font14;

    worksheet.mergeCells('G6:J7');
    const cellG6 = worksheet.getCell('G6');
    cellG6.value = 'บริษัทรับจ้าง: ' + comp_name;
    cellG6.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG6.border = borderThin;
    cellG6.font = font14;

    worksheet.mergeCells('A8:D8');
    const cellA8 = worksheet.getCell('A8');
    cellA8.value = 'ช่วงเวลา: ' + period_name1 + ' สถานะ: ' + sta_name1 + ' ระดับฝน: ' + rain_level1 + ' เวลาฝนตก: ' + rain_start1 + ' น. ถึง ' + rain_end1 + ' น.';
    cellA8.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA8.border = borderThin;
    cellA8.font = font14;

    worksheet.mergeCells('E8:J8');
    const cellE8 = worksheet.getCell('E8');
    cellE8.value = 'ช่วงเวลา: ' + period_name2 + ' สถานะ: ' + sta_name2 + ' ระดับฝน: ' + rain_level2 + ' เวลาฝนตก: ' + rain_start2 + ' น. ถึง ' + rain_end2 + ' น.';
    cellE8.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE8.border = borderThin;
    cellE8.font = font14;

    worksheet.mergeCells('A9:D9');
    const cellA9 = worksheet.getCell('A9');
    cellA9.value = 'เวลาลงตรวจ ' + inspect_start + ' - ' + inspect_end + ' น.';
    cellA9.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA9.border = borderThin;
    cellA9.font = font14;

    worksheet.mergeCells('E9:J9');
    const cellE9 = worksheet.getCell('E9');
    cellE9.value = 'เวลาทำงาน ' + work_start + ' - ' + work_end + ' น.';
    cellE9.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE9.border = borderThin;
    cellE9.font = font14;

    worksheet.mergeCells('A10:C10');
    const cellA10 = worksheet.getCell('A10');
    cellA10.value = 'ปริมาณแรงงาน';
    cellA10.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA10.border = borderThin;
    cellA10.font = font12;

    worksheet.mergeCells('D10:J10');
    const cellE10 = worksheet.getCell('E10');
    cellE10.value = 'ปริมาณงานที่ทำประจำวัน';
    cellE10.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE10.border = borderThin;
    cellE10.font = font12;

    worksheet.mergeCells('A11:B11');
    const cellA11 = worksheet.getCell('A11');
    cellA11.value = 'รายละเอียด';
    cellA11.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA11.border = borderThin;
    cellA11.font = font12;

    const cellD11 = worksheet.getCell('C11');
    cellD11.value = 'จำนวน';
    cellD11.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD11.border = borderThin
    cellD11.font = font12;

    const cellE11 = worksheet.getCell('D11');
    cellE11.value = 'อันดับ';
    cellE11.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE11.border = borderThin;
    cellE11.font = font12;

    worksheet.mergeCells('E11:I11');
    const cellF11 = worksheet.getCell('F11');
    cellF11.value = 'รายละเอียด';
    cellF11.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF11.border = borderThin;
    cellF11.font = font12;

    const cellJ11 = worksheet.getCell('J11');
    cellJ11.value = 'ปริมาณ';
    cellJ11.alignment = { horizontal: 'center', vertical: 'middle' };
    cellJ11.border = borderThin;
    cellJ11.font = font12;

    let laborNameRow = 12;
    for (let i = 0; i < 19; i++) {
      const mergeToRow = Math.min(laborNameRow, 19);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      worksheet.mergeCells(`A${laborNameRow}:B${laborNameRow}`);
      const cellLaborName = worksheet.getCell(`A${laborNameRow}`);
      cellLaborName.value = labor_name[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellLaborName.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
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
      const mergeToRow = Math.min(laborNumRow, 19);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      const cellLaborNum = worksheet.getCell(`C${laborNumRow}`);
      cellLaborNum.value = labor_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellLaborNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
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

    const cellWording1 = worksheet.getCell('D12');
    cellWording1.value = '';
    cellWording1.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const cellWording2 = worksheet.getCell('D13');
    cellWording2.value = '';
    cellWording2.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    let workNumRow = 14;
    for (let i = 0; i < 17; i++) {
      const mergeToRow = Math.min(workNumRow, 17);

      const cellWorkNum = worksheet.getCell(`D${workNumRow}`);
      cellWorkNum.value = work_num[i] || '';
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
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

    if (work_detail.includes("")) {
      worksheet.mergeCells('E12:I12');
      const cellWording1 = worksheet.getCell('E12');
      cellWording1.value = 'ผู้ควบคุมงานเข้าพื้นที่ตรวจการทำงานของผู้รับจ้าง';
      cellWording1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWording1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWording1.font = font11;
      worksheet.mergeCells('E13:I13');
      const cellWording2 = worksheet.getCell('E13');
      cellWording2.value = 'ปรากฎว่า ผู้รับจ้างไม่เข้าพื้นที่ ไม่มีการปฏิบัติงาน';
      cellWording2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWording2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWording2.font = font11;
    } else {
      worksheet.mergeCells('E12:I12');
      const cellWording1 = worksheet.getCell('E12');
      cellWording1.value = 'ผู้ควบคุมงานเข้าพื้นที่ตรวจการทำงานของผู้รับจ้าง';
      cellWording1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWording1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWording1.font = font11;
      worksheet.mergeCells('E13:I13');
      const cellWording2 = worksheet.getCell('E13');
      cellWording2.value = 'ปรากฎว่า ผู้รับจ้างเข้าพื้นที่ มีการปฏิบัติงาน ดังนี้';
      cellWording2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWording2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWording2.font = font11;
    }

    let workDetailRow = 14;
    for (let i = 0; i < 17; i++) {
      const mergeToRow = Math.min(workDetailRow, 17)

      worksheet.mergeCells(`E${workDetailRow}:I${workDetailRow}`);
      const cellWorkDetail = worksheet.getCell(`F${workDetailRow}`);
      cellWorkDetail.value = work_detail[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
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
      const mergeToRow = Math.min(workRow, 19)

      // worksheet.mergeCells(`F${workRow}:H${workRow}`);
      const cellWork = worksheet.getCell(`J${workRow}`);
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

    worksheet.mergeCells('A31:B31');
    const cellA31 = worksheet.getCell('A31');
    cellA31.value = 'รวม';
    cellA31.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA31.border = borderThin;
    cellA31.font = font12;

    const cellC31 = worksheet.getCell('C31');
    cellC31.value = { formula: 'SUM(C12:C30)' };
    cellC31.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellC31.border = borderThin;
    cellC31.font = font11;

    const cellD31 = worksheet.getCell('D31');
    cellD31.value = '';
    cellD31.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD31.border = borderThin;

    worksheet.mergeCells('E31:I31');
    const cellE31 = worksheet.getCell('E31');
    cellE31.value = '';
    cellE31.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE31.border = borderThin;
    cellE31.font = font11;

    const cellJ31 = worksheet.getCell('J31');
    cellJ31.value = '';
    cellJ31.alignment = { horizontal: 'center', vertical: 'middle' };
    cellJ31.border = borderThin;

    worksheet.mergeCells('A32:F32');
    const cellA32 = worksheet.getCell('A32');
    cellA32.value = 'ปริมาณเครื่องมือและเครื่องจักร';
    cellA32.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA32.border = borderThin;
    cellA32.font = font12;

    worksheet.mergeCells('A33:B33');
    const cellA33 = worksheet.getCell('A33');
    cellA33.value = 'รายละเอียด';
    cellA33.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA33.border = borderThin;
    cellA33.font = font12;

    const cellC33 = worksheet.getCell('C33');
    cellC33.value = 'จำนวน';
    cellC33.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellC33.border = borderThin;
    cellC33.font = font12;

    worksheet.mergeCells('D33:E33');
    const cellD33 = worksheet.getCell('D33');
    cellD33.value = 'รายละเอียด';
    cellD33.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD33.border = borderThin;
    cellD33.font = font12;

    const cellF33 = worksheet.getCell('F33');
    cellF33.value = 'จำนวน';
    cellF33.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF33.border = borderThin;
    cellF33.font = font12;

    worksheet.mergeCells('G32:J32');
    const cellG32 = worksheet.getCell('G32');
    cellG32.value = 'ปริมาณเครื่องมือและเครื่องจักร';
    cellG32.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG32.border = borderThin;
    cellG32.font = font12;

    worksheet.mergeCells('G33:I33');
    const cellG33 = worksheet.getCell('G33');
    cellG33.value = 'รายละเอียด';
    cellG33.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG33.border = borderThin;
    cellG33.font = font12;

    const cellJ33 = worksheet.getCell('J33');
    cellJ33.value = 'จำนวน';
    cellJ33.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ33.border = borderThin;
    cellJ33.font = font12;

    let toolNameRowA = 34;
    let toolNameRowD = 34;
    for (let i = 0; i < 18; i++) {
      if (i < 9) {
        const mergeToRowA = Math.min(toolNameRowA, 9);
        // 8 ข้อมูลแรกให้แสดงที่แถว A
        worksheet.mergeCells(`A${toolNameRowA}:B${toolNameRowA}`);
        const cellToolName = worksheet.getCell(`A${toolNameRowA}`);
        cellToolName.value = tool_name[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
        cellToolName.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        cellToolName.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cellToolName.font = font11;

        if (toolNameRowA < mergeToRowA) {
          // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
          worksheet.getRow(toolNameRowA + 1).height = worksheet.getRow(toolNameRowA).height;
          toolNameRowA = mergeToRowA + 1;
        } else {
          toolNameRowA++;
        }
      } else {
        const mergeToRowD = Math.min(toolNameRowD, 18);
        // ข้อมูลที่เหลือให้แสดงที่แถว C
        worksheet.mergeCells(`D${toolNameRowD}:E${toolNameRowD}`);
        const cellToolName = worksheet.getCell(`D${toolNameRowD}`);
        cellToolName.value = tool_name[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
        cellToolName.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        cellToolName.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cellToolName.font = font11;

        if (toolNameRowD < mergeToRowD) {
          // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
          worksheet.getRow(toolNameRowD + 1).height = worksheet.getRow(toolNameRowD).height;
          toolNameRowD = mergeToRowD + 1;
        } else {
          toolNameRowD++;
        }
      }
    }

    let toolNumRowC = 34;
    let toolNumRowF = 34;
    for (let i = 0; i < 18; i++) {
      const mergeToRowC = Math.min(toolNumRowC, 9)
      const mergeToRowF = Math.min(toolNumRowF, 18)

      if (i < 9) {
        const cellToolNum = worksheet.getCell(`C${toolNumRowC}`);
        cellToolNum.value = tool_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
        cellToolNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cellToolNum.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cellToolNum.font = font11;
        if (toolNumRowC < mergeToRowC) {
          // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
          worksheet.getRow(toolNumRowC + 1).height = worksheet.getRow(toolNumRowC).height;
          toolNumRowC = mergeToRowC + 1;
        } else {
          toolNumRowC++;
        }
      } else {
        const cellToolNum = worksheet.getCell(`F${toolNumRowF}`);
        cellToolNum.value = tool_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
        cellToolNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cellToolNum.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cellToolNum.font = font11;
        if (toolNumRowF < mergeToRowF) {
          // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
          worksheet.getRow(toolNumRowF + 1).height = worksheet.getRow(toolNumRowF).height;
          toolNumRowF = mergeToRowF + 1;
        } else {
          toolNumRowF++;
        }
      }
    }

    let matNameRow = 34;
    for (let i = 0; i < 9; i++) {
      const mergeToRow = Math.min(matNameRow, 9)

      worksheet.mergeCells(`G${matNameRow}:I${matNameRow}`);
      const cellMatName = worksheet.getCell(`G${matNameRow}`);
      const matName = mat_name[i] || '';
      const matUnit = mat_unit[i] || '';
      let nameAndUnit = '';
      if (matName !== '' && matUnit !== '') {
        nameAndUnit = matName + '(' + matUnit + ')';
      } else {
        nameAndUnit = matName + matUnit;
      }
      cellMatName.value = nameAndUnit;
      cellMatName.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellMatName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellMatName.font = font11;

      // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
      if (matNameRow < mergeToRow) {
        worksheet.getRow(matNameRow + 1).height = worksheet.getRow(matNameRow).height;
        matNameRow = mergeToRow + 1;
      } else {
        matNameRow++;
      }
    }

    let matNumRow = 34;
    for (let i = 0; i < 9; i++) {
      const mergeToRow = Math.min(matNumRow, 9)

      // worksheet.mergeCells(`A${matNumRow}:B${matNumRow}`);
      const cellMatNum = worksheet.getCell(`J${matNumRow}`);
      cellMatNum.value = mat_num[i] || ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellMatNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
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

    worksheet.mergeCells('A43:B43');
    const cellA43 = worksheet.getCell('A43');
    cellA43.value = 'รวม';
    cellA43.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA43.border = borderThin;
    cellA43.font = font12;

    const cellC43 = worksheet.getCell('C43');
    cellC43.value = { formula: 'SUM(C34:C42,F34:F42,J34:J42)' };
    cellC43.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellC43.border = borderThin;
    cellC43.font = font11;

    worksheet.mergeCells('D43:J43');
    const cellD43 = worksheet.getCell('D43');
    cellD43.value = '';
    cellD43.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD43.border = borderThin;
    cellD43.font = font12;

    const cellJ42 = worksheet.getCell('J44');
    cellJ42.value = 'หน้า(2/2)'
    cellJ42.alignment = { horizontal: 'center', vertical: 'middle' };
    cellJ42.font = font11;

    worksheet.mergeCells('A46:D46');
    const cellA46 = worksheet.getCell('A46');
    cellA46.value = 'ปัญหาและอุปสรรคอื่น ๆ';
    cellA46.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA46.border = borderThin;
    cellA46.font = font12;

    worksheet.mergeCells('E46:G46');
    const cellE46 = worksheet.getCell('E46');
    cellE46.value = 'การหยุดงาน';
    cellE46.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE46.border = borderThin;
    cellE46.font = font12;

    worksheet.mergeCells('H46:J46');
    const cellH46 = worksheet.getCell('H46');
    cellH46.value = 'สาเหตุ';
    cellH46.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH46.border = borderThin;
    cellH46.font = font12;

    worksheet.mergeCells('A47:D60');
    const cellA47 = worksheet.getCell('A47');
    cellA47.value = problem;
    cellA47.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    cellA47.border = borderThin;
    cellA47.font = font11;

    worksheet.mergeCells('E47:G60');
    const cellE47 = worksheet.getCell('E47');
    cellE47.value = strike_cause;
    cellE47.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    cellE47.border = borderThin;
    cellE47.font = font11;

    worksheet.mergeCells('H47:J60');
    const cellH47 = worksheet.getCell('H47');
    cellH47.value = strike_detail;
    cellH47.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    cellH47.border = borderThin;
    cellH47.font = font11;

    worksheet.mergeCells('A61:D61');
    const cellA61 = worksheet.getCell('A61');
    cellA61.value = 'ผลการตรวจงาน';
    cellA61.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA61.border = borderThin;
    cellA61.font = font12;

    worksheet.mergeCells('E61:G61');
    const cellE61 = worksheet.getCell('E61');
    cellE61.value = '';
    cellE61.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE61.border = borderThin;
    cellE61.font = font11;

    worksheet.mergeCells('H61:J61');
    const cellH61 = worksheet.getCell('H61');
    cellH61.value = '';
    cellH61.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH61.border = borderThin;
    cellH61.font = font11;

    worksheet.mergeCells('A62:D63');
    const cellA62 = worksheet.getCell('A62');
    cellA62.value = inspec_result;
    cellA62.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA62.border = borderThin;
    cellA62.font = font18;

    worksheet.mergeCells('E62:G63');
    const cellE62 = worksheet.getCell('E62');
    cellE62.value = '';
    cellE62.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellE62.border = borderThin;
    cellE62.font = font11;

    worksheet.mergeCells('H62:J63');
    const cellH62 = worksheet.getCell('H62');
    cellH62.value = '';
    cellH62.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellH62.border = borderThin;
    cellH62.font = font11;

    worksheet.mergeCells('A64:D64');
    const cellA64 = worksheet.getCell('A64');
    cellA64.value = 'การขยายเวลาก่อสร้างลด/งด/ค่าปรับ';
    cellA64.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA64.border = borderThin;
    cellA64.font = font12;

    worksheet.mergeCells('E64:G64');
    const cellE64 = worksheet.getCell('E64');
    cellE64.value = '';
    cellE64.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE64.border = borderThin;
    cellE64.font = font11;

    worksheet.mergeCells('H64:J64');
    const cellH64 = worksheet.getCell('H64');
    cellH64.value = '';
    cellH64.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH64.border = borderThin;
    cellH64.font = font11;

    worksheet.mergeCells('A65:D71');
    const cellA65 = worksheet.getCell('A65');
    cellA65.value = od_detail;
    cellA65.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    cellA65.border = borderThin;
    cellA65.font = font11;

    worksheet.mergeCells('E65:G71');
    const cellE65 = worksheet.getCell('E65');
    cellE65.value = '';
    cellE65.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE65.border = borderThin;
    cellE65.font = font11;

    worksheet.mergeCells('H65:J71');
    const cellH65 = worksheet.getCell('H65');
    cellH65.value = '';
    cellH65.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH65.border = borderThin;
    cellH65.font = font11;

    worksheet.mergeCells('A72:D72');
    const cellA72 = worksheet.getCell('A72');
    cellA72.value = 'รายงานโดย';
    cellA72.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA72.border = borderThin;
    cellA72.font = font12;

    worksheet.mergeCells('E72:G72');
    const cellE72 = worksheet.getCell('E72');
    cellE72.value = '';
    cellE72.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE72.border = borderThin;
    cellE72.font = font11;

    worksheet.mergeCells('H72:J72');
    const cellH72 = worksheet.getCell('H72');
    cellH72.value = '';
    cellH72.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH72.border = borderThin;
    cellH72.font = font11;

    worksheet.mergeCells('A73:D77');
    const data =
      [
        ' (1).................................................................................หัวหน้าผู้ควบคุม',
        ' (2).................................................................................ผู้ควบคุม',
        ' (3).................................................................................ผู้ควบคุม',
        ' (4).................................................................................ผู้ควบคุม',
      ];
    const cellA73 = worksheet.getCell('A73');
    cellA73.value = data.join('\n');
    cellA73.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA73.border = borderThin;
    cellA73.font = font11;

    worksheet.mergeCells('E73:G77');
    const cellE73 = worksheet.getCell('E73');
    cellE73.value = '';
    cellE73.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE73.border = borderThin;
    cellE73.font = font11;

    worksheet.mergeCells('H73:J77');
    const cellH73 = worksheet.getCell('H73');
    cellH73.value = '';
    cellH73.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH73.border = borderThin;
    cellH73.font = font11;

    worksheet.mergeCells('A78:D78');
    const cellA78 = worksheet.getCell('A78');
    cellA78.value = 'ประธานกรรมการตรวจรับพัสดุ';
    cellA78.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA78.border = borderThin;
    cellA78.font = font12;

    worksheet.mergeCells('E78:G78');
    const cellE78 = worksheet.getCell('E78');
    cellE78.value = '';
    cellE78.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE78.border = borderThin;
    cellE78.font = font11;

    worksheet.mergeCells('H78:J78');
    const cellH78 = worksheet.getCell('H78');
    cellH78.value = '';
    cellH78.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH78.border = borderThin;
    cellH78.font = font11;

    worksheet.mergeCells('A79:D80');
    const cellA79 = worksheet.getCell('A79');
    cellA79.value = ' ลงชื่อ..............................................................................................';
    cellA79.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA79.border = borderThin;
    cellA79.font = font11;

    worksheet.mergeCells('E79:G80');
    const cellE79 = worksheet.getCell('E79');
    cellE79.value = '';
    cellE79.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE79.border = borderThin;
    cellE79.font = font11;

    worksheet.mergeCells('H79:J80');
    const cellH79 = worksheet.getCell('H79');
    cellH79.value = '';
    cellH79.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH79.border = borderThin;
    cellH79.font = font11;

    worksheet.mergeCells('A81:D81');
    const cellA81 = worksheet.getCell('A81');
    cellA81.value = 'ผู้อำนวยการ/คณบดี';
    cellA81.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA81.border = borderThin;
    cellA81.font = font12;

    worksheet.mergeCells('E81:G81');
    const cellE81 = worksheet.getCell('E81');
    cellE81.value = '';
    cellE81.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE81.border = borderThin;
    cellE81.font = font11;

    worksheet.mergeCells('H81:J81');
    const cellH81 = worksheet.getCell('H81');
    cellH81.value = '';
    cellH81.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH81.border = borderThin;
    cellH81.font = font11;

    worksheet.mergeCells('A82:D83');
    const cellA82 = worksheet.getCell('A82');
    cellA82.value = ' ลงชื่อ..............................................................................................\n(เฉพาะกรณีใช้เป็นหลักฐานประกอบการเบิกค่าตอบแทน)';
    cellA82.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA82.border = borderThin;
    cellA82.font = font11;

    worksheet.mergeCells('E82:G83');
    const cellE82 = worksheet.getCell('E82');
    cellE82.value = '';
    cellE82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellE82.border = borderThin;
    cellE82.font = font11;

    worksheet.mergeCells('H82:J83');
    const cellH82 = worksheet.getCell('H82');
    cellH82.value = '';
    cellH82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH82.border = borderThin;
    cellH82.font = font11;

    worksheet.getColumn('A').width = 15;
    worksheet.getColumn('B').width = 15;
    worksheet.getColumn('C').width = 15;
    worksheet.getColumn('D').width = 15;
    worksheet.getColumn('E').width = 20;
    worksheet.getColumn('F').width = 15;
    worksheet.getColumn('G').width = 15;
    worksheet.getColumn('H').width = 9;
    worksheet.getColumn('I').width = 9;
    worksheet.getColumn('J').width = 9;

    worksheet.getRow(2).height = 26.5;
    worksheet.getRow(3).height = 26.5;
    worksheet.getRow(4).height = 34;
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber >= 5 && rowNumber <= 7) {
        row.height = 30; // กำหนดความสูงของแถวที่ 5-10 เป็น 20
      }
    });
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber >= 8 && rowNumber <= 41) {
        row.height = 30; // กำหนดความสูงของแถวที่ 5-10 เป็น 20
      }
    });
    worksheet.getRow(43).height = 26.5;
    worksheet.getRow(44).height = 26.5;
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber >= 45 && rowNumber <= 82) {
        row.height = 30; // กำหนดความสูงของแถวที่ 5-10 เป็น 20
      }
    });

    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(blob, fileName + EXCEL_EXTENSION);
    });
  }
}