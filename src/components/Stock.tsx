import * as React from 'react';
import StockProps from '../props/StockProps';

export default function Stock(props: StockProps): JSX.Element {
  return (
    <div className="stock">
      <p>所持覚醒書</p>
      <label>★3：
        <input type="number"
          value={props.stock.book3}
          onChange={e => props.handleChangeBook3(!e.currentTarget.value ? 0 : parseInt(e.currentTarget.value))} />
      </label>
      <label>★4：
        <input type="number"
          value={props.stock.book4}
          onChange={e => props.handleChangeBook4(!e.currentTarget.value ? 0 : parseInt(e.currentTarget.value))} />
      </label>
      <label>★5：
        <input type="number"
          value={props.stock.book5}
          onChange={e => props.handleChangeBook5(!e.currentTarget.value ? 0 : parseInt(e.currentTarget.value))} />
      </label>
      <label>所持メダル：
        <input type="number"
          value={props.stock.medal}
          onChange={e => props.handleChangeMedal(!e.currentTarget.value ? 0 : parseInt(e.currentTarget.value))} />
      </label>
    </div>
  );
}
