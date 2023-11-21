import { Component, OnInit, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { Subscription } from 'rxjs';
import { RiskScoreDto } from 'src/app/DTO/riskscore.dto';
import { RiskScoreService } from 'src/app/Services/risk-score.service';
@Component({
  selector: 'app-input-score',
  templateUrl: './input-score.component.html',
  styleUrls: ['./input-score.component.scss'],
})
export class InputScoreComponent implements OnInit {
  public datas: RiskScoreDto[] = [];
  @ViewChild('spreadsheet') public spreadsheetObj?: SpreadsheetComponent;

  public headerStyle: Object = {
    fontWeight: 'bold', // Style object for the header row
  };

  sub1: Subscription;

  constructor(private riskScoreService: RiskScoreService) {
    /// initial Risk Data ///
    this.sub1 = this.riskScoreService.getRiskScore().subscribe((data) => {
      if (data.length > 0) {
        this.datas = data;
        if (this.spreadsheetObj) {
          this.spreadsheetObj!.cellFormat(
            { fontWeight: 'bold', textAlign: 'center' },
            'A1:D1'
          );
        }
      }
    });
  }

  ngOnInit(): void {
    //// get Data from Local storage ///
    const riskData = localStorage.getItem('riskData');
    /// have data and initial data is emply ///
    if (riskData && this.datas.length == 0) {
      /// Set Risk Data ///
      this.riskScoreService.setRiskScore(JSON.parse(riskData));
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  //// Generate Syncfusion Spread Sheet ////
  created() {
    if (this.spreadsheetObj) {
      this.spreadsheetObj!.cellFormat(
        { fontWeight: 'bold', textAlign: 'center' },
        'A1:D1'
      );
    }
  }

  /// On Chnage or Save Cell  calculate Column D
  CellSave(args: any) {
    if (this.spreadsheetObj) {
      // Find Edit RowIndex to set D Column

      const rowIndex = args.address.split('!')[1].match(/\d+/)[0];

      if (args.value !== '' && args.address.includes('A')) {
        this.spreadsheetObj.updateCell(
          { formula: `=B${rowIndex}*C${rowIndex}` },
          `D${rowIndex}`
        );
        this.spreadsheetObj.numberFormat('0.00', `D${rowIndex}`);
      }

      // Get Sheet Data and generate to Array RiskScoreData //
      const sheetData = this.spreadsheetObj.sheets[0].rows;
      this.adjustData(sheetData);
    }
  }

  /// Converse Sheet Data to Risk Score Data and store to local storage ///
  adjustData(sheetData: any) {
    let newData: RiskScoreDto[] = [];
    if (sheetData.length > 1) {
      for (let i = 1; i < sheetData.length; i++) {
        console.log(sheetData[i].cells);
        if (sheetData[i].cells[0].value) {
          const data = {
            situation: sheetData[i].cells[0] ? sheetData[i].cells[0] : {},
            riskLevel: sheetData[i].cells[1] ? sheetData[i].cells[1] : {},
            impact: sheetData[i].cells[2] ? sheetData[i].cells[2] : {},
            riskScore: sheetData[i].cells[3] ? sheetData[i].cells[3] : {},
          };
          newData = [...newData, ...[data]];
        }
      }

      localStorage.setItem('riskData', JSON.stringify(newData));
      this.riskScoreService.setRiskScore(newData);
    }
  }

  public onBeforeCellSave(args: any): void {
    // Assuming you want to validate Risk Level as a number greater than 0
    if (args.value !== '' && args.address.includes('B')) {
      // Assuming Risk Level is in column B
      const riskLevel = parseFloat(args.value);
      if (isNaN(riskLevel) || riskLevel <= 0) {
        args.cancel = true; // Cancel saving if the value is not a valid number greater than 0
        alert('Risk Level should be a valid number greater than 0.');
        this.spreadsheetObj!.closeEdit();
      }
    }

    // Assuming you want to validate Impact as a number greater than 0
    if (args.value !== '' && args.address.includes('C')) {
      // Assuming Impact is in column B
      const impact = parseFloat(args.value);
      if (isNaN(impact) || impact <= 0) {
        args.cancel = true; // Cancel saving if the value is not a valid number greater than 0
        alert('Impact should be a valid number greater than 0.');
        this.spreadsheetObj!.closeEdit();
      }
    }
  }

  /// set Formating on dataSource is changed ///
  public onDataSourceChanged(): void {
    if (this.spreadsheetObj) {
      const sheet = this.spreadsheetObj.sheets[0];

      this.spreadsheetObj!.cellFormat(
        { fontWeight: 'bold', textAlign: 'center' },
        'A1:D1'
      );

      if (sheet && sheet.rows) {
        // start at row 2 //
        for (let i = 1; i < sheet?.rows?.length ?? 0; i++) {
          const cell = sheet?.rows[i].cells;
          if (cell && cell[3]) {
            cell[3].format = '0.00';
          }
        }
      }
    }
  }
}
