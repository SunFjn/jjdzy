class ScrollMapRepeatItem {
	public k: string;
	public r: number;
	public c: number;
	public scrollmap: ScrollMap;

	public head;

	public imgTileFar: fairygui.GLoader;
	public imgUrlFar: string;

	public imgTileNear: fairygui.GLoader;
	public imgUrlNear: string;
	protected mapEffect;

	public constructor() {
		this.imgTileFar = new fairygui.GLoader();
		this.imgTileFar.fill = fairygui.LoaderFillType.ScaleFree;
		this.imgTileFar.setSize(1.5625 * 1024, 1.5625 * 727);
		this.imgTileNear = new fairygui.GLoader();
		this.imgTileNear.fill = fairygui.LoaderFillType.ScaleFree;
		this.imgTileNear.setSize(1.5625 * 1024, 1.5625 * 727);
	}

	public static CREATEFUNC(scrollmap: ScrollMap, k, r, c) {
		var ret: ScrollMapRepeatItem = ScrollMapRepeatItem.pool.length?ScrollMapRepeatItem.pool.shift(): new ScrollMapRepeatItem();
		ret.scrollmap = scrollmap;
		ret.k = k;
		ret.r = r;
		ret.c = c;
		ret.mapEffect = [];
		return ret;
	}

	public onAdd() {
		var self = this;
		self.head = self.scrollmap.head;
		var imgType: string = "jpg";
		if (!self.head) return;
		var mid = self.scrollmap.mid;
		var lib = Config.map_200[mid];
		if (lib.type != 0) imgType = "png";

		var imgIndexR = self.r % self.scrollmap.va.numRow;//循环索引 row
		var imgIndexC = self.r % self.scrollmap.va.numCol;//循环索引 col
		if (self.head) {
			var imgUrlNear = self.imgUrlNear = "resource/map/" + self.scrollmap.head + "/clipmap/0_0." + imgType;
			ImageLoader.instance.loader(imgUrlNear, self.imgTileNear, Handler.create(self, self.onImgLoaded));
		}

		var parent = self.scrollmap.tileLayer;
		self.imgTileNear.x = self.c * self.scrollmap.blockSizeW;
		self.imgTileNear.y = self.r * self.scrollmap.blockSizeH;

		if (lib.type == 1) {
			var imgUrlFar = self.imgUrlFar = "resource/map/" + self.scrollmap.head + "/clipmap/1_1." + imgType;
			ImageLoader.instance.loader(imgUrlFar, self.imgTileFar, Handler.create(self, self.onFarImgLoaded));
			parent.addChild(self.imgTileFar.displayObject);
			self.imgTileFar.x = self.imgTileNear.x;
			self.imgTileFar.y = self.imgTileNear.y;
		}
		parent.addChild(self.imgTileNear.displayObject);
	}

	private onFarImgLoaded(bmd) {
		// if (this.imgTileFar) {
		// 	this.imgTileFar.texture = bmd;
		// }

		// if (bmd == null) {
		// 	GGlobal.resMgr.onLoaded();
		// }
	}
	private onImgLoaded(bmd) {
		// if (this.imgTileNear) {
		// 	this.imgTileNear.texture = bmd;
		// }

		// if (bmd == null) {
		// 	GGlobal.resMgr.onLoaded();
		// }
	}

	public static pool:any[] = [];
	public onRemove() {
		var self = this;
		self.mapEffect = {};
		this.shakeVal = 0;
		ScrollMapRepeatItem.pool.push(this);
	}

	public set shakeVal(v) {
		this.imgTileFar.y = 15 * v;
	}

	public dispose() {
	}

	public onEvent(evt, arg) {
	}
}