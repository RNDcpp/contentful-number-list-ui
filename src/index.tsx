import React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { changeHandler, deleteHandler } from './components/input_pane';
import { SortableList } from './components/id_list';
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
  constructor(props: AppProps) {
    super(props);
    let initial_values = props.sdk.field.getValue();
    if (initial_values == null) {
      initial_values = [];
    }

    this.state = {
      values: initial_values
    };
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  appryStateToField(values: Array<number>) {
    this.props.sdk.field.setValue(values);
  }

  onExternalChange = (values: Array<number>) => {
    //this.setState({ values });
  };

  onChange: changeHandler = (index, value) => {
    let values = this.state.values;
    values[index] = value;
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  addValues = () => {
    let values = this.state.values;
    values.push(0);
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  onDelete: deleteHandler = index => {
    let values = this.state.values;
    values.splice(index, 1);
    this.setState({ values: values }, () => {
      this.appryStateToField(this.state.values);
    });
  };

  onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    let values = arrayMove(this.state.values, oldIndex, newIndex);
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
