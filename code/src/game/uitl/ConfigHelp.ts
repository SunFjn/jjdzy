class ConfigHelp {
	public constructor() {
	}

	private static chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	private static chnUnitChar = ["", "十", "百", "千"];
	private static chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
	public static NumberToChinese(num) {
		num = Number(num);
		var unitPos = 0;
		var strIns = '', chnStr = '';
		var needZero = false;
		if (num === 0) {
			return this.chnNumChar[0];
		}
		while (num > 0) {
			var section = num % 10000;
			if (needZero) {
				chnStr = this.chnNumChar[0] + chnStr;
			}
			strIns = this.SectionToChinese(section);
			strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
			chnStr = strIns + chnStr;
			needZero = (section < 1000) && (section > 0);
			num = Math.floor(num / 10000);
			unitPos++;
		}
		//10 - 10W - 10亿 切掉第一个1
		if (chnStr[0] == "一" && chnStr[1] == "十") chnStr = chnStr.slice(1, chnStr.length);
		return chnStr;
	}
	private static SectionToChinese(section) {
		var strIns = '', chnStr = '';
		var unitPos = 0;
		var zero = true;
		while (section > 0) {
			var v = section % 10;
			if (v === 0) {
				if (!zero) {
					zero = true;
					chnStr = this.chnNumChar[v] + chnStr;
				}
			} else {
				zero = false;
				strIns = this.chnNumChar[v];
				strIns += this.chnUnitChar[unitPos];
				chnStr = strIns + chnStr;
			}
			unitPos++;
			section = Math.floor(section / 10);
		}
		return chnStr;
	}

	public static numToStr(num: number): string {
		num = Number(num);
		var str = num.toFixed(0);
		if (num >= 100000000) {
			var n = num % 100000000;
			if (n >= 1000000) {//多余百万
				n = n % 10000000;
				if (n >= 1000000) str = Math.floor((num / 100000000) * 100) / 100 + "";
				else str = Math.floor((num / 100000000) * 10) / 10 + "";
			} else {
				str = (num / 100000000).toFixed(0);
			}
			str += "亿";
		} else if (num >= 10000) {
			var n = num % 10000;
			if (n >= 1000) {
				str = Math.floor((num / 10000) * 100) / 100 + "";
			} else {
				str = (num / 10000).toFixed(0);
			}
			str += "万";
		}
		return str;
	}

	/**解析物品套字节内容
	 * 必须符合以下格式
	 * [B,I,I]
	 */
	public static parseItemListBa(ba: BaseBytes): IGridImpl[] {
		var ret = [];
		for (var i = 0, len = ba.readShort(); i < len; i++) {
			ret.push(ConfigHelp.parseItemBa(ba));
		}
		return ret;
	}

	public static parseItemBa(ba: BaseBytes): IGridImpl {
		var type = ba.readByte();
		var id = ba.readInt();
		var count = ba.readInt();
		var vo: IGridImpl;
		if (type == Enum_Attr.EQUIP) {
			vo = VoEquip.create(id);
		} else if (type == Enum_Attr.ITEM) {
			vo = VoItem.create(id);
		} else {//货币
			vo = Vo_Currency.create(type);
		}
		vo.count = count;
		return vo;
	}

	/**解析奖励[[1,4001,2],[2,90001,1]] */
	public static makeItemListArr(info: any): IGridImpl[] {
		if (typeof (info) == "string")
			info = JSON.parse(<any>info);
		var list: IGridImpl[] = [];
		var vo: IGridImpl;
		for (var i = 0; i < info.length; i++) {
			var rw = info[i];
			if (parseInt(rw[0]) == Enum_Attr.EQUIP) {//装备
				vo = VoEquip.create(parseInt(rw[1]));
			} else if (parseInt(rw[0]) == Enum_Attr.ITEM) {//道具
				vo = VoItem.create(parseInt(rw[1]));
			} else {//货币
				vo = Vo_Currency.create(rw[0]);
			}
			if (vo) {
				vo.count = parseInt(rw[2]);
				list.push(vo);
			}
		}
		return list;
	}

	public static getYiWanText(v: number): string {
		if (v >= 100000000) {
			return (v / 100000000).toFixed(2) + "亿"
		} else if (v >= 100000) {
			if ((v % 10000) / 1000 >= 1)
				return (v / 10000).toFixed(2) + "万";
			else
				return (v / 10000).toFixed(0) + "万";
		}
		return String(v);
	}

	/**解析一个奖励 1,4001,2*/
	public static makeItem(info: any[]): IGridImpl {
		var vo: IGridImpl;
		var type = parseInt(info[0]);
		var id = parseInt(info[1]);
		var count = parseInt(info[2]);
		if (type == Enum_Attr.ITEM) {
			vo = VoItem.create(id);
		} else if (type == Enum_Attr.EQUIP) {
			vo = VoEquip.create(id);
		} else if (type > 0) {//货币
			vo = Vo_Currency.create(type);
		}
		if (vo) {
			vo.count = count;
		}
		return vo;
	}

	public static makeItemRewardText(content: string, gap: string = "\n", attrformat = "*", color = false): string {
		var ret: string = "";
		// var list = ConfigHelp.makeItemList(content);
		var list = JSON.parse(content);
		for (var i = 0; i < list.length; i++) {
			if (i != 0) {
				ret += gap;
			}
			if (list[i][0] == Enum_Attr.ITEM || list[i][0] == Enum_Attr.EQUIP) {
				ret += ConfigHelp.getItemColorName(list[i][1], color) + attrformat + list[i][2];
			} else {
				var attName: string = Vo_attr.getAttrName(list[i][0]);
				var type: number = Vo_attr.getAttLeiXing(list[i][0]);
				if (type == 2) {
					ret += attName + attrformat + Number(list[i][2]) / 100 + "%";
				} else {
					ret += attName + attrformat + list[i][2];
				}
			}
		}
		return ret;
	}

	public static getItemColorName(id: number, isColor = true): string {
		var itemName: string = id + "";
		var lib = Config.daoju_204;
		var elib = Config.zhuangbei_204;
		if (lib[id]) {
			itemName = lib[id].name;
			if (isColor) {
				var color: string = Color.QUALITYCOLORH[lib[id].quality];
				return "<font color='" + color + "'>" + itemName + "</font>";
			} else {
				return itemName;
			}
		} else if (elib[id]) {
			itemName = elib[id].n;
			if (isColor) {
				var color: string = Color.QUALITYCOLORH[elib[id].q];
				return "<font color='" + color + "'>" + itemName + "</font>";
			} else {
				return itemName;
			}
		}
		return itemName;
	}

	/**获得提示*/
	public static addSerGainText(type: number, id: number, withColor: boolean = true, count = 0) {

		if (type == Enum_Attr.ITEM) {//消耗物品
			var lib: any = Config.daoju_204;
			var name: string = lib[id].name;
			if (withColor) {
				var color = Color.QUALITYCOLOR[lib[id].quality];
			}
		} else if (type == Enum_Attr.EQUIP) {//装备
			lib = Config.zhuangbei_204;
			var name: string = lib[id].n;
			if (withColor) {
				var color = Color.QUALITYCOLOR[lib[id].q];
			}
		} else {//货币
			lib = Config.jssx_002;
			var name: string = lib[type].name;
			if (withColor) {
				var color = Color.QUALITYCOLOR[lib[type].color];
			}
		}
		if (color) {
			ViewBroadcastItemText.text("获得【" + name + "】 X" + count, color);
		} else {
			ViewBroadcastItemText.text("获得【" + name + "】 X" + count);
		}
	}

	public static makeAttrTextArr(attrs, gap: string = "\n", attrformat = "+"): string {
		var ret = "";
		if (!attrs) {
			return ret;
		}
		if (typeof (attrs) == "string") {
			attrs = JSON.parse(attrs as string);
		}
		for (var i = 0; i < attrs.length; i++) {
			var attr: Array<any> = attrs[i];
			var attName: string = Vo_attr.getAttrName(attr[0]);
			if (i == 0) {
				ret += attName + attrformat + attr[1];
			} else {
				ret += gap + attName + attrformat + attr[1];
			}
		}
		return ret;
	}

	/**将 1,2;1,3 这类字符串转化成整形二维数组*/
	public static splitIntArr(str: string): Array<Array<number>> {
		var ret: Array<any> = str.split(";");
		for (var i = 0, len = ret.length; i < len; i++) {
			var termArr = ret[i].split(",");
			for (var j = 0; j < termArr.length; j++) {
				termArr[j] = parseInt(termArr[j]);
			}
			ret[i] = termArr;
		}
		return ret;
	}

	/**战斗力计算  格式 [[101,100],[102,100],[104,100]]*/
	public static powerFormulaArr(arr: any): number {
		var power: number = 0;
		for (let i: number = 0; i < arr.length; i++) {
			var attrArr: any = arr[i];
			var attrType: number = Number(attrArr[0]);
			var attrValue: number = Number(attrArr[1]);
			power += ConfigHelp.powerFormula(attrType, attrValue)
		}
		return Math.ceil(power);
	}
	/**战斗力计算  格式 101属性类型,100属性值*/
	public static powerFormula(attrType: number, attrValue: number): number {
		var self = this;
		switch (attrType) {
			case Enum_Attr.HP:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_HP);
			case Enum_Attr.DEF:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DEF);
			case Enum_Attr.ATT:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_ATT);
			case Enum_Attr.CRIT:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_CRIT);
			case Enum_Attr.RESIST:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_RESIST);
			case Enum_Attr.DEX:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DEX);
			case Enum_Attr.DODGE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DODGE);
			case Enum_Attr.DAME:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DAME);
			case Enum_Attr.CRIT_RATE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_CRIT_RATE);
			case Enum_Attr.RESIST_RATE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_RESIST_RATE);
			case Enum_Attr.DEX_RATE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DEX_RATE);
			case Enum_Attr.DODGE_RATE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DODGE_RATE);
			case Enum_Attr.CRIT_ADD:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_CRIT_ADD);
			case Enum_Attr.CRIT_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_CRIT_REDU);
			case Enum_Attr.DAME_ADD:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DAME_ADD);
			case Enum_Attr.DAME_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_DAME_REDU);
			case Enum_Attr.FIRE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_FIRE);
			case Enum_Attr.ICE:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_ICE);
			case Enum_Attr.POI:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_POI);
			case Enum_Attr.ELEC:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_ELEC);
			case Enum_Attr.BOMB:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_BOMB);
			case Enum_Attr.FIRE_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_FIRE_REDU);
			case Enum_Attr.ICE_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_ICE_REDU);
			case Enum_Attr.POI_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_POI_REDU);
			case Enum_Attr.ELEC_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_ELEC_REDU);
			case Enum_Attr.BOMB_REDU:
				return attrValue * self.getAttXiShu(Enum_Attr.XS_BOMB_REDU);
			default:
				return 0;
		}
	}




	/**属性描述  格式 [[101,100],[102,100],[104,100]] return 攻击：100 防御：100*/
	public static attrString(arr: any, gap = "：", ATTColor?: string, valColor?: string, arrNext?: Array<any>, nextColor?: string): string {
		let str = "";
		if (typeof (arr) == "string")
			arr = JSON.parse(<any>arr);
		for (let i: number = 0; i < arr.length; i++) {
			let attrType: number = Number(arr[i][0]);
			let attrValue: number = Number(arr[i][1]);
			var name: string = "";
			var val: string = '';
			var next: string = ""
			var jssxCfg = Config.jssx_002[attrType]
			if (jssxCfg) {
				name = jssxCfg.name;
				if (jssxCfg.type == 2) {
					val = gap + "" + (attrValue / 1000) + "%";
					if (arrNext) next = "(+" + (Number(arrNext[i][1]) / 1000) + "%" + ")"
				} else {
					val = gap + "" + attrValue + "";
					if (arrNext) next = "(+" + Number(arrNext[i][1]) + ")"
				}
				if (ATTColor) {
					name = HtmlUtil.fontNoSize(name, ATTColor);
				} else {
					if (valColor) {
						name = HtmlUtil.fontNoSize(name, valColor);
					}
				}
				if (valColor) {
					val = HtmlUtil.fontNoSize(val, valColor);
				}
				if (arrNext && nextColor) {
					next = HtmlUtil.fontNoSize(next, nextColor);
				}
				str += name + val + next;
			}
			if (i != arr.length - 1) {
				str += "\n";
			}
		}
		return str;
	}


	/**属性描述  千分比*/
	public static attrStringQian(arr: Array<any>, gap = "：", ATTColor?: string, valColor?: string): string {
		let str = "";
		for (let i: number = 0; i < arr.length; i++) {
			let attrType: number = Number(arr[i][0]);
			let attrValue: number = Number(arr[i][1]);
			var name: string = "";
			var val: string = '';
			var jssxCfg = Config.jssx_002[attrType]
			if (jssxCfg) {
				name = jssxCfg.name;
				if (jssxCfg.type == 2) {
					val = gap + "" + (attrValue / 100) + "‰";///负责上一个函数 改下显示千分比
				} else {
					val = gap + "" + attrValue + "";
				}
				if (ATTColor) {
					name = HtmlUtil.fontNoSize(name, ATTColor);
				} else {
					if (valColor) {
						name = HtmlUtil.fontNoSize(name, valColor);
					}
				}
				if (valColor) {
					val = HtmlUtil.fontNoSize(val, valColor);
				}
				str += name + val;
			}
			if (i != arr.length - 1) {
				str += "\n";
			}
		}
		return str;
	}

	public static AttrName(attrType: number): string {
		var lib = Config.jssx_002;
		return lib[attrType].name;
	}
	/**
	 * 去掉中括号和逗号
	 * @param [[125,43001,1],[125,41001,1],[125,41002,1],[125,41003,1]]
	 * @return 一个二维数组
	 * 
	 */
	public static SplitStr(s: string): Array<any> {
		var a1: Array<any> = [];
		var a2: Array<any> = [];
		var temp: string;
		for (var i: number = 1; i < s.length - 1; i++) {
			if (s.charAt(i) == '[') {
				temp = '';
				a2 = [];
				continue;
			}
			if (s.charAt(i) == ',') {
				if (i > 0 && s.charAt(i - 1) == ']')
					continue;
				a2.push(temp);
				temp = '';
				continue;
			}
			if (s.charAt(i) == ']') {
				a2.push(temp);
				a1.push(a2);
				continue;
			}

			temp += s.charAt(i);
		}
		return a1;
	}


	/**
	 * 替换指定格式的字符串
     * 方式一：ConfigHelp.reTxt(str, "str1", "str2", "str3")
     * 方式二：ConfigHelp.reTxt(str, ["str1", "str2", "str3"])
	 * @param src 含有{0},{1},{2}..的原始字符串
	 * @param param 可以是一个数组，也可以是不定数量的参数
	 */
	public static reTxt(src: string, ...param): string {
		var len: number = param.length;
		if (len == 0) return src;
		if (len == 1 && param[0] instanceof Array) { //传入的是数组
			for (let i = 0; i < param[0].length; i++) {
				src = src.replace(ConfigHelp.getPattern(i), param[0][i]);
			}
		}
		else {
			for (var i: number = 0; i < len; i++) {
				var d: string = param[i];
				src = src.replace(ConfigHelp.getPattern(i), d);
			}
		}
		return src;
	}

	private static _patternBuffer: RegExp[] = [];
	public static getPattern(index: number): RegExp {
		var ret: RegExp = ConfigHelp._patternBuffer[index];
		if (ret == null) {
			var rg: string = "[{{]" + index.toString() + "[}}]";
			ret = ConfigHelp._patternBuffer[index] = new RegExp(rg, "g");
		}
		return ret;
	}

	//检测配置表的条件是否满足[[11.1.1]]
	public static checkEnough(content: string, isMsg: boolean = true): boolean {
		var parms = JSON.parse(content);
		var ret = true;
		for (let i = 0; i < parms.length; i++) {
			let arr = parms[i];
			let type: number = parseInt(arr[0]);
			let id = parseInt(arr[1]);
			let num: number = parseInt(arr[2]);
			if (type == Enum_Attr.ITEM) {
				let count = Model_Bag.getItemCount(id);
				if (count < num) {
					ret = false;
				}
			} else {
				let value = Model_player.getCurrencyCount(type);
				if (value < num) {
					ret = false;
				}
			}

			if (isMsg == true && !ret) {
				if (type == Enum_Attr.ITEM) {
					ViewCommonWarn.text(ConfigHelp.getItemColorName(id) + "不足");
				} else {
					ViewCommonWarn.text(Vo_attr.getAttrName(type) + "不足");
				}
			}
			// return ret;
		}
		return ret;
	}

	/**
	 * awards 奖励数组 parent 容器
	 * —_x _y初始pos
	 * hasTip 是否需要tips
	 * showName 是否需要显示名字
	 * rol 单行显示格子数量
	 * GAlgin 单个格子占位
	*/
	public static addGridview(awards: IGridImpl[], parent: fairygui.GComponent, _x, _y, hasTip: boolean = true, showName: boolean = false, rol: number = 5, wid: number = 100, scale: number = 1): any[] {
		var ret: any[] = [];
		for (var i = 0; i < awards.length; i++) {
			if (showName) {
				var grid = Pool.getItemByCreateFun("ViewGridRender", ViewGridRender.createInstance) as ViewGridRender;
				parent.addChild(grid);
				grid.grid.showEff(true);
				grid.x = _x + i % rol * wid;
				grid.y = _y + ((i / rol) >> 0) * 135;
				grid.vo = awards[i];
				grid.tipEnabled = hasTip;
				grid.setScale(scale, scale);
				ret.push(grid);
			}
			else {
				var grid1 = Pool.getItemByCreateFun("ViewGrid", ViewGrid.createInstance) as ViewGrid;
				parent.addChild(grid1);
				grid1.x = _x + i % rol * wid;
				grid1.y = _y + ((i / rol) >> 0) * wid;
				grid1.vo = awards[i];
				grid1.showEff(true);
				grid1.tipEnabled = hasTip;
				grid1.setScale(scale, scale);
				ret.push(grid1);
			}
		}
		return ret;
	}

	/**清理格子*/
	public static cleanGridview(grids) {
		var grid;
		for (var i = grids.length - 1; i >= 0; i--) {
			grid = grids[i];
			if (grid instanceof ViewGridRender) {
				grid.grid.showEff(false);
				Pool.recover("ViewGridRender", grid);
			}
			else {
				grid.disposePanel();//viewgrid
				if (grid instanceof ViewGrid) {
					Pool.recover("ViewGrid", grid);
				} else if (grid instanceof ViewGrid1) {
					Pool.recover("ViewGrid1", grid);
				} else if (grid instanceof ViewGrid2) {
					Pool.recover("ViewGrid2", grid);
				}
			}
			if (grids[i].parent) grids[i].parent.removeChild(grids[i]);
		}
		grids.length = 0;
	}

	/**清理格子特效 
	*/
	public static cleanGridEff(value: any) {
		var grid;
		var grids;
		if (Array.isArray(value)) {
			grids = value;
		} else {
			grids = [value];
		}
		for (var i = grids.length - 1; i >= 0; i--) {
			grid = grids[i];
			if (grid instanceof ViewGridRender)
				grid.grid.showEff(false);
			else
				grid.clean();//viewgrid
		}
	}

	/**重新居中排列 
	 * xy=中心点位置
	 * row单行数量  
	 * c = 行高  
	 * r 列距
	 * */
	public static centerGrid(grids, x, y, row = 4, c = 100, r = 135) {
		let rm = c * row;
		let l = grids.length;
		let lt = ((row - l % row) * c) >> 1
		for (let i = 0; i < l; i++) {
			let grid: any = grids[i];
			if ((i + row - i % row) <= l) {
				grid.x = x + i % row * c;
			} else {
				grid.x = x + i % row * c + lt;
			}
			grid.y = y + ((i / row) >> 0) * r;
		}
	}

	//common starFont star0-6 moon a-g
	public static getStarFontStr(star: number): string {
		let starStr: string = "";
		let num = Math.floor(star / 10);
		let num1 = star % 10;
		let starFlags = ["0", "1", "2", "3", "4", "5", "6"];
		let moonFlags = ["a", "b", "c", "d", "e", "f", "g"];
		for (let i = 0; i < 10; i++) {
			if (num < 6) {
				if (i < num1) {
					starStr += starFlags[num + 1];
				} else {
					starStr += starFlags[num];
				}
			} else {
				let moonLevel = num % 6;
				if (i < num1) {
					starStr += moonFlags[moonLevel + 1];
				} else {
					starStr += moonFlags[moonLevel];
				}
			}
		}
		return starStr
	}

	/**获取系统常数 */
	public static getSystemNum(value): number {
		var xishu: number = 0;
		var type: number = Number(value);
		if (Config.xtcs_004[type]) {
			xishu = Number(Config.xtcs_004[type].num);
		}
		return xishu;
	}

	/**获取系统常数 说明*/
	public static getSystemDesc(value): string {
		var xishu: string = "";
		var type: number = Number(value);
		if (Config.xtcs_004[type]) {
			xishu = Config.xtcs_004[type].other;
		}
		return xishu;
	}

	/**获取属性系数 */
	public static getAttXiShu(value): number {
		var xishu: number = 0;
		var type: number = Number(value);
		if (Config.changshu_101[type]) {
			xishu = Number(Config.changshu_101[type].num / 100);
		}
		return xishu;
	}

	public static configDic = {};
	public static decodeConfig(val) {
		let ret;
		if (!Config.dataLib) {
			return null;
		}
		let dic = ConfigHelp.configDic;
		if (!dic[val]) {
			let lib = Config.dataLib[val];
			if (!lib) {
				if (DEBUG) throw new Error("配置不存在:" + val);
				return null;
			}
			let keys = lib["key"];
			let data = lib["data"];
			ret = {};
			let key_len = keys.length;
			let data_len = data.length;
			for (let i = data_len - 1; i >= 0; i--) {
				let obj = {};
				let item = data[i];
				let id = item[0];
				for (let j = key_len - 1; j >= 0; j--) {
					obj[keys[j]] = item[j];
				}
				ret[id] = obj;
			}
			dic[val] = ret;
			delete Config.dataLib[val];
		} else {
			ret = dic[val];
		}
		return ret;
	}

	/**
	 * list：列表
	 * configData：配置文件原始数据 String
	 * 创建一个 列表，此列表仅显示道具或者装备
	*/
	public static createViewGridList(list: fairygui.GList, configData: string, callBackObj) {
		list.listdata = ConfigHelp.makeItemListArr(configData);
		list.callbackThisObj = callBackObj;
		list.itemRenderer = function (idx, item) {
			let grid = item as ViewGrid;
			grid.isShowEff = true;
			grid.tipEnabled = true;
			grid.vo = list.listdata[idx];
		}
		list.setVirtual();
		list.numItems = list.listdata.length;
	}

	public static createColorName(name: string, pz = 8) {
		if (pz > 7) {
			let names = name.split('');
			name = "";
			let colors = ["#ed1414", "#ffc344", '#da2bfa', "#66ccff"];
			for (let i = 0; i < names.length; i++) {
				let idx = i % colors.length;
				name += HtmlUtil.fontNoSize(names[i], colors[idx]);
			}
			return name;
		} else {
			return HtmlUtil.fontNoSize(name, Color.getColorStr(pz));
		}

	}

	public static getSurTime(overTime: number) {
		return overTime - Math.floor(Model_GlobalMsg.getServerTime() / 1000)
	}

	public static getVipShow(vipLv) {
		let arr = ["A", "B", "C", "P", "D", "E"];
		return arr[Config.VIP_710[vipLv + 1].ysxs];
	}
}