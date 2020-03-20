import * as ReactDOM from 'react-dom';
import { Panel, ChoiceGroup, autobind, PanelType, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react';
//import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { OrderChoicesComponent } from './OrderChoicesComponents';

export enum PanelResultEnum {
  Cancel = 0,
  Ok = 1
}


export class OrderPanel {
  protected _domElement: HTMLElement;
  protected _isOpen: boolean;
  protected _currentResolve: (result: PanelResultEnum) => void;

  constructor() {
    this._domElement = document.createElement('div');
  }


  @autobind
  protected renderFooterContent(): JSX.Element {
    const buttonStyles = { root: { marginRight: 8 } };
    return (
      <div>
        <PrimaryButton onClick={this._close.bind(this, PanelResultEnum.Ok)} styles={buttonStyles} text="Ok" />
        <DefaultButton onClick={this._close.bind(this, PanelResultEnum.Cancel)} text="Cancel" />
      </div>
    );
  }
  @autobind
  protected _renderPanel(): void {
    ReactDOM.render(<Panel
      headerText='Order'
      closeButtonAriaLabel='Close'
      isOpen={this._isOpen}
      onDismissed={this._close.bind(this, PanelResultEnum.Cancel)}
      onRenderFooterContent={this.renderFooterContent}
    >
      <OrderChoicesComponent />
    </Panel>
      , this._domElement);

  }

  protected onAfterClose(): void {
    ReactDOM.unmountComponentAtNode(this._domElement);
  }

  public show(): Promise<PanelResultEnum> {
    return new Promise<PanelResultEnum>((resolve, reject) => {
      this._isOpen = true;
      this._renderPanel();
      this._currentResolve = resolve;
    });
  }
  protected _close(panelResult: PanelResultEnum): void {
    this._isOpen = false;
    this._renderPanel();
    this.onAfterClose();
    if (this._currentResolve != null) {
      this._currentResolve(panelResult);
    }
  }
}
