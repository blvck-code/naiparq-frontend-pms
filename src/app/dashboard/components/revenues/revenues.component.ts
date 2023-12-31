import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Billings } from './Billings';
import {
  IgxLegendComponent,
  IgxCategoryChartComponent,
} from 'igniteui-angular-charts';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as billingActions from '../../state/actions/billing.actions';
import {
  billingsLoaded,
  billingsLoading,
  getBillings,
  totalRevenue,
} from '../../state/entities/bill.entities';
import { Observable } from 'rxjs';
import { BillingModel } from '../../models/billing.model';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'naiparq-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenuesComponent implements OnInit {
  constructor(
    private _detector: ChangeDetectorRef,
    private dashSrv: DashService,
    private store: Store<AppState>
  ) {}

  @ViewChild('legend', { static: true })
  private legend!: IgxLegendComponent;
  @ViewChild('chart', { static: true })
  private chart!: IgxCategoryChartComponent;

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

  handleChangeIncome(event: any): void {
    const days = event.target.value;
    this.store.dispatch(new billingActions.LoadBillings({ days }));
  }

  todayDate(): Date {
    return this.dashSrv.currentDate;
  }

  onInitHandler(): void {
    this.store.dispatch(new billingActions.LoadBillings({ days: 100 }));
  }
}
