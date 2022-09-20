class VBaZTItem extends fairygui.GButton {

	public imgAdd: fairygui.GImage;
	public imgName: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labNeed: fairygui.GTextField;

	public static URL: string = "ui://xrzn9ppaf8nk5";

	public static createInstance(): VBaZTItem {
		return <VBaZTItem><any>(fairygui.UIPackage.createObject("baZhenTu", "VBaZTItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
	}
	public index: number;//1-8
	private _vo;
	public setVo(v: VoBaZhenTu) {
		this._vo = v;
		if (v && v.id != 0) {
			// this.labName.text = v.name
			// this.labName.color = Color.QUALITYCOLOR[v.pz];
			this.labName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
			ImageLoader.instance.loader(Enum_Path.BAZHENTU_URL + v.icon + ".png", this.imgIcon);
			this.imgIcon.visible = true;

			this.imgAdd.visible = false;
			this.imgName.visible = true;
			this.labNeed.text = ""
			this.checkNotice = (Model_BaZhenTu.canUpLevel(v) || Model_BaZhenTu.canUpStar(v) || Model_BaZhenTu.canUpPower(this.index - 1))
		} else {
			this.imgName.visible = false;
			this.imgIcon.visible = false;
			this.labName.text = ""

			if (Model_BaZhenTu.getIsLock(this.index)) {//锁着
				this.imgAdd.visible = false;
				let v = Config.bzt_261[this.index];
				if (this.index > 8) {
					this.labNeed.text = "符文\n" + v.fw + "级"
					let cost = Number(JSON.parse(v.xh)[0][2]);
					let red = (Model_BaZhenTu.getTotalLv() < v.fw) || (Model_player.voMine.yuanbao < cost)
					this.labNeed.color = red ? Color.REDINT : Color.GREENINT
					this.checkNotice = !red;
				}
				else if (v.vip == 0) {
					this.labNeed.text = v.lv + "级"
					this.labNeed.color = Color.REDINT
					this.checkNotice = false;
				} else {
					this.labNeed.text = v.lv + "级\n(VIP" + v.vip + ")"
					this.labNeed.color = Color.REDINT
					this.checkNotice = false;
				}
			} else {
				this.imgAdd.visible = true;
				this.labNeed.text = ""
				this.checkNotice = Model_BaZhenTu.canWear(this.index - 1)
			}
		}
	}

	public get vo(): VoBaZhenTu {
		return this._vo;
	}


	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		if (this._checkNotice != value) {
			this._checkNotice = value;
			this.noticeImg.visible = value;
		}
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}