import * as React from 'react';
import UnitProps from '../props/UnitProps';
import Dropdown from './Dropdown';

export default class Unit extends React.Component<UnitProps>{
  readonly values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

  constructor(props: UnitProps) {
    super(props);
  }

  render(): JSX.Element {
    // const options: JSX.Element[] = new Array(16).fill(0).map((v, i) => <option key={i} value={i}>{i}</option>)
    const rare: JSX.Element[] = [3, 4, 5].map(v =>
      <label key={v} className={`rare${this.props.model.rare === v ? ' checked' : ''}`}>
        <input type="radio" name="rare" value={v}
          onChange={() => this.props.handleChangeRare(v)} checked={this.props.model.rare === v} />★{v}
      </label>
    );

    return (
      <form>
        <div className="unit">
          <span className="close" onClick={this.props.handleClickRemove}></span>
          <div className="control">
            <p>レアリティ</p>
            <p>
              {rare}
            </p>
          </div>
          <div className="control">
            <p>現在の覚醒数：
              <Dropdown
                values={this.values}
                selected={this.props.model.awakening}
                handleChangeSelection={this.props.handleChangeAwakening}
              />
              {/* <select
                name="kakusei"
                value={this.props.model.awakening}
                onChange={e => this.props.handleChangeAwakening(parseInt(e.currentTarget.value))}>
                {options}
              </select> */}
            </p>
          </div>
          <div className="control">
            <p>
              現在のレベル：<input
                type="number"
                value={this.props.model.level}
                min="1"
                max={95 + this.props.model.rare * 10}
                step="1"
                onChange={e => this.props.handleInputLevel(parseInt(e.currentTarget.value))}
              />
            </p>
          </div>
          <div className="control">
            <p>メモ</p>
            <textarea value={this.props.model.memo} onChange={e => this.props.handleInputMemo(e.currentTarget.value)} />
          </div>
        </div>
      </form>
    );
  }
}