import Stock from '../models/StockModel'

export default interface StockProps {
    stock: Stock;

    handleChangeBook3: (value: number) => void;
    handleChangeBook4: (value: number) => void;
    handleChangeBook5: (value: number) => void;
    handleChangeMedal: (value: number) => void;
}