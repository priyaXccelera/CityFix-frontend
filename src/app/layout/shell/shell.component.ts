import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
@Component({ selector: 'app-shell', standalone: true, imports: [RouterModule, SidebarComponent, TopbarComponent], template: '<app-sidebar /><app-topbar /><main class="min-h-[calc(100vh-4rem)] p-5 lg:ml-64 lg:p-8"><router-outlet /></main>', encapsulation: ViewEncapsulation.None })
export class ShellComponent {}
