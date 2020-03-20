import * as React from 'react';
import styles from './DiDemo.module.scss';
import { IDiDemoProps } from './IDiDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, autobind } from 'office-ui-fabric-react';
import { OrderPanel } from '../../../components/panel/OrderPanel';

import "reflect-metadata";
import { IOrderService, IInventoryService, mainContainer, TYPES } from '../../../services';
import { PropertyInject, InjectAutoInit } from 'ezcode-spfx-di/lib';
import { IDiDemoState } from './IDiDemoState';

@InjectAutoInit
export default class DiDemo extends React.Component<IDiDemoProps, IDiDemoState> {
  @PropertyInject({
    typeKey: TYPES.InventoryService,
    container: mainContainer.Container
  })
  private _inventoryService: IInventoryService;

  @PropertyInject({
    typeKey: TYPES.OrderService,
    container: mainContainer.Container
  })
  private _orderService: IOrderService;

  constructor(props: IDiDemoProps) {
    super(props);

    this.state = {
      result: "",
      loading: false,
    };
  }

  @autobind
  private _testHandler(): void {
    this.setState({ loading: true });
    this._orderService.getOrders()
      .then(result => {
        this.setState({
          loading: false,
          result: JSON.stringify(result, null, 4)
        });
      });
  }

  @autobind
  private _showOrderPanelHandler(): void {
    const panel = new OrderPanel();
    panel.show().then(result => {
      alert(result.toString());
    });
  }

  public render(): React.ReactElement<IDiDemoProps> {
    return (
      <div className={styles.diDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <PrimaryButton text='Test' onClick={this._testHandler} />
            </div>
            <div className={styles.column}>
              <PrimaryButton text='Add Order' onClick={this._showOrderPanelHandler} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnResult}>
              {this.state.result}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
