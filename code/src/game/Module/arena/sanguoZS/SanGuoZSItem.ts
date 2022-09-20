class SanGuoZSItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public rankLb: fairygui.GRichTextField;
	public imgBg: fairygui.GImage;
	public saodangBt: fairygui.GButton;
	public battleBt: fairygui.GButton;
	public powerLb: fairygui.GRichTextField;
	public boxRank: fairygui.GGroup;
	public imgDi: fairygui.GImage;
	public imgMin: fairygui.GImage;

	public static URL: string = "ui://me1skowlqiai4";

	private awatar: UIRole = null;

	public static createInstance(): SanGuoZSItem {
		return <SanGuoZSItem><any>(fairygui.UIPackage.createObject("sanguozs", "SanGuoZSItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.battleBt.addClickListener(self.battleHandle, self);
		self.saodangBt.addClickListener(self.battleHandle, self);
	}

	private battleHandle(): void {
		let s = this;
		SanGuoZSItem.onBattle(s.vo)
	}

	public static onBattle(v: Vo_SGZS) {
		if (Model_SGZS.battleNum > 0 || Model_Bag.getItemCount(Model_SGZS.ITEM_ID) > 0) {
			let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
			if (Model_SGZS.myRank < v.rank && vipcfg && vipcfg.SAODANGJJC == 1) {
				GGlobal.modelsgzs.CG_SANGUO_ZHANSHEN_SAODANG(v.roleId);
			} else {
				if (v.rank <= 3 && Model_SGZS.myRank > 10) {
					ViewCommonWarn.text("进入前10可挑战");
					return;
				}
				GGlobal.modelsgzs.CG_BATTLE_SANGUO_ZHANSHEN(v.roleId, v.rank);
			}
		} else {
			SanGuoZSItem.buyHandle();
		}
	}

	public static buyHandle(): void {
		if (Model_SGZS.buyNum <= 0) {
			ViewCommonWarn.text("已达购买上限");
			return;
		}
		let costNum = Config.xtcs_004[1006].num;;
		ViewAlertBuy.show(costNum, Model_SGZS.buyNum, Model_SGZS.buyNum, "", Handler.create(null, SanGuoZSItem.okHandle));
	}

	public static okHandle(count): void {
		if (Model_player.voMine.yuanbao < Config.xtcs_004[1006].num * count) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelsgzs.CG_BUYNUM_SANGUO_ZHANSHEN(count);
	}

	private _vo: Vo_SGZS;
	public set vo(vo: Vo_SGZS) {
		let self = this;
		self._vo = vo;
		if (vo) {
			var headPic = Config.shezhi_707[vo.headId];
			self.rankLb.text = "" + vo.rank;
			self.nameLb.text = vo.name;
			let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
			if (vo.roleId == Model_player.voMine.id) {
				self.saodangBt.visible = false;
				self.battleBt.visible = false;
			} else {
				self.saodangBt.visible = false;
				if (vipcfg && vipcfg.SAODANGJJC == 1) {
					self.saodangBt.visible = Model_SGZS.myRank < vo.rank;
					self.battleBt.visible = Model_SGZS.myRank > vo.rank;
				} else {
					self.battleBt.visible = true;
				}
			}

			if (!self.awatar) {
				self.awatar = UIRole.create();
				self.awatar.setPos(self.imgBg.width / 2, self.imgBg.y + 6);
				self.awatar.setScaleXY(1, 1);
			}

			let fscfg = Config.sz_739[vo.job];
			let moxing = 0;
			if (fscfg) {
				moxing = fscfg.moxing;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(vo.job);
			} else {
				moxing = vo.job;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(moxing);
			}
			self.awatar.setGodWeapon(vo.godWeapon);
			self.awatar.setHorseId(vo.horseId);
			// if (vo.horseId) {
			// 	self.awatar.setScaleXY(0.6, 0.6);
			// } else {
			// 	self.awatar.setScaleXY(1, 1);
			// }
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren= false;
			self.awatar.onAdd();
			self.addChild(self.battleBt);
			self.addChild(self.saodangBt);
			self.addChild(self.rankLb);
			self.addChild(self.imgDi);
			self.addChild(self.imgMin);

			self.powerLb.text = vo.power + ""

			let modH = Config.mod_200[moxing].h
			self.boxRank.y = self.imgBg.y + 6 - modH - 30
		} else {

		}
	}

	public get vo(): Vo_SGZS {
		return this._vo;
	}

	public clean() {
		super.clean();
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}

}