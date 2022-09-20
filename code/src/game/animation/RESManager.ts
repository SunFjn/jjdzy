class RESManager extends egret.EventDispatcher {

	public map: any = {};
	public loadingRes: RESObj;
	public loadQueue: RESObj[] = [];
	public ref0List = [];

	public constructor() {
		super();
	}

	public refRes(val: string,type:PartType): RESObj {
		var res: RESObj = this.map[val];
		if (!res) {
			res = RESObj.create(type);
			res.val = val;
			this.map[val] = res;
			this.loadQueue.push(res);
			this.loadNext();
		} else {
			if (res.inDList) {
				var index = this.ref0List.indexOf(res);
				res.inDList = false;
				this.ref0List.splice(index, 1);
			}
		}
		res.refCount++;
		return res;
	}

	public reduceRes(val: string): RESObj {
		var res: RESObj = this.map[val];
		if (res) {
			res.refCount--;
			if (res.refCount <= 0) {
				res.ref0Time = egret.getTimer();
				if (!res.inDList) {
					res.inDList = true;
					this.ref0List.push(res);
				}
			}
		}
		return res;
	}

	public onLoaded() {
		this.loadingRes = null;
		this.loadNext();
	}


	protected loadNext() {
		if (!this.loadingRes && this.loadQueue.length) {
			while (this.loadQueue.length) {
				var res = this.loadQueue.shift();
				if (res) {
					this.loadingRes = res;
					res.startLoad();
					break;
				}
			}
		}
	}

	public checkDestory1() {
		let count = 0;
		while (this.ref0List.length) {
			if (count > 2) {
				break;
			}
			count++;
			var res: RESObj = this.ref0List.shift();
			res.inDList = false;
			if (res.refCount == 0) {
				if (DEBUG) {
					// ViewCommonWarn.text("releaseMC:" + res.val);
				}
				this.destoryRes(res);
				RESManager.wechatInvild = 1;
			}
		}
	}

	public destoryRes(resobj: RESObj) {
		if (resobj === this.loadingRes) {
			return;
		}
		delete this.map[resobj.val];
		if (resobj.state == -1) {
			var loadindex = this.loadQueue.indexOf(resobj);
			if (loadindex >= 0) {
				this.loadQueue.splice(loadindex, 1);
			}
		}
		resobj.dispose();
	}

	public static getVersionUrl(url: string): string {
		if (url == "resource/default.res.json") {
			if (DEBUG) {
				if (url == "resource/default.res.json") {
					url = "default.res" + ".json";
					return url;
				}
				return GGlobal.resHead + url;
			} else {
				url = "default.res" + "_" + GGlobal.clientversion + ".json";
				return url;
			}
		}
		if (DEBUG) {
			return GGlobal.resHead + url;
		}
		let cfgUrl = RESManager.getGameCFGUrl(url)
		if (cfgUrl != url) {
			return cfgUrl
		}
		let versionObj = ResourceVersionConfig.urlDic;
		if (versionObj) {
			let ver = 1;
			let realKey = url;
			if(url.indexOf("resource/")==0){
				realKey= url.slice(9);
			}
			if (versionObj[realKey]) {
				ver = versionObj[realKey];
			}
			let urls = url.split(".");
			url = urls[0] + "_v" + ver + "." + urls[1];
		}
		url = GGlobal.resHead + url;
		return url;
	}
	//gameCfg配置里的url
	public static getGameCFGUrl(url: string): string {
		let versionObj = ResourceVersionConfig.urlDic;
		if (Model_GlobalMsg.resVer && versionObj && Model_GlobalMsg.resArr && Model_GlobalMsg.resArr.length) {
			let curV = versionObj["resource/default.res.json"];
			if (Model_GlobalMsg.resVer == curV) {
				if (Model_GlobalMsg.resArr.indexOf(url) != -1) {
					return "resource/" + Model_GlobalMsg.resVer + "/" + url
				}
			}
		}
		return url
	}

	public static getPartVersion(url) {
		let versionObj = ResourceVersionConfig.urlDic;
		let ver = 1;
		if (versionObj) {
			if (versionObj[url]) {
				ver = versionObj[url];
			}
		}
		return ver;
	}

	//此处用于清理图集,动画图集有额外的规则，不适用这个方法清理
	public static destoryRes(url, needHead = false) {
		if (needHead) url = RESManager.getVersionUrl(url);
		if (url && IconUtil.checkCanRelease(url)) {
			RES.destroyRes(url);
		}
	}

	//==========================================定时检测游戏纹理集的引用情况================
	public static totalTexture = {};
	//加载完成的纹理集再在此处添加。
	public static recordUrl(url, texture) {
		if (texture) {
			RESManager.totalTexture[url] = texture;
		}
	}

	public static removeUrl(url) {
		if (RESManager.totalTexture[url]) {
			delete RESManager.totalTexture[url];
		}
	}

	static wechatInvild = 0;
	public static wechatGC() {
		if (PlatformManager.isWx() && RESManager.wechatInvild) {
			wx.triggerGC();
			RESManager.wechatInvild = 0;
		}
	}

	//===================地图资源特殊处理
	private static _mapSrc: { [id: number]: { state: number, urls: any[] } } = {};
	public static recordMapInvild(cfgid, st) {
		const self = this;
		let cfg = Config.map_200[cfgid];
		if (!cfg) {
			return;
		}
		let mapid = cfg.s;
		let temp: any = {};
		if (!self._mapSrc[mapid]) {
			self._mapSrc[mapid] = temp;
			temp.urls = [];
		}
		temp = self._mapSrc[mapid];
		temp.state = st;
	}

	public static addMapBlockURL(url, mapid) {
		const self = this;
		let now = egret.getTimer();
		let temp: any = {};
		temp = self._mapSrc[mapid];
		temp.state = 1;
		if (temp.urls.indexOf(url) == -1) {
			temp.urls.push(url);
		}
	}

	public static checkMapSRC() {
		const self = this;
		for (let mapid in self._mapSrc) {
			let item = self._mapSrc[mapid];
			if (item.state == 0 && item.urls && item.urls.length) {
				while (item.urls.length) {
					RES.destroyRes(item.urls.shift());
				}
				delete self._mapSrc[mapid];
			}
		}
	}
	//===================地图资源特殊处理

	public static _lastCount = 0;
	public static _nextCheckT = 0;
	public static checkRes(ctx) {
		const self = this;
		let nowTime = ctx;
		if (self._nextCheckT == 0) self._nextCheckT = nowTime;
		if (nowTime > self._nextCheckT) {
			let checkt = 60000;
			if (DEBUG)
				checkt = 5000;
			self._lastCount = self._lastCount % 4;
			switch (self._lastCount) {
				case 1:
					if (GGlobal.resMgr) {
						IconUtil.checkIconLife();
					}
					break;
				case 2:
					if (GGlobal.resMgr) {
						GGlobal.layerMgr.checkPanelLife();
					}
					break;
				case 3:
					if (GGlobal.resMgr) {
						GGlobal.resMgr.checkDestory1();
					}
					break;
				case 0:
					RESManager.checkMapSRC();
					break;
			}
			self._lastCount++;
			self._nextCheckT += checkt;
		}
		RESManager.wechatGC();
	}
}