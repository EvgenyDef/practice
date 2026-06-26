import { Component } from '@angular/core';

import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  nickname: string = '';
  password: string = '';

  get isNicknameValid(): boolean {
    return this.nickname.length >= 3 && this.nickname.length <= 20
  }

  get isValidLength(): boolean {
    return this.password.length >= 6 && this.password.length <= 20;
  }

  get isValidSymbols(): boolean {
    const regex = /^[\w+]+$/
    return regex.test(this.password);
  }
}
