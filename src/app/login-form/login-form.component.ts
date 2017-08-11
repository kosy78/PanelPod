import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  loginForm : FormGroup;

  constructor(fb: FormBuilder){

    this.loginForm = fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
    })
  }

  submitForm(value: any){
     let button = document.getElementById('login_submit')
     let login_page = document.querySelector('#login-page')
    if(value.email == 'mail@mail.com'){
      let form = {
        'username' : value.email,
        'password' : value.password,
      }

      button.classList.add('submited')
      if(button.classList.contains('error'))
        button.classList.remove('error')

      setTimeout(function(){
        login_page.classList.add('hidden')},1200)
      }
    else {
      button.classList.add('error');
    }
  }


  ngOnInit() {
    let logout_button = document.querySelector('#logout_btn');
    logout_button.addEventListener('click', function() {
      document.querySelector('#login-page').classList.remove('hidden')
    })
  }

}
