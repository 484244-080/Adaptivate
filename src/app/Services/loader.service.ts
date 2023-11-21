import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;

  constructor() {}

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
