export default class StockModel {
    /** ★3覚醒書 */
    book3: number = 0;
    /** ★4覚醒書 */
    book4: number = 0;
    /** ★5覚醒書 */
    book5: number = 0;
    /** 所持メダル */
    medal: number = 0;
    /**
     * jsonから読み込んだデータをバリデートしてモデルを作成する関数
     * @param arg jsonから読み込んだanyオブジェクト
     */
    static fromAny(arg:any): StockModel {
        if (arg == null) throw "stock arguments is null";

        const book3 = arg.book3;
        if (!(typeof book3 === "number" && book3 >= 0)) {
          throw `book3 is invalid`;
        }
        const book4 = arg.book4;
        if (!(typeof book4 === "number" && book4 >= 0)) {
          throw "book4 is invalid";
        }
        const book5 = arg.book5;
        if (!(typeof book5 === "number" && book5 >= 0)) {
          throw "book5 is invalid";
        }
        const medal = arg.medal;
        if (!(typeof medal === "number" && medal >= 0)) {
          throw "medal is invalid";
        }
        return {
          book3: book3,
          book4: book4,
          book5: book5,
          medal: medal
        };
    }
}