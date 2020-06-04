import "reflect-metadata";
import { CONSTANTS, IInjectServiceSetting, ServiceFactory } from ".";

export function InjectServiceInitializable<T extends { new(...args: any[]): {} }>(constructorParameter: T) {

    let parameters: IInjectServiceSetting[] = Reflect.getMetadata(CONSTANTS.metadataKey, constructorParameter);

    return class extends constructorParameter {
        // newProperty = "new property";
        // hello = "override";

        constructor(...args: any[]) {
            super();
            if (parameters && parameters.length > 0) {
                parameters.forEach(parameter => {
                    let factoryInvoker: () => any = parameter.container.get(parameter.typeKey);
                    this[parameter.propertyName] = factoryInvoker();
                });
            }

        }
    };
}

export function InjectAutoInit<T extends { new(...args: any[]): {} }>(constructorParameter: T, ) {

    let parameters: IInjectServiceSetting[] = Reflect.getMetadata(CONSTANTS.metadataKey, constructorParameter.prototype);

    return class extends constructorParameter {
        // newProperty = "new property";
        // hello = "override";

        constructor(...args: any[]) {
            super(...args);
            // const metadata = Reflect.getOwnMetadata(CONSTANTS.metadataKey, constructorParameter.prototype);
            // console.log(metadata);
            if (parameters && parameters.length > 0) {
                parameters.forEach(parameter => {
                    let factoryInvoker: () => any = parameter.container.get(ServiceFactory.getServiceFactoryName(parameter.typeKey));
                    //let factoryInvoker = parameter.container.get<IServiceBaseFactory>(parameter.typeKey);
                    this[parameter.propertyName] = factoryInvoker();
                });
            }

        }
    };
}
