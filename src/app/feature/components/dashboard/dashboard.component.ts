import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ChartComponent } from '../../../shared/components/chart/chart.component';
import { SafePipe } from '../../../shared/pipes/safe.pipe';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    SafePipe,
    OtpInputComponent,
    TranslateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // private commonService = inject(CommonService);
  public trendIncomeChart!: EChartsOption;
  public trendOrdersChart!: EChartsOption;
  public distributionChart!: EChartsOption;
  public trendIncomeCtrl: FormControl = new FormControl('Weekly');
  public trendOrderCtrl: FormControl = new FormControl('Weekly');
  public distributionCtrl: FormControl = new FormControl('Weekly');
  public businessCtrl: FormControl = new FormControl('Weekly');
  public barChartList: {
    label: string;
    control: FormControl;
  }[] = [
    { label: 'Trend Income', control: this.trendIncomeCtrl },
    { label: 'Trend Order', control: this.trendOrderCtrl },
  ];
  public chartHeight: string = 'height : 265px';

  ngOnInit() {
    this.setDistributionChart();
    this.setTrendIncomeChart();
    this.setTrendOrdersChart();
    this.controlValueChanges();
  }

  private setDistributionChart(): void {
    const seriesData = [
      { value: 580, name: 'Burger' },
      { value: 484, name: 'Pizza' },
      { value: 300, name: 'Fries' },
    ];
    this.distributionChart = {
      width: 250,
      height: 250,
      responsive: true,
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '80',
        right: 0,
        orient: 'vertical',
        icon: 'circle',
        textStyle: {
          fontSize: 14,
          fontWeight: 400,
          color: '#fff',
        },
        selectedMode: false,
        formatter: (name: string) => {
          const dataItem: any = seriesData.find((item) => item.name === name);
          return `${name} - ${dataItem.value}`;
        },
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['48%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: 'Total Orders \n 3000',
            fontSize: 14,
            fontWeight: 'bold',
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 580, name: 'Burger' },
            { value: 484, name: 'Pizza' },
            { value: 300, name: 'Fries' },
          ],
          color: [
            // this.commonService.getVarColor('--secondary'),
            // this.commonService.getVarColor('--primary'),
            // this.commonService.getVarColor('--dark-black'),
            'red',
            'green',
            'blue',
          ],
        },
      ],
    };
  }

  private controlValueChanges(): void {
    this.trendIncomeCtrl.valueChanges.subscribe((res) => {
      console.log('CONTROL trendIncomeCtrl :>> ', res);
    });
    this.trendOrderCtrl.valueChanges.subscribe((res) => {
      console.log('CONTROL trendOrderCtrl :>> ', res);
    });
    this.distributionCtrl.valueChanges.subscribe((res) => {
      console.log('CONTROL distributionCtrl :>> ', res);
    });
    this.businessCtrl.valueChanges.subscribe((res) => {
      console.log('CONTROL businessCtrl :>> ', res);
    });
  }

  private setChart(
    chartData: any,
    backgroundColor?: string,
    color?: string
  ): EChartsOption {
    return {
      height: 170,
      responsive: true,
      xAxis: {
        type: 'category',
        data: [
          '4 Mon',
          '5 Tue',
          '6 Wed',
          '7 Thu',
          '8 Fri',
          '9 Sat',
          '10 Sun',
        ].map((str) => str.replace(' ', '\n')),
        axisLabel: {
          color: '#fff',
        },
      },
      yAxis: {
        type: 'value',
        interval: 20,
        axisLabel: {
          // fontWeight: 500,
          fontSize: 14,
          color: '#fff',
        },
      },
      series: [
        {
          data: chartData,
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            borderColor: 'red',
            borderWidth: 2,
            borderRadius: [5, 5, 0, 0],
            // color: 'rgb(220 53 69)',
            color: '#da192c59',

            // opacity : 0.5
          },
          color: color,
          // showBackground: true,
          backgroundStyle: {
            color: backgroundColor,
          },
        },
      ],
    };
  }

  private setTrendOrdersChart(): void {
    // const bgColor = `rgba(${this.commonService.getVarColor(
    //   '--light-blue-rgb'
    // )}, 0.20)`;
    this.trendOrdersChart = this.setChart(
      [120, 200, 150, 80, 70, 110, 130]
      // bgColor
    );
  }

  private setTrendIncomeChart(): void {
    // const bgColor = `rgba(${this.commonService.getVarColor(
    //   '--primary-rgb'
    // )}, 0.05)`;
    this.trendIncomeChart = this.setChart(
      [120, 200, 150, 80, 70, 110, 130]
      // bgColor,
      // this.commonService.getVarColor('--primary')
    );
  }
}
