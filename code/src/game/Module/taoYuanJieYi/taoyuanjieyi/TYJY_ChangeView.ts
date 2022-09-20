/**
 * 桃园结义人员调动界面
 */
class TYJY_ChangeView extends UIModalPanel{
	public list: fairygui.GList;
	public leaveBtn: Button0;
	private _dage:number = 0;

	private _listData:Array<TYJY_VO>;

	public static URL: string = "ui://m2fm2aiyvfmx1a";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ChangeView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		self.leaveBtn.addClickListener(self.onLeave, self);
		GGlobal.control.listen(UIConst.TAOYUANJIEYI, self.updateList, self);
		self.updateList();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.leaveBtn.removeClickListener(self.onLeave, self);
		self._listData = [];
		GGlobal.control.remove(UIConst.TAOYUANJIEYI, self.updateList, self);
	}

	private itemRender(idx, obj) {
		let item: TYJY_ChangeItem = obj as TYJY_ChangeItem;
		item.setdata(this._listData[idx], this._dage == Model_player.voMine.id);
	}

	/**
	 * 更新列表数据
	 */
	private updateList():void
	{
		let self = this;
		self._listData = [];
		if(GGlobal.model_TYJY.myGangList)
		{
			let len:number = GGlobal.model_TYJY.myGangList.length;
			for(var i:number = 0;i < len;i ++)
			{
				let vo:TYJY_VO = GGlobal.model_TYJY.myGangList[i];
				if(vo.position == 1)
				{
					self._dage = vo.playerId;
				}
				if(vo.playerId != Model_player.voMine.id)
				{
					self._listData.push(vo);
				}
			}
		}
		self.list.numItems = 2;
	}

	/**
	 * 离开义盟
	 */
	private onLeave(e: egret.TouchEvent): void {
		ViewAlert.show("您是否要离开此义盟？", null, 3, "继续留下", "离开义盟", Handler.create(this, function(){GGlobal.model_TYJY.CG_QUIT()}));
	}
}