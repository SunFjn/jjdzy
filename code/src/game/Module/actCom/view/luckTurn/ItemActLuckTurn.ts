class ItemActLuckTurn extends fairygui.GComponent {

	public bg: fairygui.GImage;
	public bg1: fairygui.GImage;
	public img: fairygui.GLoader;
	public gou: fairygui.GLoader;
	public imgYb: fairygui.GImage;
	public lbYb: fairygui.GRichTextField;
	public boxYb: fairygui.GGroup;

	public static URL: string = "ui://px5jiht9kzdya";

	public static createInstance(): ItemActLuckTurn {
		return <ItemActLuckTurn><any>(fairygui.UIPackage.createObject("actLuckTurn", "ItemActLuckTurn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _st;
	private _index;

	//B:状态:-1未抽，1已抽中，2未抽中，3未抽中
	public set st(v) {
		let s = this;
		s._st = v
		s.boxYb.visible = v == -1;
		if (v == -1) {
			this.bg.visible = true;
			this.bg1.visible = false;
			this.img.visible = false;
			this.gou.visible = false;
		} else {
			this.bg.visible = false;
			this.bg1.visible = true;
			this.gou.visible = true;
			this.img.visible = true;
			this.img.url = CommonManager.getUrl("actLuckTurn", "" + v)
			if (v == 1) {//中了
				this.gou.url = "ui://px5jiht9kzdy2";
			} else {
				this.gou.url = "ui://px5jiht9kzdy3";
			}
		}
	}
	public get st() {
		return this._st
	}
	// -1  0,1,2
	public set index(v) {
		let s = this;
		s._index = v
		if (v == -1) {
			this.bg.visible = false;
			this.bg1.visible = true;
			this.img.url = CommonManager.getUrl("actLuckTurn", "1")
			this.img.visible = true;
		} else {
			this.bg.visible = true;
			this.bg1.visible = false;
			this.img.visible = false;
		}
		this.gou.visible = false;
		s.boxYb.visible = false;
	}

	public get index() {
		return this._index;
	}

	public clean() {
		this.gou.url = null;
		this.img.url = null;
	}

	public set cost(v: string) {
		this.lbYb.text = v
	}

	public turn() {
		let s = this
		egret.Tween.get(s).to({ scaleX: 0 }, 200).call(s.turnCge, s).to({ scaleX: 1 }, 200);
	}

	private turnCge() {
		let s = this;
		s.st = GGlobal.model_LuckTurn.cardArr[s._index];
	}

}