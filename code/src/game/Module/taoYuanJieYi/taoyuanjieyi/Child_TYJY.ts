/**
 * 桃园结义子界面
 */
class Child_TYJY extends fairygui.GComponent implements IPanel{
	public c1: fairygui.Controller;
	public pageTxt: fairygui.GRichTextField;
	public applyList: fairygui.GList;
	public btnLeft: Button2;
	public btnRight: Button2;
	public createBtn: Button1;
	public bgImg: fairygui.GLoader;
	public nameTxt: fairygui.GRichTextField;
	public renameBtn: Button2;
	public gangList: fairygui.GList;
	public applyBtn: Button2;
	public memberBtn: Button2;
	public lbDesc: fairygui.GRichTextField;

	private _curPage:number = 1;
	private _listData:Array<TYJY_VO>;
	private _dage:number = 0;

	public static URL: string = "ui://m2fm2aiyihs7u";

	public static createInstance(): Child_TYJY {
		return <Child_TYJY><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "Child_TYJY"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);

		let self = this;
		self.applyList.callbackThisObj = self;
		self.applyList.itemRenderer = self.itemRender;

		self.gangList.callbackThisObj = self;
		self.gangList.itemRenderer = self.itemRender1;

		self.lbDesc.text = HtmlUtil.createLink("玩法说明", true);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	openPanel(pData?: any) {
		IconUtil.setImg(this.bgImg, Enum_Path.TYJY_URL + "bg_1.jpg");
		this.show();
	}

	closePanel(pData?: any) {
		this.onHide();
	}

	private show() {
		let self = this;
		GGlobal.control.listen(UIConst.TAOYUANJIEYI, self.updateView, self);
		self.btnLeft.addClickListener(self.onLeft, self);
		self.btnRight.addClickListener(self.onRight, self);
		self.createBtn.addClickListener(self.onCreate, self);
		self.renameBtn.addClickListener(self.onRename, self);
		self.applyBtn.addClickListener(self.onApply, self);
		self.memberBtn.addClickListener(self.onMember, self);
		self._curPage = 1;
		if(Model_player.voMine.tyjyId > 0)//有加入盟义
		{
			GGlobal.model_TYJY.CG_OPEN_MYGANG();
		}else{
			GGlobal.model_TYJY.CG_GET_INFOS(self._curPage);
		}
		GGlobal.reddot.listen(UIConst.TAOYUANJIEYI, self.updateApplyRed, self);
		self.lbDesc.addEventListener(egret.TextEvent.LINK, self.onTFClick, self);
		self.updateApplyRed();
	}

	protected onHide() {
		let self = this;
		GGlobal.control.remove(UIConst.TAOYUANJIEYI, self.updateView, self);
		self.applyList.numItems = 0;
		self.gangList.numItems = 0;
		self.btnLeft.removeClickListener(self.onLeft, self);
		self.btnRight.removeClickListener(self.onRight, self);
		self.createBtn.removeClickListener(self.onCreate, self);
		self.renameBtn.removeClickListener(self.onRename, self);
		self.applyBtn.removeClickListener(self.onApply, self);
		self.memberBtn.removeClickListener(self.onMember, self);
		IconUtil.setImg(self.bgImg, null);
		GGlobal.reddot.remove(UIConst.TAOYUANJIEYI, self.updateApplyRed, self);
		self.lbDesc.removeEventListener(egret.TextEvent.LINK, self.onTFClick, self);
	}

	private itemRender(idx, obj) {
		let item: TYJY_NoJoinItem = obj as TYJY_NoJoinItem;
		item.setdata(this._listData[idx]);
	}

	private itemRender1(idx, obj) {
		let item: TYJY_JoinItem = obj as TYJY_JoinItem;
		item.setdata(this._listData[idx], idx);
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.model_TYJY;
		if(Model_player.voMine.tyjyId > 0)//有加入盟义
		{
			self.c1.selectedIndex = 1;
			self.nameTxt.text = model.myGangName;
			self._listData = model.myGangList;
			self._listData.sort(self.sortFuc);
			self.gangList.numItems = 3;
			let len:number = model.myGangList.length;
			for(var i:number = 0;i < len;i ++)
			{
				let vo:TYJY_VO = model.myGangList[i];
				if(vo.position == 1)
				{
					self._dage = vo.playerId;
				}
			}
			self.applyBtn.visible = Model_player.voMine.id == self._dage ? true:false;
			if(self.applyBtn.visible)
			{
				self.memberBtn.x = 331;
			}else{
				self.memberBtn.x = 267;
			}
		}else{
			self.c1.selectedIndex = 0;
			self._listData = model.list;
			self.applyList.numItems = this._listData ? this._listData.length : 0;

			self.pageTxt.text = model.curPage + "/" + model.totalPage;
			self._curPage = model.curPage;
		}
	}

	private sortFuc(a: TYJY_VO, b: TYJY_VO): number {
        return a.position - b.position;
    }

	/**
	 * 左翻页事件
	 */
	private onLeft(e: egret.TouchEvent): void {
		this._curPage --;
		if(this._curPage < 1)
		{
			this._curPage = 1;
			return;
		}
		GGlobal.model_TYJY.CG_GET_INFOS(this._curPage);
	}

	/**
	 * 右翻页事件
	 */
	private onRight(e: egret.TouchEvent): void {
		this._curPage ++;
		if(this._curPage > GGlobal.model_TYJY.totalPage)
		{
			this._curPage = GGlobal.model_TYJY.totalPage;
			return;
		}
		GGlobal.model_TYJY.CG_GET_INFOS(this._curPage);
	}

	/**
	 * 创建义盟
	 */
	private onCreate(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.TYJY_CREATE, { type: 0 });
	}

	/**
	 * 修改义盟名字
	 */
	private onRename(e: egret.TouchEvent): void {
		if(Model_player.voMine.id != this._dage)
		{
			ViewCommonWarn.text("没有权限");
			return;
		}

		GGlobal.layerMgr.open(UIConst.TYJY_CREATE, { type: 1 });
	}

	/**
	 * 打开申请列表界面
	 */
	private onApply(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.TYJY_APPLY);
	}

	/**
	 * 打开人员调动界面
	 */
	private onMember(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.TYJY_MEMBER);
	}

	/**
	 * 更新申请按钮红点
	 */
	private updateApplyRed():void
	{
		this.applyBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.TAOYUANJIEYI, 0);
	}

	private onTFClick(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.TAOYUANJIEYI);
	}
}