import { Component, OnInit } from '@angular/core';
import {AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUser = {email:"", password:""};
  constructor(private _auth:AuthService,private _router:Router) { }

  registerUser(){
    this._auth.registerUser(this.registeredUser)
    .subscribe(
      res=>{
        localStorage.setItem('token',res['token']);
        this._router.navigate(['/special']);
      },
      err=>console.log(err)
    )
  //  console.log(this.registeredUser);
  }
  ngOnInit(): void {
  }

}
