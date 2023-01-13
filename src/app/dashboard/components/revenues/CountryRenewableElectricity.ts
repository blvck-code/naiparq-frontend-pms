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
        income: 21,
        expense: 100,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 15`,
        income: 26,
        expense: 24,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 16`,
        income: 29,
        expense: 28,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 17`,
        income: 32,
        expense: 26,
      })
    );
    this.push(
      new CountryRenewableElectricityItem({
        year: `Apr 18`,
        income: 47,
        expense: 38,
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
