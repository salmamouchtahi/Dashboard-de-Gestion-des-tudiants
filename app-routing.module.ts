import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { FilieresComponent } from './pages/filieres/filieres.component';
import { StatsComponent } from './pages/stats/stats.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],  // protège toutes les routes enfants
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'students', component: StudentsComponent },
            { path: 'filieres', component: FilieresComponent },
            { path: 'stats', component: StatsComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }