import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  // nickname: string = '';
  // password: string = '';

  // isSubmitted: boolean = false;

  // onSubmit(event: Event) {
  //   console.log('13124')
  //   event.preventDefault(); // Предотвращаем перезагрузку страницы браузером
  //   this.isSubmitted = true; // Устанавливаем флаг в true

  //   this.isNicknameValid;

  //   if (this.isNicknameValid) {
  //     // Здесь код для отправки данных на сервер, если всё валидно
  //     console.log('Авторизация успешна');
  //   }
  // }

  // get isNicknameValid(): boolean {
  //   return this.nickname.length >= 3 && this.nickname.length <= 20
  // }

  // get isValidLength(): boolean {
  //   return this.password.length >= 6 && this.password.length <= 20;
  // }

  // get isValidSymbols(): boolean {
  //   const regex = /^[\w+]+$/
  //   return regex.test(this.password);
  // }

  nickname = '';
  password = '';
  isSubmitted = false;
  isNicknameValid = true;
  isValidLength = true;
  isValidSymbols = true;
  errorMessage = ''; 

  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

ngOnInit() {
    this.userService.errors.subscribe(err => {
      console.log('Сервер вернул ошибку:', err);
      
      if (err.status === 401) {
        console.log("Сервер вернул статус: " + err.status);
        this.errorMessage = 'Неверный псевдоним или пароль';
        
        this.cdr.detectChanges(); 
      } else {
        this.errorMessage = 'Произошла ошибка при связи с сервером';
        this.cdr.detectChanges(); 
      }
    });
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    this.errorMessage = ''; // Сбрасываем старую ошибку
    
    this.validateForm();

    if (this.isNicknameValid && this.isValidLength && this.isValidSymbols) {
      // Вызываем метод входа из сервиса
      this.userService.login(this.nickname, this.password);
    }
  }

  validateForm() {
    this.isNicknameValid = this.nickname.length >= 3 && this.nickname.length <= 20;
    this.isValidLength = this.password.length >= 6 && this.password.length <= 20;
    this.isValidSymbols = /^[a-zA-Z0-9_]*$/.test(this.password);
  }
}
