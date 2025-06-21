import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  }
  router = inject(Router)
  constructor(private appService:AppService){

  }
  submit(){
    if(this.loginData.username === 'admin' && this.loginData.password === 'admin'){
      this.appService.loginUser = this.loginData.username;
      this.router.navigate(['/admin']);
    }else{
      alert('Invalid credentials');
    }
  }
}
