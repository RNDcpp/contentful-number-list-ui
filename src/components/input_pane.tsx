import * as React from 'react';
import { render } from 'react-dom';
import { TextInput, Button } from '@contentful/forma-36-react-components';
export type changeHandler = (index:number, value:number) => void;
export type deleteHandler = (index:number) => void;
export interface NumberInputProps {
  index: number,
  value: number,
  changeHandler: (index:number, value:number)=>void,
  deleteHandler: (index:number)=>void
}
export interface NumberInputState{
  value: number
}

export class NumberInputPane extends React.Component<NumberInputProps, NumberInputState> {
  constructor(props: NumberInputProps) {
    super(props);
    this.state = {value: this.props.value};
  }

  detachExternalChangeHandler: Function | null = null;

  onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.props.deleteHandler(this.props.index);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value:number = parseInt(e.currentTarget.value, 10);
    this.props.changeHandler(this.props.index, this.props.value);
  };

  render = () => {
    return (
      <div>
        <TextInput
          width="large"
          type="number"
          value={this.state.value.toString()}
          onChange={this.onChange}
        />
        <Button
          onClick={this.onClick}
        />
      </div>
    );
  };
}