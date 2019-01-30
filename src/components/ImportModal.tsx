import * as React from "react";
import * as ReactModal from "react-modal";
import ImportModalProps from "../props/ImportModalProps";
import ImportModalState from "../props/ImportModalState";
import UnitModel from "../models/UnitModel";

export default class ImportModal extends React.Component<
  ImportModalProps,
  ImportModalState
> {
  readonly styles = {
    content: {
      position: undefined,
      top: undefined,
      left: undefined,
      right: undefined,
      bottom: undefined,
      border: undefined,
      background: undefined,
      overflow: undefined,
      borderRadius: undefined,
      padding: undefined
    }
  };

  constructor(props: ImportModalProps) {
    super(props);
    this.state = {
      importText: ""
    };

    this.loadData = this.loadData.bind(this);
    this.handleChangeImport = this.handleChangeImport.bind(this);
  }

  loadData(): void {
    let jsonData;

    try {
      jsonData = JSON.parse(this.state.importText);
    } catch (e) {
      this.loadError();
      return;
    }
    if (!(jsonData instanceof Array)) {
      this.loadError();
      return;
    }

    let errFlg = false;
    const units = jsonData.reduce<UnitModel[]>((a, v) => {
      if (errFlg) return a;

      const unit = new UnitModel();

      const rare = v["rare"];
      unit.rare =
        typeof rare === "number" && 3 <= rare && rare <= 5
          ? rare
          : ((errFlg = true), 0);
      const awakening = v["awakening"];
      unit.awakening =
        typeof awakening === "number" && 0 <= awakening && awakening <= 15
          ? awakening
          : ((errFlg = true), 0);
      const level = v["level"];
      unit.level =
        typeof level === "number" && 1 <= level && level <= 145
          ? level
          : ((errFlg = true), 0);
      const displayFlag = v["displayFlag"];
      unit.displayFlag =
        typeof displayFlag === "boolean" ? true : ((errFlg = true), true);
      const memo = v["memo"];
      unit.memo = typeof memo === "string" ? memo : ((errFlg = true), "");

      a.push(unit);
      return a;
    }, []);

    if (errFlg) {
      this.loadError();
      return;
    }
    this.props.loadData(units);
    this.setState({
      importText: ""
    });
    this.props.closeModal();
  }

  loadError(): void {
    alert("なんか入力値おかしいかもね？");
    this.setState({
      importText: ""
    });
  }

  handleChangeImport(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      importText: e.currentTarget.value
    });
  }

  render(): JSX.Element {
    return (
      <ReactModal isOpen={this.props.isOpen} style={this.styles}>
        <div>
          <textarea
            value={this.state.importText}
            onChange={this.handleChangeImport}
          />
        </div>
        <p className="buttons">
          <button onClick={this.loadData}>読み込む</button>
          <button onClick={this.props.closeModal}>閉じる</button>
        </p>
      </ReactModal>
    );
  }
}
