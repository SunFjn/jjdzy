class ItemHSCB extends fairygui.GComponent {

	public img: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public imgPass: fairygui.GImage;

	public static URL: string = "ui://7a366usaql4ng";

	public static createInstance(): ItemHSCB {
		return <ItemHSCB><any>(fairygui.UIPackage.createObject("zjyw", "ItemHSCB"));
	}

	private awatar: UIRole = null;

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GImage><any>(this.getChild("img"));
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.imgPass = <fairygui.GImage><any>(this.getChild("imgPass"));
	}

	public set vo(v: Ihscb_751) {
		let self = this;
		self.lb.text = "第" + v.id + "关"


		if (v.id > GGlobal.model_HSCB.curLayer) {
			self.imgPass.visible = false
		} else {
			self.imgPass.visible = true
		}
		let arr = JSON.parse(v.boss)
		let npcId = Number(arr[0][0])
		let boVo = Config.NPC_200[npcId]

		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.img.x + self.img.width / 2, self.img.y);
			self.awatar.setScaleXY(1, 1);
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
		}
		self.awatar.setBody(boVo.mod);
        if (boVo.weapon) {
            self.awatar.setWeapon(boVo.mod);
        } else {
            self.awatar.setWeapon(null);
        }
		self.awatar.onAdd();
		self.addChild(self.imgPass)
	}

	public removeEvent(): void {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}


}