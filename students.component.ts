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
      error: (err) => this.message = "Erreur lors du chargement"
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
      error: (err) => this.message = "Erreur lors de l'ajout"
    });
  }

  deleteStudent(id: number) {
    this.api.deleteStudent(id).subscribe({
      next: () => this.getStudents(),
      error: () => this.message = "Erreur lors de la suppression"
    });
  }

  startEdit(student: any) {
    student.editing = true;
  }

  updateStudent(student: any) {
    if (!student.name || !student.filiere) {
      this.message = "Nom et filière requis";
      return;
    }

    this.api.updateStudent(student.id, { name: student.name, filiere: student.filiere }).subscribe({
      next: () => {
        student.editing = false;
        this.message = "Étudiant modifié";
        this.getStudents();
      },
      error: (err) => {
        console.error(err); // affichage de l’erreur réelle
        this.message = err.error?.message || "Erreur lors de la modification";
      }
    });
  }
}
