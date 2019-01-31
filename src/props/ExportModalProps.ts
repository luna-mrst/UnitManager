import UnitModel from '../models/UnitModel'
import StockModel from '../models/StockModel';

export default interface ExportModalProps {
  units: UnitModel[];
  stock: StockModel;
  isOpen: boolean;

  closeModal: () => void;
}