class VCrossKingPly extends fairygui.GComponent {

	public btnChallenge: fairygui.GButton;
	public btSao: fairygui.GButton;
	public lbName: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public lbRank: fairygui.GTextField;
	public imgBg: fairygui.GImage;

	public static URL: string = "ui://me1skowlhfct3q";

	private awatar: UIRole = null;

	public static createInstance(): VCrossKingPly {
		return <VCrossKingPly><any>(fairygui.UIPackage.createObject("crossKing", "VCrossKingPly"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.btnChallenge.addClickListener(self.onChallenge, self);
		self.btSao.addClickListener(self.onSaoDan, self);
		self.btnChallenge.alpha = 0;
		self.btSao.visible = false;
	}

	private _vo: Vo_CrossKingPly
	public set vo(v: Vo_CrossKingPly) {
		let self = this;
		self._vo = v;
		if (v) {
			if (!self.awatar) {
				self.awatar = UIRole.create();
				self.awatar.setPos(self.imgBg.x, self.imgBg.y - 30);
			}
			self.lbName.text = v.name;
			self.lbPower.text = "战斗力：" + ConfigHelp.numToStr(v.power);
			self.lbRank.text = "排行" + v.rank;
			self.btnChallenge.touchable = true;
			let fscfg = Config.sz_739[v.job];
			let moxing = 0;
			if (fscfg) {
				moxing = fscfg.moxing;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(v.job);
			} else {
				moxing = v.job;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(moxing);
			}
			self.awatar.setGodWeapon(v.godWeapon);
			self.awatar.setHorseId(v.horseId);
			if (v.horseId) {
				self.awatar.setScaleXY(0.6, 0.6);
			} else {
				self.awatar.setScaleXY(1, 1);
			}
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.onAdd();
			self.addChild(self.btnChallenge);
			//扫荡
			if (Model_CrossKing.myGrade >= 13 && Model_CrossKing.myRank < v.rank && Model_player.voMine.str > v.power) {
				self.btSao.visible = true;
			} else {
				self.btSao.visible = false;
			}
		} else {
			self.lbName.text = "暂无"
			self.lbPower.text = ""
			self.lbRank.text = "";
			self.btnChallenge.touchable = false;
			self.removeListen()
			self.btSao.visible = false;
		}
	}

	public type: number = 1;
	private onChallenge(): void {
		let self = this;
		if (!self._vo) {
			return
		}
		if (Model_CrossKing.battleCount > 0 || Model_Bag.getItemCount(Model_CrossKing.ITEM_ID) > 0) {
			GGlobal.modelCrossKing.CG_CHALLENGE(self.type, self._vo.index, self._vo.sid)
		} else {
			Model_CrossKing.onAdd();
		}
	}

	private onSaoDan() {
		GGlobal.modelCrossKing.CG_SAO_DAN(this._vo.sid)
	}

	public removeListen(): void {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}
}