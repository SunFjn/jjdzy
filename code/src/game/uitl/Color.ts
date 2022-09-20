class Color {
	public constructor() {
	}
	public static disabled = [new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0])];
	public static BLACKBORDER: Array<egret.Filter> = [new egret.GlowFilter(0, 1, 1, 1)];
	public static FILTER_GREEN: Array<egret.Filter> =[new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 100, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0])];

	public static QUALITYCOLOR = [0xf1f1f1, 0xf1f1f1, 0x15f234, 0x3ba5ff, 0xda2bfa, 0xFFC344, 0xed1414, 0xed1414, 0xed1414];
	public static QUALITYCOLORH = ["#f1f1f1", "#f1f1f1", "#15f234", "#3ba5ff", "#da2bfa", "#FFC344", "#ed1414", "#ed1414", "#ed1414"];

	public static YELLOWINT = 0xffea00;
	public static GREYINT = 0xa09dad;
	public static GREENINT = 0x33dd33;
	public static REDINT = 0xee3333;
	public static BLURINT = 0x37c9ff;
	public static TEXTINT = 0xdfd1b5;
	public static WHITEINT = 0xf1f1f1;

	public static WHITESTR = "#f1f1f1";
	public static GREENSTR = "#15f234";
	public static BLUESTR = "#3ba5ff";
	public static PURPLESTR = "#FF00FF";
	public static YELLOWSTR = "#FFC344";
	public static REDSTR = "#ed1414";
	public static TEXTSTR = "#DFD1B5"; //字体 米色
	public static TEXT_WHITE = "#FFFFFF"; //字体 白色
	public static TEXT_YELLOW = "#ffc334"; //字体 米黄色

	/**白色 */
	public static WHITE = 1;
	/**绿色 */
	public static GREEN = 2;
	/**蓝色 */
	public static BLUE = 3;
	/**紫色 */
	public static PURPLE = 4;
	/**橙色 */
	public static ORANGE = 5;
	/**红色 */
	public static RED = 6;

	public static getColorInt(color: number): number {
		var cl = 0xFFFFFF;
		if (Color.QUALITYCOLOR.length > color) {
			cl = Color.QUALITYCOLOR[color];
		}
		return cl;
	}

	public static getColorStr(color: number): string {
		var str = "#f1f1f1";
		if (Color.QUALITYCOLORH.length > color) {
			str = Color.QUALITYCOLORH[color];
		}
		return str;
	}
	private static _colorName = ["", "白", "绿", "蓝", "紫", "橙", "红", "", "彩"];
	public static getColorName(color: number) {
		return Color._colorName[color] ? Color._colorName[color] : ""
	}

	public static colorMatrix = [
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0, 0, 0, 1, 0
	];

}
