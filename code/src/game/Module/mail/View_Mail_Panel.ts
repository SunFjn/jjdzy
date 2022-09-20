class View_Mail_Panel extends UIPanelBase {


	public list: fairygui.GList;
	public delBt: Button0;
	public drawBt: Button1;
	public closeBt: fairygui.GButton;

	public static URL: string = "ui://uwarq7k4lfaz0";
	public constructor() {
		super();
		this.setSkin("Mail", "Mail_atlas0", "View_Mail_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(MailItem.URL, MailItem);
	}
	public initView(): void {
		super.initView();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		this.list.setVirtual();
		this.delBt.addClickListener(this.delMailHandle, this);
		this.drawBt.addClickListener(this.keyDrawHandle, this);
		GGlobal.modelMail.openPanel();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: MailItem = obj as MailItem;
		item.vo = Model_Mail.mailVoArr[index];
	}

	private keyDrawHandle(event: egret.TouchEvent): void {
		if (this.drawBt.checkNotice) {
			if (Model_Bag.checkBagCapacity()) {
				GGlobal.modelMail.keyDrawMail();
			}
		} else {
			ViewCommonWarn.text("没有可领取的奖励");
		}
	}

	private delMailHandle(event: egret.TouchEvent): void {
		let arr: Array<Vo_Mail> = Model_Mail.mailVoArr;
		let index: number = 0;
		for (let i = 0; i < arr.length; i++) {
			let vo: Vo_Mail = arr[i];
			if ((vo.adjunctState == 0 || vo.adjunctState == 2) && vo.readState == 1) {
				arr.splice(i, 1);
				i--;
				index++;
			}
		}
		if (index > 0) {
			GGlobal.modelMail.keyDelMail();
			GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
			this.updateShow();
		} else {
			ViewCommonWarn.text("已无可删除的邮件");
		}
	}

	public updateShow() {
		var arr: Array<Vo_Mail> = Model_Mail.mailVoArr;
		var index: number = 0;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].adjunctState == 1) {
				this.drawBt.checkNotice = true;
				index++;
				break;
			}
		}
		if (index == 0) this.drawBt.checkNotice = false;
		this.list.numItems = arr.length;
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.control.listen(Enum_MsgType.MAIL_LIST_UPDATE, this.updateShow, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.MAIL_PANEL);
		GGlobal.control.remove(Enum_MsgType.MAIL_LIST_UPDATE, this.updateShow, this);
		this.list.numItems = 0;
	}
}