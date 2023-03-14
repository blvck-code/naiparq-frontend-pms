import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountryRenewableElectricityItem } from '../../services/ChartData';
import { Billings } from '../revenues/Billings';
import {
  IgxCategoryChartComponent,
  IgxLegendComponent,
} from 'igniteui-angular-charts';

@Component({
  selector: 'naiparq-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('legend', { static: true })
  private legend!: IgxLegendComponent;
  @ViewChild('chart', { static: true })
  private chart!: IgxCategoryChartComponent;

  constructor(private _detector: ChangeDetectorRef) {}

  //@ts-ignore
  private _billings: Billings = null;
  public get billings(): Billings {
    if (this._billings == null) {
      // @ts-ignore
      this._billings = new Billings();
    }
    return this._billings;
  }

  ngOnInit(): void {}
}
