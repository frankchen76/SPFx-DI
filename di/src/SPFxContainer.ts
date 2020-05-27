import { Container, interfaces } from "inversify";
import { IRegisterServiceSetting, ServiceFactory } from "./RegisterServiceSetting";
import { IServiceBase } from "./IServiceBase";

// T is webpartContext
export class SPFxContainer<T> {
    private _context: T;
    private _container = new Container();

    public get Container(): Container {
        return this._container;
    }
    protected get Context(): T {
        return this._context;
    }
    constructor(iSettings: IRegisterServiceSetting<T>[], targetName: string) {
        iSettings.forEach(iSetting => this.registerService(iSetting, targetName));
    }

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
                ret.context = this.Context;
                return ret;
            };
        });

    }

    public registerContext(context?: T): void {
        if (context)
            this._context = context;

        //this.registerServices();
    }
}

export type IServiceFactory<T> = () => T;
//export type IServiceBaseFactory = () => IServiceBase;
export type IServiceBaseFactory<T> = IServiceFactory<IServiceBase<T>>;
