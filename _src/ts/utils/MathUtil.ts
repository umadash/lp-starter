export class MathUtil {

    /**
     *  clamp
     * 
     *  valueを範囲min-maxに留める
     **/
    static clamp(value: number, min: number, max: number): number {
        if (value > max) return max;
        else if (value < min) return min;
        return value;
    }

    /**
     *  map
     * 
     *  valueを範囲minA-maxAからminB-maxBへ変換する
     **/
    static map(value: number, minA: number, maxA: number, minB: number, maxB: number): number {
        if (value < minA) {
            value = minA;
        } 
        else if (value > maxA) {
            value = maxA;
        }
        return (value - minA) * (maxB - minB) / (maxA - minA) + minB;
    }

    /**
     * 任意の桁で四捨五入する関数
     * @param {number} value 四捨五入する数値
     * @param {number} base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
     * @return {number} 四捨五入した値
     */
    static orgRound(value, base) {
        return Math.round(value * base) / base;
    }

    /**
     * 任意の桁で切り上げする関数
     * @param {number} value 切り上げする数値
     * @param {number} base どの桁で切り上げするか（10→10の位、0.1→小数第１位）
     * @return {number} 切り上げした値
     */
    static orgCeil(value, base) {
        return Math.ceil(value * base) / base;
    }

    /**
     * 任意の桁で切り捨てする関数
     * @param {number} value 切り捨てする数値
     * @param {number} base どの桁で切り捨てするか（10→10の位、0.1→小数第１位）
     * @return {number} 切り捨てした値
     */
    static orgFloor(value, base) {
        return Math.floor(value * base) / base;
    }

    static PI: number = Math.PI;
    static PI2: number = MathUtil.PI * 2;
    static PI_2: number = MathUtil.PI / 2;
    static PI_3: number = MathUtil.PI / 3;
    static PI_4: number = MathUtil.PI / 4;
    static PI_5: number = MathUtil.PI / 5;
}