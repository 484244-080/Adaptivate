import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RiskScoreDto } from 'src/app/DTO/riskscore.dto';
import { RiskScoreService } from 'src/app/Services/risk-score.service';

@Component({
  selector: 'app-display-score',
  templateUrl: './display-score.component.html',
  styleUrls: ['./display-score.component.scss'],
})
export class DisplayScoreComponent implements OnInit {
  public datas: RiskScoreDto[] = [];

  sub1: Subscription;

  constructor(private riskScoreService: RiskScoreService) {
    /// initial Risk Data ///
    this.sub1 = this.riskScoreService.getRiskScore().subscribe((data) => {
      if (data.length > 0) {
        this.datas = data;
      }
    });
  }

  ngOnInit(): void {
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
}
