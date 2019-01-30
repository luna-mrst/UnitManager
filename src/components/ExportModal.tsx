import * as React from "react";
import ExportModalProps from "../props/ExportModalProps";
import * as ReactModal from "react-modal";

export default class ExportModal extends React.Component<ExportModalProps> {
  data: HTMLTextAreaElement | null = null;
  div: HTMLDivElement | null = null;

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

  constructor(props: ExportModalProps) {
    super(props);

    this.copyText = this.copyText.bind(this);
  }

  copyText(): void {
    if (this.div == null) return;
    const range = document.createRange();
    range.selectNode(this.div);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    alert('コピーしたよ〜');
  }

  render(): JSX.Element {
    const textData = JSON.stringify(this.props.units, (key, value) =>
      key === "displayFlag" ? true : value
    );
    return (
      <ReactModal isOpen={this.props.isOpen} style={this.styles}>
        <div className="export" ref={div => (this.div = div)}>{textData}</div>
        <p className="buttons">
          <button onClick={this.copyText}>コピーする</button>
          <button onClick={this.props.closeModal}>閉じる</button>
        </p>
      </ReactModal>
    );
  }
}
