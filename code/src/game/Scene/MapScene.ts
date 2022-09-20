class MapScene extends MsgCenter {

	public mapView: egret.Sprite;
	public view_far: ScrollFarMap;
	public view: egret.Sprite;
	public map: ScrollMap;
	public unitLayer: DepSprite;

	/**忽略打断 */
	public ignoreBreak: boolean = true;
	/** 忽略霸体*/
	public ignoreBati = 1;

	/**是否显示打击碰撞 */
	public showHitBox: boolean = false;

	public left = 0;//场景左边区域限制
	public right = 100000000;//场景右边区域限制

	//场景处理器，每种场景都应该有一个
	public sceneCtrl: ISceneCtrl;
	public nextCtrl: ISceneCtrl;

	public pauseCounter = 0;

	public dt: number = 33;

	public scenetype = 0;

	/** 缓存正在转场中的场景类型 成功切换则会置空（用于做一些跳过onExit的逻辑） */
	public tempSceneType = 0;

	public random: GRandom = new GRandom();

	public fc = 0;

	public enterScene(scenetype) {
		//场景适配器
		this.scenetype = scenetype;
		this.tempSceneType = scenetype;
		var ctrl = SceneCtrl.getCtrl(scenetype);
		if (this.sceneCtrl) GGlobal.layerMgr.open(UIConst.SCENELOADING);
		this.enterSceneCtrl(ctrl);
	}

	public setUnitLayerVis(v) {
		this.unitLayer.visible = v;
	}

	public setScrollMapVis(v) {
		this.map.visible = v;
		this.view_far.visible = v;
		this.setUnitLayerVis(v);
	}

	public enterSceneCtrl(ctrl: ISceneCtrl) {
		if (this.sceneCtrl) {
			ViewBattlePrompt.show(0);
			// console.log("退出时间" + DateUtil.getHMSBySecond2(Math.floor(Model_GlobalMsg.getServerTime() / 1000)));
			this.sceneCtrl.onExit(this);
		}
		this.sceneCtrl = ctrl;
		this.tempSceneType = 0;
		let sceneCtrl = SceneCtrl;
		if (this.scenetype == sceneCtrl.GUANQIA) {
			GGlobal.layerMgr.close2(UIConst.ALERT);
		}
		this.sceneShow();
		if (ctrl) {
			this.map.watchFocus(0, 0);
			this.moveMidbg(0);
			// console.log("进入时间" + DateUtil.getHMSBySecond2(Math.floor(Model_GlobalMsg.getServerTime() / 1000)));
			ctrl.onEnter(this);
		}
		GGlobal.control.notify(Enum_MsgType.SCENE_CHANGE);
	}

	/**场景显示 */
	public sceneShow() {
		let isCityState = false;
		if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
			isCityState = true;
		}
		let uist;//UI状态
		switch (this.scenetype) {
			case SceneCtrl.GUANQIA:
				if (GGlobal.modelGuanQia.inGuanQiaBoss()) {//关卡BOSS不显示龙头
					uist = MainUIController.GUANQIABOSS;
				} else {
					uist = MainUIController.GUANQIA;
				}
				if (isCityState && GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {//主城不显示龙头
					let mainTown = GGlobal.layerMgr.getView(UIConst.MAINTOWN);
					mainTown.visible = true;
					uist = MainUIController.MAINTOWN;
				}
				break;
			case SceneCtrl.GUANQIABOSS_HELP:
				uist = MainUIController.GUANQIABOSS;
				break;
			case SceneCtrl.SGWS:
			case SceneCtrl.CROSS_WARS:
			case SceneCtrl.WA_KUANG:
			case SceneCtrl.SHAOZHU_ESCORT:
				if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
					let mainTown = GGlobal.layerMgr.getView(UIConst.MAINTOWN);//先处理主城的逻辑
					if (mainTown) mainTown.visible = false;
				}
				uist = MainUIController.VIDEOTAPE;
				break;
			default:
				if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
					let mainTown = GGlobal.layerMgr.getView(UIConst.MAINTOWN);//先处理主城的逻辑
					if (mainTown) mainTown.visible = false;
				}
				uist = MainUIController.BATTLE;
				break;
		}
		GGlobal.mainUICtr.setState(uist);
	}

	/**是否是普通场景 */
	public static checkIsComoon(isMsg: boolean = false): boolean {

		return false;
	}

	public constructor() {
		super();
		this.mapView = new egret.Sprite();

		this.view_far = new ScrollFarMap();

		this.view = new egret.Sprite();
		let sw = App.stage.stageWidth;
		let sh = App.stage.stageHeight;
		// this.view.graphics.beginFill(0x0, 1);
		// this.view.graphics.drawRect(0, 0, sw, sh);
		this.map = new ScrollMap();

		this.view.addChild(this.map);

		this.unitLayer = new DepSprite();
		this.map.addChild(this.unitLayer);

		this.mapView.addChild(this.view_far);
		this.mapView.addChild(this.view);

		//this.map.setHead("5");
		this.initMapCustom();
	}

	public initWithID(id, force?: boolean) {
		var cfg = Config.map_200[id];
		if (cfg) {
			if (id != GGlobal.sceneID || force) {
				this.destoryMapSkin(id);
				GGlobal.sceneID = id;
				GGlobal.control.notify(Enum_MsgType.ENTER_SCENE);
				View_MapPanel.show();
				this.view_far.enterMap(id);
			}
			this.mapsizeW = cfg.c;
			this.initMapCustom();
			this.map.setHead1(cfg.s, id);
			SoundManager.getInstance().playBGM(cfg.b);
		}
	}

	private resourceDic = {};
	public destoryMapSkin(id) {
		if (id && GGlobal.sceneID) {
			var cfg = Config.map_200[id];
			var curCfg = Config.map_200[GGlobal.sceneID];
			let srcID = cfg.s;
			let curSrcID = curCfg.s;
			let dic = this.resourceDic;
			if (srcID != curSrcID) {
				let now = egret.getTimer();
				dic[srcID] = now;
				dic[curSrcID] = now;
				for (let i in dic) {
					if (now - dic[i] > 60000) {
						var imgType: string = "jpg";
						if (cfg.type != 0) imgType = "png";
						var imgUrlNear = "resource/map/" + i + "/clipmap/0_0." + imgType;
						RESManager.destoryRes(imgUrlNear);
						delete dic[i];
						return;
					}
				}
			}
		}
	}

	public mapsizeW: number = 960;
	public initMapCustom() {
		var stage = GGlobal.stage;
		this.map.va = { numRow: 1, numCol: 1 };
		this.map.blockSizeW = this.mapsizeW;
		this.map.blockSizeH = 1136;
		this.map.initCustom(stage.stageWidth, 1136, this.right, 1000);
		this.map.updateViewLimit();
		this.map.itemCreateFunc = ScrollMapRepeatItem.CREATEFUNC;
	}

	public moveMidbg(v) {
		this.view_far.move();
	}

	public isShake_: number = 1;
	public shake(shakex = 1, shakey = 1) {
		if (this.isShake_ == 1) {
			this.isShake_ = 2;
			egret.Tween.get(this.mapView).to({ x: this.mapView.x + shakex, y: this.mapView.y + shakey }, 300, MapScene.SHAKEEASE).call(this.onShakeEnd);
		}
	}

	public onShakeEnd() {
		var self = GGlobal.mapscene;
		self.isShake_ = 1;
		self.mapView.x = 0;
		self.mapView.y = 0;
	}

	public static SHAKEEASE(value: number): number {
		var ret;
		var a = value * 2 % 1.0;
		ret = Math.sin(a * Math.PI * 2);
		return ret;
	}

	public units = {};
	public list = [];
	public addUnit(u: ISceneObject) {
		if (!this.units[u.id]) {
			this.units[u.id] = u;
			this.list.push(u);
			u.scene = this;
			u.onAdd();
		}
	}

	public removeUnit(u: ISceneObject) {
		if (u) {
			u.onRemove();
			this.list[this.list.indexOf(u)] = null;
			delete this.units[u.id];
			if (Model_player.voMine && Model_player.isMineID(u.id)) {
				Model_player.voMine.sceneChar = null;
			}
		}

	}

	public getUnit(id): any {
		var ret = this.units[id];
		return ret;
	}

	private heartbeatTime = 0;
	public ctx: any = {};
	public time200 = 0;
	public frameInterv = 0;//顿帧时间 0-33都相当于默认帧频 越大越卡
	public intervTime = 0;
	public update(dt): void {
		var self = this;

		self.intervTime += dt;
		if (self.intervTime < self.frameInterv) {
			return;
		}
		self.intervTime = 0;

		self.dt = dt;
		var ctx = self.ctx;
		ctx.dt = dt;

		if (self.pauseCounter) {
			return;
		}

		var list = self.list;
		var len = self.list.length;
		var cleanflag;
		for (var i = 0; i < len;) {
			var term: ISceneObject = self.list[i];
			if (!term) {
				i++;
				cleanflag = 1;
				continue;
			}
			ctx.d = null;
			term.update(ctx);
			if (ctx.d) {
				delete self.units[term.id];
				list[i] = null;
				term.onRemove();
				len--;
			} else {
				i++;
			}
		}

		if (cleanflag) {
			ArrayUitl.cleannull(list);
		}

		self.time200 += dt;
		if (self.time200 >= 300) {
			self.unitLayer.sortChild();
			self.time200 = 0;
		}

		if (self.sceneCtrl) {
			self.sceneCtrl.update(ctx);
		}
		Model_player.skillCDUpdate(ctx);
		self.heartbeatTime += dt;
		if (self.heartbeatTime >= 2000) {
			self.heartbeatTime = 0;
			// GGlobal.modelScene.CG_HEARTBEAT_181();
		}
	}

	public removes(filter: Function, arg) {
		for (var i = 0, len = this.list.length; i < len; i++) {
			var u: SceneCharRole = this.list[i] as SceneCharRole;
			if (u && filter(u, arg)) {
				this.removeUnit(u);
			}
		}
	}

	public removeAll() {
		var units = this.units;
		for (var k in units) {
			var u: ISceneObject = units[k];
			// if (u instanceof SceneCharRole) {
			// 	console.log("怪物名字" + u.name + "怪物气血" + u.curhp);
			// }
			if (u) u.onRemove();
			delete units[k];
		}
		this.units = {};
		this.list.length = 0;
		if (Model_player.voMine) {
			Model_player.voMine.sceneChar = null;
		}
	}

	/**获取场景中某个势力所有单位个数 */
	public getForceCount(force: number): number {
		var list = this.list;
		var ret = 0;
		for (var i = list.length - 1; i >= 0; i--) {
			var u: SceneCharRole = list[i] as SceneCharRole;
			if (u && u.force == force && u.charType != 2) {
				ret++;
			}
		}
		return ret;
	}

	/**获取场景中某个势力所有单位的总血量 */
	public getForceHp(force: number): number {
		var list = this.list;
		var ret = 0;
		for (var i = list.length - 1; i >= 0; i--) {
			var u: SceneCharRole = list[i] as SceneCharRole;
			if (u && u.charType != 2 && u.force == force && u.curhp > 0) {
				ret += u.curhp;
			}
		}
		return ret;
	}

	/**清除场景中某个势力 */
	public clearForce(force: number): void {
		var list = this.list;
		var ret = 0;
		for (var i = list.length - 1; i >= 0; i--) {
			var u: SceneCharRole = list[i] as SceneCharRole;
			if (u && u.force == force) {
				u.takeMaxHurt();
			}
		}
	}

	public bufArr = [];
	/** 如果不传入 arr来存放匹配的对象 请不要持久保存arr 否则会被其他地方调用删除 */
	public filterRole(filter: Function, arg = null, arg2 = null, arr: any[] = null): Array<any> {
		if (!arr) {
			arr = this.bufArr;
			arr.length = 0;
		}
		var list = this.list;
		var len = this.list.length;
		for (var i = 0; i < len; i++) {
			var term: SceneObject = this.list[i];
			if (term && filter(term, arg, arg2)) {
				arr.push(term);
			}
		}
		return arr;
	}

	public getBestRole(scoreFunc: Function, arg = null, arg2 = null, thisArg = null): any {
		var bestScore = -1;
		var best;
		var list = this.list;
		var len = this.list.length;
		for (var i = 0; i < len; i++) {
			var term: SceneObject = this.list[i];
			if (term) {
				var score = scoreFunc(term, arg, arg2, thisArg);
				if (score >= 0 && score >= bestScore) {
					bestScore = score;
					best = term;
				}
			}
		}
		return best;
	}

	public moveRole(role: SceneCharRole, x, y, h) {
		role.x += x;
		role.y += y;

		var nh = role.h + h;
		if (nh < 0) {
			nh = 0;
		}
		role.h = nh;
	}

	public hasRole(matchFunc, arg): boolean {
		var list = this.list;
		var len = this.list.length;
		for (var i = 0; i < len; i++) {
			var term: SceneObject = this.list[i];
			if (matchFunc(term, arg)) {
				return true;
			}
		}
		return false;
	}

	public setRoleXY(role: SceneCharRole, x, y) {
		role.x = x;
		role.y = y;
	}

	public getLifeHero() {
		var vo = Model_player.voMine;
		var mainRole: SceneCharRole = this.getUnit(vo.id);
		return mainRole;
	}

	public watchMainRole(offx: number = 0) {
		var mainRole: SceneCharRole = this.getLifeHero();
		if (mainRole) {
			this.map.watchFocus(mainRole.x + offx, mainRole.y);
			this.moveMidbg(mainRole.x + offx);
		}
	}

	/**是否显示其他玩家的伤害值 role攻击者  role1被攻击者*/
	public setHurtState(role: SceneCharRole, ctx, role1: SceneCharRole): any {
		ctx.clearHurt = null;
		ctx.isClearShow = null;
		if (this.ctx.clearHurt) {
			ctx.clearHurt = true;
		}
		if (this.ctx.isClearShow) {
			if (role1.id != Model_player.voMine.id && role1.charType == 1) {
				ctx.isClearShow = true;
			}
		}
		return ctx;
	}

	protected rec: fairygui.GGraph;
	/**场景是否灰化 */
	public isGrey(bo: boolean): void {
		if (bo) {
			if (!this.rec) {
				this.rec = new fairygui.GGraph();
				this.rec.drawRect(0, 0, 0, 0x000000, 1);
				this.rec.setSize(480, 800);
				this.rec.alpha = .5;
			}
			if (!this.rec.parent) {
				GGlobal.layerMgr.UI_MainBottom.addChildAt(this.rec, 0);
			}
			// this.view.filters = Color.disabled;
			// this.unitLayer.filters = Color.disabled;
		} else {
			if (this.rec && this.rec.parent) {
				this.rec.parent.removeChild(this.rec);
				this.rec.graphics.clear();
			}
			this.rec = null;
			// this.view.filters = [];
			// this.unitLayer.filters = [];
		}
	}

	public scale: number = 1;
	public scaleScene(x: number = 0.8, y: number = 0.8): void {
		this.scale = x;
		this.view.scaleX = x;
		this.view.scaleY = y;
	}

	public static ISLIFEENEMY(term: SceneCharRole, myforce: number): Boolean {
		if (term.objType == 1 && term && term.curhp > 0 && term.force != 0 && term.force != myforce) {
			return true;
		}
	}

	public static ISMONEY(term: SceneCharRole, myrole: SceneCharRole): Boolean {
		if (term.objType == 20) {
			return true;
		}
	}

	public static NEARESTENEMYFUNC(term: SceneCharRole, role: SceneCharRole, arg2) {
		if (term.objType == 1 && term.force && term.force != role.force) {
			var subx = term.x - role.x;
			var suby = term.y - role.y;
			var far: number = subx * subx + (suby) * (suby);
			return 100000000000 - far;
		}
		return -1;
	}

	public static NEARESTLIFEENEMYFUNC(term: SceneCharRole, role: SceneCharRole, arg2) {
		if (term.objType == 1 && term.force && term.curhp > 0 && term.force != role.force) {
			var subx = term.x - role.x;
			var suby = term.y - role.y;
			var far: number = subx * subx;
			return 100000000000 - far;
		}
		return -1;
	}

	public setLeftAndRight(left: number = 50, right: number = 99999999) {
		this.left = left;
		this.right = right;
	}
}