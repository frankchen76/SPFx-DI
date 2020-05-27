import { IOrderService } from './IOrderService';
import { injectable, inject } from 'inversify';
import { IInventoryService } from '../index';
import { ServiceFactory, IServiceFactory } from '@ezcode/spfx-di/lib';
import { IOrderListItem } from './IOrderListItem';
import { ServiceScope } from '@microsoft/sp-core-library';

@injectable()
export class MockOrderService implements IOrderService {
  public context: ServiceScope;
  private _invnetoryService: IInventoryService;

  constructor(
    @inject(ServiceFactory.getServiceFactoryName('IInventoryService'))
    inventoryServiceFactory: IServiceFactory<IInventoryService>
  ) {
    this._invnetoryService = inventoryServiceFactory();
  }
  public getOrders(): Promise<IOrderListItem[]> {
    console.log(this._invnetoryService.getInventory());
    return new Promise(resolve => {
      let ret = new Array<IOrderListItem>();
      ret.push({
        ID: 1,
        Title: 'Test',
        Price: 1.99,
        OrderType: 'Meat'
      });
      resolve(ret);
    });
    // if (this._invnetoryService)
    //   ret.push(this._invnetoryService.getInventory());
  }
}
