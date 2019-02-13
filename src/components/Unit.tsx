import * as React from 'react';
import UnitProps from '../props/UnitProps';
import Dropdown from './Dropdown';

export default function Unit(props: UnitProps): JSX.Element {
  const values = React.useMemo(() => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], []);
  const rare = React.useMemo(() => [3, 4, 5].map(v =>
    <label key={v} className={`rare${props.model.rare === v ? ' checked' : ''}`}>
      <input type="radio" name="rare" value={v} onChange={() => props.handleChangeRare(v)}
        checked={props.model.rare === v} />★{v}
    </label>
  ), [props.model.rare]);

  return (
    <form>
      <div className="unit">
        <span className="close" onClick={props.handleClickRemove}></span>
        <div className="control">
          <p>レアリティ</p>
          <p>
            {rare}
          </p>
        </div>
        <div className="control">
          <div>現在の覚醒数：
            <Dropdown
              values={values}
              selected={props.model.awakening}
              handleChangeSelection={props.handleChangeAwakening}
            />
          </div>
        </div>
        <div className="control">
          <p>
            現在のレベル：<input
              type="number"
              value={props.model.level}
              min="1"
              max={95 + props.model.rare * 10}
              step="1"
              onChange={e => props.handleInputLevel(!e.currentTarget.value || e.currentTarget.value === '0'
                ? 1 : parseInt(e.currentTarget.value))}
            />
          </p>
        </div>
        <div className="control">
          <p>メモ</p>
          <textarea value={props.model.memo} onChange={e => props.handleInputMemo(e.currentTarget.value)} />
        </div>
      </div>
    </form>
  );
}
