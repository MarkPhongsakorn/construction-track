import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelWeeklyService {

  constructor() { }

  exportToExcel(
    week: number,
    date: string[],
    work_detail: string[],
    dates: string[],
    laborEngineer: number[],
    NotEngineer: number[],
    sta1: number[],
    sta2: number[],
    level1: number[],
    level2: number[],
    time1: string[],
    time2: string[],
    toolAndMat: string[],
    toolName: string[],
    toolNum: string[],
    user: string,
    fileName: string,
    sheetName: string
  ): void {

    // console.log(work_detail);


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    workbook.properties.date1904 = false;

    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    const font16Bold = { name: 'TH SarabunPSK', size: 16, bold: true };
    const font16 = { name: 'TH SarabunPSK', size: 16 };
    const font14Bold = { name: 'TH SarabunPSK', size: 14, bold: true };
    const font14 = { name: 'TH SarabunPSK', size: 14 };

    const background: ExcelJS.Fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'eeeeee' },
    };

    const check = '\u2713';

    worksheet.mergeCells('A1:L1');
    const cellA1 = worksheet.getCell('A1');
    cellA1.value = 'บันทึกการปฏิบัติงานของผู้รับจ้างประจำสัปดาห์ที่ ' + week;
    cellA1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA1.font = font14Bold;
    cellA1.fill = background;

    worksheet.mergeCells('A2:B2');
    const cellA2 = worksheet.getCell('A2');
    cellA2.value = 'วัน เดือน ปี';
    cellA2.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA2.border = borderThin;
    cellA2.font = font14Bold;
    cellA2.fill = background;

    worksheet.mergeCells('C2:J2');
    const cellC2 = worksheet.getCell('C2');
    cellC2.value = 'รายละเอียด';
    cellC2.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellC2.border = borderThin;
    cellC2.font = font14Bold;
    cellC2.fill = background;

    worksheet.mergeCells('K2:L2');
    const cellK2 = worksheet.getCell('K2');
    cellK2.value = 'หมายเหตุ';
    cellK2.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK2.border = borderThin;
    cellK2.font = font14Bold;
    cellK2.fill = background;

    worksheet.mergeCells('A3:B9');
    const cellA3 = worksheet.getCell('A3');
    cellA3.value = date[0];
    cellA3.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA3.border = borderThin;
    cellA3.font = font14;
    cellA3.fill = background;

    if (work_detail[0].includes("")) {

      worksheet.mergeCells('C3:J3');
      const cellC3 = worksheet.getCell('C3');
      cellC3.value = {
        richText: [
          { text: `[${check}] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC3.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC3.border = borderThin;
      cellC3.fill = background;
    } else {
      worksheet.mergeCells('C3:J3');
      const cellC3 = worksheet.getCell('C3');
      cellC3.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC3.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC3.border = borderThin;
      cellC3.fill = background;
    }

    worksheet.mergeCells('K3:L3');
    const cellK3 = worksheet.getCell('K3');
    cellK3.value = '';
    cellK3.border = borderThin;
    cellK3.font = font14Bold;
    cellK3.fill = background;

    let workDetailRow1 = 4;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow1, 6)

      worksheet.mergeCells(`C${workDetailRow1}:J${workDetailRow1}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow1}`);
      const workDetail = (work_detail[0][i] ? work_detail[0][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow1 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow1 + 1).height = worksheet.getRow(workDetailRow1).height;
        workDetailRow1 = mergeToRow + 1;
      } else {
        workDetailRow1++;
      }
    }

    let workNote1 = 4;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote1, 6)

      worksheet.mergeCells(`K${workNote1}:L${workNote1}`);
      const cellWorkNote = worksheet.getCell(`K${workNote1}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote1 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote1 + 1).height = worksheet.getRow(workNote1).height;
        workNote1 = mergeToRow + 1;
      } else {
        workNote1++;
      }
    }

    worksheet.mergeCells('A10:B16');
    const cellA10 = worksheet.getCell('A10');
    cellA10.value = date[1];
    cellA10.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA10.border = borderThin;
    cellA10.font = font14;
    cellA10.fill = background;

    if (work_detail[1].includes("")) {

      worksheet.mergeCells('C10:J10');
      const cellC10 = worksheet.getCell('C10');
      cellC10.value = {
        richText: [
          { text: `[${check} ] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC10.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC10.border = borderThin;
      cellC10.fill = background;
    } else {
      worksheet.mergeCells('C10:J10');
      const cellC10 = worksheet.getCell('C10');
      cellC10.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC10.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC10.border = borderThin;
      cellC10.fill = background;
    }

    worksheet.mergeCells('K10:L10');
    const cellK10 = worksheet.getCell('K10');
    cellK10.value = '';
    cellK10.border = borderThin;
    cellK10.font = font14Bold;
    cellK10.fill = background;

    let workDetailRow2 = 11;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow2, 6)

      worksheet.mergeCells(`C${workDetailRow2}:J${workDetailRow2}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow2}`);
      const workDetail = (work_detail[1][i] ? work_detail[1][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow2 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow2 + 1).height = worksheet.getRow(workDetailRow2).height;
        workDetailRow2 = mergeToRow + 1;
      } else {
        workDetailRow2++;
      }
    }

    let workNote2 = 11;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote2, 6)

      worksheet.mergeCells(`K${workNote2}:L${workNote2}`);
      const cellWorkNote = worksheet.getCell(`K${workNote2}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote2 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote2 + 1).height = worksheet.getRow(workNote2).height;
        workNote2 = mergeToRow + 1;
      } else {
        workNote2++;
      }
    }

    worksheet.mergeCells('A17:B23');
    const cellA17 = worksheet.getCell('A17');
    cellA17.value = date[2];
    cellA17.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA17.border = borderThin;
    cellA17.font = font14;
    cellA17.fill = background;

    if (work_detail[2].includes("")) {

      worksheet.mergeCells('C17:J17');
      const cellC17 = worksheet.getCell('C17');
      cellC17.value = {
        richText: [
          { text: `[${check}] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC17.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC17.border = borderThin;
      cellC17.fill = background;
    } else {
      worksheet.mergeCells('C17:J17');
      const cellC17 = worksheet.getCell('C17');
      cellC17.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC17.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC17.border = borderThin;
      cellC17.fill = background;
    }

    worksheet.mergeCells('K17:L17');
    const cellK17 = worksheet.getCell('K17');
    cellK17.value = '';
    cellK17.border = borderThin;
    cellK17.font = font14Bold;
    cellK17.fill = background;

    let workDetailRow3 = 18;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow3, 6)

      worksheet.mergeCells(`C${workDetailRow3}:J${workDetailRow3}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow3}`);
      const workDetail = (work_detail[2][i] ? work_detail[2][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow3 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow3 + 1).height = worksheet.getRow(workDetailRow3).height;
        workDetailRow3 = mergeToRow + 1;
      } else {
        workDetailRow3++;
      }
    }

    let workNote3 = 18;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote3, 6)

      worksheet.mergeCells(`K${workNote3}:L${workNote3}`);
      const cellWorkNote = worksheet.getCell(`K${workNote3}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote3 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote3 + 1).height = worksheet.getRow(workNote3).height;
        workNote3 = mergeToRow + 1;
      } else {
        workNote3++;
      }
    }

    worksheet.mergeCells('A24:B30');
    const cellA24 = worksheet.getCell('A24');
    cellA24.value = date[3];
    cellA24.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA24.border = borderThin;
    cellA24.font = font14;
    cellA24.fill = background;

    if (work_detail[3].includes("")) {

      worksheet.mergeCells('C24:J24');
      const cellC24 = worksheet.getCell('C24');
      cellC24.value = {
        richText: [
          { text: `[${check}] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC24.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC24.border = borderThin;
      cellC24.fill = background;
    } else {
      worksheet.mergeCells('C24:J24');
      const cellC24 = worksheet.getCell('C24');
      cellC24.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC24.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC24.border = borderThin;
      cellC24.fill = background;
    }

    worksheet.mergeCells('K24:L24');
    const cellK24 = worksheet.getCell('K24');
    cellK24.value = '';
    cellK24.border = borderThin;
    cellK24.font = font14Bold;
    cellK24.fill = background;

    let workDetailRow4 = 25;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow4, 6)

      worksheet.mergeCells(`C${workDetailRow4}:J${workDetailRow4}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow4}`);
      const workDetail = (work_detail[3][i] ? work_detail[3][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow4 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow4 + 1).height = worksheet.getRow(workDetailRow4).height;
        workDetailRow4 = mergeToRow + 1;
      } else {
        workDetailRow4++;
      }
    }

    let workNote4 = 25;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote4, 6)

      worksheet.mergeCells(`K${workNote4}:L${workNote4}`);
      const cellWorkNote = worksheet.getCell(`K${workNote4}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote4 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote4 + 1).height = worksheet.getRow(workNote4).height;
        workNote4 = mergeToRow + 1;
      } else {
        workNote4++;
      }
    }

    worksheet.mergeCells('A31:B37');
    const cellA37 = worksheet.getCell('A31');
    cellA37.value = date[4];
    cellA37.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA37.border = borderThin;
    cellA37.font = font14;
    cellA37.fill = background;

    if (work_detail[4].includes("")) {

      worksheet.mergeCells('C31:J31');
      const cellC31 = worksheet.getCell('C31');
      cellC31.value = {
        richText: [
          { text: `[${check}] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC31.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC31.border = borderThin;
      cellC31.fill = background;
    } else {
      worksheet.mergeCells('C31:J31');
      const cellC31 = worksheet.getCell('C31');
      cellC31.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC31.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC31.border = borderThin;
      cellC31.fill = background;
    }

    worksheet.mergeCells('K31:L31');
    const cellK31 = worksheet.getCell('K31');
    cellK31.value = '';
    cellK31.border = borderThin;
    cellK31.font = font14Bold;
    cellK31.fill = background;

    let workDetailRow5 = 32;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow5, 6)

      worksheet.mergeCells(`C${workDetailRow5}:J${workDetailRow5}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow5}`);
      const workDetail = (work_detail[4][i] ? work_detail[4][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow5 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow5 + 1).height = worksheet.getRow(workDetailRow5).height;
        workDetailRow5 = mergeToRow + 1;
      } else {
        workDetailRow5++;
      }
    }

    let workNote5 = 32;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote5, 6)

      worksheet.mergeCells(`K${workNote5}:L${workNote5}`);
      const cellWorkNote = worksheet.getCell(`K${workNote5}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote5 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote5 + 1).height = worksheet.getRow(workNote5).height;
        workNote5 = mergeToRow + 1;
      } else {
        workNote5++;
      }
    }

    worksheet.mergeCells('A38:B44');
    const cellA38 = worksheet.getCell('A38');
    cellA38.value = date[5];
    cellA38.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA38.border = borderThin;
    cellA38.font = font14;
    cellA38.fill = background;

    if (work_detail[5].includes("")) {

      worksheet.mergeCells('C38:J38');
      const cellC38 = worksheet.getCell('C38');
      cellC38.value = {
        richText: [
          { text: `[${check}] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC38.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC38.border = borderThin;
      cellC38.fill = background;
    } else {
      worksheet.mergeCells('C38:J38');
      const cellC38 = worksheet.getCell('C38');
      cellC38.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC38.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC38.border = borderThin;
      cellC38.fill = background;
    }

    worksheet.mergeCells('K38:L38');
    const cellK38 = worksheet.getCell('K38');
    cellK38.value = '';
    cellK38.border = borderThin;
    cellK38.font = font14Bold;
    cellK38.fill = background;

    let workDetailRow6 = 39;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow6, 6)

      worksheet.mergeCells(`C${workDetailRow6}:J${workDetailRow6}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow6}`);
      const workDetail = (work_detail[5][i] ? work_detail[5][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow6 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow6 + 1).height = worksheet.getRow(workDetailRow6).height;
        workDetailRow6 = mergeToRow + 1;
      } else {
        workDetailRow6++;
      }
    }

    let workNote6 = 39;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote6, 6)

      worksheet.mergeCells(`K${workNote6}:L${workNote6}`);
      const cellWorkNote = worksheet.getCell(`K${workNote6}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote6 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote6 + 1).height = worksheet.getRow(workNote6).height;
        workNote6 = mergeToRow + 1;
      } else {
        workNote6++;
      }
    }

    worksheet.mergeCells('A45:B51');
    const cellA45 = worksheet.getCell('A45');
    cellA45.value = date[6];
    cellA45.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };
    cellA45.border = borderThin;
    cellA45.font = font14;
    cellA45.fill = background;

    if (work_detail[6].includes("")) {

      worksheet.mergeCells('C45:J45');
      const cellC45 = worksheet.getCell('C45');
      cellC45.value = {
        richText: [
          { text: `[${check}] ไม่มีการทำงานของผู้รับจ้าง`, font: font14Bold },
          { text: '    [ ] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้', font: font14 },
        ],
      };
      cellC45.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC45.border = borderThin;
      cellC45.fill = background;
    } else {
      worksheet.mergeCells('C45:J45');
      const cellC45 = worksheet.getCell('C45');
      cellC45.value = {
        richText: [
          { text: '[ ] ไม่มีการทำงานของผู้รับจ้าง', font: font14 },
          { text: `    [${check}] ผู้รับจ้างทำงานโดยมีรายละเอียด ดังนี้`, font: font14Bold },
        ],
      };
      cellC45.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cellC45.border = borderThin;
      cellC45.fill = background;
    }

    worksheet.mergeCells('K45:L45');
    const cellK45 = worksheet.getCell('K45');
    cellK45.value = '';
    cellK45.border = borderThin;
    cellK45.font = font14Bold;
    cellK45.fill = background;

    let workDetailRow7 = 46;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workDetailRow7, 6)

      worksheet.mergeCells(`C${workDetailRow7}:J${workDetailRow7}`);
      const cellWorkDetail = worksheet.getCell(`C${workDetailRow7}`);
      const workDetail = (work_detail[6][i] ? work_detail[5][i] : '');
      let workDetailName = '';
      if (workDetail !== '') {
        workDetailName = '- ' + workDetail;
      } else {
        workDetailName = workDetail;
      }
      cellWorkDetail.value = workDetailName; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkDetail.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      cellWorkDetail.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkDetail.font = font14;
      if (workDetailRow7 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workDetailRow7 + 1).height = worksheet.getRow(workDetailRow7).height;
        workDetailRow7 = mergeToRow + 1;
      } else {
        workDetailRow7++;
      }
    }

    let workNote7 = 46;
    for (let i = 0; i < 6; i++) {
      const mergeToRow = Math.min(workNote7, 6)

      worksheet.mergeCells(`K${workNote7}:L${workNote7}`);
      const cellWorkNote = worksheet.getCell(`K${workNote7}`);
      cellWorkNote.value = ''; // ใช้ข้อมูลถ้ามี หรือว่างเป็นสตริงถ้าไม่มีข้อมูล
      cellWorkNote.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (workNote7 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(workNote7 + 1).height = worksheet.getRow(workNote7).height;
        workNote7 = mergeToRow + 1;
      } else {
        workNote7++;
      }
    }

    worksheet.mergeCells('A53:L53');
    const cellA53 = worksheet.getCell('A53');
    cellA53.value = 'บัญชีแสดงจำนวนแรงงาน';
    cellA53.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA53.font = font14Bold;
    cellA53.fill = background;

    worksheet.mergeCells('A54:E54');
    const cellA54 = worksheet.getCell('A54');
    cellA54.value = 'วันที่';
    cellA54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA54.border = borderThin;
    cellA54.font = font14Bold;
    cellA54.fill = background;

    const cellF54 = worksheet.getCell('F54');
    cellF54.value = dates[0];
    cellF54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF54.border = borderThin;
    cellF54.font = font14;
    cellF54.fill = background;

    const cellG54 = worksheet.getCell('G54');
    cellG54.value = dates[1];
    cellG54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG54.border = borderThin;
    cellG54.font = font14;
    cellG54.fill = background;

    const cellH54 = worksheet.getCell('H54');
    cellH54.value = dates[2];
    cellH54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH54.border = borderThin;
    cellH54.font = font14;
    cellH54.fill = background;

    const cellI54 = worksheet.getCell('I54');
    cellI54.value = dates[3];
    cellI54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI54.border = borderThin;
    cellI54.font = font14;
    cellI54.fill = background;

    const cellJ54 = worksheet.getCell('J54');
    cellJ54.value = dates[4];
    cellJ54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ54.border = borderThin;
    cellJ54.font = font14;
    cellJ54.fill = background;

    const cellK54 = worksheet.getCell('K54');
    cellK54.value = dates[5];
    cellK54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK54.border = borderThin;
    cellK54.font = font14;
    cellK54.fill = background;

    const cellL54 = worksheet.getCell('L54');
    cellL54.value = dates[6];
    cellL54.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL54.border = borderThin;
    cellL54.font = font14;
    cellL54.fill = background;

    worksheet.mergeCells('A55:E55');
    const cellA55 = worksheet.getCell('A55');
    cellA55.value = 'วิศวกร/หัวหน้าคนงาน';
    cellA55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA55.border = borderThin;
    cellA55.font = font14;
    cellA55.fill = background;

    const cellF55 = worksheet.getCell('F55');
    cellF55.value = laborEngineer[0];
    cellF55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF55.border = borderThin;
    cellF55.font = font14;

    const cellG55 = worksheet.getCell('G55');
    cellG55.value = laborEngineer[1];
    cellG55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG55.border = borderThin;
    cellG55.font = font14;

    const cellH55 = worksheet.getCell('H55');
    cellH55.value = laborEngineer[2];
    cellH55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH55.border = borderThin;
    cellH55.font = font14;

    const cellI55 = worksheet.getCell('I55');
    cellI55.value = laborEngineer[3];
    cellI55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI55.border = borderThin;
    cellI55.font = font14;

    const cellJ55 = worksheet.getCell('J55');
    cellJ55.value = laborEngineer[4];
    cellJ55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ55.border = borderThin;
    cellJ55.font = font14;

    const cellK55 = worksheet.getCell('K55');
    cellK55.value = laborEngineer[5];
    cellK55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK55.border = borderThin;
    cellK55.font = font14;

    const cellL55 = worksheet.getCell('L55');
    cellL55.value = laborEngineer[6];
    cellL55.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL55.border = borderThin;
    cellL55.font = font14;

    worksheet.mergeCells('A56:E56');
    const cellA56 = worksheet.getCell('A56');
    cellA56.value = 'ช่าง/กรรมกร';
    cellA56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA56.border = borderThin;
    cellA56.font = font14;
    cellA56.fill = background;

    const cellF56 = worksheet.getCell('F56');
    cellF56.value = NotEngineer[0];
    cellF56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF56.border = borderThin;
    cellF56.font = font14;

    const cellG56 = worksheet.getCell('G56');
    cellG56.value = NotEngineer[1];
    cellG56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG56.border = borderThin;
    cellG56.font = font14;

    const cellH56 = worksheet.getCell('H56');
    cellH56.value = NotEngineer[2];
    cellH56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH56.border = borderThin;
    cellH56.font = font14;

    const cellI56 = worksheet.getCell('I56');
    cellI56.value = NotEngineer[3];
    cellI56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI56.border = borderThin;
    cellI56.font = font14;

    const cellJ56 = worksheet.getCell('J56');
    cellJ56.value = NotEngineer[4];
    cellJ56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ56.border = borderThin;
    cellJ56.font = font14;

    const cellK56 = worksheet.getCell('K56');
    cellK56.value = NotEngineer[5];
    cellK56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK56.border = borderThin;
    cellK56.font = font14;

    const cellL56 = worksheet.getCell('L56');
    cellL56.value = NotEngineer[6];
    cellL56.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL56.border = borderThin;
    cellL56.font = font14;

    worksheet.mergeCells('A57:E57');
    const cellA57 = worksheet.getCell('A57');
    cellA57.value = 'รวม';
    cellA57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA57.border = borderThin;
    cellA57.font = font14Bold;
    cellA57.fill = background;

    const cellF57 = worksheet.getCell('F57');
    cellF57.value = { formula: 'SUM(F55:F56)' };
    cellF57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF57.border = borderThin;
    cellF57.font = font14Bold;

    const cellG57 = worksheet.getCell('G57');
    cellG57.value = { formula: 'SUM(G55:G56)' };
    cellG57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG57.border = borderThin;
    cellG57.font = font14Bold;

    const cellH57 = worksheet.getCell('H57');
    cellH57.value = { formula: 'SUM(H55:H56)' };
    cellH57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH57.border = borderThin;
    cellH57.font = font14Bold;

    const cellI57 = worksheet.getCell('I57');
    cellI57.value = { formula: 'SUM(I55:I56)' };
    cellI57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI57.border = borderThin;
    cellI57.font = font14Bold;

    const cellJ57 = worksheet.getCell('J57');
    cellJ57.value = { formula: 'SUM(J55:J56)' };
    cellJ57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ57.border = borderThin;
    cellJ57.font = font14Bold;

    const cellK57 = worksheet.getCell('K57');
    cellK57.value = { formula: 'SUM(K55:K56)' };
    cellK57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK57.border = borderThin;
    cellK57.font = font14Bold;

    const cellL57 = worksheet.getCell('L57');
    cellL57.value = { formula: 'SUM(L55:L56)' };
    cellL57.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL57.border = borderThin;
    cellL57.font = font14Bold;

    worksheet.mergeCells('A59:L59');
    const cellA59 = worksheet.getCell('A59');
    cellA59.value = 'ตารางสภาพอากาศ';
    cellA59.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA59.font = font14Bold;
    cellA59.fill = background;

    worksheet.mergeCells('A60:E60');
    const cellA60 = worksheet.getCell('A60');
    cellA60.value = 'วันที่';
    cellA60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA60.border = borderThin;
    cellA60.font = font14Bold;
    cellA60.fill = background;

    const cellF60 = worksheet.getCell('F60');
    cellF60.value = dates[0];
    cellF60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF60.border = borderThin;
    cellF60.font = font14;
    cellF60.fill = background;

    const cellG60 = worksheet.getCell('G60');
    cellG60.value = dates[1];
    cellG60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG60.border = borderThin;
    cellG60.font = font14;
    cellG60.fill = background;

    const cellH60 = worksheet.getCell('H60');
    cellH60.value = dates[2];
    cellH60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH60.border = borderThin;
    cellH60.font = font14;
    cellH60.fill = background;

    const cellI60 = worksheet.getCell('I60');
    cellI60.value = dates[3];
    cellI60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI60.border = borderThin;
    cellI60.font = font14;
    cellI60.fill = background;

    const cellJ60 = worksheet.getCell('J60');
    cellJ60.value = dates[4];
    cellJ60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ60.border = borderThin;
    cellJ60.font = font14;
    cellJ60.fill = background;

    const cellK60 = worksheet.getCell('K60');
    cellK60.value = dates[5];
    cellK60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK60.border = borderThin;
    cellK60.font = font14;
    cellK60.fill = background;

    const cellL60 = worksheet.getCell('L60');
    cellL60.value = dates[6];
    cellL60.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL60.border = borderThin;
    cellL60.font = font14;
    cellL60.fill = background;

    worksheet.mergeCells('A61:E61');
    const cellA61 = worksheet.getCell('A61');
    cellA61.value = 'ปลอดโปร่ง';
    cellA61.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA61.border = borderThin;
    cellA61.font = font14;
    cellA61.fill = background;

    worksheet.mergeCells('A62:E62');
    const cellA62 = worksheet.getCell('A62');
    cellA62.value = 'มืดครึ้ม';
    cellA62.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA62.border = borderThin;
    cellA62.font = font14;
    cellA62.fill = background;

    worksheet.mergeCells('A63:C65');
    const cellA63 = worksheet.getCell('A63');
    cellA63.value = 'ฝนตก';
    cellA63.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA63.border = borderThin;
    cellA63.font = font14;
    cellA63.fill = background;

    worksheet.mergeCells('D63:E63');
    const cellD63 = worksheet.getCell('D63');
    cellD63.value = 'เล็กน้อย';
    cellD63.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD63.border = borderThin;
    cellD63.font = font14;
    cellD63.fill = background;

    worksheet.mergeCells('D64:E64');
    const cellD64 = worksheet.getCell('D64');
    cellD64.value = 'ปานกลาง';
    cellD64.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD64.border = borderThin;
    cellD64.font = font14;
    cellD64.fill = background;

    worksheet.mergeCells('D65:E65');
    const cellD65 = worksheet.getCell('D65');
    cellD65.value = 'หนัก';
    cellD65.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellD65.border = borderThin;
    cellD65.font = font14;
    cellD65.fill = background;

    let weatherRow1 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow1, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow1}:B${weatherRow1}`);
      const cellLaborName = worksheet.getCell(`F${weatherRow1}`);
      if (i === 0 && (sta1[0] === 1 && sta2[0] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[0] === 2 && sta2[0] === 2) ||
        (sta1[0] === 1 && sta2[0] === 2) ||
        (sta1[0] === 2 && sta2[0] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[0] === 2 && level2[0] === 2) ||
        (level1[0] === 1 && level2[0] === 2) ||
        (level1[0] === 2 && level2[0] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[0] === 3 && level2[0] === 3) ||
        (level1[0] === 1 && level2[0] === 3) ||
        (level1[0] === 3 && level2[0] === 1) ||
        (level1[0] === 2 && level2[0] === 3) ||
        (level1[0] === 3 && level2[0] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[0] === 4 && level2[0] === 4) ||
        (level1[0] === 1 && level2[0] === 4) ||
        (level1[0] === 4 && level2[0] === 1) ||
        (level1[0] === 2 && level2[0] === 4) ||
        (level1[0] === 4 && level2[0] === 2) ||
        (level1[0] === 3 && level2[0] === 4) ||
        (level1[0] === 4 && level2[0] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow1 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow1 + 1).height = worksheet.getRow(weatherRow1).height;
        weatherRow1 = mergeToRow + 1;
      } else {
        weatherRow1++;
      }
    }

    let weatherRow2 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow2, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow2}:B${weatherRow2}`);
      const cellLaborName = worksheet.getCell(`G${weatherRow2}`);
      if (i === 0 && (sta1[1] === 1 && sta2[1] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[1] === 2 && sta2[1] === 2) ||
        (sta1[1] === 1 && sta2[1] === 2) ||
        (sta1[1] === 2 && sta2[1] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[1] === 2 && level2[1] === 2) ||
        (level1[1] === 1 && level2[1] === 2) ||
        (level1[1] === 2 && level2[1] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[1] === 3 && level2[1] === 3) ||
        (level1[1] === 1 && level2[1] === 3) ||
        (level1[1] === 3 && level2[1] === 1) ||
        (level1[1] === 2 && level2[1] === 3) ||
        (level1[1] === 3 && level2[1] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[1] === 4 && level2[1] === 4) ||
        (level1[1] === 1 && level2[1] === 4) ||
        (level1[1] === 4 && level2[1] === 1) ||
        (level1[1] === 2 && level2[1] === 4) ||
        (level1[1] === 4 && level2[1] === 2) ||
        (level1[1] === 3 && level2[1] === 4) ||
        (level1[1] === 4 && level2[1] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow2 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow2 + 1).height = worksheet.getRow(weatherRow2).height;
        weatherRow2 = mergeToRow + 1;
      } else {
        weatherRow2++;
      }
    }

    let weatherRow3 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow3, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow3}:B${weatherRow3}`);
      const cellLaborName = worksheet.getCell(`H${weatherRow3}`);
      if (i === 0 && (sta1[2] === 1 && sta2[2] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[2] === 2 && sta2[2] === 2) ||
        (sta1[2] === 1 && sta2[2] === 2) ||
        (sta1[2] === 2 && sta2[2] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[2] === 2 && level2[2] === 2) ||
        (level1[2] === 1 && level2[2] === 2) ||
        (level1[2] === 2 && level2[2] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[2] === 3 && level2[2] === 3) ||
        (level1[2] === 1 && level2[2] === 3) ||
        (level1[2] === 3 && level2[2] === 1) ||
        (level1[2] === 2 && level2[2] === 3) ||
        (level1[2] === 3 && level2[2] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[2] === 4 && level2[2] === 4) ||
        (level1[2] === 1 && level2[2] === 4) ||
        (level1[2] === 4 && level2[2] === 1) ||
        (level1[2] === 2 && level2[2] === 4) ||
        (level1[2] === 4 && level2[2] === 2) ||
        (level1[2] === 3 && level2[2] === 4) ||
        (level1[2] === 4 && level2[2] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow3 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow3 + 1).height = worksheet.getRow(weatherRow3).height;
        weatherRow3 = mergeToRow + 1;
      } else {
        weatherRow3++;
      }
    }

    let weatherRow4 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow4, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow4}:B${weatherRow4}`);
      const cellLaborName = worksheet.getCell(`I${weatherRow4}`);
      if (i === 0 && (sta1[3] === 1 && sta2[3] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[3] === 2 && sta2[3] === 2) ||
        (sta1[3] === 1 && sta2[3] === 2) ||
        (sta1[3] === 2 && sta2[3] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[3] === 2 && level2[3] === 2) ||
        (level1[3] === 1 && level2[3] === 2) ||
        (level1[3] === 2 && level2[3] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[3] === 3 && level2[3] === 3) ||
        (level1[3] === 1 && level2[3] === 3) ||
        (level1[3] === 3 && level2[3] === 1) ||
        (level1[3] === 2 && level2[3] === 3) ||
        (level1[3] === 3 && level2[3] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[3] === 4 && level2[3] === 4) ||
        (level1[3] === 1 && level2[3] === 4) ||
        (level1[3] === 4 && level2[3] === 1) ||
        (level1[3] === 2 && level2[3] === 4) ||
        (level1[3] === 4 && level2[3] === 2) ||
        (level1[3] === 3 && level2[3] === 4) ||
        (level1[3] === 4 && level2[3] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow4 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow4 + 1).height = worksheet.getRow(weatherRow4).height;
        weatherRow4 = mergeToRow + 1;
      } else {
        weatherRow4++;
      }
    }

    let weatherRow5 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow5, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow5}:B${weatherRow5}`);
      const cellLaborName = worksheet.getCell(`J${weatherRow5}`);
      if (i === 0 && (sta1[4] === 1 && sta2[4] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[4] === 2 && sta2[4] === 2) ||
        (sta1[4] === 1 && sta2[4] === 2) ||
        (sta1[4] === 2 && sta2[4] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[4] === 2 && level2[4] === 2) ||
        (level1[4] === 1 && level2[4] === 2) ||
        (level1[4] === 2 && level2[4] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[4] === 3 && level2[4] === 3) ||
        (level1[4] === 1 && level2[4] === 3) ||
        (level1[4] === 3 && level2[4] === 1) ||
        (level1[4] === 2 && level2[4] === 3) ||
        (level1[4] === 3 && level2[4] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[4] === 4 && level2[4] === 4) ||
        (level1[4] === 1 && level2[4] === 4) ||
        (level1[4] === 4 && level2[4] === 1) ||
        (level1[4] === 2 && level2[4] === 4) ||
        (level1[4] === 4 && level2[4] === 2) ||
        (level1[4] === 3 && level2[4] === 4) ||
        (level1[4] === 4 && level2[4] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow5 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow5 + 1).height = worksheet.getRow(weatherRow5).height;
        weatherRow5 = mergeToRow + 1;
      } else {
        weatherRow5++;
      }
    }

    let weatherRow6 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow6, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow6}:B${weatherRow6}`);
      const cellLaborName = worksheet.getCell(`K${weatherRow6}`);
      if (i === 0 && (sta1[5] === 1 && sta2[5] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[5] === 2 && sta2[5] === 2) ||
        (sta1[5] === 1 && sta2[5] === 2) ||
        (sta1[5] === 2 && sta2[5] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[5] === 2 && level2[5] === 2) ||
        (level1[5] === 1 && level2[5] === 2) ||
        (level1[5] === 2 && level2[5] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[5] === 3 && level2[5] === 3) ||
        (level1[5] === 1 && level2[5] === 3) ||
        (level1[5] === 3 && level2[5] === 1) ||
        (level1[5] === 2 && level2[5] === 3) ||
        (level1[5] === 3 && level2[5] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[5] === 4 && level2[5] === 4) ||
        (level1[5] === 1 && level2[5] === 4) ||
        (level1[5] === 4 && level2[5] === 1) ||
        (level1[5] === 2 && level2[5] === 4) ||
        (level1[5] === 4 && level2[5] === 2) ||
        (level1[5] === 3 && level2[5] === 4) ||
        (level1[5] === 4 && level2[5] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow6 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow6 + 1).height = worksheet.getRow(weatherRow6).height;
        weatherRow6 = mergeToRow + 1;
      } else {
        weatherRow6++;
      }
    }

    let weatherRow7 = 61;
    for (let i = 0; i < 5; i++) {
      const mergeToRow = Math.min(weatherRow7, 5);
      // ให้ค่าว่างในเซลล์ที่ต้องการ merge
      // worksheet.mergeCells(`A${weatherRow7}:B${weatherRow7}`);
      const cellLaborName = worksheet.getCell(`L${weatherRow7}`);
      if (i === 0 && (sta1[6] === 1 && sta2[6] === 1)) {
        cellLaborName.value = check || '';
      } else if (i === 1 && (
        (sta1[6] === 2 && sta2[6] === 2) ||
        (sta1[6] === 1 && sta2[6] === 2) ||
        (sta1[6] === 2 && sta2[6] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 2 && (
        (level1[6] === 2 && level2[6] === 2) ||
        (level1[6] === 1 && level2[6] === 2) ||
        (level1[6] === 2 && level2[6] === 1)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 3 && (
        (level1[6] === 3 && level2[6] === 3) ||
        (level1[6] === 1 && level2[6] === 3) ||
        (level1[6] === 3 && level2[6] === 1) ||
        (level1[6] === 2 && level2[6] === 3) ||
        (level1[6] === 3 && level2[6] === 2)
      )) {
        cellLaborName.value = check || '';
      } else if (i === 4 && (
        (level1[6] === 4 && level2[6] === 4) ||
        (level1[6] === 1 && level2[6] === 4) ||
        (level1[6] === 4 && level2[6] === 1) ||
        (level1[6] === 2 && level2[6] === 4) ||
        (level1[6] === 4 && level2[6] === 2) ||
        (level1[6] === 3 && level2[6] === 4) ||
        (level1[6] === 4 && level2[6] === 3)
      )) {
        cellLaborName.value = check || '';
      }
      cellLaborName.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellLaborName.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellLaborName.font = font14;
      if (weatherRow7 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(weatherRow7 + 1).height = worksheet.getRow(weatherRow7).height;
        weatherRow7 = mergeToRow + 1;
      } else {
        weatherRow7++;
      }
    }

    worksheet.mergeCells('A66:E66');
    const cellA66 = worksheet.getCell('A66');
    cellA66.value = 'ฝนตกเวลา';
    cellA66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA66.border = borderThin;
    cellA66.font = font14;
    cellA66.fill = background;

    const cellF66 = worksheet.getCell('F66');
    if (
      sta1[0] === 3 || sta2[0] === 3 &&
      time1[0] === '00:00:00' && time2[0] === '00:00:00'
    ) {
      if (time1[0] === '00:00:00' && time2[0] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellF66.value = time2[0];
      } else if (time2[0] === '00:00:00' && time1[0] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellF66.value = time1[0];
      } else if (time1[0] !== '00:00:00' && time2[0] !== '00:00:00') {
        cellF66.value = time1[1];
      }
    } else {
      cellF66.value = ''
    }
    cellF66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF66.border = borderThin;
    cellF66.font = font14;

    const cellG66 = worksheet.getCell('G66');
    if (
      sta1[1] === 3 || sta2[1] === 3 &&
      time1[1] === '00:00:00' && time2[1] === '00:00:00'
    ) {
      if (time1[1] === '00:00:00' && time2[1] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellG66.value = time2[1];
      } else if (time2[1] === '00:00:00' && time1[1] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellG66.value = time1[1];
      } else if (time1[1] !== '00:00:00' && time2[1] !== '00:00:00') {
        cellG66.value = time1[1];
      }
    } else {
      cellG66.value = ''
    }
    cellG66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG66.border = borderThin;
    cellG66.font = font14;

    const cellH66 = worksheet.getCell('H66');
    if (
      sta1[2] === 3 || sta2[2] === 3 &&
      time1[2] === '00:00:00' && time2[2] === '00:00:00'
    ) {
      if (time1[2] === '00:00:00' && time2[2] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellH66.value = time2[2];
      } else if (time2[2] === '00:00:00' && time1[2] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellH66.value = time1[2];
      } else if (time1[2] !== '00:00:00' && time2[2] !== '00:00:00') {
        cellH66.value = time1[2];
      }
    } else {
      cellH66.value = ''
    }
    cellH66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH66.border = borderThin;
    cellH66.font = font14;

    const cellI66 = worksheet.getCell('I66');
    if (
      sta1[3] === 3 || sta2[3] === 3 &&
      time1[3] === '00:00:00' && time2[3] === '00:00:00'
    ) {
      if (time1[3] === '00:00:00' && time2[3] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellI66.value = time2[3];
      } else if (time2[3] === '00:00:00' && time1[3] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellI66.value = time1[3];
      } else if (time1[3] !== '00:00:00' && time2[3] !== '00:00:00') {
        cellI66.value = time1[3];
      }
    } else {
      cellI66.value = ''
    }
    cellI66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI66.border = borderThin;
    cellI66.font = font14;

    const cellJ66 = worksheet.getCell('J66');
    if (
      sta1[4] === 3 || sta2[4] === 3 &&
      time1[4] === '00:00:00' && time2[4] === '00:00:00'
    ) {
      if (time1[4] === '00:00:00' && time2[4] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellJ66.value = time2[4];
      } else if (time2[4] === '00:00:00' && time1[4] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellJ66.value = time1[4];
      } else if (time1[4] !== '00:00:00' && time2[4] !== '00:00:00') {
        cellJ66.value = time1[4];
      }
    } else {
      cellJ66.value = ''
    }
    cellJ66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ66.border = borderThin;
    cellJ66.font = font14;

    const cellK66 = worksheet.getCell('K66');
    if (
      sta1[5] === 3 || sta2[5] === 3 &&
      time1[5] === '00:00:00' && time2[5] === '00:00:00'
    ) {
      if (time1[5] === '00:00:00' && time2[5] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellK66.value = time2[5];
      } else if (time2[5] === '00:00:00' && time1[5] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellK66.value = time1[5];
      } else if (time1[5] !== '00:00:00' && time2[5] !== '00:00:00') {
        cellK66.value = time1[5];
      }
    } else {
      cellK66.value = ''
    }
    cellK66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK66.border = borderThin;
    cellK66.font = font14;

    const cellL66 = worksheet.getCell('L66');
    if (
      sta1[6] === 3 || sta2[6] === 3 &&
      time1[6] === '00:00:00' && time2[6] === '00:00:00'
    ) {
      if (time1[6] === '00:00:00' && time2[6] !== '00:00:00') {
        // ถ้า time1[0] เป็น '00:00:00' และ time2[0] ไม่เป็น '00:00:00'
        cellL66.value = time2[6];
      } else if (time2[6] === '00:00:00' && time1[6] !== '00:00:00') {
        // ถ้า time2[0] เป็น '00:00:00' และ time1[0] ไม่เป็น '00:00:00'
        cellL66.value = time1[6];
      } else if (time1[6] !== '00:00:00' && time2[6] !== '00:00:00') {
        cellL66.value = time1[6];
      }
    } else {
      cellL66.value = ''
    }
    cellL66.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL66.border = borderThin;
    cellL66.font = font14;

    worksheet.mergeCells('A68:L68')
    const cellA68 = worksheet.getCell('A68');
    cellA68.value = 'บัญชีแสดงจำนวนเครื่องจักร เครื่องมือ วัสดุและอุปกรณ์';
    cellA68.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellA68.font = font14Bold;
    cellA68.fill = background;

    worksheet.mergeCells('A69:E69');
    const cellA69 = worksheet.getCell('A69');
    cellA69.value = 'วันที่';
    cellA69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA69.border = borderThin;
    cellA69.font = font14Bold;
    cellA69.fill = background;

    const cellF69 = worksheet.getCell('F69');
    cellF69.value = dates[0];
    cellF69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF69.border = borderThin;
    cellF69.font = font14;
    cellF69.fill = background;

    const cellG69 = worksheet.getCell('G69');
    cellG69.value = dates[1];
    cellG69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG69.border = borderThin;
    cellG69.font = font14;
    cellG69.fill = background;

    const cellH69 = worksheet.getCell('H69');
    cellH69.value = dates[2];
    cellH69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH69.border = borderThin;
    cellH69.font = font14;
    cellH69.fill = background;

    const cellI69 = worksheet.getCell('I69');
    cellI69.value = dates[3];
    cellI69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI69.border = borderThin;
    cellI69.font = font14;
    cellI69.fill = background;

    const cellJ69 = worksheet.getCell('J69');
    cellJ69.value = dates[4];
    cellJ69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ69.border = borderThin;
    cellJ69.font = font14;
    cellJ69.fill = background;

    const cellK69 = worksheet.getCell('K69');
    cellK69.value = dates[5];
    cellK69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK69.border = borderThin;
    cellK69.font = font14;
    cellK69.fill = background;

    const cellL69 = worksheet.getCell('L69');
    cellL69.value = dates[6];
    cellL69.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL69.border = borderThin;
    cellL69.font = font14;
    cellL69.fill = background;

    worksheet.mergeCells('A70:E70');
    const cellA70 = worksheet.getCell('A70');
    cellA70.value = 'รายการ';
    cellA70.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA70.border = borderThin;
    cellA70.font = font14Bold;
    cellA70.fill = background;

    worksheet.mergeCells('F70:L70');
    const cellF70 = worksheet.getCell('F70');
    cellF70.value = 'จำนวนเครื่องจักร เครื่องมือ วัสดุและอุปกรณ์';
    cellF70.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF70.border = borderThin;
    cellF70.font = font14Bold;
    cellF70.fill = background;

    let toolAndMatRow = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow, 11);
      worksheet.mergeCells(`A${toolAndMatRow}:E${toolAndMatRow}`);
      const cellWorkNum = worksheet.getCell(`A${toolAndMatRow}`);
      cellWorkNum.value = toolAndMat[i] || '';
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;
      cellWorkNum.fill = background;
      if (toolAndMatRow < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow + 1).height = worksheet.getRow(toolAndMatRow).height;
        toolAndMatRow = mergeToRow + 1;
      } else {
        toolAndMatRow++;
      }
    }

    let toolAndMatRow1 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow1, 11);
      const cellWorkNum = worksheet.getCell(`F${toolAndMatRow1}`);
      if (toolName[0].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[0].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[0][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow1 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow1 + 1).height = worksheet.getRow(toolAndMatRow1).height;
        toolAndMatRow1 = mergeToRow + 1;
      } else {
        toolAndMatRow1++;
      }
    }

    let toolAndMatRow2 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow2, 11);
      const cellWorkNum = worksheet.getCell(`G${toolAndMatRow2}`);
      if (toolName[1].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[1].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[1][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow2 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow2 + 1).height = worksheet.getRow(toolAndMatRow2).height;
        toolAndMatRow2 = mergeToRow + 1;
      } else {
        toolAndMatRow2++;
      }
    }

    let toolAndMatRow3 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow3, 11);
      const cellWorkNum = worksheet.getCell(`H${toolAndMatRow3}`);
      if (toolName[2].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[2].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[2][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow3 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow3 + 1).height = worksheet.getRow(toolAndMatRow3).height;
        toolAndMatRow3 = mergeToRow + 1;
      } else {
        toolAndMatRow3++;
      }
    }

    let toolAndMatRow4 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow4, 11);
      const cellWorkNum = worksheet.getCell(`I${toolAndMatRow4}`);
      if (toolName[3].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[3].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[3][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow4 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow4 + 1).height = worksheet.getRow(toolAndMatRow4).height;
        toolAndMatRow4 = mergeToRow + 1;
      } else {
        toolAndMatRow4++;
      }
    }

    let toolAndMatRow5 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow5, 11);
      const cellWorkNum = worksheet.getCell(`J${toolAndMatRow5}`);
      if (toolName[4].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[4].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[4][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow5 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow5 + 1).height = worksheet.getRow(toolAndMatRow5).height;
        toolAndMatRow5 = mergeToRow + 1;
      } else {
        toolAndMatRow5++;
      }
    }

    let toolAndMatRow6 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow6, 11);
      const cellWorkNum = worksheet.getCell(`K${toolAndMatRow6}`);
      if (toolName[5].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[5].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[5][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow6 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow6 + 1).height = worksheet.getRow(toolAndMatRow6).height;
        toolAndMatRow6 = mergeToRow + 1;
      } else {
        toolAndMatRow6++;
      }
    }

    let toolAndMatRow7 = 71;
    for (let i = 0; i < 11; i++) {
      const mergeToRow = Math.min(toolAndMatRow7, 11);
      const cellWorkNum = worksheet.getCell(`L${toolAndMatRow7}`);
      if (toolName[6].includes(toolAndMat[i])) {
        // ทำงานเมื่อ toolAndMat[i] ตรงกับค่าใน toolName[2]
        const indexInToolName = toolName[6].indexOf(toolAndMat[i]);
        // ใส่ค่าที่ตำแหน่งที่เฉพาะกัน
        cellWorkNum.value = toolNum[6][indexInToolName];
      } else {
        cellWorkNum.value = '';
      }
      // ต่อไปคือการกำหนดรูปแบบที่ต้องการสำหรับ cellWorkNum
      cellWorkNum.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellWorkNum.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cellWorkNum.font = font14;

      if (toolAndMatRow7 < mergeToRow) {
        // กำหนดความสูงของแถวถัดไปให้เท่ากับความสูงของแถวที่ถูก merge
        worksheet.getRow(toolAndMatRow7 + 1).height = worksheet.getRow(toolAndMatRow7).height;
        toolAndMatRow7 = mergeToRow + 1;
      } else {
        toolAndMatRow7++;
      }
    }

    worksheet.mergeCells('A82:E82');
    const cellA81 = worksheet.getCell('A82');
    cellA81.value = 'รวม';
    cellA81.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellA81.border = borderThin;
    cellA81.font = font14Bold;
    cellA81.fill = background;

    const cellF82 = worksheet.getCell('F82');
    cellF82.value = { formula: 'SUM(F71:F81)' };
    cellF82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellF82.border = borderThin;
    cellF82.font = font14Bold;

    const cellG82 = worksheet.getCell('G82');
    cellG82.value = { formula: 'SUM(G71:G81)' };
    cellG82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellG82.border = borderThin;
    cellG82.font = font14Bold;

    const cellH82 = worksheet.getCell('H82');
    cellH82.value = { formula: 'SUM(H71:H81)' };
    cellH82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellH82.border = borderThin;
    cellH82.font = font14Bold;

    const cellI82 = worksheet.getCell('I82');
    cellI82.value = { formula: 'SUM(I71:I81)' };
    cellI82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellI82.border = borderThin;
    cellI82.font = font14Bold;

    const cellJ82 = worksheet.getCell('J82');
    cellJ82.value = { formula: 'SUM(J71:J81)' };
    cellJ82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellJ82.border = borderThin;
    cellJ82.font = font14Bold;

    const cellK82 = worksheet.getCell('K82');
    cellK82.value = { formula: 'SUM(K71:K81)' };
    cellK82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellK82.border = borderThin;
    cellK82.font = font14Bold;

    const cellL82 = worksheet.getCell('L82');
    cellL82.value = { formula: 'SUM(L71:L81)' };
    cellL82.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellL82.border = borderThin;
    cellL82.font = font14Bold;

    worksheet.mergeCells('E86:H86');
    const cellE86 = worksheet.getCell('E86');
    cellE86.value = '..................................................................'
    cellE86.alignment = { horizontal: 'center', vertical: 'bottom', wrapText: true };
    cellE86.font = font16Bold;

    worksheet.mergeCells('E87:H87');
    const cellE87 = worksheet.getCell('E87');
    cellE87.value = '(' + user + ')';
    cellE87.alignment = { horizontal: 'center', vertical: 'bottom', wrapText: true };
    cellE87.font = font16;

    worksheet.mergeCells('E88:H88');
    const cellE88 = worksheet.getCell('E88');
    cellE88.value = 'ผู้ควบคุม';
    cellE88.alignment = { horizontal: 'center', vertical: 'bottom', wrapText: true };
    cellE88.font = font16;

    worksheet.getColumn('A').width = 9;
    worksheet.getColumn('B').width = 9;
    worksheet.getColumn('C').width = 9;
    worksheet.getColumn('D').width = 9;
    worksheet.getColumn('E').width = 9;
    worksheet.getColumn('F').width = 9;
    worksheet.getColumn('G').width = 9;
    worksheet.getColumn('H').width = 9;
    worksheet.getColumn('I').width = 9;
    worksheet.getColumn('J').width = 9
    worksheet.getColumn('K').width = 9
    worksheet.getColumn('L').width = 9

    // worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    //   if (rowNumber >= 1 && rowNumber <= 49) {
    //     row.height = 26; // กำหนดความสูงของแถวที่ 5-10 เป็น 20
    //   }
    // });

    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(blob, fileName + EXCEL_EXTENSION);
    });
  }
}
