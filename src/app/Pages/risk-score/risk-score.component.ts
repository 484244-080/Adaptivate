import { Component, OnInit, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { RiskScoreDto } from 'src/app/DTO/riskscore.dto';

@Component({
  selector: 'app-risk-score',
  templateUrl: './risk-score.component.html',
  styleUrls: ['./risk-score.component.scss'],
})
export class RiskScoreComponent implements OnInit {
  ngOnInit(): void {}
}
