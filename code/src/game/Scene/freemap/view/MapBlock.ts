class MapBlock {
	public constructor() {
		this.back = new fairygui.GLoader();
		this.back.setSize(100, 100);
		this.front = new fairygui.GLoader();
		this.front.setSize(100, 100);

	}

	public back: fairygui.GLoader;
	public _version: number;
	public key: string;
	public front: fairygui.GLoader;

	public sceneid: number;
	public sceneMapSRC: number;

	public row: number;
	public col: number;

	public alphainfo: any;
	public alphamask: egret.Texture;

	public url: string;

	//辅助
	public static RECTHELPER1: egret.Rectangle = new egret.Rectangle();

	public setRC(r: number, c: number): void {
		const self = this;
		self.row = r;
		self.col = c;

		self.back.y = self.front.y = r * ModelArpgMap.MAPBLOCKH;
		self.back.x = self.front.x = c * ModelArpgMap.MAPBLOCKW;

		var rckey: string = self.row + "_" + self.col;
		let src = ModelArpgMap.getInstance().sceneMapSRC;
		self.url = "resource/map/" + src + "/clipmap/" + rckey + ".jpg";
		self.url = RESManager.getVersionUrl(self.url);

		RESManager.addMapBlockURL(self.url, src);
		this.alphainfo = MapManager.alphamapinfo[rckey];
		if (this.alphainfo != null) {
			try {
				this.alphamask = this.alphainfo;
			} catch (e) {
				this.alphamask = null;
				this.alphainfo = null;
			}
		}
	}

	public onLoadComplete(img: egret.Texture, url?: string): void {
		if (url && url != this.url) return;
		IconUtil.addUrlCounter(url);
		var bm: egret.Texture = img;

		this.back.texture = bm;
		this.back.scaleX = this.back.scaleY = 1;

		if (this.alphamask != null && this.back.texture != null) {
			this.front.texture = this.alphamask;
			MapBlock.RECTHELPER1.x = this.alphainfo.x;
			MapBlock.RECTHELPER1.y = this.alphainfo.y;
			MapBlock.RECTHELPER1.width = this.alphainfo.width;
			MapBlock.RECTHELPER1.height = this.alphainfo.height;

			this.alphamask = this.back.texture;
			this.front.x = this.col * ModelArpgMap.MAPBLOCKW + this.alphainfo.x;
			this.front.y = this.row * ModelArpgMap.MAPBLOCKH + this.alphainfo.y;
		}
	}

	public dispose(): void {
		IconUtil.reduceUrlCounter(this.url);
		this.url = "";
		this.back.x = this.back.y = 0;
		this.front.x = this.front.y = 0;
		this._version = -1;
		if (this.front.texture != null) {
			this.front.texture = null;
			this.alphamask = null;
		}
		if (this.back.texture) {
			this.back.texture = null;
		}
		Pool.recover("MapBlock", this);
	}
}