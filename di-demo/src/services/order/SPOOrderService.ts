import { IOrderService } from './IOrderService';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { injectable, inject } from 'inversify';
import { ServiceFactory, IServiceFactory } from '@ezcode/spfx-di/lib';
import { IInventoryService } from '../Inventory/IInventoryService';
import { IOrderListItem } from './IOrderListItem';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

@injectable()
export class SPOOrderService implements IOrderService {
  public webPartContext: WebPartContext;
  private _invnetoryService: IInventoryService;
  constructor(
    @inject(ServiceFactory.getServiceFactoryName('IInventoryService'))
    inventoryServiceFactory: IServiceFactory<IInventoryService>
  ) {
    this._invnetoryService = inventoryServiceFactory();
  }
  public getOrders(): Promise<IOrderListItem[]> {
    console.log(this._invnetoryService.getInventory());
    return sp.web.lists.getByTitle('OrderList').items.getAll()
      .then(result => {
        return result.map(item => {
          return {
            Title: item['Title'],
            ID: item['ID'],
            Price: item['Price'],
            OrderType: item['OrderType']
          };
        });
      });
  }
}
