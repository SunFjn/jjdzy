class ChatShaoZhuSkillGrid extends fairygui.GLabel {

	public iconImg: fairygui.GLoader;
	public lockImg: fairygui.GImage;
	public selImg: fairygui.GImage;
	public static URL: string = "ui://fx4pr5qeewn52k";

	public static createInstance(): ChatShaoZhuSkillGrid {
		return <ChatShaoZhuSkillGrid><any>(fairygui.UIPackage.createObject("chat", "ChatShaoZhuSkillGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.iconImg = <fairygui.GLoader><any>(this.getChild("iconImg"));
		this.lockImg = <fairygui.GImage><any>(this.getChild("lockImg"));
	}

	public cfg: Isonskill_267;
	public updateShow(nameStr: string, iconStr: string, isLock: boolean = false) {
		let self = this;
		if (isLock) {
			IconUtil.setImg(self.iconImg, null);
		} else {
			if (iconStr) {
				IconUtil.setImg(self.iconImg, Enum_Path.SKILL_URL + iconStr + ".png");
			} else {
				IconUtil.setImg(self.iconImg, null);
			}
		}
		self.setLock(isLock);
		if (nameStr) {
			self.title = nameStr;
		} else {
			self.title = "";
		}
	}

	public setLock(value) {
		this.lockImg.visible = value;
	}
}