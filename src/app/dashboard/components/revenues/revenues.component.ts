import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import {
  CountryRenewableElectricityItem,
  CountryRenewableElectricity,
} from './CountryRenewableElectricity';
import {
  IgxLegendComponent,
  IgxCategoryChartComponent,
} from 'igniteui-angular-charts';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenuesComponent implements OnInit {
  constructor(private _detector: ChangeDetectorRef) {}

  @ViewChild('legend', { static: true })
  private legend!: IgxLegendComponent;
  @ViewChild('chart', { static: true })
  private chart!: IgxCategoryChartComponent;

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
