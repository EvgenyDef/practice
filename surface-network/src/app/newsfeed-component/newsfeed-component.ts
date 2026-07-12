import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-newsfeed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './newsfeed-component.html',
  styleUrl: './newsfeed-component.css'
})


// export class NewsfeedComponent implements OnInit {
//   private userService = inject(UserService);
//   private postService = inject(PostService);

//   // Свойства профиля
//   isAuth = false;
//   username = 'пользователь';
//   avatarUrl = '';

//   // Свойства формы нового поста
//   postText = '';
//   selectedFile: File | null = null;
//   selectedFileName = ''; // Для отображения имени выбранного файла в поле

//   // Список постов в ленте
//   posts: Post[] = [];

//   ngOnInit() {
//     // 1. Проверяем авторизацию
//     this.isAuth = this.userService.isAuthentificated();
//     if (this.isAuth) {
//       const userInfo = this.userService.getUserInfo();
//       if (userInfo) {
//         this.username = userInfo.login;
//         this.avatarUrl = userInfo.photo;
//       }
//     }

//     // 2. Загружаем посты с сервера при старте страницы
//     this.loadPosts();
//   }

//   // Метод загрузки постов
//   loadPosts() {
//     this.postService.getFeed().subscribe({
//       next: (data) => {
//         this.posts = data; // Записываем полученный массив в переменную
//       },
//       error: (err) => {
//         console.error('Ошибка при загрузке ленты новостей:', err);
//       }
//     });
//   }

//   // Метод обработки выбора файла
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//       this.selectedFileName = file.name;
//     }
//   }

//   onAddPost(event: Event) {
//     event.preventDefault();

//     if (!this.postText.trim()) {
//       alert('Введите текст публикации');
//       return;
//     }

//     // Получаем информацию о текущем пользователе
//     const currentUser = this.userService.getUserInfo();

//     const newPostData = {
//       text: this.postText,
//       imagePath: '',
//       authorId: currentUser.userId
//     };

//     this.postService.createPost(newPostData).subscribe({
//       next: (createdPost) => {
//         this.posts.unshift(createdPost);
//         this.postText = '';
//       },
//       error: (err) => {
//         console.error('Ошибка добавления записи:', err);
//       }
//     });
//   }

//   onLogout() {
//     this.userService.logout();
//   }
// }

// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { UserService } from '../../services/user.service';
// import { PostService } from '../../services/post.service';
// import { Post } from '../../models/post.model';

// @Component({
//   selector: 'app-newsfeed',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './newsfeed.component.html',
//   styleUrl: './newsfeed.component.css'
// })

export class NewsfeedComponent implements OnInit {
  private userService = inject(UserService);
  private postService = inject(PostService);
  private cdr = inject(ChangeDetectorRef);

  isAuth = false;
  username = 'пользователь';
  avatarUrl = '';

  postText = '';
  selectedFileName = '';
  
  // Массив, в котором хранятся все посты
  posts: Post[] = []; 

  ngOnInit() {
    // Проверка авторизации
    this.isAuth = this.userService.isAuthentificated();
    if (this.isAuth) {
      const userInfo = this.userService.getUserInfo();
      if (userInfo) {
        this.username = userInfo.login;
        this.avatarUrl = userInfo.photo;
      }
    }

    // РЕШЕНИЕ 1: Загружаем посты из базы данных сразу при заходе на страницу
    this.loadPosts();
  }

  // Метод загрузки постов с бэкенда
  loadPosts() {
    this.postService.getFeed().subscribe({
      next: (data: Post[]) => {
        console.log("Бэк вернул список постов: " + data)
        data.forEach(e => console.log(e.id, e.createdAt, e.text));
        this.posts = data; 

        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Ошибка загрузки ленты новостей:', err);
      }
    });
  }

  onAddPost(event: Event) {
  event.preventDefault();
  console.log('--- СТАРТ onAddPost() ---');
  console.log('1. Значение postText перед проверкой:', this.postText);

  // Безопасная проверка на существование текста (защита от падения на .trim())
  if (!this.postText || !this.postText.trim()) {
    console.log('2. Проверка не пройдена: текст пустой. Выходим через return.');
    alert('Введите текст публикации');
    return;
  }

  console.log('3. Проверка пройдена. Получаем данные пользователя...');
  const currentUser = this.userService.getUserInfo();
  console.log('4. Текущий пользователь:', currentUser);

  const newPostData = {
    text: this.postText,
    imagePath: '',
    authorId: currentUser ? currentUser.userId : 1 // Убедитесь, что в C# DTO это поле называется AuthorId
  };
  console.log('5. Сформирован объект для отправки:', newPostData);

  console.log('6. Отправляем запрос через postService...');
  
  this.postService.createPost(newPostData).subscribe({
    next: (createdPost: Post) => {
      console.log('7. Ответ от сервера успешно получен!', createdPost);

      if (currentUser) {
        createdPost.createdAt = new Date().toISOString(); 
        createdPost.text = this.postText;
        createdPost.imagePath = this.selectedFileName;
        createdPost.user = {
          id: currentUser.userId,
          nickname: currentUser.login,
          photo: currentUser.photo
        };

        console.log('8. Объект поста обогащен данными автора:', createdPost);

      }
      // unshift добавляет ВВЕРХ ленты, push добавил бы вниз
      this.posts.unshift(createdPost); 
      console.log('9. Пост успешно добавлен в начало массива posts!');

      this.loadPosts(); 
      
      this.postText = ''; 
      this.selectedFileName = '';
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Ошибка в блоке subscribe при отправке запроса:', err);
    }
  });
}

  onLogout() {
    this.userService.logout();
  }
}