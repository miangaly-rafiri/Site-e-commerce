import { Component } from '@angular/core';
import { AutheService } from 'src/app/service/authe/authe.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
username : string =''
email: string = ''
password: string = ''
constructor (
  private _autheService : AutheService
) {}
  
register () {
  this._autheService.register(this.username,this.email,this.password).subscribe((data) => {
    localStorage.setItem('UserToken',data.toString())
});
}
}
