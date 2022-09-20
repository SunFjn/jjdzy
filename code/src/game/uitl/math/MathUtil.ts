class MathUtil {
	public constructor() {
	}

	public static rndNum(min: number, max: number): number {
		return min + Math.random() * (max - min);
	}

	public static rndLength(dir: number, length: number, min: number, max: number): number {
		if (dir == 1) {
			var left = length - min;
			return left + min + Math.random() * (max - min);
		} else {
			var left = min - length;
			return left - min + Math.random() * (min - max);
		}
	}

	public static dist(x1: number, y1: number, x2: number, y2: number): number {
		var ret: number;
		ret = Math.abs(((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
		ret = Math.ceil(ret);
		return ret;
	}

	/**
     * 随机抽出数组中的一个元素
     * @static
     * @param {any[]} pArray 
     * @returns {*} 
     * @memberof MathUtil
     */
    public static randomElement(pArray:any[]):any
    {
        return pArray[Math.floor(Math.random()*pArray.length)];
    }

}