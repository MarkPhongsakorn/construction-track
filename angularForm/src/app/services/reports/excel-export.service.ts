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
    json1: any[],
    json2: any[],
    project_name: string,
    dr_time: string,
    comp_name: string,
    period_name1: string,
    sta_name1: string,
    sta_time1: string,
    fileName: string,
    sheetName: string
  ): void {

    // console.log(period_name1);
    // console.log(sta_name1);
    // console.log(sta_time1);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    const cellA4 = worksheet.getCell('A4');
    cellA4.value = 'บันทึกการควบคุมงานประจำวัน';
    cellA4.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA4.font = { name: 'TH SarabunPSK', size: 18 };

    const cellA5 = worksheet.getCell('A5');
    cellA5.value = 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย สงขลา';
    cellA5.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA5.border = borderThin;
    cellA5.font = { name: 'TH SarabunPSK', size: 11 };

    const cellD6 = worksheet.getCell('D6');
    cellD6.value = 'โครงการ: ' + project_name;
    cellD6.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD6.border = borderThin;
    cellD6.font = { name: 'TH SarabunPSK', size: 11 };

    const cellD5 = worksheet.getCell('D5');
    cellD5.value = 'วันที่ ' + dr_time;
    cellD5.alignment = { horizontal: 'right', vertical: 'middle' };
    cellD5.border = borderThin;
    cellD5.font = { name: 'TH SarabunPSK', size: 11 };

    const cellG6 = worksheet.getCell('G6');
    cellG6.value = 'บริษัทรับจ้าง: ' + comp_name;
    cellG6.alignment = { horizontal: 'center', vertical: 'middle' };
    cellG6.border = borderThin;
    cellG6.font = { name: 'TH SarabunPSK', size: 11 };

    const cellA8 = worksheet.getCell('A8');
    cellA8.value = 'ช่วงเวลา: ' + period_name1 + ' สถานะ: ' + sta_name1 + ' เวลาฝนตก: ' + sta_time1;
    cellA8.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA8.border = borderThin;
    cellA8.font = { name: 'TH SarabunPSK', size: 11 };

    worksheet.getCell('E8').border = borderThin;

    worksheet.getCell('A10').value = 'ปริมาณแรงงาน';
    worksheet.getCell('A10').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('A10').border = borderThin;

    worksheet.getCell('E10').value = 'ปริมาณงานที่ทำประจำวัน';
    worksheet.getCell('E10').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('E10').border = borderThin;

    // worksheet.addRow([]); // Add an empty row
    // worksheet.addRow(['ปริมาณแรงงาน', '', '', '', 'ปริมาณงานที่ทำประจำวัน']);

    json2.forEach(data => {
      worksheet.addRow(data);
    });

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
    worksheet.getRow(5).height = 30;
    worksheet.getRow(6).height = 30;
    worksheet.getRow(7).height = 30;

    worksheet.mergeCells('A4:I4');
    worksheet.mergeCells('A5:C7');
    worksheet.mergeCells('D5:I5');
    worksheet.mergeCells('D6:F7');
    worksheet.mergeCells('G6:I7');
    worksheet.mergeCells('A8:D9');
    worksheet.mergeCells('E8:I9');
    worksheet.mergeCells('A10:D10');
    worksheet.mergeCells('E10:I10');

    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(blob, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}