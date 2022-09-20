class ChildGm extends fairygui.GComponent {

	public lbInput: fairygui.GTextInput;
	public lbInput0: fairygui.GTextInput;
	public lbTitle: fairygui.GTextField;
	public btnSend: fairygui.GButton;
	public lbTitle0: fairygui.GTextField;

	public static URL: string = "ui://vm9a8xq87jrg1";

	public static createInstance(): ChildGm {
		return <ChildGm><any>(fairygui.UIPackage.createObject("GM", "ChildGm"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbInput = <fairygui.GTextInput><any>(this.getChild("lbInput"));
		this.lbInput0 = <fairygui.GTextInput><any>(this.getChild("lbInput0"));
		this.lbTitle = <fairygui.GTextField><any>(this.getChild("lbTitle"));
		this.btnSend = <fairygui.GButton><any>(this.getChild("btnSend"));
		this.lbTitle0 = <fairygui.GTextField><any>(this.getChild("lbTitle0"));

		this.lbInput.color = 0xffffff;
		this.lbInput0.color = 0xffffff;
		this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendMsg, this);
		// this.lbInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTips,this);
		// this.lbInput0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTips,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.closeTips, this);
	}

	public set vo(v: any) {
		this.arg = v;
		var style: number = this.arg.style;
		this.fillText();
		this.lbInput.removeEventListener(egret.TextEvent.CHANGE, this.onTextChangeHandler, this);
		this.lbInput.removeEventListener(egret.TextEvent.FOCUS_IN, this.onTextChangeHandler, this);

		if (style == Model_GM.TYPE1_TOOP_EQUIP || style == Model_GM.TYPE5_WDTX || style == Model_GM.TYPE6_HUO_BI) {
			this.lbInput.addEventListener(egret.TextEvent.CHANGE, this.onTextChangeHandler, this);
			this.lbInput.addEventListener(egret.TextEvent.FOCUS_IN, this.onTextChangeHandler, this);
		} else if (style == Model_GM.TYPE2_INPUT) {
		} else if (style == Model_GM.TYPE3_NO_INPUT) {
			this.lbInput.visible = false;
		} else if (style == Model_GM.TYPE4_TIMER) {
			// this.imgback.width = 300;
			this.lbInput.width = 300;
		} else {
		}
	}

	protected onSendMsg(e: egret.Event): void {
		var content = this.lbInput.text.toString();
		var style: any = this.arg.style;
		if (this.arg.type == "addEnemy") {
			this.createEnemy(content);
			GGlobal.layerMgr.close2(UIConst.GM);
			return;
		} else if (this.arg.type == "removeEnemys") {
			this.removeEnemys();
			return;
		} else if (this.arg.type == "updateRole") {
			this.updateSkill(parseInt(content));
			return;
		} else if (this.arg.type == "openConsole") {
			if (HLSDK.whalePbSDK) {
				HLSDK.whalePbSDK.setDebug(true);
			}
			return;
		} else if (this.arg.type == "pvpBattle") {
			let ba = new BaseBytes();
			ba.writeByte(parseInt(content));
			GGlobal.modelGM.sendSocket(3869, ba);
			GGlobal.layerMgr.close2(UIConst.GM);
			return;
		}

		if (style == Model_GM.TYPE1_TOOP_EQUIP || style == Model_GM.TYPE6_HUO_BI) {
			var msg: string = this.msgMake(content);
			if (msg == null) {
				ViewCommonWarn.text("没有该名字物品");
			} else {
				GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, msg);
			}
		} else if (style == Model_GM.TYPE2_INPUT) {
			if (this.lbInput0.visible == true) {
				content = content + "_" + this.lbInput0.text;
			}
			if (this.arg.type == 1 && this.arg.index == 99) {
				if (Config.zhuansheng_705[content] == null) {
					ViewCommonWarn.text("没有该转生id");
					return;
				}
			} else if (this.arg.type == 5 && this.arg.index == 9999) {
				eval(content);
				return
			}
			GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, content);
			this.arg.text = content;
		} else if (style == Model_GM.TYPE3_NO_INPUT) {
			if (this.lbInput0.visible == true) {
				content = content + "_" + this.lbInput0.text;
			}
			GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, content);
		} else if (style == Model_GM.TYPE5_WDTX) {
			var msg: string = this.msgMake(content);
			GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, msg);
		} else {
			if (this.lbInput0.visible == true) {
				content = content + "_" + this.lbInput0.text;
			}
			GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, content);
		}
	}

	public closeTips() {
		var style: any = this.arg.style;
		if (style == Model_GM.TYPE1_TOOP_EQUIP || style == Model_GM.TYPE6_HUO_BI) {
		} else {
			ViewGmTip.instance.hide();
		}
	}

	public createEnemy(content) {
		if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
			var scene = GGlobal.mapscene;
			scene.clearForce(2);
			let enemyArr = content.split("_");
			for (let i = 0; i < enemyArr.length; i++) {
				var enemy = (scene.sceneCtrl as any).createEmeny(enemyArr[i]);
				(scene.sceneCtrl as any).setMonsterPos(enemy)
				var ai = new GuanQiaCommonAI();
				ai.role = enemy;
				enemy.addPlug(ai);
				scene.addUnit(enemy);
			}
		}
	}


	public updateSkill(id: number): void {
		var cfgInfo = Config.NPC_200[id];
		var skills: Array<any> = JSON.parse(cfgInfo.skill);
		var arr = [];
		let role = Model_player.voMine.sceneChar;
		if (skills) {
			for (var i = 0; i < skills.length; i += 1) {
				var pg = Vo_Skill.create(parseInt(skills[i][0]), parseInt(skills[i][1]), 1);
				arr.push(pg);
			}
			Model_player.voMine.chongId = 0;
			// Model_player.voMine.body = cfgInfo.mod;
			Model_player.voMine.setBody(cfgInfo.mod);
			Model_player.voMine.skillList = arr;
			role.attack_index = 1;
			role.attackCount = 0;
			role.waitRushID = 0;
			role.waitSkillID = 0;
			role.skillList = arr;
			if (cfgInfo.weapon) {
				Model_player.voMine.weapon = cfgInfo.mod;
				role.setWeapon(cfgInfo.mod);
			} else {
				Model_player.voMine.weapon = 0;
				role.setWeapon(0);
			}
			role.setBody(cfgInfo.mod);
		}
	}

	public removeEnemys() {
		if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
			var enemys = GGlobal.mapscene.filterRole(MapScene.ISLIFEENEMY, 1);
			for (var i = 0; i < enemys.length; i++) {
				GGlobal.mapscene.removeUnit(enemys[i]);
			}
		}
	}

	public msgMake(context: string): string {
		if (this.arg.style == Model_GM.TYPE1_TOOP_EQUIP) {//道具和装备
			var itemLib = Config.daoju_204;
			var equipLib = Config.zhuangbei_204;
			var id = Number(context)
			for (var key in itemLib) {
				var itemInfo = itemLib[key];
				var itemName: string = itemInfo.name;
				var itemID: number = itemInfo.id;
				if (itemName == context) {
					return "1_" + this.inputId + "_" + this.lbInput0.text;
				} else if (id != undefined && itemID == id) {
					return "1_" + id + "_" + this.lbInput0.text;
				}
			}

			for (var key in equipLib) {
				var equipInfo = equipLib[key];
				var equipName: string = equipInfo.n;
				var equipID: number = equipInfo.id;
				if (equipName == context) {
					return "2_" + this.inputId + "_" + this.lbInput0.text;
				} else if (id != undefined && equipID == id) {
					return "1_" + id + "_" + this.lbInput0.text;
				}
			}
		} else if (this.arg.style == Model_GM.TYPE5_WDTX) {//问鼎天下
			return this.inputId + "_" + this.lbInput0.text;
		} else if (this.arg.style == Model_GM.TYPE6_HUO_BI) {//货币
			let huoBiList = Model_GM.HUO_BI_LIST;
			for (let key in huoBiList) {
				let temp = huoBiList[key];
				let nameTemp = temp.text;
				let idTemp = temp.id;
				if (nameTemp == context) {
					return this.inputId + "_" + this.lbInput0.text;
				} else if (idTemp == parseInt(context)) {
					return context + "_" + this.lbInput0.text;
				}
			}
		}


		return null;
	}

	protected onTextChangeHandler(event: egret.TextEvent): void {
		if (this.lbInput.text == "") {
			ViewGmTip.instance.hide();
			return;
		}
		if (this.arg.style == Model_GM.TYPE1_TOOP_EQUIP) {//道具和装备
			ViewGmTip.instance.show(this.lbInput.text, this.setInputLink, this, Model_GM.TYPE1_TOOP_EQUIP);
		} else if (this.arg.style == Model_GM.TYPE5_WDTX) {//问鼎天下
			ViewGmTip.instance.show(this.lbInput.text, this.setInputLink, this, Model_GM.TYPE5_WDTX);
		} else if (this.arg.style == Model_GM.TYPE6_HUO_BI) {//货币
			ViewGmTip.instance.show(this.lbInput.text, this.setInputLink, this, Model_GM.TYPE6_HUO_BI);
		}
	}

	public inputId: string = "410001";
	public setInputLink(v: any): void {
		this.lbInput.text = v.text;
		this.inputId = v.id;
	}

	public arg: any;

	public fillText(): void {
		var title: any = this.arg.title;
		var text: any = this.arg.text;

		this.lbTitle0.visible = true;
		this.lbInput0.visible = true;
		this.lbInput.visible = true;
		this.lbInput.width = 127;
		this.lbTitle.visible = true;
		// this.imgback.width = 132;
		// this.imgback.visible = true;
		// this.imgback0.width = 78;
		// this.imgback0.visible = true;

		if (title[1] != null) {
			this.lbTitle.text = title[0];
			this.lbInput.text = text[0];
			this.lbTitle0.text = title[1];
			this.lbInput0.text = text[1];
		} else {
			this.lbTitle.text = title;
			this.lbInput.text = text;
			this.lbTitle0.visible = false;
			this.lbInput0.visible = false;
			// this.imgback0.visible = false;
		}
	}
}