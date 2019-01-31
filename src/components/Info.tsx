import * as React from 'react';
import InfoProps from '../props/InfoProps';

export default class Info extends React.Component<InfoProps> {
  constructor(props: InfoProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="info">
        <p>覚醒書総数： ★3={this.props.info.book3} ★4={this.props.info.book4} ★5={this.props.info.book5}</p>
        <p>必要メダル： {this.props.info.medalCount}枚 (15覚醒{this.props.info.evolCount}人分)</p>
        <p>素材総数： 蕾={this.props.info.budCount}個 花={this.props.info.flowerCount}個</p>
        <p>レアゴル費用： 約{this.props.info.scoutCost}ゴルド</p>
        <p>レベル上げ費用： {this.props.info.levelUpCost}ゴルド</p>
      </div>
    );
  }
}