/**ARPG地图  唯一*/class ArpgMap {
	private static inst: ArpgMap;
	public static getInstance() {
		if (!this.inst)
			this.inst = new ArpgMap();
		return this.inst;
	}

	public mapBlockLayer: fairygui.GComponent;//地图
	public mapfrontLayer: fairygui.GComponent;//地表 自然事物层
	public mainLayer: DepSprite;//活动物体

	private herorow: number;
	private herocol: number;
	public _portProxy: PortProxy = new PortProxy();

	public static _version: number = 0;

	public _foucus: egret.Point = new egret.Point();

	public blockcounter: number;

	public _scale: number = 1;

	public loadQueue: any[] = [];

	public _rcDict = {};
	private _init = false;

	/**点击地图 寻路 or 地图单位交互*/
	public downEvent(e: egret.TouchEvent): void {
		if (!TimeUitl.cool("ArpgMap_downEvent", 500)) {
			return;
		}
		if (!ModelArpgMap.sceneReady) return;
		GameUnitManager.getOverObj();
		var target = GameUnitManager.overObj;
		if (target instanceof ARPGNpc) {
			var npc: ARPGNpc = target as ARPGNpc;
		}
	}
	//忽略碰撞的id
	private _ignoreList = {};
	public addIgnoreId(id) {
		this._ignoreList[id] = true;
	}
	public clearIgnoreId() {
		this._ignoreList = {};
	}
	private hasIgnore(id) {
		return this._ignoreList[id]
	}

	public upEvent(e: egret.TouchEvent): void {
		if (!TimeUitl.cool("ArpgMap_upEvent", 500)) {
			return;
		}
		if (!ModelArpgMap.sceneReady) return;
		if (!ModelArpgMap.moveEnable) { ViewCommonWarn.text("跟随状态不可移动"); return; }
		let m = ModelArpgMap.getInstance();
		GGlobal.control.notify(Enum_MsgType.ARPG_MAP_CLICK, null);
		var unit: ISceneObject = GameUnitManager.moveTargetPoint;
		WorldConfigManager.paths = [];
		GameUnitManager.getOverObj();
		var target: any = GameUnitManager.overObj;
		var hero: ARPGHero = GameUnitManager.hero;
		GameUnitManager.hideFilter();
		if (target instanceof ARPGNpc) {
			var npc: ARPGNpc = target as ARPGNpc;
			(target as ArpgRole).showFilter();
			hero.target = target as ArpgRole;
		}
		else if (target instanceof ArpgRole && target.id != hero.id && !this.hasIgnore(target.id)) {
			if (target instanceof ArpgRole) {
			ModelArpgMap.touchPoint.x = e.$stageX;
			ModelArpgMap.touchPoint.y = e.$stageY//fairygui.GRoot.mouseY;
			} else {//NPC
				hero.target = target as ArpgRole;
			}
			hero.target = target as ArpgRole;
		} else if (target instanceof Door) {
			hero.lockTarget = null;
			if (ModelArpgMap.needShowTarPoint) {
				GameUnitManager.moveTargetPoint.show();
			}
			hero.autoMoveID = -1;
			hero.autoMoveType = -1;
			var point = this.mapBlockLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
			var goRet: boolean = hero.go(point.x, point.y);
		} else {
			if (ModelArpgMap.needShowTarPoint) {
				GameUnitManager.moveTargetPoint.show();
			}
			var point = this.mapBlockLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
			var goRet: boolean = hero.go(point.x, point.y);
			if (goRet) {
				GameUnitManager.hero.stopAutonMove();
			}
		}
	}

	public setXY(xx: number, yy: number): void {
		this._foucus.x = xx;
		this._foucus.y = yy;
		this._portProxy.focusXY(xx, yy);
		this._portProxy.adjustRealPoint();
	}

	public setSight(sightX: number, sightY: number): void {
		this.mapBlockLayer.x = sightX;
		this.mapBlockLayer.y = sightY;
		this.mainLayer.x = sightX;
		this.mainLayer.y = sightY;
		this.mapfrontLayer.x = sightX;
		this.mapfrontLayer.y = sightY;
	}

	set scale(value: number) {
		let sf = this;
		sf._scale = value;
		sf._portProxy.setScale(value);
		sf.mapBlockLayer.scaleX = sf.mapBlockLayer.scaleY = value;
		sf.mainLayer.scaleX = sf.mainLayer.scaleY = value;
		sf.mapfrontLayer.scaleX = sf.mapfrontLayer.scaleY = value;

		CameraManager.invalidate = true;
		CameraManager.update(0);
	}


	get scale(): number {
		return this._scale;
	}

	public setRestrictWH(w: number, h: number): void {
		this._portProxy.setRestrictWH(w, h);
		CameraManager.invalidate = true;
	}

	public rebuild(): void {
		let s = this;
		let m = ModelArpgMap.getInstance();
		var sceneid: number = m.sceneMap;
		var points: egret.Point = s._portProxy._pointRest;

		var portWid: number = Math.floor(s._portProxy._portWid / s._portProxy.scaleX);
		var portHei: number = Math.floor(s._portProxy._portHei / s._portProxy.scaleY);

		var tsx: number = Math.floor(Math.max(0, (points.x) / s._portProxy._matrix.a / ModelArpgMap.MAPBLOCKW));
		var tsy: number = Math.floor(Math.max(0, (points.y) / s._portProxy._matrix.d / ModelArpgMap.MAPBLOCKH));

		var ex: number = Math.ceil((points.x + portWid) / s._portProxy._matrix.a / ModelArpgMap.MAPBLOCKW);
		var ey: number = Math.ceil((points.y + portHei) / s._portProxy._matrix.d / ModelArpgMap.MAPBLOCKH);

		var maxex: number = Math.ceil(s._portProxy._restritRect.width / ModelArpgMap.MAPBLOCKW) - 1;
		var maxey: number = Math.ceil(s._portProxy._restritRect.height / ModelArpgMap.MAPBLOCKH) - 1;

		ex = Math.min(maxex, ex);
		ey = Math.min(maxey, ey);

		s.removes(tsx, tsy, ex, ey);
		ArpgMap._version++;
		for (var row: number = tsy; row <= ey; row++) {
			for (var col: number = tsx; col <= ex; col++) {
				s.addRC(row, col, sceneid);
			}
		}
		s.loadNextBlock();
	}

	public addRC(row: number, col: number, sceneid: number): void {
		let s = this;
		var k: string = sceneid + "_" + row + "_" + col;
		if (sceneid != 0) {
			var block: MapBlock = s._rcDict[k] || Pool.getItemByClass("MapBlock", MapBlock);
			block.key = k;
			block.sceneid = sceneid;
			block.setRC(row, col);
			s.mapBlockLayer.addChild(block.back);
			if (block.alphainfo) s.mapfrontLayer.addChild(block.front);
			s._rcDict[k] = block;

			MapManager.addItemRC(row, col);
			s.addToLoadQueue(block);
		}
		if (block) block._version = ArpgMap._version;
	}

	public removes(sx: number, sy: number, ex: number, ey: number): void {
		let s = this;
		let m = ModelArpgMap.getInstance();
		var sceneid: number = m.sceneMap;

		for (var k in s._rcDict) {
			var block: MapBlock = s._rcDict[k];
			if (
				block.col < sx || block.col > ex || block.row < sy || block.row > ey ||
				block._version != ArpgMap._version || block.sceneid != sceneid) {
				s.mapBlockLayer.removeChild(block.back);
				if (block.front.parent) block.front.parent.removeChild(block.front);
				delete s._rcDict[k];
				block.dispose();

				MapManager.removeItemRC(block.row, block.col);
				s.spliceLoadQueue(block);
			}
		}
	}

	private addToLoadQueue(block: MapBlock): void {
		var index: number = this.loadQueue.indexOf(block);
		if (index == -1) {
			this.loadQueue.push(block);
			this.loadQueueLen++;
		}
	}

	private spliceLoadQueue(block: MapBlock): void {
		var index: number = this.loadQueue.indexOf(block);
		if (index != -1) {
			this.loadQueue.splice(index, 1);
			this.loadQueueLen--;
		}
	}

	private loadingcount: number = 0;
	private loadQueueLen: number = 0;
	public urlMap: any = {};
	private loadNextBlock() {
		let s = this;
		let hero = GameUnitManager.hero;
		if (s.loadingcount < 2 && s.loadQueueLen > 0 && ModelArpgMap.sceneReady) {
			s.herorow = Math.floor(hero.x / ModelArpgMap.MAPBLOCKW);
			s.herocol = Math.floor(hero.y / ModelArpgMap.MAPBLOCKH);

			s.loadQueue.sort(s.loadBlockCompare);

			var block: MapBlock = s.loadQueue.shift();
			s.loadQueueLen = s.loadQueue.length;
			let url = block.url;
			if (block) {
				if (!this._rcDict[block.key]) {
					delete s.urlMap[block.key];
					s.loadNextBlock();
					return;
				}
				RES.getResByUrl(block.url, s.onBlockLoadComplete, { scene: s, block: block }, RES.ResourceItem.TYPE_IMAGE);
			} else {
				s.loadNextBlock();
			}
		}
	}

	private onBlockLoadComplete1(obj: any): void {
		obj.scene.loadingcount--;
		var block: MapBlock = obj.block;
		obj.scene.urlMap[block.key] = obj;
		block.onLoadComplete(obj.img);
		obj.scene.loadNextBlock();
	}

	private onBlockLoadComplete(img: egret.Texture, url): void {
		var obj: any = this;
		var block: MapBlock = obj.block;
		obj.scene.urlMap[block.key] = obj;
		block.onLoadComplete(img, url);
		obj.scene.loadingcount--;
		obj.scene.loadNextBlock();
	}

	private loadBlockCompare(a: MapBlock, b: MapBlock): number {
		var av: number = Math.abs(a.row - this.herorow) + Math.abs(a.col - this.herocol);
		var bv: number = Math.abs(b.row - this.herorow) + Math.abs(b.col - this.herocol);
		var ret: number = av - bv;
		return ret;
	}

	public show() {
		let s = this;
		let m = ModelArpgMap.getInstance();
		GameUnitManager.init();
		CameraManager.update(0);
		MapManager.reSize(App.stage.stageWidth, App.stage.stageHeight);
		s.mapBlockLayer.touchable = true;
		s.mapBlockLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downEvent, this);
		s.mapBlockLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.upEvent, this);
		GGlobal.control.notify(Enum_MsgType.ENTER_SCENE);
		CameraManager.invalidate = true;
	}

	public sortChild() {
		let s = this;
		s.mainLayer.sortChild();
	}

	public disposeByChangeScene() {
		let s = this;
		if (!s.mainLayer) return;
		s.loadingcount = 0;
		s.loadQueue = [];
		ArrayUitl.cleannull(s.mainLayer.list);
		for (var k in s._rcDict) {
			var block: MapBlock = s._rcDict[k];
			s.mapBlockLayer.removeChild(block.back);
			if (block.front.parent) s.mapfrontLayer.removeChild(block.front);
			delete s._rcDict[k];
			block.dispose();

			MapManager.removeItemRC(block.row, block.col);
			s.spliceLoadQueue(block);
		}
	}

	public addLayer(): void {
		let parent = GGlobal.mapscene.view;
		let s = this;
		s._init = true;

		s.mapBlockLayer = new fairygui.GComponent();
		s.mapfrontLayer = new fairygui.GComponent();
		s.mainLayer = new DepSprite();

		parent.addChild(s.mapBlockLayer.displayObject);
		s.mapBlockLayer.touchable = false;

		parent.addChild(s.mapfrontLayer.displayObject);
		s.mapfrontLayer.touchable = false;

		parent.addChild(s.mainLayer);
		s.mainLayer.touchEnabled = false;
	}

	public destory() {
		let s = this;
		if (!s._init) return;
		s._init = false;
		s.disposeByChangeScene();
		s.mapBlockLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s.downEvent, s);
		s.mapBlockLayer.removeEventListener(egret.TouchEvent.TOUCH_END, s.upEvent, s);
		s.mapBlockLayer.removeFromParent();
		s.mapfrontLayer.removeFromParent();
		s.mainLayer.parent.removeChild(s.mainLayer);
		s.mapBlockLayer = null;
		s.mapfrontLayer = null;
		s.mainLayer = null;
	}

	public static SHAKEEASE(value: number): number {
		var ret;
		var a = value * 2 % 1.0;
		ret = Math.sin(a * Math.PI * 2);
		return ret;
	}

}