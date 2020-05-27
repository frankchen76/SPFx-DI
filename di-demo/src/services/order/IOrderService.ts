import { IServiceBase } from '@ezcode/spfx-di/lib';
import { IOrderListItem } from './IOrderListItem';
import { ServiceScope } from '@microsoft/sp-core-library';

export interface IOrderService extends IServiceBase<ServiceScope> {
  getOrders(): Promise<IOrderListItem[]>;
}
