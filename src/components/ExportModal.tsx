import * as React from "react";
import ExportModalProps from "../props/ExportModalProps";
import * as ReactModal from "react-modal";
import { modalStyles } from "../models/ModalStyles";

export default function ExportModal(props: ExportModalProps): JSX.Element {
  const displayAreaRef = React.useRef<HTMLDivElement>(null);
  const copyText: () => void = () => {
    const div = displayAreaRef.current
    if (div == null) return;
    const range = document.createRange();
    range.selectNode(div);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    alert("コピーしたよ〜");
  };
  const textData = JSON.stringify(
    { units: props.units, stock: props.stock },
    (key, value) => (key === "displayFlag" ? true : value)
  );

  return (
    <ReactModal isOpen={props.isOpen} style={modalStyles}>
      <div className="export" ref={displayAreaRef}>
        {textData}
      </div>
      <p className="buttons">
        <button onClick={copyText}>コピーする</button>
        <button onClick={props.closeModal}>閉じる</button>
      </p>
    </ReactModal>
  );

}

// export default class ExportModal extends React.Component<ExportModalProps> {
//   div: HTMLDivElement | null = null;

//   readonly styles = {
//     content: {
//       position: undefined,
//       top: undefined,
//       left: undefined,
//       right: undefined,
//       bottom: undefined,
//       border: undefined,
//       background: undefined,
//       overflow: undefined,
//       borderRadius: undefined,
//       padding: undefined
//     }
//   };

//   constructor(props: ExportModalProps) {
//     super(props);

//     this.copyText = this.copyText.bind(this);
//   }

//   copyText(): void {
//     if (this.div == null) return;
//     const range = document.createRange();
//     range.selectNode(this.div);
//     window.getSelection().addRange(range);
//     document.execCommand("copy");
//     alert("コピーしたよ〜");
//   }

//   render(): JSX.Element {
//     const textData = JSON.stringify(
//       { units: this.props.units, stock: this.props.stock },
//       (key, value) => (key === "displayFlag" ? true : value)
//     );
//     return (
//       <ReactModal isOpen={this.props.isOpen} style={this.styles}>
//         <div className="export" ref={div => (this.div = div)}>
//           {textData}
//         </div>
//         <p className="buttons">
//           <button onClick={this.copyText}>コピーする</button>
//           <button onClick={this.props.closeModal}>閉じる</button>
//         </p>
//       </ReactModal>
//     );
//   }
// }
