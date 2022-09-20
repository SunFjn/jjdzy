/**角色属性 shuxing_300*/
class Vo_attr {
	public constructor() {
	}
	//******计算战力属性*******//

	/**获取属性名称 */
	public static getAttLeiXing(type): number {
		// var leixing = 0;
		// var lib = Config.jssx_002;
		// if (lib[type]) {
		// 	leixing = lib.leixing
		// }
		// return leixing;
		return 0;
	}

	/**获取属性名称 */
	public static getAttrName(type): string {
		var name = "";
		if (Config.jssx_002[type]) {
			name = Config.jssx_002[type].name;
		}
		return name;
	}

	public static getShowStr(id: number, value: number, str: string = "+", ATTColor?: string, valColor?: string): string {
		let val: string = "";
		let type = Config.jssx_002[id].type;
		let name: string = "";
		switch (type) {
			case 1:
				val = value + "";
				break;
			case 2:
				val = (value / 1000) + "%";
				break;
		}
		name = Vo_attr.getAttrName(id);
		if (ATTColor) {
			name = HtmlUtil.fontNoSize(name, ATTColor);
		}
		if (valColor) {
			val = HtmlUtil.fontNoSize(val, valColor);
		}
		let ret: string = name + str + val;
		return ret;
	}

	public static getRealNum(id: number, value: number): number {
		let type = Config.jssx_002[id].type
		switch (type) {
			case 1:
				break;
			case 2:
				value = (value / 100000);
				break;
		}
		return value;
	}
}