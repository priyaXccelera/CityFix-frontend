import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({ selector: 'app-topbar', standalone: true, imports: [RouterModule], templateUrl: './topbar.component.html', encapsulation: ViewEncapsulation.None })
export class TopbarComponent { auth = inject(AuthService); }
