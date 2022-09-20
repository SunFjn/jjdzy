class VoBingFa {
	public constructor() {
	}

	id: number = 0;
	power: number = 0;
	star: number = 0;
	drugCount: number = 0;
	totalAttr: any[];//包含升星和基础属性
	totalNextAttr: any[];//包含升星+1和基础属性

	name: string;
	max: string;
	pin;
	starMax: number;
	way: string;
	pic: string;
	icon: string;
	item: any[];
	attr: any[];
	starattr: any[];
	lib: Ibook_213;

	sortIndex = 0;

	initLib() {
		let s = this;
		var l = s.lib;
		s.id = l["id"];
		s.name = l["name"];
		s.way = l["way"];
		s.icon = l["icon"];
		s.pic = l["pic"];
		s.max = l["max"];
		s.pin = l["pin"];
		s.starMax = l["star"];
		s.item = JSON.parse(l["item"]);
		s.attr = JSON.parse(l["attr"]);
		s.starattr = JSON.parse(l["starattr"]);
		s.totalAttr = JSON.parse(Config.bookstar_213[s.pin * 1000 + 1].attr);
	}

	update() {
		let a = this;
		var l = a.lib;
		var s = a.star;
		let starcfg = Config.bookstar_213[a.pin * 1000 + s]
		a.drugCount = a.star * a.lib["max"];
		a.power = starcfg.power;
		a.totalAttr = JSON.parse(starcfg.attr);
		if (starcfg.next > 0) {
			a.totalNextAttr = JSON.parse(Config.bookstar_213[starcfg.next].attr);
		}
	}

	canActivate() {
		let item = JSON.parse(this.lib["item"]);
		let count = Model_Bag.getItemCount(item[0][1]);
		return count > 0;
	}
}