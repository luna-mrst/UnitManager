import * as React from "react";
import UnitListProps from "../props/UnitListProps";
import Unit from "./Unit";

export default function UnitList(props: UnitListProps): JSX.Element {
  const unitList: JSX.Element[] = props.units.reduce<JSX.Element[]>(
    (list, unit, idx) => {
      if (unit.displayFlag)
        list.push(
          <Unit
            key={idx}
            model={unit}
            handleChangeRare={props.handleChangeRare(idx)}
            handleChangeAwakening={props.handleChangeAwakening(idx)}
            handleInputLevel={props.handleInputLevel(idx)}
            handleInputMemo={props.handleInputMemo(idx)}
            handleClickRemove={props.handleClickRemove(idx)}
          />
        );
      return list;
    },
    []
  );

  return (
    <div className="unitData">
      {unitList}
      <div className="add" onClick={props.handleClickAddUnit}>
      </div>
    </div>
  );
}
