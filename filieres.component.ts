import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-filieres',
  templateUrl: './filieres.component.html',
  styleUrls: ['./filieres.component.css']
})
export class FilieresComponent implements OnInit {

  filieres: any[] = [];
  name: string = '';
  message: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getFilieres();
  }

  getFilieres() {
    this.api.getFilieres().subscribe({
      next: res => this.filieres = res,
      error: () => this.message = "Erreur de chargement"
    });
  }

  addFiliere() {
    if (!this.name) {
      this.message = "Nom requis";
      return;
    }

    this.api.addFiliere({ name: this.name }).subscribe({
      next: () => {
        this.name = '';
        this.getFilieres();
        this.message = "Filière ajoutée";
      },
      error: () => this.message = "Erreur lors de l'ajout"
    });
  }

  startEdit(filiere: any) {
    filiere.editing = true;
    filiere._editName = filiere.name;
  }

  updateFiliere(filiere: any) {
    if (!filiere._editName) {
      this.message = "Nom requis";
      return;
    }

    this.api.updateFiliere(filiere.id, { name: filiere._editName }).subscribe({
      next: () => {
        filiere.editing = false;
        this.getFilieres();
        this.message = "Filière modifiée";
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || "Erreur lors de la modification";
      }
    });
  }

  deleteFiliere(id: number) {
    if (!confirm("Supprimer cette filière ?")) return;

    this.api.deleteFiliere(id).subscribe({
      next: () => {
        this.getFilieres();
        this.message = "Filière supprimée";
      },
      error: () => this.message = "Erreur lors de la suppression"
    });
  }
}
