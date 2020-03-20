import { IInventoryService } from "../index";
import { injectable, interfaces } from "inversify";
import { WebPartContext } from "@microsoft/sp-webpart-base";

@injectable()
export class SPOInventoryService implements IInventoryService {
    public webPartContext: WebPartContext;
    public getInventory(): string {
        return `SPOInventoryService: ${new Date().getTime()}`;
    }
    constructor() {
    }
}
