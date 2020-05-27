import { EnvironmentType, Environment, ServiceScope } from '@microsoft/sp-core-library';

import 'reflect-metadata';
import { SPFxContainer } from '@ezcode/spfx-di/lib';
import { SPOInventoryService, MockInventoryService } from '.';
import { MockOrderService } from './order/MockOrderService';
import { SPOOrderService } from './order/SPOOrderService';

export const TYPES = {
  InventoryService: 'IInventoryService',
  OrderService: 'IOrderService'
};

export const mainContainer = new SPFxContainer<ServiceScope>([
  {
    serviceKey: TYPES.InventoryService,
    serviceItems: [
      {
        targetName: EnvironmentType.SharePoint.toString(),
        service: SPOInventoryService
      },
      {
        targetName: EnvironmentType.Local.toString(),
        service: MockInventoryService
      }

    ]
  },
  {
    serviceKey: TYPES.OrderService,
    serviceItems: [
      {
        targetName: EnvironmentType.SharePoint.toString(),
        service: SPOOrderService
      },
      {
        targetName: EnvironmentType.Local.toString(),
        service: MockOrderService
      }

    ]
  }
], Environment.type.toString());

