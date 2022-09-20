class TipRoleEquip extends UIModalPanel {
	public frame: fairygui.GComponent;
	public grid: ViewGrid;
	public lbLevel: fairygui.GTextField;
	public lbName: fairygui.GRichTextField;
	public lbPower: fairygui.GTextField;
	public lb: fairygui.GTextField;
	public lbBaseAtt: fairygui.GRichTextField;
	public lbStreng: fairygui.GRichTextField;
	public lbStrengPower: fairygui.GTextField;
	public s3: fairygui.GLoader;
	public s1: fairygui.GLoader;
	public s0: fairygui.GLoader;
	public s2: fairygui.GLoader;
	public lbStone1: fairygui.GRichTextField;
	public lbStone0: fairygui.GRichTextField;
	public lbStone2: fairygui.GRichTextField;
	public lbStone3: fairygui.GRichTextField;
	public lbSX0: fairygui.GRichTextField;
	public lbSX1: fairygui.GRichTextField;
	public lbSX2: fairygui.GRichTextField;
	public lbSX3: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9emqcyl6d";

	private stone: any[] = [];

	public static createInstance(): TipRoleEquip {
		return <TipRoleEquip><any>(fairygui.UIPackage.createObject("common", "TipRoleEquip"));
	}
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "TipRoleEquip").asCom;
		this.contentPane = this.view;
		let s = this;

		s.grid = <ViewGrid><any>(s.view.getChild("grid"));
		s.frame = <fairygui.GComponent><any>(s.view.getChild("frame"));
		s.lbLevel = <fairygui.GTextField><any>(s.view.getChild("lbLevel"));
		s.lbName = <fairygui.GRichTextField><any>(s.view.getChild("lbName"));
		s.lbPower = <fairygui.GTextField><any>(s.view.getChild("lbPower"));
		s.lb = <fairygui.GTextField><any>(s.view.getChild("lb"));
		s.lbBaseAtt = <fairygui.GRichTextField><any>(s.view.getChild("lbBaseAtt"));
		s.lbStreng = <fairygui.GRichTextField><any>(s.view.getChild("lbStreng"));
		s.lbStrengPower = <fairygui.GTextField><any>(s.view.getChild("lbStrengPower"));
		s.s3 = <fairygui.GLoader><any>(s.view.getChild("s3"));
		s.s3.setScale(0.3,0.3);
		s.s1 = <fairygui.GLoader><any>(s.view.getChild("s1"));
		s.s1.setScale(0.3,0.3);
		s.s0 = <fairygui.GLoader><any>(s.view.getChild("s0"));
		s.s0.setScale(0.3,0.3);
		s.s2 = <fairygui.GLoader><any>(s.view.getChild("s2"));
		s.s2.setScale(0.3,0.3);
		s.lbStone1 = <fairygui.GRichTextField><any>(s.view.getChild("lbStone1"));
		s.lbStone0 = <fairygui.GRichTextField><any>(s.view.getChild("lbStone0"));
		s.lbStone2 = <fairygui.GRichTextField><any>(s.view.getChild("lbStone2"));
		s.lbStone3 = <fairygui.GRichTextField><any>(s.view.getChild("lbStone3"));
		s.lbSX0 = <fairygui.GRichTextField><any>(s.view.getChild("lbSX0"));
		s.lbSX1 = <fairygui.GRichTextField><any>(s.view.getChild("lbSX1"));
		s.lbSX2 = <fairygui.GRichTextField><any>(s.view.getChild("lbSX2"));
		s.lbSX3 = <fairygui.GRichTextField><any>(s.view.getChild("lbSX3"));
		s.grid.tipEnabled = false;
		s.stone = [[s.s0, s.lbStone0, s.lbSX0], [s.s1, s.lbStone1, s.lbSX1], [s.s2, s.lbStone2, s.lbSX2], [s.s3, s.lbStone3, s.lbSX3]];
		super.childrenCreated();
	}

	protected onShown(){
		this.show(this._args)
	}

	protected onHide(): void {
		this.clear();
		GGlobal.layerMgr.close(UIConst.TIP_ROLE_EQUIP);
	}

	public show(obj: any): void {
		if (!obj) return;
		let s = this;
		var vo: VoEquip = obj;
		s.grid.vo = vo;
		s.grid.showEff(true);
		s.grid.lbNum.text = "";
		s.lbName.text = vo.name;
		s.lbName.color = vo.qColor;
		s.lbLevel.text = vo.condition;
		s.lbPower.text = "战力：" + vo.getPower();

		var starLv = vo.starLv;
		//基础
		var arr = JSON.parse(vo.cfg.attr);
		var ratio = Config.dzstar_209[starLv].addition;
		let str = "";
		for (let i: number = 0; i < arr.length; i++) {
			let attrType: number = Number(arr[i][0]);
			let attrValue: number = Number(arr[i][1]);
			var name: string = "";
			if (Config.jssx_002[attrType]) {
				name = Config.jssx_002[attrType].name;
				str += name + "  +" + attrValue + "<font color='#15f234'>（升星+" + ((attrValue * ratio / 100000) >> 0) + "）</font>";
			}
			if (i != arr.length - 1) {
				str += "\n";
			}
		}
		s.lbBaseAtt.text = str;

		//强化
		s.lbStrengPower.text = "（+" + vo.qh + "）";//强化等级
		let cfg: any = Config.dzqianghua_209[vo.qh];
		arr = JSON.parse(cfg["attr" + vo.type]);
		s.lbStreng.text = ConfigHelp.makeAttrTextArr(arr);//属性

		//宝石
		var bs = vo.bs;
		var one = [422101,422201,422301,422401];
		for (var i = 0; i < bs.length; i++) {
			var level = bs[i];
			var ico = s.stone[i][0];
			var icoName = s.stone[i][1];
			var icoATT = s.stone[i][2];
			let gemcfg = Config.dzgem_209[level];
			if (level == 0) {
				let item = Config.daoju_204[one[i]];
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + item.icon + ".png", s["s"+i]);
				icoName.text = "未镶嵌";
				icoATT.visible = false;
			} else {
				let item = Config.daoju_204[level];
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + item.icon + ".png", s["s"+i]);
				icoATT.visible = true;
				icoName.text = ConfigHelp.getItemColorName(level);
				icoATT.text = ConfigHelp.makeAttrTextArr(JSON.parse(gemcfg.attr), "   ");//属性
			}
		}

		// var starStr: string = "";//星级
		// for (var i = 0; i < 10; i++) {
		// 	var num = Math.floor(starLv / 10);
		// 	var num1 = starLv % 10;
		// 	if (i < num1) starStr += (num + 1);
		// 	else starStr += num;
		// }
		s.lb.text =ConfigHelp.getStarFontStr(vo.starLv);// starStr;//星星
	}

	public clear(): void {
		this.grid.showEff(false);
		if (this.parent)
			this.parent.removeChild(this);
	}
}