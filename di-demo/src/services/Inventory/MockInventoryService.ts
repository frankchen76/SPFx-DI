import { IInventoryService } from "../index";
import { injectable } from "inversify";
import { WebPartContext } from "@microsoft/sp-webpart-base";

@injectable()
export class MockInventoryService implements IInventoryService {
    public webPartContext: WebPartContext;
    public getInventory(): string {
        return `MockInventoryService: ${new Date().getTime()}`;
    }
}
