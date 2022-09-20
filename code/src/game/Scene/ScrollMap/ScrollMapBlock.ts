class ScrollMapBlock {
	public static clientID = 0;
	public constructor() {
		this.back = new fairygui.GLoader();
		this.back.setSize(100, 100);
		ScrollMapBlock.clientID++;
	}

	public back: fairygui.GLoader;
	public key: string;

	public sceneid: number;

	public row: number;
	public col: number;

	public url: string;

	public setRC(r: number, c: number): void {
		this.row = r;
		this.col = c;
		var rckey: string = this.col + "_" + this.row;
		let src = Config.map_200[this.sceneid].s;
		if(src==3102){
			this.url = "resource/map/"+src+"/bgs512/" + rckey + ".png";
		}else{
			this.url =  "resource/map/"+src+"/bgs512/" + rckey + ".jpg";
		}
		this.url = RESManager.getVersionUrl(this.url);
	}

	public setXY(r, c, ax) {
		this.back.setXY(r * 512 - ax, c * 512);
	}

	public onLoadComplete(img: egret.Texture, url?: string): void {
		if (url && url != this.url) return;
		var bm: egret.Texture = img;

		this.back.texture = bm;
		this.back.scaleX = this.back.scaleY = 1;
	}

	public dispose(): void {
		RESManager.destoryRes(this.url);
		this.url = "";
		this.back.setXY(0, 0);
		if (this.back.texture) {
			this.back.texture = null;
		}
		Pool.recover("ScrollMapBlock", this);
	}
}