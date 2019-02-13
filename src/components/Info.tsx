import * as React from 'react';
import InfoProps from '../props/InfoProps';

export default function Info(props: InfoProps): JSX.Element {
  return (
    <div className="info">
      <p>覚醒書総数： ★3={props.info.book3} ★4={props.info.book4} ★5={props.info.book5}</p>
      <p>必要メダル： {props.info.medalCount}枚 (15覚醒{props.info.evolCount}人分)</p>
      <p>素材総数： 蕾={props.info.budCount}個 花={props.info.flowerCount}個</p>
      <p>レアゴル費用： 約{props.info.scoutCost}ゴルド</p>
      <p>レベル上げ費用： {props.info.levelUpCost}ゴルド</p>
    </div>
  );
}