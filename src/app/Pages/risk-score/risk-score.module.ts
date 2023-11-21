import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DisplayScoreComponent } from './display-score/display-score.component';
import { InputScoreComponent } from './input-score/input-score.component';
import { RiskScoreComponent } from './risk-score.component';
import { SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { RiskScoreService } from 'src/app/Services/risk-score.service';

const routes: Routes = [
  {
    path: '',
    component: RiskScoreComponent,
    children: [
      {
        path: 'input',
        component: InputScoreComponent,
      },
      {
        path: 'display',
        component: DisplayScoreComponent,
      },
      {
        path: '',
        redirectTo: 'input',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [DisplayScoreComponent, InputScoreComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SpreadsheetModule],
  providers: [RiskScoreService],
})
export class RiskScoreModule {}
