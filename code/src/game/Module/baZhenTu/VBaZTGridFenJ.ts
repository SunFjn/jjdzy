class VBaZTGridFenJ extends fairygui.GButton {

	public grid:VBaZTGrid;
	public check:fairygui.GButton;
	public lbName:fairygui.GTextField;
	public imgLock:fairygui.GImage;

	public static URL:string = "ui://xrzn9ppab5l2k";

	public static createInstance():VBaZTGridFenJ {
		return <VBaZTGridFenJ><any>(fairygui.UIPackage.createObject("baZhenTu","VBaZTGridFenJ"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
		this.check.touchable = false;
	}

	private _temp:Ibztzf_261
	public setTemp(v:Ibztzf_261){
		this._temp = v
		this.check.visible = this.check.touchable = false;
		this.imgLock.visible = false;
		this.grid.setTemp(v);
		this.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
		// let pz = v ? v.pz : 0
		// this.lbName.color = Color.QUALITYCOLOR[pz];
	}

	public getTemp():Ibztzf_261{
		return this._temp
	}

	private _vo:VoBaZhenTu
	public set vo(v:VoBaZhenTu){
		this._vo = v
		this.setTemp(v.cfg);
		this.grid.vo = v;
	}

	public set voFenJ(v:VoBaZhenTu){
		this._vo = v
		this.grid.vo = v;
		this.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
		// this.lbName.text = v.name;
		// this.lbName.color = Color.QUALITYCOLOR[v.pz];
		
		if(v.locked == 0){
			this.check.visible = true;
			this.check.selected = v.fenJ == 1;
			this.imgLock.visible = false;
			GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.CHECKED, this.upChecked, this);
		}else{//加锁
			this.check.visible = false;
			this.check.selected = false
			this.imgLock.visible = true;
			GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.CHECKED, this.upChecked, this);
		}

		if(v.type == 0){
			this.imgLock.visible = false;
		}
	}
	public get vo():VoBaZhenTu{
		return this._vo;
	}

	public get checked(){
		return this.check.selected
	}

	private upChecked(){
		if(this.vo && this.vo.locked == 0){
			this.check.selected = this.vo.fenJ == 1;
		}else{
			this.check.selected = false;
		}
	}

	public onCheck(){
		if(this.vo && this.vo.locked == 1){
			this.check.selected = false;
			return;
		}
		this.check.selected = this.check.selected ? false : true;
		if(this.vo){
			this.vo.fenJ = this.check.selected ? 1 : 0;
		}
	}

	public clean(){
		super.clean();
		this.grid.clean()
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.CHECKED, this.upChecked, this);
	}
}