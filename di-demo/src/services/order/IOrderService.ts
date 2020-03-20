import { IServiceBase } from '@ezcode/spfx-di/lib';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IOrderListItem } from './IOrderListItem';

export interface IOrderService extends IServiceBase<WebPartContext> {
  getOrders(): Promise<IOrderListItem[]>;
}
