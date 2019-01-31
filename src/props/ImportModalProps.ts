import UnitModel from "../models/UnitModel";
import StockModel from "../models/StockModel";

export default interface ImportModalProps {
  isOpen: boolean;

  closeModal: () => void;
  loadData: (loadData: { units: UnitModel[], stock: StockModel }) => void;
}
