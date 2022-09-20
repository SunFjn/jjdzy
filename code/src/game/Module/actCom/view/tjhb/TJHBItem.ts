/**
 * 天降红包item
 */
class TJHBItem extends fairygui.GComponent{
	public c1: fairygui.Controller;
	public lbName:fairygui.GRichTextField;
	public viewHead: ViewHead;
	public canGetGroup: fairygui.GGroup;
	public hasGetGroup: fairygui.GGroup;
	public btnGet: Button2;
	public iconYuanBao: fairygui.GLoader;
	public totalLab:fairygui.GRichTextField;
	public residueLab:fairygui.GRichTextField;
	public timeLab:fairygui.GRichTextField;
	public labCheck: fairygui.GRichTextField;
	public lbRob: fairygui.GRichTextField;
	public qiangguang: fairygui.GImage;
	public qiangdao: fairygui.GGroup;
	private _mc: Part;

	private _vo:HBVo;

	public static URL:string = "ui://fm0lrzcttl0c1";

	public static createInstance():TJHBItem {``
		return <TJHBItem><any>(fairygui.UIPackage.createObject("ActCom_TJHB","TJHBItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.labCheck.text = HtmlUtil.createLink("查看大家手气", true);
	}

	public setVo(vo:HBVo, isPlayEff:boolean = false)
	{
		let self = this;
		self._vo = vo;
		if(!vo)   return;

		if(isPlayEff)
		{
			if (!self._mc) {
				self._mc = EffectMgr.addEff("uieff/10094", self.displayListContainer, self.width / 2  - 8, self.height / 2 - 38, 500, 500, false);
				self._mc.refThis = self;
				self._mc.refKey = "_mc";
			}
			Timer.instance.callLater(self.runAfterMc, 500, self);
		}else {
			if (Timer.instance.has(self.runAfterMc, self))
				Timer.instance.remove(self.runAfterMc, self);
			if (self._mc) {
				EffectMgr.instance.removeEff(self._mc);
			}
			self.changeData();
		}
	}

	private runAfterMc() {
		let self = this;
		self.changeData();
		let cfg:any;
		if(self._vo.isSystemHB == 0)
		{
			cfg = Config.tjhb_296[self._vo.hbType];
		}else{
			cfg = Config.tjhbsys_296[self._vo.hbType];
		}
		if(cfg)
		{
			let rewardArr = ConfigHelp.makeItemListArr(cfg.hb);
			for (let i = 0; i < rewardArr.length; i++) {
				let v = rewardArr[i];
				v.count = self._vo.robNum;
			}
			GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, rewardArr);
		}
		Model_ActComTJHB.id = 0;
	}

	/**
	 * 改变数据
	 */
	private changeData()
	{
		let self = this;
		if(self._vo.isSystemHB == 0)//不是系统红包
		{
			self.c1.selectedIndex = 1;
			self.lbName.text = self._vo.name;
			self.viewHead.setdata(self._vo.headId, -1, "", 0, false, self._vo.frameId, 0);
		}else{
			self.c1.selectedIndex = 0;
			let cfg:Itjhbsys_296 = Config.tjhbsys_296[self._vo.hbType];
			self.timeLab.text = "(" + cfg.time + ")";
		}

		self.canGetGroup.visible = false;
		self.hasGetGroup.visible = false;
		if(self._vo.hbStatus == 1)//红包可抢
		{
			self.canGetGroup.visible = true;
			self.btnGet.checkNotice = true;
			self.btnGet.addClickListener(self.onGet, self);
			let cfg:any;
			if(self._vo.isSystemHB == 0)
			{
				cfg = Config.tjhb_296[self._vo.hbType];
			}else{
				cfg = Config.tjhbsys_296[self._vo.hbType];
			}
			let id:number = Number(ConfigHelp.SplitStr(cfg.hb)[0][0]);
			let v = VoItem.create(id);
			let num:number = Number(ConfigHelp.SplitStr(cfg.hb)[0][2]);
			IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
			self.totalLab.text = num + "";
			self.residueLab.text = "剩余个数：" + self._vo.hbNum + "/" + cfg.sl;
		}else{
			self.hasGetGroup.visible = true;
			self.labCheck.addEventListener(egret.TextEvent.LINK, self.onTFClick, self);
			if(self._vo.hbStatus == 2)//已经抢过
			{
				self.qiangdao.visible = true;
				self.lbRob.text = self._vo.robNum + "";
				self.qiangguang.visible = false;
			}else{//已抢光
				self.qiangdao.visible = false;
				self.qiangguang.visible = true;
			}
		}
	}

	/**
	 * 领红包
	 */
	private onGet(e: egret.TouchEvent): void {
		let self = this;
		if(!self._vo)   return;

		if (TimeUitl.cool("TJHBRefresh", 1000)) {
			GGlobal.model_TJHB.CG_GET(self._vo.hbId);
		}
	}

	private onTFClick(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.TJHB_RECORD, { vo: this._vo });
	}
}