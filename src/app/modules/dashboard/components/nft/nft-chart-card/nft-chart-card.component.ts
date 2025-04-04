import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from '../../../../../shared/models/chart-options';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from 'src/app/utiles/service.service';
import { Router } from '@angular/router';

@Component({
  selector: '[nft-chart-card]',
  templateUrl: './nft-chart-card.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule, FormsModule, CommonModule],
  standalone: true
})
export class NftChartCardComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions> = {};
  public allReservationData: any[] = [];
  public filteredReservationData: any[] = [];
  public selectedYear: number | 'all' = 'all';
  public selectedMonth: number | 'all' = 'all';
  public years: number[] = [];
  public months = [
    { value: 1, name: 'Janvier' },
    { value: 2, name: 'Février' },
    { value: 3, name: 'Mars' },
    { value: 4, name: 'Avril' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Juin' },
    { value: 7, name: 'Juillet' },
    { value: 8, name: 'Août' },
    { value: 9, name: 'Septembre' },
    { value: 10, name: 'Octobre' },
    { value: 11, name: 'Novembre' },
    { value: 12, name: 'Décembre' }
  ];

  constructor(
    private themeService: ThemeService, 
    private serviceService: ServiceService, 
    private router: Router
  ) {
    this.setupThemeEffect();
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
    this.initializeData();
    this.initializeChart();
  }

  ngOnDestroy(): void {}

  private async fetch(): Promise<void> {
    try {
      this.allReservationData = await this.serviceService.getStat();
      console.log('Données de réservation:', this.allReservationData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      this.router.navigate(["error/error-server"]);
    }
  }

  private initializeData(): void {
    // Extraire les années uniques
    this.years = [...new Set(this.allReservationData.map(item => item.annee))];
    this.filterData();
  }

  private initializeChart(): void {
    const baseColor = '#3b82f6'; // Couleur bleue par défaut
    
    this.chartOptions = {
      series: [],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        }
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 4,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        title: {
          text: 'Nombre de réservations',
          style: {
            color: '#6b7280',
            fontSize: '12px'
          }
        },
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px'
          }
        },
        min: 0
      },
      fill: {
        opacity: 1,
        type: 'solid'
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val) {
            return val + ' réservation(s)';
          },
        },
      },
      colors: [baseColor, '#10b981', '#ef4444', '#f59e0b'],
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        fontSize: '12px',
        itemMargin: {
          horizontal: 10,
          vertical: 5
        },
        markers: {
          radius: 4
        }
      },
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
        padding: {
          top: 20,
          right: 20,
          bottom: 0,
          left: 20
        }
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.9
          }
        },
        active: {
          filter: {
            type: 'darken',
            value: 0.9
          }
        }
      },
      title: {
        text: 'Statistiques des réservations',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#111827'
        }
      }
    };

    this.updateChartData();
  }

  private setupThemeEffect(): void {
    effect(() => {
      const isDark = this.themeService.theme().mode === 'dark';
      const textColor = isDark ? '#f3f4f6' : '#111827';
      const gridColor = isDark ? '#374151' : '#e5e7eb';
      
      this.chartOptions.tooltip = {
        ...this.chartOptions.tooltip,
        theme: this.themeService.theme().mode,
      };
      
      this.chartOptions.xaxis = {
        ...this.chartOptions.xaxis,
        labels: {
          style: {
            colors: isDark ? '#9ca3af' : '#6b7280'
          }
        }
      };
      
      this.chartOptions.yaxis = {
        ...this.chartOptions.yaxis,
        labels: {
          style: {
            colors: isDark ? '#9ca3af' : '#6b7280'
          }
        }
      };
      
      this.chartOptions.grid = {
        ...this.chartOptions.grid,
        borderColor: gridColor
      };
      
      this.chartOptions.title = {
        ...this.chartOptions.title,
        style: {
          color: textColor
        }
      };
    });
  }

  public filterData(): void {
    this.filteredReservationData = this.allReservationData.filter(item => {
      const yearMatch = this.selectedYear === 'all' || item.annee === this.selectedYear;
      const monthMatch = this.selectedMonth === 'all' || item.mois === this.selectedMonth;
      return yearMatch && monthMatch;
    });

    this.updateChartData();
  }

  private updateChartData(): void {
    const categories = this.filteredReservationData.map(item => `${item.moisNom} ${item.annee}`);
    const totalData = this.filteredReservationData.map(item => item.total);
    const terminesData = this.filteredReservationData.map(item => item.termines);
    const annulesData = this.filteredReservationData.map(item => item.annules);
    const enAttenteData = this.filteredReservationData.map(item => item.enAttente);

    this.chartOptions.series = [
      {
        name: 'Total',
        data: totalData
      },
      {
        name: 'Terminés',
        data: terminesData
      },
      {
        name: 'Annulés',
        data: annulesData
      },
      {
        name: 'En attente',
        data: enAttenteData
      }
    ];

    this.chartOptions.xaxis = {
      ...this.chartOptions.xaxis,
      categories: categories
    };
  }

  public resetFilters(): void {
    this.selectedYear = 'all';
    this.selectedMonth = 'all';
    this.filterData();
  }

  public calculateGrowthRate(): number {
    if (this.filteredReservationData.length < 2) return 0;
    
    const last = this.filteredReservationData[this.filteredReservationData.length - 1].total;
    const prev = this.filteredReservationData[this.filteredReservationData.length - 2].total;
    
    if (prev === 0) return last === 0 ? 0 : 100;
    
    return Math.round(((last - prev) / prev) * 100);
  }

  public getTotalReservations(): number {
    return this.filteredReservationData.reduce((sum, item) => sum + item.total, 0);
  }
}