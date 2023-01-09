import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountryRenewableElectricityItem } from '../../services/ChartData';
import { CountryRenewableElectricity } from '../revenues/CountryRenewableElectricity';
import {
  IgxCategoryChartComponent,
  IgxLegendComponent,
} from 'igniteui-angular-charts';

@Component({
  selector: 'app-analytics',
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
  private _countryRenewableElectricity: CountryRenewableElectricity = null;
  public get countryRenewableElectricity(): CountryRenewableElectricity {
    if (this._countryRenewableElectricity == null) {
      this._countryRenewableElectricity = new CountryRenewableElectricity();
    }
    return this._countryRenewableElectricity;
  }

  ngOnInit(): void {}
}
