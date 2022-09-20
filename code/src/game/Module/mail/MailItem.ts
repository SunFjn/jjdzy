class MailItem extends fairygui.GComponent {

	public titleLb: fairygui.GTextField;
	public timeLb: fairygui.GTextField;
	public mailImg: fairygui.GLoader;
	public drawImg: fairygui.GImage;
	public drawBt: Button0;

	public static URL: string = "ui://uwarq7k4lfaz1";

	public static createInstance(): MailItem {
		return <MailItem><any>(fairygui.UIPackage.createObject("Mail", "MailItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.titleLb = <fairygui.GTextField><any>(this.getChild("titleLb"));
		this.timeLb = <fairygui.GTextField><any>(this.getChild("timeLb"));
		this.mailImg = <fairygui.GLoader><any>(this.getChild("mailImg"));
		this.drawImg = <fairygui.GImage><any>(this.getChild("drawImg"));
		this.drawBt = <Button0><any>(this.getChild("drawBt"));
		this.drawBt.addClickListener(this.drawHandle, this);
		this.addClickListener(this.contentHandle, this)
	}

	private contentHandle(): void {
		if (this.vo.content) {
			GGlobal.layerMgr.open(UIConst.MAIL_CONTENT, this.vo);
		} else {
			GGlobal.modelMail.getMailContent(this.vo.sid);
		}
	}

	private drawHandle(event: egret.TouchEvent): void {
		event.stopPropagation();
		if (this.vo.adjunctState == 1 && Model_Bag.checkBagCapacity()) {
			GGlobal.modelMail.drawMail(this.vo.sid);
		}
	}

	public set vo(vo: Vo_Mail) {
		this.data = vo;
		this.titleLb.text = vo.title;
		this.timeLb.text = DateUtil.getYMDHMS(vo.sendDate);
		if (vo.readState == 1) {
			this.mailImg.url = "ui://uwarq7k4k8ozl";
		} else {
			this.mailImg.url = "ui://uwarq7k4k8ozj";
		}
		this.drawImg.visible = vo.adjunctState == 2;
		this.drawBt.visible = vo.adjunctState == 1;
	}

	public get vo(): Vo_Mail {
		return this.data;
	}
}