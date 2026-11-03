import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  studentsCount = 0;
  filieresCount = 0;

  pieChart: Chart | undefined;
  barChart: Chart | undefined;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.api.getStudents().subscribe(students => {
      this.studentsCount = students.length;
      this.tryDrawCharts();
    });

    this.api.getFilieres().subscribe(filieres => {
      this.filieresCount = filieres.length;
      this.tryDrawCharts();
    });
  }

  tryDrawCharts() {
    // ⛔ attendre que les deux valeurs soient chargées
    if (this.studentsCount === 0 && this.filieresCount === 0) return;

    this.drawCharts();
  }

  drawCharts() {
    const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

    if (!pieCanvas || !barCanvas) return;

    // 🔁 détruire anciens graphiques
    this.pieChart?.destroy();
    this.barChart?.destroy();

    // 🥧 Camembert
    this.pieChart = new Chart(pieCanvas, {
      type: 'pie',
      data: {
        labels: ['Étudiants', 'Filières'],
        datasets: [{
          data: [this.studentsCount, this.filieresCount],
          backgroundColor: ['#4CAF50', '#2196F3']
        }]
      }
    });

    // 📊 Diagramme en bâtons
    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: ['Étudiants', 'Filières'],
        datasets: [{
          label: 'Statistiques globales',
          data: [this.studentsCount, this.filieresCount],
          backgroundColor: ['#4CAF50', '#2196F3']
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
