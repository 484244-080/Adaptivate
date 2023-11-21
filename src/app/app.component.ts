import { Component } from '@angular/core';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGRGfV5yd0VHYVZRR3xdQ00DNHVRdkdgWH5feHRcR2JdVkJxW0c='
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'adaptivate-test';
}
