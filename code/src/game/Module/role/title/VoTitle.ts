class VoTitle {
	public constructor() {
	}

	public lib;
	public id: number = 0;
	public name;
	/**称号状态（ 0：未激活、1：可激活、2：已激活、3：已穿戴）]*/
	public state = 0;
	public time: number = 0;
	public power = 0;
	/**0永久 其他：时限*/
	public type: number;
	/**前端tab类型*/
	public ttype: number;
	public attr: any[];
	public desc: string;
	public picture: string;
	public condtion: any[];
	public actPower = 0;
	public email: string;
	initLib(val) {
		let sf = this;
		sf.lib = val;
		sf.id = val["ID"];
		sf.name = val["name"];
		sf.power = val["fight"];
		sf.type = val["type"];
		sf.desc = val["desc"];
		sf.ttype = val["belong"];
		sf.picture = val["picture"];
		sf.email = val["email"];
		sf.condtion = JSON.parse(val["condtion"]);
		sf.attr = JSON.parse(val["attr"]);
	}

	public _level = 0;
	set level(val) {
		this._level = val;
		var cfgPower = this.lib["fight"];
		if (val > 1) {
			this.power = cfgPower * val;
			var temp: any[] = JSON.parse(this.lib["attr"]);
			for (var i = 0; i < temp.length; i++) {
				temp[i][1] = temp[i][1] * val;
			}
			this.attr = temp;
			this.actPower = cfgPower * val;
		}
		this.actPower = cfgPower * val;
	}

	get level() {
		return this._level;
	}

	private static maxLevel: number = 0;
	isMaxLevel(): boolean {
		if (VoTitle.maxLevel == 0) VoTitle.maxLevel = ConfigHelp.getSystemNum(1011);
		return this.level >= VoTitle.maxLevel;
	}

	sortIndex = 0;
	setState(val) {
		this.state = val;
	}

	getSortIndex() {
		let val = this.state;
		this.sortIndex = 0;
		if (val == 2) this.sortIndex = -1000;
		else if (val == 3|| this.isNotice()) this.sortIndex = -100000;
		this.sortIndex += this.id;
		return this.sortIndex;
	}

	isNotice(){
		var condition = this.condtion[0];
		var type = condition[0];
		var val = condition[2];
		var ok = false;
		if (type == 9) {
			var ml = Model_Bag.getItemCount(val);
			ok = ml > 0;
		}

		if (!ok) {
			var mail = this.email;
			if (mail != "0") {
				var t = JSON.parse(mail);
				var ml = Model_Bag.getItemCount(t[0][1]);
				ok = ml > 0;
			}
		}
		return ok && !this.isMaxLevel();
	}
}