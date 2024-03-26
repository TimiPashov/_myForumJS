import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  form = this.fb.group({
    themeName: ['', [Validators.required]],
    postText: ['', [Validators.required]]
  })



  addTheme() {
    if (this.form.invalid) {
      return;
    }

    const { themeName, postText } = this.form.value;

    this.api.createTheme(themeName!, postText!).subscribe(()=>{
      this.router.navigate(['/themes']);
    })

  }

}
