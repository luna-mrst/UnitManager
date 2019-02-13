import * as React from "react";
import * as ReactModal from "react-modal";
import ImportModalProps from "../props/ImportModalProps";
import UnitModel from "../models/UnitModel";
import StockModel from "../models/StockModel";
import { modalStyles } from "../models/ModalStyles";

export default function ImportModal(props: ImportModalProps): JSX.Element {
  const [importText, setImportText] = React.useState('');
  const loadData = () => {
    try {
      const { units, stock } = JSON.parse(importText);
      if (!(units instanceof Array) || !(stock instanceof Object)) {
        throw 'input is invalid';
      }
      props.loadData({
        units: units.map(v => UnitModel.fromAny(v)),
        stock: StockModel.fromAny(stock)
      });
      setImportText('');
      props.closeModal();
    } catch (e) {
      alert("なんか入力値おかしいかもね？");
      setImportText('');
      return;
    }
  }

  return (
    <ReactModal isOpen={props.isOpen} style={modalStyles}>
      <div>
        <textarea
          value={importText}
          onChange={e => setImportText(e.currentTarget.value)}
        />
      </div>
      <p className="buttons">
        <button onClick={loadData}>読み込む</button>
        <button onClick={props.closeModal}>閉じる</button>
      </p>
    </ReactModal>
  );
}
