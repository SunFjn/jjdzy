class ScrollFarMap extends egret.Sprite {
	//固定的远景
	//滚动的一些装饰物
	private farbgs = [];
	public constructor() {
		super();
		this.farLayer = new egret.Sprite();
		this.addChild(this.farLayer);
		this.thingLayer = new egret.Sprite();
		this.addChild(this.thingLayer);

		this.farbgs = [];
		this.decorations = [];
		GGlobal.control.listen(Enum_MsgType.ONRESIZE, this.redrawMap, this);
	}
	decorations: MapDecoration[];
	mapid;
	srcid;
	activating = false;
	decorationJSON: Object;
	farLayer: egret.Sprite;
	thingLayer: egret.Sprite;
	public enterMap(id) {
		let cfg = Config.map_200[id];
		let s = this;
		s.mapid = id;
		s.decorationJSON = cfg.j;
		s.srcid = cfg.s;
		s.activating = s.visible = cfg.type == 3;
		s.testloadFarMapBg(s.activating);
		s.testloadmidMapBg(s.activating);
	}

	private redrawMap(){
		this.testloadFarMapBg(this.activating);
	}

	public testloadFarMapBg(v) {
		this.farLayer.visible = v;
		if (!v) return;
		if (!this.activating) return;
		let w = App.stageWidth;
		let len = this.farbgs.length;
		let max = Math.ceil(w / 1600);
		let farBg: fairygui.GLoader;
		for (let i = 0; i < len; i++) {
			farBg = this.farbgs[i];
			farBg.removeFromParent();
		}

		for (let j = 0; j < max; j++) {
			if (j < len) {
				farBg = this.farbgs[j];
			} else {
				farBg = new fairygui.GLoader();
				this.farbgs.push(farBg);
			}
			farBg.setXY(j*1600,0);
			this.farLayer.addChild(farBg.displayObject);
			ImageLoader.instance.loader("resource/map/" + this.srcid + "/clipmap/1_1.jpg", farBg);
		}
	}

	public testloadmidMapBg(v) {
		if (!v) return;
		let s = this;
		let data =
			[
				{ "c": 1, "x": 134, "y": 163, "t": 30, "a": "a3" },
				{ "c": 1, "x": 800, "y": 167, "t": 30, "a": "a5" },
				{ "c": 1, "x": 1436, "y": 167, "t": 30, "a": "a5" }
			];
		let nowLen = data.length;
		let lastLen = s.decorations.length;
		data = data.sort(function (a, b) {
			return a.y < b.y ? -1 : 1;
		});
		for (let i = 0; i < nowLen; i++) {
			let pic: MapDecoration;
			if (i < lastLen) {
				pic = s.decorations[i];
			} else {
				pic = new MapDecoration();
				s.decorations.push(pic);
			}
			pic.add(data[i], s.thingLayer, i);
		}

		if (nowLen < lastLen) {
			for (let j = nowLen - 1; j < lastLen; j++) {
				let pic = s.decorations[j];
				pic.dispose();
			}
		}
	}

	private _x = 0;
	public move() {
		let s = this;
		s._x += 3;
		if (!s.activating) {
			return;
		}
		let len = s.decorations.length - 1;
		for (let i = len; i >= 0; i--) {
			s.decorations[i].move(s._x);
		}
	}

	public dispose() {
		let s = this;
		s.visible = false;
		let nowLen = s.decorations.length;
		for (let i = 0; i < nowLen; i++) {
			let pic: MapDecoration;
			pic = s.decorations[i];
			pic.dispose();
		}
	}
}