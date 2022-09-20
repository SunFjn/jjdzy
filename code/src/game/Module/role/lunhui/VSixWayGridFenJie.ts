/**
 * 六道分解item
 */
class VSixWayGridFenJie extends fairygui.GButton{
	public grid:VSixWayGrid;
	public check:fairygui.GButton;
	private _vo:VoSixWay;

	public static URL:string = "ui://ehelf5bh11m1w10";

	public static createInstance():VSixWayGridFenJie {
		return <VSixWayGridFenJie><any>(fairygui.UIPackage.createObject("lunhui","VSixWayGridFenJie"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
		s.check.touchable = false;
	}

	public set voFenJ(v:VoSixWay){
		let s = this;
		s._vo = v;
		s.grid.vo = v;
		
		s.check.visible = true;
		s.check.selected = v.fenJ == 1;
		GGlobal.modellh.listen(Model_LunHui.CHECKED, s.upChecked, s);
	}

	public get vo():VoSixWay{
		return this._vo;
	}

	public onCheck(){
		this.check.selected = this.check.selected ? false : true;
		if(this.vo){
			this.vo.fenJ = this.check.selected ? 1 : 0;
		}
	}

	private upChecked(){
		let s = this;
		if(s.vo){
			s.check.selected = s.vo.fenJ == 1;
		}else{
			s.check.selected = false;
		}
	}

	public clean(){
		super.clean();
		this.grid.clean()
		GGlobal.modellh.remove(Model_LunHui.CHECKED, this.upChecked, this);
	}
}