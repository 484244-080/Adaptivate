import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RiskScoreDto } from '../DTO/riskscore.dto';
@Injectable({
  providedIn: 'root',
})
export class RiskScoreService {
  listRiskScore: BehaviorSubject<RiskScoreDto[]> = new BehaviorSubject<
    RiskScoreDto[]
  >([]);

  constructor() {}

  getRiskScore() {
    return this.listRiskScore.asObservable();
  }

  setRiskScore(data: RiskScoreDto[]) {
    this.listRiskScore.next(data);
  }

  clearRiskScore() {
    this.listRiskScore.next([]);
  }
}
