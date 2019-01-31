import * as React from "react";
import * as ReactModal from "react-modal";
import ImportModalProps from "../props/ImportModalProps";
import ImportModalState from "../props/ImportModalState";
import UnitModel from "../models/UnitModel";
import StockModel from "../models/StockModel";
import { object } from "prop-types";

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

    let ret: { units: UnitModel[]; stock: StockModel };

    try {
      if (jsonData instanceof Array) {
        // Stock未実装時に保存された値
        ret = { units: this.loadUnits(jsonData), stock: new StockModel() };
      } else {
        ret = {
          units: this.loadUnits(jsonData["units"]),
          stock: this.loadStock(jsonData["stock"])
        };
      }
    } catch (e) {
      console.log(e);
      this.loadError();
      return;
    }

    this.props.loadData(ret);
    this.setState({
      importText: ""
    });
    this.props.closeModal();
  }

  loadUnits(data: any[]): UnitModel[] {
    if (data == null) throw "units arguments is null";

    let errFlg = false;
    const units = data.reduce<UnitModel[]>((a, v) => {
      if (errFlg) return a;

      const unit = new UnitModel();
      const rare = v.rare;
      unit.rare =
        typeof rare === "number" && 3 <= rare && rare <= 5
          ? rare
          : ((errFlg = true), 0);
      const awakening = v.awakening;
      unit.awakening =
        typeof awakening === "number" && 0 <= awakening && awakening <= 15
          ? awakening
          : ((errFlg = true), 0);
      const level = v.level;
      unit.level =
        typeof level === "number" && 1 <= level && level <= 145
          ? level
          : ((errFlg = true), 0);
      const displayFlag = v.displayFlag;
      unit.displayFlag =
        typeof displayFlag === "boolean" ? true : ((errFlg = true), true);
      const memo = v.memo;
      unit.memo = typeof memo === "string" ? memo : ((errFlg = true), "");

      a.push(unit);
      return a;
    }, []);

    if (errFlg) throw "units parameter error";
    return units;
  }

  loadStock(stock: any): StockModel {
    if (stock == null) throw "stock arguments is null";

    const book3 = stock.book3;
    if (!(typeof book3 === "number" && book3 >= 0)) {
      throw `book3 err typeof: ${typeof book3}`;
    }
    const book4 = stock.book4;
    if (!(typeof book4 === "number" && book4 >= 0)) {
      throw "book4 err";
    }
    const book5 = stock.book5;
    if (!(typeof book5 === "number" && book5 >= 0)) {
      throw "book5 err";
    }
    const medal = stock.medal;
    if (!(typeof medal === "number" && medal >= 0)) {
      throw "medal err";
    }
    return {
      book3: book3,
      book4: book4,
      book5: book5,
      medal: medal
    };
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
