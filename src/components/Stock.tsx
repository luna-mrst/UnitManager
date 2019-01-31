import * as React from 'react';
import StockProps from '../props/StockProps';

export default class Stock extends React.Component<StockProps> {
  constructor(props: StockProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="stock">
        <p>所持覚醒書</p>
        <label>★3：
          <input type="number"
            value={this.props.stock.book3}
            onChange={e => this.props.handleChangeBook3(parseInt(e.currentTarget.value))} />
        </label>
        <label>★4：
          <input type="number"
            value={this.props.stock.book4}
            onChange={e => this.props.handleChangeBook4(parseInt(e.currentTarget.value))} />
        </label>
        <label>★5：
          <input type="number"
            value={this.props.stock.book5}
            onChange={e => this.props.handleChangeBook5(parseInt(e.currentTarget.value))} />
        </label>
        <label>所持メダル：
          <input type="number"
            value={this.props.stock.medal}
            onChange={e => this.props.handleChangeMedal(parseInt(e.currentTarget.value))} />
        </label>
      </div>
    );
  }
}