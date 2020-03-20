import { Container, interfaces } from "inversify";
import { IRegisterServiceSetting, ServiceFactory } from "./RegisterServiceSetting";
import { IServiceBase } from "./IServiceBase";

// T is webpartContext
export class SPFxContainer<T> {
    private _webpartContext: T;
    private _container = new Container();

    public get Container(): Container {
        return this._container;
    }
    protected get WebPartContext(): T {
        return this._webpartContext;
    }
    constructor(iSettings: IRegisterServiceSetting<T>[], targetName: string) {
        iSettings.forEach(iSetting => this.registerService(iSetting, targetName));
    }

    //protected abstract registerServices(): void;

    // public registerService<T extends IServiceBase>(setting: RegisterServiceSetting<T>): void {
    //     //register implemented class
    //     setting.serviceItems.forEach(item => {
    //         this.Container.bind<T>(setting.serviceKey).to(item.service).whenTargetNamed(item.targetName);
    //     });
    //     //register a factoSPFxContainerBasery class
    //     this.Container.bind<T>(setting.serviceFactoryName).toFactory<T>((context) => {
    //         return () => {
    //             let ret = this.Container.getNamed<T>(setting.serviceKey, Environment.type.toString());
    //             ret.webPartContext = this.WebPartContext;
    //             return ret;
    //         };
    //     });

    // }
    private registerService(iSetting: IRegisterServiceSetting<T>, targetName: string): void {
        //const setting = new RegisterService(iSetting);
        //register implemented class
        iSetting.serviceItems.forEach(item => {
            this.Container.bind<IServiceBase<T>>(iSetting.serviceKey).to(item.service).whenTargetNamed(item.targetName);
        });

        //register a factoSPFxContainerBasery class
        this.Container.bind<IServiceBase<T>>(ServiceFactory.getServiceFactoryName(iSetting.serviceKey)).toFactory<IServiceBase<T>>((context): IServiceBaseFactory<T> => {
            return () => {
                let ret = this.Container.getNamed<IServiceBase<T>>(iSetting.serviceKey, targetName);
                ret.webPartContext = this.WebPartContext;
                return ret;
            };
        });

    }

    public registerWebPartContext(webpartContext?: T): void {
        if (webpartContext)
            this._webpartContext = webpartContext;

        //this.registerServices();
    }
}

export type IServiceFactory<T> = () => T;
//export type IServiceBaseFactory = () => IServiceBase;
export type IServiceBaseFactory<T> = IServiceFactory<IServiceBase<T>>;
