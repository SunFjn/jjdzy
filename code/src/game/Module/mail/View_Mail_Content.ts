class View_Mail_Content extends UIModalPanel {

	public drawBt: fairygui.GButton;
	public closeBt: fairygui.GButton;
	public contentLb: fairygui.GTextField;
	public list: fairygui.GList;
	public drawImg: fairygui.GImage;
	public static URL: string = "ui://uwarq7k4sl2fg";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("Mail", "View_Mail_Content").asCom;
		this.contentPane = this.view;
		this.drawBt = <fairygui.GButton><any>(this.view.getChild("drawBt"));
		this.drawBt.addClickListener(this.drawHandle, this);
		this.contentLb = <fairygui.GTextField><any>(this.view.getChild("contentLb"));
		this.drawImg = <fairygui.GImage><any>(this.view.getChild("drawImg"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		super.childrenCreated();
	}

	public renderHandle(index: number, obj: fairygui.GObject): void {
		let grid: ViewGrid = obj as ViewGrid;
		grid.isShowEff = true;
		grid.vo = this.vo.adjunct[index];
		grid.tipEnabled = true;
	}

	private drawHandle(event: egret.TouchEvent) {
		if (this.vo.adjunctState == 1) {
			if (Model_Bag.checkBagCapacity()) {
				GGlobal.modelMail.drawMail(this.vo.sid);
			}
		}
	}

	private vo: Vo_Mail;
	public updateShow(): void {
		this.vo = this._args;
		this.contentLb.text = this.vo.content;
		/**0没有附件。1有附件。2附件已领* */
		this.drawImg.visible = this.vo.adjunctState == 2;
		this.drawBt.visible = this.vo.adjunctState == 1;
		this.updateAdjunct();
	}

	/**更新附件显示* */
	private updateAdjunct() {
		if (this.vo.adjunctState == 0) {
			this.list.numItems = 0;
		} else {
			this.list.numItems = this.vo.adjunct.length;
		}
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.control.listen(Enum_MsgType.MAIL_CONTENT_SHOW, this.updateShow, this);
	}

	protected onHide(): void {
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.MAIL_CONTENT);
		GGlobal.control.remove(Enum_MsgType.MAIL_CONTENT_SHOW, this.updateShow, this);
	}
}