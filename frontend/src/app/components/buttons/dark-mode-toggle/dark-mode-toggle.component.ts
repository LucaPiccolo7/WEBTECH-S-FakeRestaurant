import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../../../_services/local-storage/local-storage';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss'
})
export class DarkModeToggleComponent implements OnInit {

  localStorageService = inject(LocalStorageService);

  isLightThemeToggleShowed! : boolean;
  isDarkThemeToggleShowed! : boolean;
  
  ngOnInit(){

    this.isLightThemeToggleShowed = true;
    this.isDarkThemeToggleShowed = false;

    if (
        this.localStorageService.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
      this.setDarkColorTheme();
    } else {
      this.setLightColorTheme();
    }
  }

  toggle(){
    const colorTheme = this.localStorageService.getItem('color-theme');
    if(colorTheme){
      switch(colorTheme){
        case 'dark':
          this.setLightColorTheme();
            break;
        case 'light':
          this.setDarkColorTheme();
          break;
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
          this.setLightColorTheme();
        } else {
          this.setDarkColorTheme();
        }
    }
  }

  setDarkColorTheme(){
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    this.isDarkThemeToggleShowed = true;
    this.isLightThemeToggleShowed = false;
    this.localStorageService.setItem('color-theme', 'dark');
  }

  setLightColorTheme(){
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    this.isDarkThemeToggleShowed = false;
    this.isLightThemeToggleShowed = true;
    this.localStorageService.setItem('color-theme', 'light');
  }

}
