/**
 * 少主护送人物模型
 */
class EscortUIRole extends fairygui.GComponent {
	private awatar: UIRole = null;
	private _data:Vo_EscortData;
	public interImg: fairygui.GImage;
	private shaozhuUI: UIRole;//少主模型
	public nameTxt: fairygui.GTextField;
	public timeTxt: fairygui.GTextField;

	public static URL: string = "ui://lnw94ki2n8o7s";

	public static createInstance(): EscortUIRole {
		return <EscortUIRole><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "EscortUIRole"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.addClickListener(self.clickRole, self);
		GGlobal.control.listen("GC_INTER_SHAOZHUESCORT", self.updateInterState, self);
	}

	public setVo(value: string | number, vo:Vo_EscortData = null) {
        const self = this;
		self._data = vo;
		if (!self.awatar) {
			self.awatar = UIRole.create();
		}
		self.awatar.uiparent = self.displayListContainer;
		self.awatar.setPos(self.width / 2, self.height);
		self.awatar.setScaleXY(0.8, 0.8);
		self.awatar.setBody(value);
		self.awatar.setDir(1);
		self.awatar.setWeapon(value);
		self.awatar.onAdd();
		self.awatar.setAction(1);
		if(vo.state == 1 && Model_player.voMine.id != vo.playerId)
		{
			self.interImg.visible = true;
		}else{
			self.interImg.visible = false;
		}
		self.nameTxt.text = vo.playerName;
		self.nameTxt.color = Model_player.voMine.id == vo.playerId?Color.YELLOWINT:Color.WHITEINT;
		const end = vo.timeRemain;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
        if (timeRemain > 0) {
			self.timeTxt.text = DateUtil.getMSBySec3(end - servTime);
            Timer.instance.listen(self.onTick, self, 1000);
        } else {
            self.timeTxt.text = DateUtil.getMSBySec3(0);
        }

		if (!self.shaozhuUI) {
			self.shaozhuUI = UIRole.create();
		}
		self.shaozhuUI.setPos(0, self.height);
		self.shaozhuUI.setScaleXY(0.8, 0.8);
		self.shaozhuUI.setBody(300001);
		self.shaozhuUI.uiparent = self.displayListContainer;
		self.shaozhuUI.onAdd();
		self.shaozhuUI.setAction(1);
    }

	private onTick() {
        const end = this._data.timeRemain;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
        if (timeRemain > 0) {
			this.timeTxt.text = DateUtil.getMSBySec3(end - servTime);
        } else {
            this.timeTxt.text = DateUtil.getMSBySec3(0);
            // Timer.instance.remove(this.onTick, this);
			this.remove();
        }
    }

	/**
	 * 更新拦截状态图标
	 */
	private updateInterState()
	{
		if(Model_ShaoZhuEscort.winerid == Model_player.voMine.id && Model_ShaoZhuEscort.interPlayerId == this._data.playerId)
		{
			this.interImg.visible = false;
		}
	}
    
	public remove() {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		if(self.interImg)
		{
			self.interImg.visible = false;
			self.interImg = null;
		}
		if(self.shaozhuUI)
		{
			self.shaozhuUI.onRemove();
			self.shaozhuUI = null;
		}
		if(self.timeTxt)
		{
			self.timeTxt.text = "";
			self.timeTxt = null;
		}
		if(self.nameTxt)
		{
			self.nameTxt.text = "";
			self.nameTxt = null;
		}
		self.removeClickListener(self.clickRole, self);
		Timer.instance.remove(self.onTick, self);
		GGlobal.control.remove("GC_INTER_SHAOZHUESCORT", self.updateInterState, self);
	}

	/**
	 * 打开拦截界面
	 */
	private clickRole()
	{
		if(Model_player.voMine.id == this._data.playerId)  return;

		GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_INTER,this._data);
	}
}