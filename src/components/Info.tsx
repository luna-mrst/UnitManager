import * as React from 'react';
import InfoProps from '../props/InfoProps';

export default class Info extends React.Component<InfoProps> {
  constructor(props: InfoProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="info">
        <p>覚醒書総数： ★3={this.props.book3} ★4={this.props.book4} ★5={this.props.book5}</p>
        <p>必要メダル： {this.props.medalCount}枚 (15覚醒{this.props.evolCount}人分)</p>
        <p>素材総数： 蕾={this.props.budCount}個 花={this.props.flowerCount}個</p>
        <p>レアゴル費用： 約{this.props.scoutCost}ゴルド <span style={{ color: 'red' }}>メンテ中だよ...！</span></p>
        <p>レベル上げ費用： {this.props.levelUpCost}ゴルド</p>
      </div>
    );
  }
}