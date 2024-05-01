import { trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { listAnimation } from 'src/app/animations/postListAnimation';
import { ApiService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/services/user.service';
import { mySort } from 'src/app/utils/themeSorter';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  animations: [trigger('animate', listAnimation())],
})
export class ThemesComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private userService: UserService,
  ) {}

  allThemes: Theme[] = [];
  themes: Theme[] = [];
  private subscription = {} as Subscription;
  isLoading: boolean = true;
  startNumber: number = 0;
  endNumber: number = 5;
  isLogged = false;

  isSubscribed(theme: Theme): boolean {
    const isSub = theme.subscribers.some((subscriberId) => {
      return subscriberId === this.userId;
    });

    return isSub;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }

  selected(selected: string) {
    localStorage.setItem('selected', selected);
    this.isLoading = true;
    this.subscription = this.api.getThemes().subscribe((themes) => {
      this.themes = mySort(themes, selected).slice(
        this.startNumber,
        this.endNumber,
      );
      this.isLoading = false;
    });
  }

  themeSubscribe(themeId: string) {
    this.isLoading = true
    return this.api.subscribeTheme(themeId).subscribe(() => {
      this.api.getThemes().subscribe((themes) => {
        this.allThemes = themes;
        this.themes = mySort(
          this.allThemes,
          localStorage.getItem('selected') || 'Date',
        ).slice(this.startNumber, this.endNumber);
      });
      this.isLoading = false;
    });
  }


  themeUnSubscribe(themeId: string) {
    this.isLoading = true;
    return this.api.unSubscribeTheme(themeId).subscribe(() => {
      this.api.getThemes().subscribe((themes) => {
        this.allThemes = themes;
        this.themes = mySort(
          this.allThemes,
          localStorage.getItem('selected') || 'Date',
        ).slice(this.startNumber, this.endNumber);
      });
      this.isLoading = false;
    });
  }

  nextPage() {
    if (this.endNumber >= this.allThemes.length) {
      return;
    }

    const nextPageStart = this.endNumber;
    let nextPageEnd = this.endNumber + 5;

    this.startNumber = nextPageStart;
    this.endNumber = nextPageEnd;
    this.themes = mySort(
      this.allThemes,
      localStorage.getItem('selected') || 'Date',
    ).slice(this.startNumber, this.endNumber);
  }

  prevPage() {
    const prevPageStart = this.startNumber - 5;
    const prevPageEnd = this.endNumber - 5;

    if (prevPageStart < 0) {
      return;
    }

    this.startNumber = prevPageStart;
    this.endNumber = prevPageEnd;
    this.themes = mySort(
      this.allThemes,
      localStorage.getItem('selected') || 'Date',
    ).slice(this.startNumber, this.endNumber);
  }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((user) => (this.isLogged = !!user));
    this.subscription = this.api.getThemes().subscribe((themes) => {
      this.allThemes = themes;
      this.themes = mySort(this.allThemes, 'Date').slice(
        this.startNumber,
        this.endNumber,
      );
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    localStorage.removeItem('selected');
  }
}
