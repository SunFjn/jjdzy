class VSettingHead extends fairygui.GButton {

	public headIcon:fairygui.GLoader;
	public frameIcon:fairygui.GLoader;
	public selectImg:fairygui.GImage;
	public labLocked:fairygui.GImage;

	public static URL:string = "ui://dt6yws4jg30n3";

	public static createInstance():VSettingHead {
		return <VSettingHead><any>(fairygui.UIPackage.createObject("setting","VSettingHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.headIcon = <fairygui.GLoader><any>(this.getChild("headIcon"));
		this.frameIcon = <fairygui.GLoader><any>(this.getChild("frameIcon"));
		this.selectImg = <fairygui.GImage><any>(this.getChild("selectImg"));
		this.labLocked = <fairygui.GImage><any>(this.getChild("labLocked"));

		this.labLocked.visible = false;
	}

	private _vo:any
	public set vo(v){
		this._vo = v;
		if(v.type == 1){//头像
			if(Model_Setting.headIdArr.indexOf(Number(v.id)) == -1){
				this.labLocked.visible = true;
				// this.headIcon.grayed = true;
				this._isLocked = true;
			}else{
				this.labLocked.visible = false;
				this._isLocked = false;
				// this.headIcon.grayed = false;
			}
			ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.picture + ".png", this.headIcon);
			this.headIcon.visible = true;
			this.frameIcon.visible = false;
		}else if(v.type == 2){//头像框
			if(Model_Setting.frameIdArr.indexOf(Number(v.id)) == -1){
				this.labLocked.visible = true;
				this._isLocked = true;
				// this.frameIcon.grayed = true;
			}else{
				this.labLocked.visible = false;
				this._isLocked = false;
				// this.frameIcon.grayed = false;
			}
			ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.picture + ".png", this.frameIcon);
			this.frameIcon.visible = true;
			this.headIcon.visible = false;
		}else{
			this._isLocked = false;
			this._isLocked = false;
			ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.head + ".png", this.headIcon);
			ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.frame + ".png", this.frameIcon);
		}
	}

	public get vo(){
		return this._vo;
	}

	private _isLocked;boolean;
	public get isLocked():boolean{
		return this._isLocked
	}
}