import * as React from 'react';
import UnitListProps from '../props/UnitListProps';
import Unit from './Unit';

export default class UnitList extends React.Component<UnitListProps> {
  constructor(props: UnitListProps) {
    super(props);
  }

  render(): JSX.Element {
    const unitList: JSX.Element[] = this.props.units.filter(unit => unit.displayFlag).map((unit, idx) =>
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

    return (
      <div className="unitData">
        {unitList}
        <div className="unit" onClick={this.props.handleClickAddUnit}>
          <span className="add" />
        </div>
      </div>
    );
  }
}