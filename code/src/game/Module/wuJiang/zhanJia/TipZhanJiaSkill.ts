class TipZhanJiaSkill extends UIModalPanel {

	public c1:fairygui.Controller;
	public labTitle: fairygui.GTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labLevel: fairygui.GTextField;
	public labPower: fairygui.GTextField;
	public labCur: fairygui.GTextField;
	public labAttrCur: fairygui.GTextField;
	public labNext: fairygui.GTextField;
	public labAttrNext: fairygui.GTextField;
	public labCondition: fairygui.GTextField;
	public labNeedName: fairygui.GTextField;
	public btnUp: Button0;
	public boxNeed: ViewResource;
	public boxUp: fairygui.GGroup;
	public boxMax: fairygui.GGroup;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("wuJiang", "TipZhanJiaSkill").asCom;
		this.contentPane = this.view;

		CommonManager.parseChildren(this.view, this); 
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.ZHAN_JIA_SKILL);
	}

	private addListen(): void {
		this.btnUp.addClickListener(this.onClickUp, this);
		GGlobal.control.listen(Enum_MsgType.ZHANJIA_UP_SKILL, this.update, this);
	}

	private removeListen(): void {
		this.btnUp.removeClickListener(this.onClickUp, this);
		GGlobal.control.remove(Enum_MsgType.ZHANJIA_UP_SKILL, this.update, this);
	}

	public onOpen(arg):void{
		super.onOpen(arg)
		this._vo = arg
		this.show();
	}

	private update(id): void {
		this._vo = Config.clotheslvskill_212[id];
		this.show();
	}

	private _vo: any;
	private show(): void {
		var vo = this._vo
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
		this.labName.text = vo.name;
		this.labPower.text = "战斗力：" + vo.power
		this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(vo.attr), "+")
		var level = Number(vo.id) % 1000;
		if (level == 0) {
			this.labLevel.text = "";
			this.btnUp.text = "激活";
		} else {
			this.labLevel.text = "Lv." + level;
			this.btnUp.text = "升级";
		}
		if (vo.next == 0) {
			this.labNext.text = "";
			this.labAttrNext.text = "";
			this.labNeedName.text = ""
			this.boxNeed.visible = false;
			this.boxMax.visible = true;
			this.btnUp.touchable = this.btnUp.visible = false;
			this.labCondition.text = ""
			this.btnUp.checkNotice = false
			this.c1.selectedIndex = 1;
		} else {
			this.labNext.text = "下级效果";
			var nextVo = Config.clotheslvskill_212[vo.next];
			this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextVo.attr), "+");
			var consume = ConfigHelp.SplitStr(vo.consume);
			this._needItem = VoItem.create(Number(consume[0][1]));
			var count = Model_Bag.getItemCount(Number(consume[0][1]));
			this.labNeedName.text = this._needItem.name
			this.boxNeed.visible = true;
			this.boxMax.visible = false;
			this.boxNeed.setLb(count, Number(consume[0][2]));
			this.boxNeed.setImgUrl(this._needItem.icon);
			this._need = count >= Number(consume[0][2]);
			var clotheslv = Config.clotheslv_212[vo.lv];
			this.labCondition.text = "升级条件：达到" + clotheslv.jie;
			this.labCondition.color = Model_ZhanJia.jieShu >= vo.lv ? 0x00ff00 : 0xff0000;
			this._condition = Model_ZhanJia.jieShu >= vo.lv;
			this.btnUp.touchable = this.btnUp.visible = true;
			this.btnUp.checkNotice = (this._condition && this._need)
			this.c1.selectedIndex = 0;
		}
		this.btnUp.enabled = this._condition
	}

	private _condition: boolean = false;
	private _need: boolean = false;
	private _needItem:VoItem;
	private onClickUp(): void {
		if (!this._condition) {
			ViewCommonWarn.text("未满足升级条件");
			return;
		}
		if (!this._need) {
			View_CaiLiao_GetPanel.show(this._needItem);
			return;
		}
		var index = Model_ZhanJia.skillArr.indexOf(this._vo.id);
		if (index != -1) {
			GGlobal.modelZhanJia.CGJihuoSkill(index + 1)
		}
	}
}