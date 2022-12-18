export class ProductModel {
  public id?: string;
  constructor(
    public productName: string,
    public price: string,
    public image: string = "",
    public offerPrice: string = ""
  ) {}
}
