class Child_GCBZ extends fairygui.GComponent {

	public item2: GCBZCityItem;
	public item1: GCBZCityItem;
	public item0: GCBZCityItem;
	public item3: GCBZCityItem;
	public container: EmptyComp;
	public bg: fairygui.GLoader;
	public itemArr: GCBZCityItem[];
	public c1: fairygui.Controller;
	public static URL: string = "ui://vgiijkm8uvs33";

	public static createInstance(): Child_GCBZ {
		return <Child_GCBZ><any>(fairygui.UIPackage.createObject("GCBZ", "Child_GCBZ"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.itemArr = [self.item0, self.item1, self.item2, self.item3];
		self.container.touchable = false;
	}

	private posArr0 = [{ x: 50, y: 650 }, { x: 90, y: 400 }, { x: 120, y: 150 }, { x: 450, y: 570 }];
	private posArr1 = [{ x: 70, y: 650 }, { x: 250, y: 440 }, { x: 280, y: 150 }, { x: 630, y: 260 }];
	private moveObj0 = { x: -265, y: 570 };
	private moveObj1 = { x: -25, y: 300 };
	private voArr: Vo_GCBZ[];
	private index = 0;
	public setVo(voArr: Vo_GCBZ[], value = 0) {
		let self = this;
		self.voArr = voArr;
		self.index = value;
		self.c1.selectedIndex = value;
		IconUtil.setImg(self.bg, Enum_Path.BACK_URL + UIConst.GCBZ + "_" + (value + 1) + ".jpg");
		self.container.visible = false;
		for (let i = 0; i < self.itemArr.length; i++) {
			let item = self.itemArr[i];
			if (i < voArr.length) {
				let vo = voArr[i];
				item.visible = true;
				item.data = i;
				item.setVo(vo)
				if (vo.cfg.tgs == GGlobal.modelgcbz.curID) {
					self.container.visible = true;
					let vomine = Model_player.voMine;
					if (Config.sz_739[vomine._shiZhuang]) {
						self.container.setUIRole(vomine._shiZhuang, vomine.godWeapon);
					} else {
						self.container.setUIRole(vomine.job, vomine.godWeapon);
					}
					self.container.getUIRole().setScaleXY(0.8, 0.8);
					if (value == 0) {
						self.container.setXY(self.posArr0[item.data].x, self.posArr0[item.data].y);
					} else {
						self.container.setXY(self.posArr1[item.data].x, self.posArr1[item.data].y);
					}
				}
			} else {
				item.visible = false;
			}
		}
		if (!self.container.visible) self.container.setUIRole(0);
		GGlobal.control.listen(Enum_MsgType.GCBZ_MOVE_TWEEN, self.moveTo, self);
	}

	private moveTo(value) {
		let self = this;
		let model = GGlobal.modelgcbz;
		self.container.visible = false;
		for (let i = 0; i < self.itemArr.length; i++) {
			let item = self.itemArr[i];
			if (item.visible && item.vo.cfg.tgs == model.curID) {
				self.container.visible = true;
				let vomine = Model_player.voMine;
				if (Config.sz_739[vomine._shiZhuang]) {
					self.container.setUIRole(vomine._shiZhuang, vomine.godWeapon);
				} else {
					self.container.setUIRole(vomine.job, vomine.godWeapon);
				}
			}
		}
		if (!self.container.visible) {
			self.container.setUIRole(0);
			return;
		}
		let startX = 0;
		let startY = 0;
		let endX = 0;
		let endY = 0;
		if (value == 0) {
			startX = self.index == 0 ? self.moveObj0.x : self.moveObj1.x;
			startY = self.index == 0 ? self.moveObj0.y : self.moveObj1.y;
			endX = self.index == 0 ? self.posArr0[value].x : self.posArr1[value].x;
			endY = self.index == 0 ? self.posArr0[value].y : self.posArr1[value].y;
		} else {
			startX = self["posArr" + self.index][value - 1].x;
			startY = self["posArr" + self.index][value - 1].y;
			endX = self["posArr" + self.index][value].x;
			endY = self["posArr" + self.index][value].y;
		}
		self.container.setXY(startX, startY);
		self.container.getUIRole().move_state = 1;
		self.container.getUIRole().setScaleXY(0.8, 0.8);
		self.container.getUIRole().invalid |= 1023;
		let tgs = self.voArr[value].cfg.tgs
		egret.Tween.get(self.container).to({ x: endX, y: endY }, 1000).call(() => {
			if (self.container.getUIRole()) {
				self.container.getUIRole().move_state = 0;
				self.container.getUIRole().invalid |= 1023;
			}
			model.CG_AttackCity_attackNPC_12061(tgs);
		}, self);
	}

	public clean() {
		let self = this;
		for (let i = 0; i < self.itemArr.length; i++) {
			self.itemArr[i].clean();
		}
		GGlobal.control.remove(Enum_MsgType.GCBZ_MOVE_TWEEN, self.moveTo, self);
	}
}