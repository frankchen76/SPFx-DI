import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IServiceBase } from '@ezcode/spfx-di/lib';

export interface IInventoryService extends IServiceBase<WebPartContext> {
  getInventory(): string;
}
