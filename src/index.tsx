import * as React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { changeHandler, deleteHandler } from './components/input_pane';
import { SortableList } from './components/id_list';
import { SortEndHandler } from 'react-sortable-hoc';
import arrayMove from 'array-move';

interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  values: Array<number>;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      values: props.sdk.field.getValue() || [1,2,3,4]
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
  
  appryStateToField() {
    this.props.sdk.field.setValue(this.state.values);
  }

  onExternalChange = (values: Array<number>) => {
    this.setState({ values });
  };

  onChange:changeHandler = (index, value) => {
    this.state.values[index] = value;
    this.setState((items) => ({
      values: this.state.values
    }))
    this.appryStateToField();
  };

  onDelete:deleteHandler = (index) => {
    this.setState((items) => ({
      values: this.state.values.splice(index, 1)
    }))
    this.appryStateToField();
  };

  onSortEnd:SortEndHandler = ({oldIndex, newIndex}) => {
    this.setState((items) => ({
      values: arrayMove(this.state.values, oldIndex, newIndex),
    }));
    this.appryStateToField();
  };


  render = () => {
    return (
      <SortableList
      values={this.state.values}
      onSortEnd={this.onSortEnd}
      deleteHandler={this.onDelete}
      changeHandler={this.onChange}
      />
    );
  };
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});