class ArpgRole extends SceneObject {
	public scene001: ArpgMap;

	public aniTime = 0;
	public aniInterv = 1000;

	protected start_x: number; start_y: number;
	public end_x: number; end_y: number;
	public moveType: number;
	protected dx: number; dy: number;
	protected lastTime: number = 0;
	protected allTime: number = 0;
	_speed = 200;
	set speed(val) {
		this._speed = val;
	}
	get speed() {
		return this._speed;
	}


	public namey = -225;

	public effPart: Part;
	public shadow: Part;
	public parts: Parts;
	public view: DepSprite;
	public headGroup: egret.Sprite;

	public plugs = [];
	public plugCtx: any = {};
	public dead;

	/** -1:朝向左 1:朝向右 */
	public faceDir = 1;
	public move_state = 0;
	public invalid = 0;// |1：皮肤有更新
	public nameBarVild = 0;
	public weaponDown = false;

	//目前只在粮草争夺有用到。
	camp = 0;
	name = "";
	body = 0;
	weapon = 0;
	shouHun = 0;
	weaponpic = "";

	title = 0;
	country = 0;
	jiangxian = 0;
	godWeapon = 0;
	godWeaponpic = "";
	userData;//存贮任意类型的数据

	public constructor() {
		super();
		var self = this;
		self.objType = 1;
		self.view = new DepSprite();

		self.createParts();

		self.headGroup = new egret.Sprite();
		self.headGroup.y = self.namey + 15;
		self.headGroup.x = 10;
		self.view.addChild(self.headGroup);

		self.headGroup.touchChildren = self.headGroup.touchEnabled = false;
	}

	public isHero(): boolean {
		return Model_player.isMineID(this.id);
	}

	vo;
	initData(vo: Vo_ArpgPlayer) {
		let s = this;
		s.vo = vo;
		s.id = vo.id;
		s.speed = vo.speed;
		s.setBody(vo.body);
		s.setShouhun(vo.shouhun);
		s.setWeapon(vo.body);
		s.setName(vo.name);
		s.setCountry(vo.country);
		s.setTitle(vo.title);
		s.setNameY();
		s.setGodWeapon(vo.godWeapon)
		s.setHorseId(vo.horseId)
	}

	public createParts() {
		let s = this;
		var shadow: StaticPart = s.shadow = new StaticPart();
		shadow.setVal("s/1");
		shadow.setAct(4);
		s.view.addChild(shadow.mc);

		s.parts = new Parts();
		s.view.addChild(s.parts);

		var body: Part = new Part();
		body.type = Parts.T_BODY;
		body.dep = Parts.P_BODY;
		s.parts.addPart(body);
	}

	public update(ctx) {
		var self = this;
		var len = self.plugs.length;
		var plugArg = self.plugCtx;

		var plugDirty = 0;
		for (var i = 0; i < len; i++) {
			var plug = self.plugs[i];
			if (!plug) {
				plugDirty++;
				continue;
			}
			plugArg.d = 0;
			plugArg.dt = ctx.dt;
			plug.update(plugArg);
			if (plugArg.d) {//dead
				self.plugs[i] = null;
				plug.onRemove();
				plugDirty++;
			} else {
			}
		}
		ctx.d = self.dead;
		if (plugDirty) {
			ArrayUitl.cleannull(self.plugs);
		}

		self.view.x = self.x;
		self.view.y = self.y;
		self.parts.y = -self.h;

		self.updateState();

		self.aniTime += ctx.dt;
		var perc = self.aniTime / self.aniInterv;
		self.parts.perc = perc;

		if (self.h > 0) {
			self.h -= 2;
			if (self.h < 0) {
				self.h = 0;
			}
		}

		self.view.dep = self.y;

		this.move(ctx.now);
		if (self._checkArea)
			self.checkArea();
		if (ctx.logicTime)
			self.checkAlpha();

		self.showShouHun();
	}

	public checkAlpha() {
		var alp: boolean = AStar.getAlpha(this.x, this.y);
		if (alp) {
			this.view.alpha = 0.6;
		} else {
			this.view.alpha = 1;
		}
	}

	public setMoveState(val) {
		if (this.move_state != val) {
			this.move_state = val;
			this.invalid |= 1;
		}
	}

	public setCountry(val) {
		let s = this;
		if (s.country == val) return;
		s.country = val;
		s.nameBarVild |= 1;
	}

	public setTitle(val) {
		let s = this;
		if (s.title == val) return;
		s.title = val;
		s.nameBarVild |= 1;
	}

	public setJiangXian(val) {
		let s = this;
		if (s.jiangxian == val) return;
		s.jiangxian = val;
		s.nameBarVild |= 1;
	}

	public setName(val) {
		let s = this;
		if (s.name == val) return;
		s.name = val;
		s.nameBarVild |= 1;
	}

	public refreshName() {
		this.nameBarVild |= 1;
	}

	public setNameY() {
		let s = this;
		var cfg = Config.mod_200[s.body];
		if (cfg) {
			let namey;
			if (s.horseId) {
				namey = -cfg.zh
			} else {
				namey = -cfg.h
			}
			if (s.namey != namey) {
				s.headGroup.y = namey;
				s.namey = namey;
			}
			if (s.shouHun) {
				let shPart: Part = s.parts.dic[3];
				if (shPart) {
					let shXY
					if (s.horseId) {
						shXY = JSON.parse(cfg.zsh)
					} else {
						shXY = JSON.parse(cfg.sh)
					}
					shPart.mc.x = shXY[0][0];
					shPart.mc.y = shXY[0][1];
				}
			}
		}
	}

	public getBody(): number {
		return this.body;
	}

	public setBody(v) {
		let s = this;
		if (s.body != v) {
			s.body = v;
			s.invalid |= 1;
		}
	}

	public setShouhun(v) {
		let s = this;
		const cfg = Config.shhx_266[v];
		if (!cfg) {
			return;
		}
		this.shouHun = cfg.mod;
		if (v && v != this.shouHun) {
			this.invalid |= 1;
		} else {
			this.parts.removePartByType(Parts.T_SHOUHUN);//移除PAR
		}
	}

	/**读取 神兵shengjie_305 表里面的图片字段 */
	public setWeapon(v) {
		let s = this;
		if (s.weapon != v) {
			if (v) {
				s.weaponpic = v + "";
			} else {
				s.weaponpic = undefined;
			}
			s.weapon = v;
			s.invalid |= 1;
		} else {
		}
		if (!v) {
			s.parts.removePartByType(Parts.T_WEAPON);//移除PART
		}
	}

	public setGodWeapon(v) {
		let s = this;
		if (Config.sb_750[v]) {
			v = Config.sb_750[v].moxing;
		} else if (Config.sbpf_750[v]) {
			v = Config.sbpf_750[v].mx;
		}
		if (s.godWeapon != v) {
			if (v) {
				s.godWeaponpic = v + "";
			} else {
				s.godWeaponpic = undefined;
			}
			s.godWeapon = v;
			s.invalid |= 1;
		} else {
		}
		if (!v) {
			s.parts.removePartByType(Parts.T_WEAPON);//移除PART
		}
	}
	horseId: number = 0
	horseMod: string = null
	public setHorseId(v) {
		let s = this;
		if (s.horseId != v) {
			s.horseId = v;
			let cfg = Config.zq_773[v]
			s.horseMod = cfg ? cfg.model + "" : null
			s.invalid |= 1;
		}
	}

	public showFilter(){
		if(this.view)this.view.filters = Color.FILTER_GREEN;
	}

	public hideFilter(){
		if(this.view)this.view.filters = null;
	}


	public setDir(dir) {
		let s = this;
		if (s.faceDir != dir) {
			s.faceDir = dir;
			s.invalid |= 2;
		}
	}

	public faceX(x) {
		let s = this;
		if (x >= s.x) {
			s.setDir(1);
		} else {
			s.setDir(-1);
		}
	}

	public updateState() {
		let s = this;
		var invalid = s.invalid;
		if (invalid) {
			if (invalid & 1) {//action
				s.updateAction();
			}
			if (invalid & 2) {//way
				s.updateWay();
			}
			s.invalid = 0;
		}
	}

	public setPlayTime(interval = 1000, loop = true, reset = true) {
		let s = this;
		s.aniInterv = interval;
		s.parts.ptype = loop ? Parts.DIS_REAPEAT : Parts.DIS_ONCE;
		if (reset) {
			s.aniTime = 0;
		}
		s.invalid |= 1;
	}

	public updateAction() {
		var self = this;
		var urlkey;
		var weaponkey;
		var actkey = 1;
		var needSort: boolean;
		var isWeaponDown = false;
		var body = self.body;
		var weaponpic = self.godWeapon > 0 ? self.godWeaponpic : self.weaponpic;
		var horseMod = self.horseMod;
		var horseWingUrl = "";
		if (self.move_state) {
			if (horseMod) {
				horseMod = "body/" + horseMod + "/ride/ani";
				horseWingUrl = "body/" + self.horseMod + "/wing/ani";
				urlkey = "body/" + body + "/ride/ani";
				if (weaponpic) {
					// weaponkey = "weapon/" + weaponpic + "/ride/ani";
					weaponkey = null;//骑马没武器by 离水
				}
			} else {
				urlkey = "body/" + body + "/run/ani";
				if (weaponpic) {
					weaponkey = "weapon/" + weaponpic + "/run/ani";
				}
			}
		} else {
			if (horseMod) {
				horseMod = "body/" + horseMod + "/ride_st/ani";
				horseWingUrl = "body/" + self.horseMod + "/wing_st/ani";
				urlkey = "body/" + body + "/ride_st/ani";
				if (weaponpic) {
					// weaponkey = "weapon/" + weaponpic + "/ride_st/ani";
					weaponkey = null;
				}
			} else {
				urlkey = "body/" + body + "/stand/ani";
				if (weaponpic) {
					weaponkey = "weapon/" + weaponpic + "/stand/ani";
				}
			}
		}

		self.parts.ptype = Parts.DIS_REAPEAT;
		if (urlkey) {
			self.parts.setPart(Parts.T_BODY, urlkey);
		}
		if (weaponkey) {//weapon = 2
			var weapon: Part = self.parts.dic[Parts.T_WEAPON];
			if (!weapon) {
				weapon = Part.create();
				weapon.type = Parts.T_WEAPON;
				weapon.dep = Parts.P_WEAPON;
				self.parts.addPart(weapon);
			}
			if (self.weaponDown != isWeaponDown) {//角色武器层级调整
				self.weaponDown = isWeaponDown;
				weapon.dep = Parts.D_WEAPON_DOWN;
				needSort = true;
			}
			self.parts.setPart(Parts.T_WEAPON, weaponkey);
		}
		if (this.shouHun) {
			let shPart: Part = self.parts.dic[Parts.T_SHOUHUN];
			if (!shPart) {
				shPart = Part.create();
				shPart.type = Parts.T_SHOUHUN;
				shPart.dep = Parts.P_SHOUHUN;
				self.parts.addPart(shPart);
			}
			self.parts.setPart(Parts.T_SHOUHUN, "uieff/" + this.shouHun);
		}
		let potCfg = Config.mod_200[body]
		if (horseMod) {
			var horse: Part = self.parts.dic[Parts.T_HORSE];
			if (!horse) {
				horse = Part.create();
				horse.type = Parts.T_HORSE;
				horse.dep = Parts.D_HORSE_DOWN;
				self.parts.addPart(horse);
			}
			self.parts.setPart(Parts.T_HORSE, horseMod);
			if (Config.zq_773[self.horseId].zhezhao == 1) {//坐骑在角色上层的部分
				var horseWing: Part = self.parts.dic[Parts.T_HORSE_WING];
				if (!horseWing) {
					horseWing = Part.create();
					horseWing.type = Parts.T_HORSE_WING;
					horseWing.dep = Parts.P_HORSE;
					self.parts.addPart(horseWing);
				}
				self.parts.setPart(Parts.T_HORSE_WING, horseWingUrl);
			}
		}
		self.parts.setVal(actkey);
		self.parts.sort();
		self.setNameY();
	}

	public hideT = 0;//切换方向的时候将兽魂隐藏1秒
	public updateWay() {
		let s = this;
		s.parts.scaleY = s.scale;
		if (s.faceDir == 1) {
			s.parts.scaleX = s.scale;
		} else {
			s.parts.scaleX = -1 * s.scale;
		}
		s.hideT = egret.getTimer() + 200;
		s.showShouHun();
	}

	public showShouHun() {
		if (this.parts.dic[Parts.T_SHOUHUN]) {
			let shPart: Part = this.parts.dic[Parts.T_SHOUHUN];
			shPart.mc.visible = this.hideT < egret.getTimer();
		}
	}

	public onAdd() {
		let s = this;
		s.invalid |= 1;
		s.scene001 = ArpgMap.getInstance();
		s.scene001.mainLayer.depAddChild(s.view);
		s.view.visible = true;
	}

	public onRemove() {
		let s = this;
		s.hideFilter();
		for (var i = s.plugs.length - 1; i >= 0; i--) {//移除部分插件
			var plug = s.plugs[i];
			if (plug && plug.autoRemove) {
				s.removePlug(plug);
			}
		}
		if (s.scene001) s.scene001.mainLayer.depRemoveChild(s.view);
		s.scene001 = null;
		s.id = 0;
		s.title = 0;
		s.country = 0;
		s.namey = 0;
		s.view.alpha = 1;
		s.view.dep = -1;
		s.camp = 0;
		s.dead = 0;
		s.shouHun = 0;
		s.weapon = 0;
		s.weaponpic = null;
		s.godWeapon = 0;
		s.godWeaponpic = null;
		s.horseMod = null
		s.horseId = 0
		s.move_state = 0;
		s.setImageState(0);
		s.invalid |= 255;
		s.parts.removePartExceptBody();

		s.userData = null;
		s._route = null;
		ModelArpgMap.touchPoint.x = fairygui.GRoot.mouseX;
		ModelArpgMap.touchPoint.y = fairygui.GRoot.mouseY;
	}

	//只允许单独存在的plug
	public addSinglePlug(plug, clz) {
		this.removePlugBytype(clz);
		this.addPlug(plug);
	}

	public addPlug(plug) {
		this.plugs.push(plug);
		plug.onAdd();
	}

	public removePlug(plug) {
		let s = this;
		var index = s.plugs.indexOf(plug);
		if (DEBUG && index == -1) {
			throw new Error("plugIndexError");
		}
		s.plugs[index] = null;
		plug.onRemove();
	}

	//移除某种类型的插件
	public removePlugBytype(clz) {
		let s = this;
		for (let i = 0; i < s.plugs.length; i++) {
			let plug = s.plugs[i];
			if (plug instanceof clz) {
				plug.onRemove();
				s.plugs[i] = null;
			}
		}
	}

	public getPlugBytype(clz) {
		let s = this;
		for (let i = 0; i < s.plugs.length; i++) {
			let plug = s.plugs[i];
			if (plug instanceof clz) {
				return plug;
			}
		}
		return null;
	}

	public deadRemove() {
		this.dead = 1;
	}

	public onEvent(evt, arg) {
		var plugs = this.plugs;
		var len = plugs.length;
		for (var i = 0; i < len; i++) {
			var plug = plugs[i];
			if (plug) {
				plug.onEvent(evt, arg);
			}
		}
	}

	public directMoveToPoint(distx: number, disty: number): void {
		let s = this;
		s._route = null;
		s.start_x = s.x;
		s.start_y = s.y;
		s.end_x = distx;
		s.end_y = disty;
		var len: number = Math.ceil(Math.sqrt((s.end_y - s.start_y) * (s.end_y - s.start_y) + (s.end_x - s.start_x) * (s.end_x - s.start_x)));
		if (len < 1) {
			s.setRoute(s._route);
			return;
		}

		s.nowSpeed = s.speed;

		s.allTime = len / s.nowSpeed * 1000;

		s.lastTime = egret.getTimer();
		s.setMoveState(Enum_MoveState.RUN);
		s.faceX(s.end_x);
		s.dx = s.end_x - s.start_x;
		s.dy = s.end_y - s.start_y;
	}

	protected _route: Array<any>;
	public static a: number = 1.414;
	public static b: number = 1;
	public jumpTweenObj: any = { jumpy: [0, -150] };
	public nowSpeed: number = 0;
	public setRoute(path: Array<any>) {
		let s = this;
		s._route = path;
		if (!s._route || !s._route.length) {
			s.setMoveState(Enum_MoveState.STAND);
			return;
		}
		s.updateAction();

		var nextTarget: Array<any> = s._route.shift();
		s.start_x = s.x;
		s.start_y = s.y;
		s.end_x = (nextTarget[0] >> 0) + 1;
		s.end_y = (nextTarget[1] >> 0) + 1;
		var newmt: number = nextTarget[2];
		s.moveType = newmt;

		var len: number = Math.ceil(Math.sqrt((s.end_y - s.start_y) * (s.end_y - s.start_y) + (s.end_x - s.start_x) * (s.end_x - s.start_x)));
		if (len < 1) {
			s.setRoute(s._route);
			return;
		}

		s.nowSpeed = s.speed;
		s.allTime = len / s.nowSpeed * 1000;

		s.lastTime = egret.getTimer();
		s.setMoveState(Enum_MoveState.RUN);
		s.faceX(s.end_x);
		s.dx = s.end_x - s.start_x;
		s.dy = s.end_y - s.start_y;
	}

	protected rate: number;
	protected move(now: number): void {
		let s = this;
		if (s.move_state == Enum_MoveState.RUN) {
			s.rate = (now - s.lastTime) / s.allTime;
			if (s.rate > 1) {
				if (s._route && s._route.length) {
					s.setRoute(s._route);
				}
				else {
					if (s.end_x != 0 && s.end_y != 0) {
						s.setXY(s.end_x, s.end_y);
						s.setMoveState(Enum_MoveState.STAND);
						s.moveType = 0;
					}
					s.moveEnd();
				}
			} else {
				s.setXY(s.rate * s.dx + s.start_x, s.rate * s.dy + s.start_y);
			}
		}
	}

	public setXY(xx, yy, force = false) {
		this.x = xx;
		this.y = yy;
	}

	public moveEndFunc: Function;
	public moveEndObj: any;
	protected moveEnd(): void {
	}

	public stopGo(): void {
		let s = this;
		if (s.move_state == Enum_MoveState.RUN) {
			s.setMoveState(Enum_MoveState.STAND);
			s.setRoute(null);
			s.moveType = 0;
			ModelArpgMap.getInstance().CG_STOP_MOVE(this.x, this.y);
		}
	}

	protected moveOver(): void { }

	protected _checkArea: boolean;
	public _areaDict: any = {};
	public checkArea(): void {
		let s = this;
		var areas: Array<AreaBase> = MapManager.mapAreas;
		for (var key in areas) {
			var area: AreaBase;
			if (area.checkXY(s.x, s.y) == false) {
				if (s._areaDict[area.areaid] == true) {
					delete s._areaDict[area.areaid];
					s.exitArea(area.areaid);
				}
			} else {
				if (s._areaDict[area.areaid] != true) {
					s._areaDict[area.areaid] = true;
					s.enterArea(area.areaid);
				}
			}
		}
	}

	protected enterArea(id: string): void {
	}

	protected exitArea(id: string): void {
	}

	public getGlobalXY():egret.Point{
		return this.scene001.mainLayer.localToGlobal(this.x,this.y);
	}
	
	interaction() {
		GameUnitManager.hero.lockTarget = null;
		if (Model_player.isMineID(this.id)) return;
		GameUnitManager.hideFilter();
		let mapType = ModelArpgMap.getInstance().sceneType;
		switch (mapType) {
			case EnumMapType.WDTX:
				GGlobal.modelWenDingTX.fight4207(this.id);
				break;
			case EnumMapType.BOSSZC_LOCAL:
			case EnumMapType.BOSSZC_CROSS:
				GGlobal.modelBossZc.CGfight(this.id);
				break;
			case EnumMapType.LIANGCAO:
				GGlobal.modelLiangCao.CG_BattleGoods_battlePvp_10115(this.id);
				break;
		}
	}

	stateImg: fairygui.GLoader;
	setImageState(state: number) {
		let self = this;
		if (!self.stateImg) {
			self.stateImg = new fairygui.GLoader();
			self.stateImg.autoSize = true;
			self.headGroup.addChild(self.stateImg.displayObject);
		}
		switch (state) {
			case 1:
				self.stateImg.visible = true;
				IconUtil.setImg(self.stateImg, Enum_Path.YANHUI_URL + "1.png");
				self.stateImg.setXY(-70, 40);
				break;
			default:
				self.stateImg.visible = false;
				break;
		}

	}
}