class TipWuJiangSkill extends UIModalPanel {

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

		this.c1 = this.view.getController("c1");
		this.labTitle = <fairygui.GTextField><any>(this.view.getChild("labTitle"));
		this.bg = <fairygui.GLoader><any>(this.view.getChild("bg"));
		this.imgIcon = <fairygui.GLoader><any>(this.view.getChild("imgIcon"));
		this.labName = <fairygui.GTextField><any>(this.view.getChild("labName"));
		this.labLevel = <fairygui.GTextField><any>(this.view.getChild("labLevel"));
		this.labPower = <fairygui.GTextField><any>(this.view.getChild("labPower"));
		this.labCur = <fairygui.GTextField><any>(this.view.getChild("labCur"));
		this.labAttrCur = <fairygui.GTextField><any>(this.view.getChild("labAttrCur"));
		this.labNext = <fairygui.GTextField><any>(this.view.getChild("labNext"));
		this.labAttrNext = <fairygui.GTextField><any>(this.view.getChild("labAttrNext"));
		this.labCondition = <fairygui.GTextField><any>(this.view.getChild("labCondition"));
		this.labNeedName = <fairygui.GTextField><any>(this.view.getChild("labNeedName"));
		this.btnUp = <Button0><any>(this.view.getChild("btnUp"));
		this.boxNeed = <ViewResource><any>(this.view.getChild("boxNeed"));
		this.boxUp = <fairygui.GGroup><any>(this.view.getChild("boxUp"));
		this.boxMax = <fairygui.GGroup><any>(this.view.getChild("boxMax"));
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.WU_JIANG_SKILL);
	}

	private addListen(): void {
		this.btnUp.addClickListener(this.onClickUp, this);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_UP_SKILL, this.update, this);
	}

	private removeListen(): void {
		this.btnUp.removeClickListener(this.onClickUp, this);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_UP_SKILL, this.update, this);
	}

	public onOpen(arg){
		super.onOpen(arg)
		this._vo = arg
		this.show();
	}

	private update(id): void {
		this._vo = Config.herolvskill_211[id];
		this.show();
	}

	private _vo: any;
	private show(): void {
		var obj = this._vo
		this.labName.text = obj.name
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + obj.icon + ".png", this.imgIcon);
		var level = Number(obj.id) % 1000;
		this.labLevel.text = level > 0 ? "Lv." + level : "";
		this.labPower.text = "战力：" + obj.power
		this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(obj.attr), "+")

		if (obj.power == 0) {
			this.btnUp.text = "激活";
		} else {
			this.btnUp.text = "升级";
		}
		if (obj.next == 0) {//已满级
			this.labNext.text = ""
			this.labAttrNext.text = "";
			this.boxUp.visible = this.boxUp.touchable = false;
			this.boxMax.visible = true;
			this.btnUp.checkNotice = false
			this.c1.selectedIndex = 1;
		} else {
			var nextObj = Config.herolvskill_211[obj.next]
			this.labNext.text = "下级效果"
			this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextObj.attr), "+");
			this.boxUp.visible = this.boxUp.touchable = true;
			this.boxMax.visible = false;
			this.labCondition.text = "升级条件：达到" + Config.herolv_211[obj.lv].jie
			this._condition = true;
			this._need = true;
			if (Model_WuJiang.jieShu >= obj.lv) {
				this.labCondition.color = 0x00ff00
			} else {
				this.labCondition.color = 0xff0000
				this._condition = false;
			}
			var consumeArr = ConfigHelp.SplitStr(obj.consume);
			this._needItem = VoItem.create(Number(consumeArr[0][1]));
			var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
			this.boxNeed.setLb(hasCont, Number(consumeArr[0][2]))
			this.boxNeed.setImgUrl(this._needItem.icon)
			if (hasCont < Number(consumeArr[0][2])) {
				this._need = false;
			}
			this.labNeedName.text = this._needItem.name
			this.btnUp.checkNotice = (this._condition && this._need)
			this.c1.selectedIndex = 0;
		}
	}

	private _condition: boolean = false;
	private _need: boolean = false;
	private _needItem: VoItem;
	private onClickUp(): void {
		if (!this._condition) {
			ViewCommonWarn.text("未满足升级条件");
			return;
		}
		if (!this._need) {
			View_CaiLiao_GetPanel.show(this._needItem);
			return;
		}
		GGlobal.modelWuJiang.CGJihuoSkill(this._vo.wz);
	}

}