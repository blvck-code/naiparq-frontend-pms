import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountryRenewableElectricityItem } from '../../services/ChartData';
import { Billings } from './Billings';
import {
  IgxCategoryChartComponent,
  IgxLegendComponent,
} from 'igniteui-angular-charts';
import { Observable } from 'rxjs';
import { BillingModel } from '../../models/billing.model';
import {
  billingsLoaded,
  getBillings,
  billingsLoading,
  totalRevenue,
} from '../../state/entities/bill.entities';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as billingActions from '../../state/actions/billing.actions';
import { DashService } from '../../services/dash.service';

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

  constructor(
    private _detector: ChangeDetectorRef,
    private dashSrv: DashService,
    private store: Store<AppState>
  ) {}

  //@ts-ignore
  private _billings: Billings = null;
  public get billings(): Billings {
    this.billingsLoaded$.subscribe({
      next: (status) => {
        if (!status) {
          this._billings = new Billings(this.billings$);
        }
      },
    });
    return this._billings;
  }

  billings$: Observable<BillingModel[]> = this.store.select(getBillings);
  billingsLoaded$: Observable<boolean> = this.store.select(billingsLoaded);
  billingsLoading: Observable<boolean> = this.store.select(billingsLoading);
  revenue$: Observable<number> = this.store.select(totalRevenue);

  ngOnInit(): void {
    this.onInitHandler();
  }

  onInitHandler(): void {
    this.store.dispatch(new billingActions.LoadBillings({ days: 100 }));
  }

  todayDate(): Date {
    return this.dashSrv.currentDate;
  }

  handleChangeIncome(event: any): void {
    const days = event.target.value;
    this.store.dispatch(new billingActions.LoadBillings({ days }));
  }
}
