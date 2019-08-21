import * as React from 'react';
import { NumberInputPane, NumberInputProps, changeHandler, deleteHandler } from './input_pane'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const consoleLog = (hoge:string) => {
  let v = document.createElement('div');
  v.textContent = hoge;
  let p = document.getElementById('root')
  if(p != null){
    p.appendChild(v);
  }
};

const SortableItem = SortableElement(
  (value:NumberInputProps) => <NumberInputPane
                                              index={value.index}
                                              value={value.value}
                                              changeHandler={value.changeHandler}
                                              deleteHandler={value.deleteHandler}/>);

export interface SotableListProps {
  values: Array<number>,
  changeHandler:changeHandler,
  deleteHandler:deleteHandler
}

export const SortableList = SortableContainer((props:SotableListProps) => {
  consoleLog(props.values.toString());
  return (
    <ul>
      {props.values.map((v, index) => (
        <SortableItem 
          key={`item-${index}`}
          index={index} value={v}
          changeHandler={props.changeHandler}
          deleteHandler={props.deleteHandler}
        />
      ))}
    </ul>
  );
});

