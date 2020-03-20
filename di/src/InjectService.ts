import "reflect-metadata";
import { IInjectServiceSetting } from "./IInjectServiceSetting";
import { CONSTANTS } from ".";

export function InjectService(parameter: IInjectServiceSetting) {
    // return Reflect.metadata(CONSTANTS.FieldMapping, mapping);
    //const _parameter = parameter;
    //return function (...args: any[]) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        //descriptor.configurable = value;
        console.log("attribute");
        let existingParameters = Reflect.getOwnMetadata(CONSTANTS.metadataKey, target) || [];
        existingParameters.push(parameter);
        Reflect.defineMetadata(CONSTANTS.metadataKey, existingParameters, target);

        // let existingRequiredParameters: number[] = Reflect.getOwnMetadata(diServiceMetadataKey, target, propertyKey) || [];
        // existingRequiredParameters.push(parameterIndex);
        // Reflect.defineMetadata(diServiceMetadataKey, parameter, target, propertyKey);
    };

}

export function PropertyInject(parameter: IInjectServiceSetting) {
    //return Reflect.metadata(CONSTANTS.metadataKey, parameter);
    //return Reflect.defineMetadata(CONSTANTS.metadataKey, parameter);
    return (target: Object, propertyName: string) => {
        //descriptor.configurable = value;
        console.log("attribute");
        let existingParameters = Reflect.getOwnMetadata(CONSTANTS.metadataKey, target) || [];
        parameter.propertyName = propertyName;
        existingParameters.push(parameter);
        Reflect.defineMetadata(CONSTANTS.metadataKey, existingParameters, target);

        //Reflect.defineMetadata(CONSTANTS.metadataKey, parameter, target, propertyName);

        // let existingRequiredParameters: number[] = Reflect.getOwnMetadata(diServiceMetadataKey, target, propertyKey) || [];
        // existingRequiredParameters.push(parameterIndex);
        // Reflect.defineMetadata(diServiceMetadataKey, parameter, target, propertyKey);
    };
}

