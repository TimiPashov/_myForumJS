import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService) { }

  themes: Theme[] = [];
  private subscription = {} as Subscription;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.subscription = this.api.getThemes().subscribe(themes => {
      this.themes = themes;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
