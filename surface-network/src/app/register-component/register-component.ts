import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';

import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RegisterService } from '../services/register.service';
import { RegisterRequest } from '../models/user-registration';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register-component',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent implements OnInit {

  nickname = '';
  email = '';
  password = '';
  confirmPassword = '';
  lastname = '';
  firstname = '';
  contacts = '';
  about = '';
  achievements = '';
  errorMessage = '';

  isSubmited = false;


  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // Подписываемся на ошибки регистрации из сервиса
    this.userService.errors.subscribe(err => {
      console.log('Получена ошибка регистрации с сервера:', err);

      // Считываем текст ошибки, отправленный бэкендом (например: "Пользователь с такой почтой уже есть")
      this.errorMessage = err.error?.message || 'Произошла ошибка при регистрации на сервере';

      // 3. Принудительно заставляем Angular отобразить ошибку на экране
      this.cdr.detectChanges();
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    this.isSubmited = true;

    // Собираем объект, структуру которого ожидает C# RegisterRequestDto
    const registerData = {
      nickname: this.nickname,
      email: this.email,
      password: this.password,
      repeatedPassword: this.confirmPassword, // Название совпадает с C# RepeatedPassword
      lastname: this.lastname,
      firstName: this.firstname,
      contacts: this.contacts,
      about: this.about,
      achievements: this.achievements
    };

    if (this.isUserDataValid())
      this.userService.register(registerData);
    else
      alert("Ошибка регистрации")
  }


  isUserDataValid(): boolean {
    return this.isNicknameValid
      && this.isEmailLengthValid
      && this.isEmailValid
      && this.isValidLength
      && this.isValidSymbols
      && this.isFirstnameValid
      && this.isLastnameValid
      && this.isContactsValid
      && this.isAchievementsValid
  }

  get isPasswordsEquals(): boolean {
    return this.password === this.confirmPassword;
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
