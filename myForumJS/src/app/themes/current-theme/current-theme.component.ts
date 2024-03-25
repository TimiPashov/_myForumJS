import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css']
})
export class CurrentThemeComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  theme = {} as Theme;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.api.getTheme(params.get('themeId')).subscribe(theme => {
        this.theme = theme;
      })
    })
  }
}
