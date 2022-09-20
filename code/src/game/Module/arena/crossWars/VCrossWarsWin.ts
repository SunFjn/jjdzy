class VCrossWarsWin extends fairygui.GComponent {

	public imgPower: fairygui.GImage;
	public imgBg: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public lbZs: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public roleModel: EmptyComp;

	public static URL: string = "ui://me1skowlhfct4b";

	public static createInstance(): VCrossWarsWin {
		return <VCrossWarsWin><any>(fairygui.UIPackage.createObject("crossKing", "VCrossWarsWin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setVo(v: Vo_CrossWarsPly, index) {
		let self = this;
		var zsLevel = Config.lsxxkf_232[index]
		if (zsLevel) {
			var zsLevelArr = ConfigHelp.SplitStr(zsLevel.zs)
			var zsMin = Math.floor(Number(zsLevelArr[0][0]) / 1000)
			var zsMax = Math.floor(Number(zsLevelArr[0][1]) / 1000)
			self.lbZs.text = zsMin + "-" + zsMax + "转"
		} else {
			self.lbZs.text = ""
		}
		if (v) {
			self.lbName.text = v.name1
			self.lbPower.text = "战力：" + v.power1;
			self.roleModel.setUIRole(v.job1, v.weakean1, v.horseId1);
			if (v.horseId1) {
				self.roleModel.getUIRole().setScaleXY(0.6, 0.6);
			} else {
				self.roleModel.getUIRole().setScaleXY(1, 1);
			}
		} else {
			self.lbName.text = "暂无"
			self.lbPower.text = ""
			self.clearAwatar();
		}
	}


	public setVoWars(v: Vo_CrossWarsPly, index) {
		let self = this;
		self.imgPower.visible = false;
		self.lbZs.text = ""
		if (index == 1) {
			if (v && v.name1) {
				self.roleModel.setUIRole(v.job1, v.weakean1, v.horseId1)
				if (v.horseId1) {
					self.roleModel.getUIRole().setScaleXY(0.6, 0.6);
				} else {
					self.roleModel.getUIRole().setScaleXY(1, 1);
				}
				self.lbPower.text = "战力：" + v.power1
				self.lbName.text = v.name1

				if (v.battleRes == 2) {
					self.lbPower.color = 0x999999;
				} else {
					self.lbPower.color = 0xffffff;
				}
			} else {
				self.clearAwatar();
				self.lbPower.text = ""
				self.lbName.text = "暂无"
			}
		}
		else if (index == 2) {
			if (v && v.name2) {
				self.roleModel.setUIRole(v.job2, v.weakean2, v.horseId2)
				if (v.horseId2) {
					self.roleModel.getUIRole().setScaleXY(0.6, 0.6);
				} else {
					self.roleModel.getUIRole().setScaleXY(1, 1);
				}
				self.lbPower.text = "战力：" + v.power2
				self.lbName.text = v.name2;

				if (v.battleRes == 1) {
					self.lbPower.color = 0x999999;
				} else {
					self.lbPower.color = 0xffffff;
				}
			} else {
				self.clearAwatar();
				self.lbPower.text = ""
				self.lbName.text = "暂无"
			}
		}
	}

	public clean(): void {
		super.clean();
		this.clearAwatar();
	}

	private clearAwatar() {
		let self = this;
		self.roleModel.setUIRole(null);
	}
}