class SanGuoZSItemPre extends fairygui.GComponent {

	public imgBg: fairygui.GImage;
	public qizi: fairygui.GLoader;
	public rankLb: fairygui.GRichTextField;
	public battleBt: fairygui.GButton;
	public saodangBt: fairygui.GButton;
	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public boxName: fairygui.GGroup;

	public static URL: string = "ui://me1skowleia55y";

	private awatar: UIRole = null;

	public static createInstance(): SanGuoZSItemPre {
		return <SanGuoZSItemPre><any>(fairygui.UIPackage.createObject("Arena", "SanGuoZSItemPre"));
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

	private _vo: Vo_SGZS;
	public set vo(vo: Vo_SGZS) {
		let self = this;
		self._vo = vo;
		if (vo) {
			var headPic = Config.shezhi_707[vo.headId];
			self.rankLb.text = "第" + ConfigHelp.NumberToChinese(vo.rank) + "名";
			self.qizi.url = fairygui.UIPackage.getItemURL("Arena", "qizi" + vo.rank);
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
				self.awatar.setPos(self.imgBg.width / 2, self.imgBg.y + 100);
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
			self.awatar.onAdd();
			self.addChild(self.battleBt);
			self.addChild(self.saodangBt);
			self.addChild(self.powerLb);
			self.addChild(self.nameLb);
			self.addChild(self.qizi);
			self.addChild(self.rankLb);
			self.powerLb.text = vo.power + ""
			
			
			if(vo.horseId){
				let modH = Config.mod_200[moxing].zh
				self.boxName.y = self.imgBg.y + 100 - modH - 57
			}else{
				let modH = Config.mod_200[moxing].h
				self.boxName.y = self.imgBg.y + 100 - modH - 57
			}
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