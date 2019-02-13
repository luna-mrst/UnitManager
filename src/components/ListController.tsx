import * as React from 'react';
import ListControllerProps from '../props/ListControllerProps';
import UnitModel from '../models/UnitModel';

export default function ListController(props: ListControllerProps): JSX.Element {
  const filters = { NONE: 'none', RARE3: '3', RARE4: '4', RARE5: '5', MEMO: 'memo' };
  const [condition, setCondition] = React.useState(filters.NONE);
  const [word, setWord] = React.useState('');
  const handleChangeFilter = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(evt.currentTarget.value);
    const filterFunc = (() => {
      switch (evt.currentTarget.value) {
        case filters.RARE3:
        case filters.RARE4:
        case filters.RARE5:
          return (unit: UnitModel) => unit.rare === parseInt(evt.currentTarget.value);
        case filters.MEMO:
          return (unit: UnitModel) => unit.memo.indexOf(word) >= 0;
        default:
          return () => true;
      }
    })();
    props.handleChangeFilter(filterFunc);
  };

  return (
    <div className="listController">
      <button onClick={props.handleClickSave}>保存</button>
      <button onClick={props.handleClickExport}>エクスポート</button>
      <button onClick={props.handleClickImport}>インポート</button>
      <span className="filter">
        フィルタ：
          <select value={condition} onChange={handleChangeFilter}>
          <option value={filters.NONE}>なし</option>
          <option value={filters.RARE3}>★3</option>
          <option value={filters.RARE4}>★4</option>
          <option value={filters.RARE5}>★5</option>
          <option value={filters.MEMO}>メモ</option>
        </select>
        <input
          type="text"
          value={word}
          disabled={condition !== filters.MEMO}
          onChange={e => setWord(e.currentTarget.value)}
          onBlur={() => props.handleChangeFilter((unit: UnitModel) => unit.memo.indexOf(word) >= 0)}
        />
      </span>
    </div>
  );
}
