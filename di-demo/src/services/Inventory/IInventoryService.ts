import { IServiceBase } from '@ezcode/spfx-di/lib';
import { ServiceScope } from "@microsoft/sp-core-library";

export interface IInventoryService extends IServiceBase<ServiceScope> {
  getInventory(): string;
}
