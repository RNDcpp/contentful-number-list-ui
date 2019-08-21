import * as React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { changeHandler, deleteHandler } from './components/input_pane';
import { SortableList } from './components/id_list';
import { SortEndHandler } from 'react-sortable-hoc';
import arrayMove from 'array-move';
const consoleLog = (hoge:string) => {
  let v = document.createElement('div');
  v.textContent = hoge;
  let p = document.getElementById('root')
  if(p != null){
    p.appendChild(v);
  }
};
interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  values: Array<number>;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    consoleLog(props.sdk.field.getValue());
    this.state = {
      values: [1,2,3,4]
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
  
  appryStateToField(values:Array<number>) {
    consoleLog('applyField' + values);
    this.props.sdk.field.setValue(values);
  }

  onExternalChange = (values: Array<number>) => {
    //this.setState({ values });
  };

  onChange:changeHandler = (index, value) => {
    consoleLog('onChange');
    consoleLog('index:'+index + ', value:' + value);

    this.setState((prevState) => {
      let values = prevState.values;
      values[index] = value;
      this.appryStateToField(values);
      return { values: values };
    })
    
  };

  onDelete:deleteHandler = (index) => {
    consoleLog('onDelete');
    consoleLog('index:'+index);
    this.setState((prevState) => {
      let values = prevState.values.splice(index, 1);
      this.appryStateToField(values);
      return { values: values };
    })
  };

  onSortEnd:SortEndHandler = ({oldIndex, newIndex}) => {
    consoleLog('onSortEnd');
    this.setState((prevState) => {
      let values = arrayMove(prevState.values, oldIndex, newIndex);
      this.appryStateToField(values);
      return { values: values };
    });
  };


  render = () => {
    return (
      <SortableList
      values={this.state.values}
      onSortEnd={this.onSortEnd}
      deleteHandler={this.onDelete}
      changeHandler={this.onChange}
      distance={10}
      />
    );
  };
}

init(sdk => {
  consoleLog('init');
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});