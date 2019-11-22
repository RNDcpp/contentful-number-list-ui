import React from 'react';
import { TextInput, Button } from '@contentful/forma-36-react-components';

export type ChangeHandler = (index: number, value: number) => void;
export type DeleteHandler = (index: number) => void;

export interface NumberInputProps {
  /**
   * the "index" prop is reserved by react-sortable-hoc
   */
  order: number;
  value: number;
  changeHandler: ChangeHandler;
  deleteHandler: DeleteHandler;
}

export interface NumberInputState {
  value: number;
}

export class NumberInputPane extends React.Component<NumberInputProps, NumberInputState> {
  readonly state = {
    value: this.props.value
  };

  onClick = () => {
    this.props.deleteHandler(this.props.order);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value, 10);
    this.props.changeHandler(this.props.order, value);
  };

  render = () => {
    return (
      <li className="id-input-pane">
        <TextInput
          className="id-number-input"
          width="full"
          type="number"
          value={this.props.value.toString()}
          onChange={this.onChange}
        />
        <Button buttonType="muted" size="large" onClick={this.onClick}>
          delete
        </Button>
      </li>
    );
  };
}
