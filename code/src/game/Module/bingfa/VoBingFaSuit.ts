class VoBingFaSuit {
	public constructor() {
	}
	public id: number;
	public isMax: boolean = false;//是否是满级
	public isOne: boolean = false;

	public lib: any;

	public name: string;
	public condition: string;
	public type: number;
	public item;
	public attr;

	public initLib() {
		this.update();
		var lb = this.lib;
		this.name = lb.name;
		this.type = (lb.suitid / 1000) >> 0;
	}

	public update() {
		var s = this;
		s.lib = Config.booksuit_212[s.id];
		var lb = s.lib;
		s.condition = s.lib.condition;
		s.isMax = s.condition == "0";
		s.item = lb.item;
		s.isOne = s.id % 1000 == 0;
		s.attr = s.lib.attr;
		if (s.isOne)
			s.attr = Config.booksuit_212[s.id + 1].attr;
	}

	public getLastLib() {
		return Config.booksuit_212[this.id - 1];
	}

	public isNotice() {
		if(this.isMax)return false;
		let m = GGlobal.modelBingFa;
		let count = Model_Bag.getItemCount(410013);
		let vo: VoBingFaSuit = this;
		if (vo.item != 0) {
			let prop = JSON.parse(vo.item);
			let needCount = prop[0][2];
			if (count >= needCount) {
				if (vo.condition != "0") {
					let isfill: boolean = true;
					let condition = JSON.parse(vo.condition);
					for (let k = 0; k < condition.length; k++) {
						let id = condition[k][0];
						let star = condition[k][1];
						if (m.mapObj[id + ""].star < star) {
							return false;
						}
					}
				}
				return true;
			}
		}
		return false;
	}
}