import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';
import { mySort } from 'src/app/utils/themeSorter';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService, private userService: UserService) { }

  themes: Theme[] = [];
  private subscription = {} as Subscription;
  isLoading: boolean = true;


  isSubscribed(theme: Theme): boolean {


    const isSub = theme.subscribers.some((subscriberId) => {
      return subscriberId === this.userId;
    })

    return isSub;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn
  }

  selected(selected: string) {
    localStorage.setItem('selected', selected);
    this.isLoading = true;
    this.subscription = this.api.getThemes().subscribe(themes => {
      this.themes = mySort(themes, selected);
      this.isLoading = false;
    });
  }


  themeSubscribe(themeId: string) {
    return this.api.subscribeTheme(themeId).subscribe(() => {
      this.api.getThemes().subscribe(themes => {
        this.themes = mySort(themes, localStorage.getItem('selected') || 'Date')

      })
    })
  }

  themeUnSubscribe(themeId: string) {
    return this.api.unSubscribeTheme(themeId).subscribe(() => {
      this.api.getThemes().subscribe(themes => {
        this.themes = mySort(themes, localStorage.getItem('selected') || 'Date')
      })
    })
  }

  ngOnInit(): void {
    this.subscription = this.api.getThemes().subscribe(themes => {
      this.themes = mySort(themes, 'Date');
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
