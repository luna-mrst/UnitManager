import * as React from "react";
import UnitListProps from "../props/UnitListProps";
import Unit from "./Unit";

export default class UnitList extends React.Component<UnitListProps> {
  constructor(props: UnitListProps) {
    super(props);
  }

  render(): JSX.Element {
    const unitList: JSX.Element[] = this.props.units.reduce<JSX.Element[]>(
      (acm, unit, idx) => {
        if (unit.displayFlag)
          acm.push(
            <Unit
              key={idx}
              model={unit}
              handleChangeRare={this.props.handleChangeRare(idx)}
              handleChangeAwakening={this.props.handleChangeAwakening(idx)}
              handleInputLevel={this.props.handleInputLevel(idx)}
              handleInputMemo={this.props.handleInputMemo(idx)}
              handleClickRemove={this.props.handleClickRemove(idx)}
            />
          );
        return acm;
      },
      []
    );

    return (
      <div className="unitData">
        {unitList}
        <div className="add" onClick={this.props.handleClickAddUnit}>
        </div>
      </div>
    );
  }
}
