import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ){}

  userData: any;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedLogin() {
    if(this.loginForm.valid) {
      // this.service.proceedLogin(this.loginForm.value).subscribe(res => {
      //   this.router.navigate(['home']);
      // });
      this.service.getByCode(this.loginForm.value.username).subscribe(res => {
        this.userData = res;
        console.log(this.userData);
        if(this.userData.password === this.loginForm.value.password) {
          if(this.userData.isActive) {
            sessionStorage.setItem('@auth:username', this.userData.id);
            sessionStorage.setItem('@auth:userRole', this.userData.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact admin', 'In Active User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }

      })
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
