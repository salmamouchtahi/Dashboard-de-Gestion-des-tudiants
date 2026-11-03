import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  name: string = '';
  filiere: string = '';
  message: string = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.api.getStudents().subscribe({
      next: (res) => this.students = res,
      error: (err) => this.message = ""
    });
  }

  addStudent() {
    if (!this.name || !this.filiere) {
      this.message = "Nom et filière requis";
      return;
    }

    this.api.addStudent({ name: this.name, filiere: this.filiere }).subscribe({
      next: () => {
        this.name = '';
        this.filiere = '';
        this.message = "Étudiant ajouté";
        this.getStudents();
      },
      error: (err) => this.message = ""
    });
  }

  deleteStudent(id: number) {
    this.api.deleteStudent(id).subscribe({
      next: () => this.getStudents(),
      error: () => this.message = ""
    });
  }
}