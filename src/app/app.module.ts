import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './Custom/loader/loader.component';
import { SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { RiskScoreComponent } from './Pages/risk-score/risk-score.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { HeaderComponent } from './Layout/header/header.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, LoaderComponent, RiskScoreComponent, MainLayoutComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, SpreadsheetModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
