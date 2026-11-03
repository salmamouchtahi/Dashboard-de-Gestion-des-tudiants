import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { FilieresComponent } from './pages/filieres/filieres.component';
import { StatsComponent } from './pages/stats/stats.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        MainLayoutComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        StudentsComponent,
        FilieresComponent,
        StatsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }