import {
  Attribute,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
} from 'ng-apexcharts';
import { ChartOptions } from '../../models/chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() categories: string[] = [];
  @Input() highlightMin: number;
  @Input() highlightMax: number;

  chartOptions: Partial<ChartOptions>;

  ngOnChanges(): void {
    this.setOptions();
  }
  setOptions(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Weight',
          data: this.data,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.categories,
      },
      annotations: {
        yaxis: [
          {
            y: 8200,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
              text: 'Support',
            },
          },
          {
            y: this.highlightMax,
            y2: this.highlightMin,
            borderColor: '#000',
            fillColor: '#04d8b7',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '10px',
                color: '#333',
                background: '#FEB019',
              },
              text: 'Goal Weight',
            },
          },
        ],
      },
    };
  }
}
