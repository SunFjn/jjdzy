/**
 * 少主护送主界面
 */
class ShaoZhuEscortView extends UIPanelBase{
	public escortTxt: fairygui.GRichTextField;//护送次数
	public interTxt: fairygui.GRichTextField;//拦截次数
	public timeTxt: fairygui.GRichTextField;//剩余时间
	public escortBtn: Button1;//护送按钮
	public btnReport: Button2;
	public maskBg: fairygui.GComponent;
	private shape:egret.Shape;
	private localX:number = 0;
	private radomPointArr = [[-131,74],[-46,218],[-177,372],[-268,74],[-359,377],[-459,74],[-353,218],[-541,375]];//随机出生点数组
	private radomIndexArr = [];
	public c1:fairygui.Controller;
	public bgImg: fairygui.GLoader;

	public static URL: string = "ui://lnw94ki2lnit6";

	public static createInstance(): ShaoZhuEscortView {
		return <ShaoZhuEscortView><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortView"));
	}

	public constructor() {
		super();
		this.setSkin("ShaoZhuEscort", "ShaoZhuEscort_atlas0", "ShaoZhuEscortView");
	}

	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(EscortUIRole.URL, EscortUIRole);
	}

	protected initView() { 
		
	}

	protected onShown() {
		let s = this;
		IconUtil.setImg1(Enum_Path.PIC_URL + "shaozhuEscort.jpg", this.bgImg);
		GGlobal.modelShaoZhuEscort.CG_OPEN_UI();
		this.addListen();
	}

	protected onHide() {
		let s = this;
		s.removeListen();
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT);
		IconUtil.setImg1(null, this.bgImg);
	}

	/**
	 * 添加事件
	 */
	public addListen(): void
	{
		let self = this;
		GGlobal.control.listen(UIConst.SHAOZHU_ESCORT, self.updatePage, self);
		self.escortBtn.addClickListener(this.openRefreshView, this);
		self.btnReport.addClickListener(this.onReport, this);
		self.addEventListener(egret.Event.ENTER_FRAME,self.onEnterFrame,self);
		GGlobal.reddot.listen(UIConst.SHAOZHU_ESCORT, self.checkNotice, self);
		GGlobal.control.listen("GC_INTER_SHAOZHUESCORT", self.updateTxt, self);
	}

	/**
	 * 删除事件
	 */
	public removeListen(): void{
		let self = this;
		Timer.instance.remove(self.onTick, self);
		GGlobal.control.remove(UIConst.SHAOZHU_ESCORT, self.updatePage, self);
		self.escortBtn.removeClickListener(this.openRefreshView, this);
		self.btnReport.removeClickListener(this.onReport, this);
		self.removeEventListener(egret.Event.ENTER_FRAME,self.onEnterFrame,self);
		self.removeAllRole();
		GGlobal.reddot.remove(UIConst.SHAOZHU_ESCORT, self.checkNotice, self);
		GGlobal.control.remove("GC_INTER_SHAOZHUESCORT", self.updateTxt, self);
	}

	private  onEnterFrame(e:egret.Event){
		if(!this.roleArr || this.roleArr.length <= 0)  return;

		let len:number = this.roleArr.length;
		for(var i:number = 0;i < len;i ++)
		{
			let role:EscortUIRole = this.roleArr[i];
			if(role)
			{
				let x:number = role.x + 0.5;
				if(x >= 600)
				{
					x = -100;
				}
				role.x = x;
			}
		}
	}

	/**
	 * 更新数据
	 */
	public updatePage()
	{
		let self = this;
		self.updateTxt();
		
		const end = Model_ShaoZhuEscort.endTime;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
        if (timeRemain > 0) {
			self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(end - servTime);
            Timer.instance.listen(self.onTick, self, 1000);
        } else {
			self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(0);
        }

		if(Model_ShaoZhuEscort.state == 0)
		{
			self.c1.selectedIndex = 0;
		}else{
			self.c1.selectedIndex = 1;
		}
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 0, Model_ShaoZhuEscort.isGetAward);
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 2, Model_ShaoZhuEscort.checkEscortNotice());
		self.escortBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 2);
		self.btnReport.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 1);

		if(Model_ShaoZhuEscort.isGetAward)
		{
			ShaoZhuEscortRewardView.show();
		}

		self.refreshRole();
	}

	/**
	 * 更新文本
	 */
	private updateTxt()
	{
		let self = this;
		let color0 = Model_ShaoZhuEscort.escort > 0 ? 2 : 6;
		let color1 = Model_ShaoZhuEscort.inter > 0 ? 2 : 6;
		self.escortTxt.text = "护送次数：" + HtmlUtil.fontNoSize(Model_ShaoZhuEscort.escort + "/" + Config.xtcs_004[7002].num, Color.getColorStr(color0));
		self.interTxt.text = "拦截次数：" + HtmlUtil.fontNoSize(Model_ShaoZhuEscort.inter + "/" + Config.xtcs_004[7003].num, Color.getColorStr(color1));
	}

	private onTick() {
        const end = Model_ShaoZhuEscort.endTime;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
        if (timeRemain > 0) {
			this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(end - servTime);
        } else {
            this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(0);
            Timer.instance.remove(this.onTick, this);
        }
    }

	private roleArr:Array<EscortUIRole> = [];
	/**
	 * 随机刷新人物
	 */
	private refreshRole()
	{
		this.removeAllRole();//先移除所有人物模型
		if(!Model_ShaoZhuEscort.roleArr || Model_ShaoZhuEscort.roleArr.length <= 0)  return;

		let len:number = Model_ShaoZhuEscort.roleArr.length;
		for(var i:number = 0;i < len;i ++)
		{
			let vo:Vo_EscortData = Model_ShaoZhuEscort.roleArr[i];
			let cfg:Iszhs_401 = Config.szhs_401[vo.guardId];
			let role:EscortUIRole = EscortUIRole.createInstance();
			role.setVo(cfg.pfmx,vo);
			if(Model_player.voMine.id != vo.playerId)
			{
				// role.x = Math.random() * -325;
				// role.y = 150 + Math.random() * 100;
				let arr:Array<number> = this.radomPoint(i);
				role.x = arr[0];
				role.y = arr[1];
			}else{//如果是玩家自己要从地图中间出现
				role.x = this.maskBg.width / 2 - role.width / 2;
				role.y = this.maskBg.height / 2 - role.height / 2;
			}
			this.maskBg.addChild(role);
			this.roleArr.push(role);
		}
	}

	/**
	 * 移除场景所有人物模型
	 */
	private removeAllRole()
	{
		let self = this;
		if(self.roleArr && self.roleArr.length > 0)
		{
			let len:number = self.roleArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let role:EscortUIRole = self.roleArr[i];
				role.remove();
				this.maskBg.removeChild(role);
				role = null;
			}
		}
		self.roleArr = [];
		self.radomIndexArr = [];
	}

	/**
	 * 随机不重复坐标点
	 */
	private radomPoint(index:number):Array<number>
	{
		let self = this;
		var radom:number;
		if(index == 0)
		{
			radom = Math.floor(Math.random() * 2);
		}else{
			radom = Math.floor(Math.random() * 8);
		}
		while(self.radomIndexArr.indexOf(radom) != -1)
		{
			radom = Math.floor(Math.random() * 8);
		}
		self.radomIndexArr.push(radom);
		let arr = self.radomPointArr[radom];
		return arr;
	}

	/**
	 * 护送按钮事件
	 */
	private openRefreshView(): void {
		if (Model_ShaoZhuEscort.escort <= 0) {
			ViewCommonWarn.text("今日护送次数已耗尽");
			return;
		}
		GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_GUARD);
	}

	/**
	 * 打开战报界面
	 */
	private onReport(): void {
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 1, false);
		this.btnReport.checkNotice = false;
		GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_REPORT);
	}

	/**
	 * 打开拦截界面
	 */
	private openInterView(e:egret.TouchEvent)
	{
		var role: UIRole = e.currentTarget as UIRole;
		GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_REPORT,role.data);
	}

	/**
	 * 战报红点
	 */
	public checkNotice() {
		this.btnReport.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 1);
	}
}