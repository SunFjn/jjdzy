class View_HSCB_RanK extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lbMy: fairygui.GRichTextField;
	public lbPass: fairygui.GRichTextField;

	public static URL: string = "ui://7a366usaql4nt";

	public static createInstance(): View_HSCB_RanK {
		return <View_HSCB_RanK><any>(fairygui.UIPackage.createObject("zjyw", "View_HSCB_RanK"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("zjyw", "View_HSCB_RanK").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);
		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}


	protected onShown(): void {
		this.addListen();
		GGlobal.modelRank.CG_GET_RANK_LIST(14)
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
	}

	private addListen(): void {
		GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, this.update, this)
	}

	private removeListen(): void {
		GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, this.update, this)
	}

	private _rankArr: VoRank[];
	private update() {
		let myRank = "20+"
		let myPass = ""
		this._rankArr = Model_Rank.rankData[14]
		if (this._rankArr) {
			for (let i = 0; i < this._rankArr.length; i++) {
				let v = this._rankArr[i];
				if (v.plyId == Model_player.voMine.id) {
					myRank = v.rank + ""
					myPass = v.params + ""
					break;
				}
			}
		}
		this.list.numItems = 20;
		this.lbMy.text = "我的排名：<font color='#26ED04'>" + myRank + "</font>";
		if (myPass) {
			this.lbPass.text = "通关数：<font color='#26ED04'>" + myPass + "</font>";
		} else {
			let curLayer = GGlobal.model_HSCB.curLayer
			this.lbPass.text = "通关数：<font color='#26ED04'>" + curLayer + "</font>";
		}
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: Item_HSCB_Rank = obj as Item_HSCB_Rank
		v.setVo(this._rankArr ? this._rankArr[index] : null, index + 1);
	}
}