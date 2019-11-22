import React from 'react';
import { NumberInputPane, NumberInputProps, ChangeHandler, DeleteHandler } from './NumberInputPane';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement((props: NumberInputProps) => {
  return (
    <NumberInputPane
      order={props.order}
      value={props.value}
      changeHandler={props.changeHandler}
      deleteHandler={props.deleteHandler}
    />
  );
});

export interface SotableListProps {
  values: Array<number>;
  changeHandler: ChangeHandler;
  deleteHandler: DeleteHandler;
}

export const SortableList = SortableContainer((props: SotableListProps) => {
  return (
    <ul>
      {props.values.map((v, index) => {
        return (
          <SortableItem
            key={`item-${index}`}
            index={index}
            order={index}
            value={v}
            changeHandler={props.changeHandler}
            deleteHandler={props.deleteHandler}
          />
        );
      })}
    </ul>
  );
});
