export default interface InfoProps {
    /** ★3覚醒書 */
    book3: number;
    /** ★4覚醒書 */
    book4: number;
    /** ★5覚醒書 */
    book5: number;
    /** 必要メダル */
    medalCount: number;
    /** 蕾総数 */
    budCount: number;
    /** 花総数 */
    flowerCount: number;
    /** レアゴル費用 */
    scoutCost: number;
    /** レベル上げ費用 */
    levelUpCost: number;
    /** 15覚醒換算で何回進化させるか */
    evolCount: number;
}