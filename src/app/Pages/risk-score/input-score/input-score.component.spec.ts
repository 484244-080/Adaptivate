import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScoreComponent } from './input-score.component';

describe('InputScoreComponent', () => {
  let component: InputScoreComponent;
  let fixture: ComponentFixture<InputScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputScoreComponent]
    });
    fixture = TestBed.createComponent(InputScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
