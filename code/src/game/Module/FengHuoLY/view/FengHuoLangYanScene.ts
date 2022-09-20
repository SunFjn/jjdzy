/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FengHuoLangYanScene extends UIModalPanel {

	public groupUI: fairygui.GGroup;
	private map: FengHuoMap;

	public static URL: string = "ui://edvdots4srrs3";

	public static createInstance(): FengHuoLangYanScene {
		return <FengHuoLangYanScene><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLangYanScene"));
	}

	public constructor() {
		super();
		let fact = fairygui.UIObjectFactory.setPackageItemExtension;
		fact(FengHuoLYTop.URL, FengHuoLYTop);
		fact(FengHuoLYUI.URL, FengHuoLYUI);
		fact(ItemCity.URL, ItemCity);
		fact(FenghuoHead.URL, FenghuoHead);
		fact(FengHuoMap.URL, FengHuoMap);
		fact(FengHuoNamePlug.URL, FengHuoNamePlug);
		fact(FengHuoLstIt.URL, FengHuoLstIt);
		fact(FenghuoTopBar.URL, FenghuoTopBar);
		this.loadRes("FengHuoLY", "FengHuoLY_atlas0");
	}
	public lbServer3: fairygui.GTextField;
	public lbServer2: fairygui.GTextField;
	public lbServer1: fairygui.GTextField;
	public n20: fairygui.GLoader;
	public n40: fairygui.GLoader;
	public n23: fairygui.GLoader;
	private arrow: fairygui.GLoader;
	private cityDic: Object;

	private routeLayer: fairygui.GComponent;
	private mapLayer: fairygui.GComponent;
	protected childrenCreated(): void {
		let sf = this;
		GGlobal.createPack("FengHuoLY");
		sf.view = fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLangYanScene").asCom;
		sf.contentPane = sf.view;

		sf.map = <FengHuoMap><any>(sf.view.getChild("map"));
		sf.groupUI = <fairygui.GGroup><any>(sf.view.getChild("groupUI"));

		sf.routeLayer = new fairygui.GComponent();
		sf.addChild(sf.routeLayer);

		sf.mapLayer = new fairygui.GComponent();
		sf.addChild(sf.mapLayer);

		sf.cityDic = sf.map.cityDic;

		sf.lbServer1 = sf.map.lbServer1;
		sf.lbServer2 = sf.map.lbServer2;
		sf.lbServer3 = sf.map.lbServer3;
		super.childrenCreated()
	}

	private updateCity() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		for (var i = 1; i < 11; i++) {
			let city = m.getCity(i);
			sf.cityDic[i].updateVO(city);
			if (city.owerID > 0) {
				sf.removePlayer(city.owerID);
			}
		}

		//城主的变更需要更新场景的模型数据 (主动移动，显示模型。 击杀移动，直接返回复活点)
		if (m.sceneUpdateMark == 1) {
			m.sceneUpdateMark = 0;
			let serverDta = m.scenePlayer;
			let dic = sf._playerDic;
			for (let i in serverDta) {
				let vo: Vo_FHPlayer = serverDta[i];
				sf.addPlayer(vo);
			}
		}
	}

	private scenePlayerHd() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let dic = sf._playerDic;
		let serverDta = m.scenePlayer;
		for (var i in dic) {
			let vo: Vo_FHPlayer = serverDta[i];
			if (!vo.needShowAwatar()) {
				sf.removePlayer(i);
			}
		}
	}

	//同步服务器的列表玩家的数据  服务器会增删玩家
	private updateScenePlayer() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let serverDta = m.scenePlayer;
		let dic = sf._playerDic;
		//add player
		for (let i in serverDta) {
			let vo: Vo_FHPlayer = serverDta[i];
			sf.addPlayer(vo);
		}

		//对比服务器数据去移除一些不存在的单元 remove player
		for (let i in dic) {
			if (!serverDta[i]) {
				sf.removePlayer(i);
			}
		}

		if (sf.autoSetCamera) {
			sf.autoSetCamera = !sf.cameraFocusMe();
		}
	}

	public findPlayer(playerID) {
		let vo: UIRole;
		if (this._playerDic[playerID]) {
			vo = this._playerDic[playerID];
		}
		return vo;
	}

	private route: fairygui.GLoader[] = [];
	private checkRoute() {
		let sf = this;
		let hero = sf.findPlayer(Model_player.voMine.id);
		if (!hero || !hero.data || sf.route.length == 0) return;
		let tx = hero.data.x;
		let ty = hero.data.y;
		let dist = MathUtil.dist(hero.x, hero.y, tx, ty);
		for (let i = sf.route.length - 1; i >= 0; i--) {
			let img = sf.route[i];
			let dist1 = MathUtil.dist(img.x, img.y, tx, ty);
			if (dist1 > dist) {
				img.parent.removeChild(img);
				sf.route.splice(i, 1);
				sf.imgPool.push(img);
				i = sf.route.length - 1;
			} else {
				break;
			}
		}
	}

	private imgPool: fairygui.GLoader[] = [];
	private drawRoute(x, y, role) {
		let sf = this;
		let dx = role.x - x;
		let dy = role.y - y;
		let dist = MoveUtil.distSqrt(x, y, role.x, role.y);
		let angle = MoveUtil.caculateAngle(x, y, role.x, role.y);
		let num = Math.floor(dist / 30);
		for (let i = 0; i < num; i++) {
			let bm: fairygui.GLoader = sf.imgPool.length ? sf.imgPool.shift() : new fairygui.GLoader();
			bm.url = "ui://edvdots4j08a1o";
			bm.rotation = angle + 90;
			let per = i / num;
			bm.setXY(dx * per + x, per * dy + y);
			sf.routeLayer.addChild(bm);
			sf.route.push(bm);
		}
	}

	private sceneMove(obj) {
		let id = obj.id;
		let type = obj.type;
		let xx = obj.x;
		let yy = obj.y;
		let isMine = Model_player.isMineID(id);
		if (isMine && type == 1) {//自己直接走别的移动
			return;
		}
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let role = this.findPlayer(id);
		if (!role) {
			let vo = GGlobal.modelFengHuoLY.getPlayer(id);
			if (!vo) {
				if (DEBUG) ViewCommonWarn.text("找不到玩家ID" + id);
				return;
			} else {
				role = sf.addPlayer(vo, true);
			}
		}
		role.faceX(xx);
		if (type == 1) {
			let dist = MoveUtil.distSqrt(xx, yy, role.x, role.y);
			let time = dist * 10 * 200 / role.speed;;
			egret.Tween.removeTweens(role);
			role.setAction(1);
			egret.Tween.get(role).to({ x: xx, y: yy }, time).call(sf.moveEnd, sf, [role, id]);
		} else {
			role.setDir(1000 >= xx ? 1 : -1);
			role.setXY(xx, yy);
			if (isMine) {
				sf.cameraFocusMe();
			}
			GGlobal.modelFengHuoLY.setPlayerXY(id, role.x, role.y);
		}
	}

	public moveToCity(cityid, playerID) {
		let role = this.findPlayer(playerID);
		if (!role) {
			let pvo = GGlobal.modelFengHuoLY.getPlayer(playerID);
			if (!pvo) return;
			role = this.addPlayer(pvo, true);
		}
		let sf = this;
		let city = this.cityDic[cityid];
		let x = city.xx;
		let y = city.yy;
		role.faceX(x);
		let dist = MoveUtil.distSqrt(x, y, role.x, role.y);
		let time = dist * 10 * 200 / role.speed;//骑马
		role.data = {};
		role.data.cityid = cityid;
		role.data.playerID = playerID;
		role.data.x = x;
		role.data.y = y;
		sf.clearRoute();
		if (playerID == Model_player.voMine.id) {
			this.drawRoute(x, y, role);
		}
		egret.Tween.removeTweens(role);
		role.setAction(1);
		egret.Tween.get(role).to({ x: x, y: y }, time).call(this.moveEnd, this, [role, playerID]);
	}

	public moveEnd(role: UIRole, playerID) {
		if (Model_player.isMineID(playerID)) {
			let cityid = role.data.cityid;
			let sf = this;
			sf.clearRoute();
			let city = sf.cityDic[cityid];
			city.interactive();
		}
		role.setAction(0);
		GGlobal.modelFengHuoLY.setPlayerXY(playerID, role.x, role.y);
	}

	public canCreate(i) {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let serverDta = m.scenePlayer;
		let dic = sf._playerDic;
		let ret = !dic[i] && !m.hasCity(i) && !m.inCity(i);
		return ret;
	}

	private _cardDic = {};
	private _playerDic = {};
	public addPlayer(vo: Vo_FHPlayer, igone = false): UIRole {
		let sf = this;
		if (!vo || sf._playerDic[vo.id]) {
			return null;
		}
		if (!sf.canCreate(vo.id) && !igone) {
			return;
		}
		let awatar = UIRole.create();
		awatar.setAction(0);
		awatar.name = vo.name;
		awatar.speed = vo.speed;
		awatar.setXY(vo.xx, vo.yy);
		awatar.extraFrameFun = awatar.synchroPos;
		awatar.setJob(vo.job);
		awatar.setGodWeapon(vo.godweapon);
		awatar.setHorseId(vo.horseId);
		awatar.setDir(vo.xx > 1500 ? -1 : 1);
		var namebar = FengHuoNamePlug.create(Model_player.isMineID(vo.id));
		namebar.role = awatar;
		namebar.setCamp(vo.camp);
		var cfg = Config.mod_200[awatar.getBody()];
		if (cfg && cfg.h) {
			if (vo.horseId) {
				awatar.setNameY(-cfg.zh - 60);
			} else {
				awatar.setNameY(-cfg.h - 60);
			}
		}
		awatar.headGroup.x = -93;
		awatar.addPlug(namebar);
		namebar.setArrow(Model_player.isMineID(vo.id));
		// awatar.setScaleXY(0.7, 0.7);
		awatar.uiparent = sf.mapLayer.displayListContainer;
		awatar.onAdd();
		sf._playerDic[vo.id] = awatar;
		return awatar;
	}

	public removePlayer(id) {
		if (this._playerDic[id]) {
			let awatar = this._playerDic[id];
			awatar.onRemove();
			egret.Tween.removeTweens(awatar);
			awatar = null;
		}
		delete this._playerDic[id];
	}

	public clearRoute() {
		let sf = this;
		while (sf.route.length) {
			let img = sf.route.shift();
			img.parent.removeChild(img);
			sf.imgPool.push(img);
		}
	}

	private hasTouch = true;
	private touchStart = 0;
	private touchPoint: egret.Point = new egret.Point();
	private mapScroll = false;
	public heartHD() {
		let sf = this;
		if (this.hasTouch) {
			sf.mapScroll = (egret.getTimer() - sf.touchStart) > 100;
		} else {
			sf.mapScroll = false;
		}
		//check route
		sf.checkRoute();
		if (GGlobal.modelFengHuoLY.camera == 1) {
			sf.cameraFocusMe();
		}
		let now = egret.getTimer();
		for (var i = 1; i < 11; i++) {
			let city = sf.cityDic[i];
			sf.cityDic[i].updateShow(now);
		}
	}

	public touchMapMove(evt: egret.TouchEvent) {
		let sf = this;
		if (!sf.mapScroll) return;
		let xx = evt.$stageX;
		let yy = evt.$stageY;
		let x = sf.map.x - (sf.touchPoint.x - xx);
		let y = sf.map.y - (sf.touchPoint.y - yy);
		sf.touchPoint.x = xx;
		sf.touchPoint.y = yy;
		sf.mapMove(x, y);
	}

	//镜头拉到自己身上
	private cameraFocusMe(): boolean {
		let pos: any;
		let sf = this;
		let mid = Model_player.voMine.id;
		let player = sf._playerDic[mid];
		if (player) {
			pos = {};
			pos.x = player.x;
			pos.y = player.y;
		} else {
			let cid = GGlobal.modelFengHuoLY.getMyCity();
			if (cid > 0) {
				pos = {};
				pos.x = sf.cityDic[cid].xx;
				pos.y = sf.cityDic[cid].yy;
			} else {
				let zhengshouID = GGlobal.modelFengHuoLY.zhengshouID;
				if (zhengshouID > 0) {
					pos = {};
					pos.x = sf.cityDic[zhengshouID].xx;
					pos.y = sf.cityDic[zhengshouID].yy;
				}
			}
		}
		if (pos) {
			let minx = fairygui.GRoot.inst.width;
			let miny = fairygui.GRoot.inst.height;
			let rx = pos.x - minx / 2;
			let ry = pos.y - miny / 2;
			sf.mapMove(-rx, -ry);
			return true;
		} else {
			return false;
		}
	}

	public maxW = 2289;
	public maxH = 1500;
	private offetx = 0;
	private offety = 0;
	public mapMove(xx, yy) {
		let sf = this;
		if (sf.offetx == xx && sf.offety == yy) return;
		let maxx = 0;
		let maxy = 0;
		let minx = fairygui.GRoot.inst.width - sf.maxW;
		let miny = fairygui.GRoot.inst.height - sf.maxH;
		sf.offetx = xx;
		sf.offety = yy;
		if (sf.offetx < minx) {
			sf.offetx = minx;
		} else if (sf.offetx > maxx) {
			sf.offetx = maxx;
		}

		if (sf.offety < miny) {
			sf.offety = miny;
		} else if (sf.offety > maxy) {
			sf.offety = maxy;
		}
		sf.map.setXY(sf.offetx, sf.offety);
		sf.mapLayer.setXY(sf.offetx, sf.offety);
		sf.routeLayer.setXY(sf.offetx, sf.offety);
	}

	private touchMap(evt: egret.TouchEvent) {
		let s = this;
		if (GGlobal.modelFengHuoLY.camera == 1) return;
		s.hasTouch = true;
		s.touchStart = egret.getTimer()
		s.touchPoint = new egret.Point(evt.$stageX, evt.$stageY);
	}

	private touchMapEnd() {
		this.hasTouch = false;
	}

	private heroMove() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		sf.moveToCity(m.moveCityID, Model_player.voMine.id);
	}

	private uiInit() {
		let sf = this;
		sf.map.enter();
		for (let i in sf.cityDic) {
			sf.cityDic[i].registHD();
		}
	}

	private sceneInit() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		sf.lbServer1.text = m.blueServer == 0 ? "轮空" : "S." + m.blueServer;
		sf.lbServer2.text = m.redServer == 0 ? "轮空" : "S." + m.redServer;
		sf.lbServer3.text = m.greenServer == 0 ? "轮空" : "S." + m.greenServer;
	}

	private stateChange() {
		let sf = this;
		let st = GGlobal.modelFengHuoLY.state;
		if (st != 1) {
			for (let i in sf.cityDic) {
				sf.cityDic[i].stopCollect();
			}
		}
	}

	private cityStateChange(vo) {
		let sf = this;
		// let st = GGlobal.modelFengHuoLY.state;
		// if (st != 1) {
		sf.cityDic[vo.id].updateVO(vo);
		// }
	}

	private listen() {
		let sf = this;
		sf.map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, sf.touchMap, sf);
		sf.map.addEventListener(egret.TouchEvent.TOUCH_MOVE, sf.touchMapMove, sf);
		sf.map.addEventListener(egret.TouchEvent.TOUCH_END, sf.touchMapEnd, sf);

		let ctr = GGlobal.control;
		ctr.listen(Enum_MsgType.FHLY_CITY_UPDATE, sf.updateCity, sf);
		ctr.listen(Enum_MsgType.FHLY_SCENE_PLAYER, sf.updateScenePlayer, sf);
		ctr.listen(Enum_MsgType.FHLY_HERO_MOVE, sf.heroMove, sf);
		ctr.listen(Enum_MsgType.FHLY_SYSCHRO, sf.sceneMove, sf);
		ctr.listen(Enum_MsgType.FHLY_SCORE_INIT, sf.sceneInit, sf);
		ctr.listen(Enum_MsgType.FHLY_STATE_CHANGE, sf.stateChange, sf);
		ctr.listen(Enum_MsgType.FHLY_CITYSTATE_CHANGE, sf.cityStateChange, sf);
		ctr.listen(Enum_MsgType.FHLY_PLAYER_STATE, sf.scenePlayerHd, sf);
		sf.updateCity();
		sf.updateScenePlayer();
		sf.sceneInit();
	}

	private autoSetCamera = true;
	protected onShown() {
		let sf = this;
		FengHuoLYCtr.getInstance().enter();
		sf.uiInit();
		sf.listen();
		Timer.instance.listen(sf.heartHD, sf, 30);

		if (this._args && this._args.type) {
			if (this._args.type == 2) {
				sf.autoSetCamera = true;
			}
		}
		IconUtil.setImg(sf.n20, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
		IconUtil.setImg(sf.n40, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
		IconUtil.setImg(sf.n23, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
	}

	protected onHide() {
		let sf = this;
		if (!sf.map) return;
		sf.map.exite();
		sf.autoSetCamera = true;
		FengHuoLYCtr.getInstance().exite();
		sf.clearRoute();
		GGlobal.modelFengHuoLY.CG_QUIT_3575();
		for (let i in sf._playerDic) {
			sf.removePlayer(i);
		}

		for (let i in sf.cityDic) {
			sf.cityDic[i].removeHD();
		}

		GGlobal.layerMgr.close(UIConst.FHLY);
		sf.map.removeEventListener(egret.TouchEvent.TOUCH_MOVE, sf.touchMapMove, sf);
		sf.map.removeEventListener(egret.TouchEvent.TOUCH_END, sf.touchMapEnd, sf);
		sf.map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, sf.touchMap, sf);
		Timer.instance.remove(sf.heartHD);

		let ctr = GGlobal.control;
		ctr.remove(Enum_MsgType.FHLY_SCENE_PLAYER, sf.updateScenePlayer, sf);
		ctr.remove(Enum_MsgType.FHLY_CITY_UPDATE, sf.updateCity, sf);
		ctr.remove(Enum_MsgType.FHLY_HERO_MOVE, sf.heroMove, sf);
		ctr.remove(Enum_MsgType.FHLY_SYSCHRO, sf.sceneMove, sf);
		ctr.remove(Enum_MsgType.FHLY_SCORE_INIT, sf.sceneInit, sf);
		ctr.remove(Enum_MsgType.FHLY_STATE_CHANGE, sf.stateChange, sf);
		ctr.remove(Enum_MsgType.FHLY_CITYSTATE_CHANGE, sf.cityStateChange, sf);
		ctr.remove(Enum_MsgType.FHLY_PLAYER_STATE, sf.scenePlayerHd, sf);
		IconUtil.setImg(sf.n20, null);
		IconUtil.setImg(sf.n40, null);
		IconUtil.setImg(sf.n23, null);
	}
}