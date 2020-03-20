import { IServiceBase } from "./index";
import { interfaces } from "inversify";

// export class RegisterServiceSetting<T extends IServiceBase> {
//     public get serviceFactoryName(): string {
//         return `${this.serviceKey}Factory`;
//     }
//     constructor(public serviceKey: string, public serviceItems: RegisterServiceItemSetting[]) {

//     }
// }
// export class RegisterServiceItemSetting{
//     constructor(public service: interfaces.Newable<IServiceBase>, public targetName: string) {

//     }
// }

export interface IRegisterServiceItemSetting<T> {
    service: interfaces.Newable<IServiceBase<T>>;
    targetName: string;
}
export interface IRegisterServiceSetting<T> {
    serviceKey: string;
    serviceItems: IRegisterServiceItemSetting<T>[];
}
export class ServiceFactory {
    public static getServiceFactoryName(serviceKey: string) {
        return `${serviceKey}Factory`;
    }
}
// export class RegisterService<T> {
//     public get serviceFactoryName(): string {
//         return `${this.serviceSetting.serviceKey}Factory`;
//     }

//     constructor(public serviceSetting: IRegisterServiceSetting<T>) {

//     }
// }
// export class ServiceSetting {
//     public toIRegiterServiceSettings(): IRegisterServiceSetting[] {
//         let ret = new Array<IRegisterServiceSetting>();
//         for (let prop of Object.getOwnPropertyNames(this)) {
//             var temp = this[prop] as unknown;
//             ret.push(temp as IRegisterServiceSetting);
//         }
//         return ret;
//     }
// }

