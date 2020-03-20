import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Panel, ChoiceGroup, autobind, IChoiceGroupOption, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { TestImages } from '@uifabric/example-data';

import "reflect-metadata";
import { IOrderService, mainContainer, TYPES } from '../../services';
import { PropertyInject, InjectAutoInit } from '@ezcode/spfx-di/lib';
import { IOrderListItem } from '../../services/order/IOrderListItem';

export interface IOrderChoicesComponentProps {
  //onSelectTemplate: (template: IPageTemplate) => void;
}
export interface IOrderChoicesComponentState {
  //pageTemplates: IPageTemplate[];
  orders: IOrderListItem[];
  orderOptions: IChoiceGroupOption[];
  selectedOrderOption: IChoiceGroupOption;
  loading: boolean;
}

@InjectAutoInit
export class OrderChoicesComponent extends React.Component<IOrderChoicesComponentProps, IOrderChoicesComponentState> {

  @PropertyInject({
    typeKey: TYPES.OrderService,
    container: mainContainer.Container
  })
  private _orderService: IOrderService;

  constructor(props) {
    super(props);
    this.state = {
      orders: undefined,
      selectedOrderOption: undefined,
      orderOptions: new Array<IChoiceGroupOption>(),
      loading: false
    };
  }

  public componentDidMount() {
    this.setState({ loading: true });
    this._orderService.getOrders()
      .then(result => {
        let templates: IChoiceGroupOption[] = result.map(item => {
          return {
            key: item.ID.toString(),
            //iconProps: { iconName: item.thumbnailImage },
            imageSrc: TestImages.choiceGroupPieUnselected,
            selectedImageSrc: TestImages.choiceGroupPieSelected,
            imageSize: { width: 32, height: 32 },
            text: item.Title
          };
        });
        this.setState({
          orders: result,
          orderOptions: templates,
          loading: false
        });
      });
  }

  @autobind
  private _choiceOnChanged(option: IChoiceGroupOption) {
    const selectedTemplate = this.state.orders.filter(item => item.ID.toString() == option.key);
    if (selectedTemplate.length == 1) {
      //this.props.onSelectTemplate(selectedTemplate[0]);
      this.setState({
        selectedOrderOption: option
      });
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.loading ?
          <Spinner size={SpinnerSize.large} label='loading...' />
          :
          <ChoiceGroup
            label='Select an order'
            selectedKey={this.state.selectedOrderOption != undefined ? this.state.selectedOrderOption.key : null}
            options={this.state.orderOptions != null ? this.state.orderOptions : null}
            onChanged={this._choiceOnChanged}
          />
        }
      </div>
    );
  }
}
