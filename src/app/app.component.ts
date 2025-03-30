import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './utiles/service.service';
import { AuthGuard } from './modules/guards/auth.guard';
import { ClientAuthGuard } from './modules/guards/client-auth.guard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster, HttpClientModule],
  providers: [ServiceService, AuthGuard, ClientAuthGuard]
})
export class AppComponent {
  title = 'GARAGE';

  constructor(public themeService: ThemeService) {}
}
