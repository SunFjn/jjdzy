class Parts extends egret.Sprite {

	public list: Array<Part> = [];
	public dic: any = {};
	public len: number = 0;

	public _needSort: boolean = false;

	/**动画类型 */
	public static T_BODY = 1;
	public static T_WEAPON = 2;
	public static T_SHOUHUN = 3;
	public static T_HORSE = 4;
	public static T_HORSE_WING = 5;

	/**动画层级 */
	public static P_SHADOW: number = 0;
	public static P_SHOUHUN: number = 5;
	public static P_BODY: number = 10;
	public static P_WEAPON: number = 20;
	public static P_HORSE: number = 30;

	public static D_WEAPON_DOWN: number = 9;
	public static D_HORSE_DOWN: number = 8;

	public static DIS_REAPEAT: number = 0;
	public static DIS_ONCE: number = 1;

	public ptype: number = 0;

	public constructor() {
		super();
	}

	public _perc: number = 0;
	public set perc(v: number) {
		this._perc = v;
		var list = this.list;
		var len = list.length;

		if (this.ptype == Parts.DIS_REAPEAT) {
			if (v >= 1) {
				v = v - (v >> 0);
			}
		} else {
			if (v >= 1) {
				v = 0.999999;
			}
		}

		for (var i = 0; i < len; i++) {
			var p: Part = list[i];
			p.setPec(v);
		}
	}

	public get perc(): number {
		return this._perc;
	}

	public addPart(p: Part) {
		if (p.parts != this) {
			p.parts = this;
			this.list.push(p);
			this._needSort = true;
			this.len++;

			this.dic[p.type] = p;
			this.addChild(p.mc);
		}
	}

	public removePart(p: Part) {
		var index = this.list.indexOf(p);
		if (index != -1) {
			this.list.splice(index, 1);
			delete this.dic[p.type];
			this.removeChild(p.mc);
			p.dispose();
		}
	}

	public removePartByType(type) {
		var part = this.dic[type];
		if (part) {
			this.removePart(part);
		}
	}

	public setPart(type: number, arg: any,body:any=null) {
		var p: Part = this.dic[type];
		if (p) {
			p.setVal(arg,body);
		}
	}

	//移除除了身体之外的部件
	public removePartExceptBody() {
		var temp = [];
		var list = this.list;
		let len;
		len = list.length;
		for (var i = 0; i < len; i++) {
			var p: Part = list[i];
			if (p.type != 1) {
				temp.push(p);
			}
		}

		while (temp.length){
			this.removePart(temp.shift());
		}
	}

	public sort() {
		var list = this.list;
		var len = list.length;
		list.sort(this.dSortFunc);
		for (var i = 0; i < len; i++) {
			var p: Part = list[i];
			var oldindex = this.getChildIndex(p.mc);
			if (oldindex != i) {
				this.setChildIndex(p.mc, i);
			}
		}
	}

	protected dSortFunc(a: Part, b: Part): number {
		var ret: number = a.dep - b.dep;
		return ret;
	}

	public setVal(v: any) {
		var list = this.list;
		for (var i = list.length - 1; i >= 0; i--) {
			var p = list[i];
			p.setAct(v);
		}
	}

	public setPartScale(value) {
		var list = this.list;
		for (var i = list.length - 1; i >= 0; i--) {
			var p = list[i];
			p.mc.scaleX = p.mc.scaleY = value;
		}
	}
}