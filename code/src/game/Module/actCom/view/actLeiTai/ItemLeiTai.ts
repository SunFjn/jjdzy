class ItemLeiTai extends fairygui.GButton {

	public imgBg: fairygui.GImage;
	public ctBg: fairygui.GImage;
	public lbTil0: fairygui.GRichTextField;
	public lbCt: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	public lbTil1: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public gName: fairygui.GGroup;
	public uirole: fairygui.GLoader;

	public static URL: string = "ui://rhfap29in0931";

	public static createInstance(): ItemLeiTai {
		return <ItemLeiTai><any>(fairygui.UIPackage.createObject("actComLeiTai", "ItemLeiTai"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.btn.addClickListener(s.onReward, s);
	}

	private awatar: UIRole = null;
	private _vo: Vo_ActLeiTai
	public setVo(v: Vo_ActLeiTai, idx: number) {
		let self = this;
		self._vo = v;
		if (idx == 0) {
			self.lbTil0.text = v.cfg.name
			self.lbTil1.text = ""
		} else {
			self.lbTil0.text = ""
			self.lbTil1.text = v.cfg.name
		}

		let ply: Vo_ActLeiTaiPly = v.plyArr ? v.plyArr[0] : null;
		if (ply && (ply.npcId > 0 || ply.szId > 0)) {
			if (!self.awatar) {
				self.awatar = UIRole.create();
				self.awatar.setPos(0, 0);
				self.awatar.uiparent = self.uirole.displayObject as egret.DisplayObjectContainer;
				self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
			}
			let moxing = 0;
			if (ply.npcId) {
				self.awatar.setBody(ply.npcCfg.mod);
				if (ply.npcCfg.weapon) {
					self.awatar.setWeapon(ply.npcCfg.mod);
				} else {
					self.awatar.setWeapon(null);
				}
				self.awatar.setGodWeapon(0);
				self.awatar.setHorseId(0);
				self.lbName.text = ply.npcCfg.name
			} else {
				let fscfg = Config.sz_739[ply.szId];
				if (fscfg) {
					moxing = fscfg.moxing;
					self.awatar.setBody(moxing);
					self.awatar.setWeapon(ply.szId);
				} else {
					moxing = ply.szId;
					self.awatar.setBody(moxing);
					self.awatar.setWeapon(moxing);
				}
				self.awatar.setGodWeapon(ply.godWeapon);
				self.awatar.setHorseId(ply.horseId);
				if (ply.horseId) {
					self.awatar.setScaleXY(0.6, 0.6);
				} else {
					self.awatar.setScaleXY(1, 1);
				}
				var modCfg = Config.mod_200[ply.szId];
				self.lbName.text = ply ? ply.name : "";
			}
			self.awatar.onAdd();
			self.gName.visible = true;

			let len = 0;//除去空值
			for (let i = 0; i < v.plyArr.length; i++) {
				if (v.plyArr[i]) {
					len++;
				}
			}
			self.lbCt.text = "人数:   " + len + "/3";
		} else {
			self.clearAwa();
			self.lbName.text = "";
			self.gName.visible = false;
			self.lbCt.text = "";
		}


	}

	public get vo() {
		return this._vo;
	}

	public clean(): void {
		super.clean();
		this.clearAwa();
	}

	private clearAwa() {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}

	private onReward() {
		GGlobal.layerMgr.open(UIConst.ACTCOM_LEITAI_REWARD, this._vo);
	}
}