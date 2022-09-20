class VWuJiangJYin extends fairygui.GComponent {

	public grid: ViewGrid;
	public imgLocked: fairygui.GImage;
	public labName: fairygui.GTextField;

	public static URL: string = "ui://zyx92gzwphli10";

	public static createInstance(): VWuJiangJYin {
		return <VWuJiangJYin><any>(fairygui.UIPackage.createObject("wuJiang", "VWuJiangJYin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		this.grid.tipEnabled = false
		this.grid.isShowEff = true
	}

	private _vo: VoEquip;
	private _index: number;
	public isLocked: boolean = false;
	public set vo(value: VoEquip) {
		this._vo = value;
		if (this.isLocked) {
			this.grid.vo = null;
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + Model_WuJiang.LOCK_ICON[this._index] + ".png", this.grid.imgIcon);
			this.grid.imgIcon.visible = true;
		} else {//开启了
			this.grid.vo = value;
			if (value) {
				this.labName.text = value.name;
				this.labName.color = Color.getColorInt(value.quality)
				this.grid.lbNum.text = value.jie + "阶";
			} else {
				this.labName.text = "";
			}
		}
	}

	public set index(v) {
		this._index = v;
		var open = Model_WuJiang.OPEN_GUAN[v]
		if (GGlobal.modelguanxian.guanzhi >= open) {//开启了
			this.imgLocked.visible = false;
			this.isLocked = false;
		} else {
			this.imgLocked.visible = true;
			this.labName.text = (open - 1) + "阶将衔激活";
			this.isLocked = true;
		}
	}

	public get index() {
		return this._index;
	}

	public get vo() {
		return this._vo;
	}

	public bagEquip: VoEquip = null;//背包上可穿戴


	public set checkNotice(v:boolean){
		if(this.isLocked){
			this.grid.checkNotice = false
		}else{
			this.grid.checkNotice = v
		}
	}

	public get checkNotice(){
		return this.grid.checkNotice
	}
}