import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AdminComponent } from '../admin/admin.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularProject';
}
