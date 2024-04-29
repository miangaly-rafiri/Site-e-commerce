import { Component } from '@angular/core';
import { AutheService } from 'src/app/service/authe/authe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private _autheService: AutheService) {}
  login() {
    this._autheService.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('UserToken',data.toString());
    })
  }
}
