import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormsModule, NgModel } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { RegisterRequest } from '../models/user-registration';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  //  поле для ввода "Псевдонима"
  nickname: string = '';

  // Поле для ввода пароля
  password: string = '';

  email: string = ''

  // Поле для повторного ввода пароля
  repeatedPassword: string = '';

  // Поле для ввода фамилии
  lastname: string = '';

  // Поле для ввода имени
  firstname: string = '';

  // Поле для ввода фотографии
  photo: string = '';

  // Поле для ввода контактов
  contacts: string = '';

  // Поля для ввобда информации о себе
  aboutMyself: string = '';

  // Поле для ввода достижений
  achievements: string = '';

  private registerService = inject(RegisterService)

  equalsPasswords(password: string, repeatedPassword: string): boolean {
    return password === repeatedPassword;
  }

  onSubmit(event: Event) {
    const newUser: RegisterRequest = {
      nickname: this.nickname,
      password: this.password,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      photo: this.photo,
      contacts: this.contacts,
      aboutMyself: this.aboutMyself,
      achievements: this.achievements
    }

    this.registerService.register(newUser).subscribe({
      next: (response) => {
        console.log("Регистрация прошла успешно");
        alert("Регистрация прошла успешно!");
      },
      error: (err) => {
        console.log("Ошибка регистрации");
        alert("Ошибка регистрации");
      }

    })
  }

  get isNicknameValid(): boolean {
    return this.nickname.length >= 3 && this.nickname.length <= 20
  }

  get isEmailLengthValid(): boolean {
    return this.email.length <= 31;
  }

  get isEmailValid(): boolean {
    return this.email.includes('@');
  }

  get isValidLength(): boolean {
    return this.password.length >= 6 && this.password.length <= 20;
  }

  get isValidSymbols(): boolean {
    const regex = /^[\w+]+$/
    return regex.test(this.password);
  }

  get isFirstnameValid(): boolean {
    return this.firstname.length <= 31;
  }

  get isLastnameValid(): boolean {
    return this.lastname.length <= 31;
  }

  get isContactsValid(): boolean {
    return this.contacts.length <= 255;
  }

    get isAboutMyselfValid(): boolean {
    return this.contacts.length <= 255;
  }

    get isAchievementsValid(): boolean {
    return this.contacts.length <= 255;
  }
}
