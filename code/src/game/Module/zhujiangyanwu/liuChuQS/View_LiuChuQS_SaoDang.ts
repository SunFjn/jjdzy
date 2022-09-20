class View_LiuChuQS_SaoDang extends UIModalPanel {

	public lab: fairygui.GRichTextField;
	public labList: fairygui.GRichTextField;
	public list: fairygui.GList;
	public labGuan: fairygui.GRichTextField;
	public btnSure: fairygui.GButton;

	public static URL: string = "ui://7a366usasr401h";

	public static createInstance(): View_LiuChuQS_SaoDang {
		return <View_LiuChuQS_SaoDang><any>(fairygui.UIPackage.createObject("zjyw", "View_LiuChuQS_SaoDang"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("zjyw", "View_LiuChuQS_SaoDang").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);
		this.list.itemRenderer = this.rendHandler;
		this.list.callbackThisObj = this;
		super.childrenCreated();
	}
	private _dropArr: IGridImpl[]

	protected onShown(): void {
		this.addListen();
		this.update(this._args)
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		this.btnSure.addClickListener(this.closeEventHandler, this);
	}

	private removeListen(): void {
		this.list.numItems = 0;
		this.btnSure.removeClickListener(this.closeEventHandler, this);
	}

	private update(arr: Array<any>): void {
		let guanTxt = ""
		this._dropArr = []
		for (let i = 0; i < arr.length; i++) {
			let guan = arr[i].guan
			let cfg = Config.six_279[guan]
			let k = guan % 1000
			if (i == 0) {
				guanTxt += cfg.big + "第" + k + "关";
			} else if (i == arr.length - 1) {
				guanTxt += "-" + cfg.big + "第" + k + "关";
			}
			let dropArr = ConfigHelp.makeItemListArr(arr[i].drop);
			//合并奖励
			for (let m = 0; m < dropArr.length; m++) {
				let has = false;
				let mvo = dropArr[m]
				if (mvo.gType != Enum_Attr.EQUIP) {//装备不合并
					for (let n = 0; n < this._dropArr.length; n++) {
						let nvo = this._dropArr[n]
						if (mvo.gType == nvo.gType && mvo.id == nvo.id) {
							nvo.count += mvo.count;
							has = true;
							break;
						}
					}
				}
				if (!has) {
					this._dropArr.push(mvo);
				}
			}
		}

		this.labGuan.text = guanTxt
		this.list.numItems = this._dropArr.length
	}

	private rendHandler(index, grid: ViewGrid) {
		grid.tipEnabled = true;
		grid.isShowEff = true;
		grid.vo = this._dropArr[index]
	}
}