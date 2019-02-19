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
  const maxLevel = props.model.rare * 10 + 95;

  const [memo, setMemo] = React.useState(props.model.memo);
  const [level, setLevel] = React.useState(`${props.model.level}`);
  const handleChangeMemo = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setMemo(e.currentTarget.value), []);
  const handleBlurMemo = React.useCallback(() => props.handleInputMemo(memo), [memo]);
  const handleChangeLevel = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLevel(e.currentTarget.value), []);
  const handleBlurLevel = React.useCallback(() => {
    const tmp = Math.min(maxLevel, Math.max(1, parseInt(level)));
    setLevel(`${tmp}`);
    props.handleInputLevel(Number.isNaN(tmp) ? 1 : tmp);
  }, [level, maxLevel]);

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
              value={level}
              min="1"
              max={maxLevel}
              step="1"
              onChange={handleChangeLevel}
              onBlur={handleBlurLevel}
            />
          </p>
        </div>
        <div className="control">
          <p>メモ</p>
          <textarea value={memo} onChange={handleChangeMemo} onBlur={handleBlurMemo} />
        </div>
      </div>
    </form>
  );
}
