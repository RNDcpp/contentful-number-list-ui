import React from 'react';
import { NumberInputPane, NumberInputProps, ChangeHandler, DeleteHandler } from './NumberInputPane';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement((props: NumberInputProps) => (
  <NumberInputPane
    index={props.index}
    value={props.value}
    changeHandler={props.changeHandler}
    deleteHandler={props.deleteHandler}
  />
));

export interface SotableListProps {
  values: Array<number>;
  changeHandler: ChangeHandler;
  deleteHandler: DeleteHandler;
}

export const SortableList = SortableContainer((props: SotableListProps) => {
  return (
    <ul>
      {props.values.map((v, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={v}
          changeHandler={props.changeHandler}
          deleteHandler={props.deleteHandler}
        />
      ))}
    </ul>
  );
});
