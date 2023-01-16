export class CountryRenewableElectricityItem {
  public constructor(init: Partial<CountryRenewableElectricityItem>) {
    Object.assign(this, init);
  }

  public year: string | undefined;
  public income: number | undefined;
  public expense: number | undefined;
}
export class CountryRenewableElectricity extends Array<CountryRenewableElectricityItem> {
  public constructor() {
    super();
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 14`,
        income: 3000,
        expense: 5000,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 15`,
        income: 7000,
        expense: 6000,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 16`,
        income: 5800,
        expense: 6200,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 17`,
        income: 4200,
        expense: 5800,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 18`,
        income: 4700,
        expense: 6500,
      })
    );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 19`,
    //     income: 46,
    //     expense: 31,
    //   })
    // );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 20`,
    //     income: 50,
    //     expense: 19,
    //   })
    // );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 21`,
    //     income: 90,
    //     expense: 52,
    //   })
    // );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 22`,
    //     income: 132,
    //     expense: 50,
    //   })
    // );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 23`,
    //     income: 134,
    //     expense: 34,
    //   })
    // );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 24`,
    //     income: 134,
    //     expense: 34,
    //   })
    // );
    // this.push(
    //   new CountryRenewableElectricityItem({
    //     year: `Apr 24`,
    //     income: 96,
    //     expense: 38,
    //   })
    // );
  }
}
