import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

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



  themeSubscribe(themeId: string) {
    return this.api.subscribeTheme(themeId).subscribe(() => {
      this.api.getThemes().subscribe(themes => {
        this.themes = themes
        .sort((a: { created_at: string }, b: { created_at: string }) => {
          return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
        });
      })
    })
  }

  themeUnSubscribe(themeId: string) {
    return this.api.unSubscribeTheme(themeId).subscribe(() => {
      this.api.getThemes().subscribe(themes => {
        this.themes = themes
        .sort((a: { created_at: string }, b: { created_at: string }) => {
          return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
        });
      })
    })
  }

  ngOnInit(): void {
    this.subscription = this.api.getThemes().subscribe(themes => {
      this.themes = themes
      .sort((a: { created_at: string }, b: { created_at: string }) => {
        return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
      });


      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
