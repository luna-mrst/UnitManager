import * as React from 'react';
import StockProps from '../props/StockProps';

export default (props: StockProps): JSX.Element => {
  const [book3, setBook3] = React.useState(`${props.stock.book3}`);
  const [book4, setBook4] = React.useState(`${props.stock.book4}`);
  const [book5, setBook5] = React.useState(`${props.stock.book5}`);
  const [medal, setMedal] = React.useState(`${props.stock.medal}`);

  const handleChangeBook3 = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBook3(e.currentTarget.value);
  }, []);
  const handleBlurBook3 = React.useCallback(() => {
    const numValue = Math.max(0, parseInt(book3));
    setBook3(`${numValue}`);
    props.handleChangeBook3(numValue);
  }, [book3]);

  const handleChangeBook4 = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBook4(e.currentTarget.value);
  }, []);
  const handleBlurBook4 = React.useCallback(() => {
    const numValue = Math.max(0, parseInt(book4));
    setBook4(`${numValue}`);
    props.handleChangeBook4(numValue);
  }, [book4]);

  const handleChangeBook5 = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBook5(e.currentTarget.value);
  }, []);
  const handleBlurBook5 = React.useCallback(() => {
    const numValue = Math.max(0, parseInt(book5));
    setBook5(`${numValue}`);
    props.handleChangeBook5(numValue);
  }, [book5]);

  const handleChangeMedal = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMedal(e.currentTarget.value);
  }, []);
  const handleBlurMedal = React.useCallback(() => {
    const numValue = Math.max(0, parseInt(medal));
    setMedal(`${numValue}`);
    props.handleChangeMedal(numValue);
  }, [medal]);

  return (
    <div className="stock">
      <p>所持覚醒書</p>
      <label>★3：
        <input type="number"
          value={book3}
          min="0"
          onChange={handleChangeBook3}
          onBlur={handleBlurBook3} />
      </label>
      <label>★4：
        <input type="number"
          value={book4}
          onChange={handleChangeBook4}
          onBlur={handleBlurBook4} />
      </label>
      <label>★5：
        <input type="number"
          value={book5}
          onChange={handleChangeBook5}
          onBlur={handleBlurBook5} />
      </label>
      <label>所持メダル：
        <input type="number"
          value={medal}
          onChange={handleChangeMedal}
          onBlur={handleBlurMedal} />
      </label>
    </div>
  );
}
