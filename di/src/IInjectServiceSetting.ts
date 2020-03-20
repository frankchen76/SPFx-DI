import { interfaces, Container } from "inversify";

export interface IInjectServiceSetting {
    typeKey: string;
    propertyName?: string;
    container: Container;
}
