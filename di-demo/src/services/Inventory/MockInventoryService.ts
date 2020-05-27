import { IInventoryService } from "../index";
import { injectable } from "inversify";
import { ServiceScope } from "@microsoft/sp-core-library";

@injectable()
export class MockInventoryService implements IInventoryService {
  public context: ServiceScope;
  public getInventory(): string {
    return `MockInventoryService: ${new Date().getTime()}`;
  }
}
