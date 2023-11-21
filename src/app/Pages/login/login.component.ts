import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loader: LoaderService
  ) {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  async onSubmit() {
    if (this.signinForm.invalid) {
      this.signinForm.markAsDirty();
      return;
    }
    this.loader.setLoading(true);

    const formData = this.signinForm.getRawValue();

    await this.authService.signIn(formData);
    this.loader.setLoading(false);
  }
}
