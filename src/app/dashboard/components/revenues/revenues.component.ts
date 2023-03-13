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

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as billingActions from '../../state/actions/billing.actions';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenuesComponent implements OnInit {
  constructor(
    private _detector: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

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

  ngOnInit(): void {
    this.onInitHandler();
  }

  onInitHandler(): void {
    this.store.dispatch(new billingActions.LoadBillings());
  }
}
