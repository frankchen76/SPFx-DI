import { IInventoryService } from "../index";
import { injectable, interfaces } from "inversify";
import { ServiceScope } from "@microsoft/sp-core-library";

@injectable()
export class SPOInventoryService implements IInventoryService {
  public context: ServiceScope;
  public getInventory(): string {
    return `SPOInventoryService: ${new Date().getTime()}`;
  }
  constructor() {
  }
}
