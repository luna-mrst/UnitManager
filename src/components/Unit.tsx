import * as React from 'react';
import UnitProps from '../props/UnitProps';

export default class Unit extends React.Component<UnitProps>{
  constructor(props: UnitProps) {
    super(props);
  }

  render(): JSX.Element {
    const options: JSX.Element[] = new Array(16).fill(0).map((v, i) => <option key={i} value={i}>{i}</option>)
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
              <select
                name="kakusei"
                value={this.props.model.awakening}
                onChange={e => this.props.handleChangeAwakening(parseInt(e.currentTarget.value))}>
                {options}
              </select>
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