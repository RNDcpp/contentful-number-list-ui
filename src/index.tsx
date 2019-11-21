import React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { ChangeHandler, DeleteHandler } from './components/NumberInputPane';
import { SortableList } from './components/SortableList';
import { SortEndHandler } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Button } from '@contentful/forma-36-react-components';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  values: Array<number>;
}

export class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = {
    values: this.props.sdk.field.getValue() ?? []
  };

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(() => void 0);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  appryStateToField(values: Array<number>) {
    this.props.sdk.field.setValue(values);
  }

  onChange: ChangeHandler = (index, value) => {
    const values = this.state.values;
    values[index] = value;
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  addValues = () => {
    const values = this.state.values;
    values.push(0);
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  onDelete: DeleteHandler = (index: number) => {
    const values = this.state.values;
    values.splice(index, 1);
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    const values = arrayMove(this.state.values, oldIndex, newIndex);
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  render = () => {
    return (
      <div className="container">
        <SortableList
          values={this.state.values}
          onSortEnd={this.onSortEnd}
          deleteHandler={this.onDelete}
          changeHandler={this.onChange}
          distance={10}
        />
        <Button
          className="add-pane-btn id-input-pane"
          buttonType="muted"
          size="large"
          onClick={this.addValues}>
          +
        </Button>
      </div>
    );
  };
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});
