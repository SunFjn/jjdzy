class ChildTuiSongMsg extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public list: fairygui.GList;
	public btnDef: fairygui.GButton;
	public btnRew: Button2;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public boxTit: fairygui.GGroup;
	public btnSave: fairygui.GButton;
	public lb: fairygui.GRichTextField;
	public btnUp: fairygui.GButton;
	public img: fairygui.GLoader;
	public boxUp: fairygui.GGroup;

	public static URL: string = "ui://b3p8szvvq2i92n";

	public static createInstance(): ChildTuiSongMsg {
		return <ChildTuiSongMsg><any>(fairygui.UIPackage.createObject("dailytask", "ChildTuiSongMsg"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getController("c1");
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnDef = <fairygui.GButton><any>(this.getChild("btnDef"));
		this.btnRew = <Button2><any>(this.getChild("btnRew"));
		this.lb1 = <fairygui.GRichTextField><any>(this.getChild("lb1"));
		this.lb2 = <fairygui.GRichTextField><any>(this.getChild("lb2"));
		this.boxTit = <fairygui.GGroup><any>(this.getChild("boxTit"));
		this.btnSave = <fairygui.GButton><any>(this.getChild("btnSave"));
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.btnUp = <fairygui.GButton><any>(this.getChild("btnUp"));
		this.img = <fairygui.GLoader><any>(this.getChild("img"));
		this.boxUp = <fairygui.GGroup><any>(this.getChild("boxUp"));

		const s = this;
		s.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, s.onOpen, s);
		s.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onHide, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHander;
		s.list.numItems = 0;
		s.btnUp.text = "复制链接"
	}

	private loadCompleteHandler(event): void {
		var imageLoader = <egret.ImageLoader>event.currentTarget;
		let texture = new egret.Texture();
		texture._setBitmapData(imageLoader.data);
		this._bg.texture = texture;
	}
	private _bg: egret.Bitmap
	private newVers
	private onOpen() {
		const s = this;
		s.c1.selectedIndex = 1;
		if (HLSDK.whalePbSDK) {
			HLSDK.whalePbSDK.getnewversion(function (res) {
				if (res && res.status) {
					s.newVers = res.data
					s.setNewVers()
					console.log("newversion--status:" + res.status)
					console.log("newversion--data:" + res.data)
					if (res.data) {
						console.log("newversion--data.url:" + res.data.url)
						console.log("newversion--data.icon:" + res.data.icon)
					}
				}
			});
		}
		GGlobal.modelactPreView.CG7501()
		s.btnDef.addClickListener(s.onDefault, s);
		s.btnRew.addClickListener(s.onReward, s);
		s.btnUp.addClickListener(s.onUp, s);
		s.btnSave.addClickListener(s.onSave, s);
		GGlobal.modelactPreView.listen(ModelActPreView.msg_tsMsg, s.update, s);
		GGlobal.modelactPreView.listen(ModelActPreView.msg_tsmsg_red, s.upRed, s);
		GGlobal.modelactPreView.listen(ModelActPreView.msg_tsmsg_cge, s.upCge, s);
		s.btnSave.enabled = true
		// s.update();
		s.upRed();
	}

	private setNewVers() {
		let s = this;
		if (s.newVers.url && s.newVers.url.length > 0) {
			s.c1.selectedIndex = 0;
			if (!this._bg) {
				var imageLoader: egret.ImageLoader = new egret.ImageLoader();
				imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
				imageLoader.load(s.newVers.icon);
				this._bg = new egret.Bitmap();
				this._bg.pixelHitTest = false;
				this.displayListContainer.addChild(this._bg);
				this._bg.width = this._bg.height = 80;
				this._bg.x = this.img.x;
				this._bg.y = this.img.y;
			}
		}
	}

	private _datas: VoTuiSongMsg[]
	private update() {
		let s = this
		s.initData1();
		s.upList();
	}

	// private initData() {
	// 	let s = this
	// 	let arr = GGlobal.modelactPreView.tsMsgArr
	// 	let objKey = {}
	// 	s._datas = [];
	// 	for (let i = 0; i < arr.length; i++) {
	// 		let cfg = Config.appts_313[arr[i].tag]
	// 		let tag = Math.floor(cfg.id / 1000)
	// 		let v = VoTuiSongMsg.create(tag, arr[i].status, cfg)
	// 		if (objKey[tag]) {
	// 			objKey[tag].arr.push(v)
	// 		} else {
	// 			s._datas.push(v);
	// 			objKey[tag] = v
	// 			v.arr.push(v);
	// 		}
	// 	}
	// 	s._datas.sort(function (a: VoTuiSongMsg, b: VoTuiSongMsg) { return a.tag - b.tag });
	// }

	private initData1() {
		let s = this
		let arr = GGlobal.modelactPreView.tsMsgArr
		let objKey = {}
		s._datas = [];
		for (let keys in Config.appts_313) {
			let cfg = Config.appts_313[keys]
			let tag = Math.floor(cfg.id / 1000)
			let v = VoTuiSongMsg.create(tag, cfg.kg, cfg);
			for (let j = 0; j < arr.length; j++) {
				if (arr[j].tag == cfg.id) {
					v.status = arr[j].status;
					break;
				}
			}
			if (objKey[tag]) {
				objKey[tag].arr.push(v)
			} else {
				s._datas.push(v);
				objKey[tag] = v
				v.arr.push(v);
			}
		}
		s._datas.sort(function (a: VoTuiSongMsg, b: VoTuiSongMsg) { return a.tag - b.tag });
	}

	private upList() {
		this.list.numItems = this._datas.length;
	}
	private onHide() {
		let s = this;
		this.list.numItems = 0;
		s.btnDef.removeClickListener(s.onDefault, s);
		s.btnRew.removeClickListener(s.onReward, s);
		s.btnUp.removeClickListener(s.onUp, s);
		GGlobal.modelactPreView.remove(ModelActPreView.msg_tsMsg, s.update, s);
		GGlobal.modelactPreView.remove(ModelActPreView.msg_tsmsg_red, s.upRed, s);
		GGlobal.modelactPreView.remove(ModelActPreView.msg_tsmsg_cge, s.upCge, s);
	}

	private upCge() {
		let s = this
		s.btnSave.enabled = true
	}

	private renderHander(index, render: TuSongMsgItem) {
		render.vo = this._datas[index]
	}

	private onDefault() {
		let s = this
		if (!s._datas) return;
		for (let i = 0; i < s._datas.length; i++) {
			let v = s._datas[i];
			if (v.arr.length > 1) {
				for (let j = 0; j < v.arr.length; j++) {
					let v0 = v.arr[j];
					v0.status = v0.cfg.kg
				}
			} else {
				v.status = v.cfg.kg
			}
		}
		this.upList();
	}

	private onReward() {
		GGlobal.layerMgr.open(UIConst.TUISONG_SET_BOX, this.newVers);
	}

	private onUp() {
		let s = this;
		if (s.newVers && s.newVers.url) {
			// window.open(s.newVers.url);
			// window.location.href = s.newVers.url;
			// if (HLSDK.whalePbSDK) {
			// 	HLSDK.whalePbSDK.downloadpackage(s.newVers.url)
			// }
			Model_Setting.onCopy(s.newVers.url, "已复制更新链接,打开浏览器粘贴即可更新");
		}


	}

	private upRed() {
		this.btnRew.checkNotice = GGlobal.modelactPreView.getTSMsgNotice()
	}

	private static createObj(cfg, status, kfTime, kfDay) {
		let obj: any = { tag: cfg.id, status: status }
		if (status) {
			if (cfg.yz == 0) {
				obj.range = [this.getYMD(kfTime), this.getYMD(kfTime + 20 * 31536000 + kfDay * 86400)]
			} else {
				let yz = cfg.yz - 1
				if (cfg.day != "0") {
					let dayArr = JSON.parse(cfg.day);
					obj.days = []
					for (let i = 0; i < dayArr.length; i++) {
						let d = Number(dayArr[i]) - 1
						obj.days.push(this.getYMD(kfTime + d * 86400))
					}
				} else if (cfg.week != "0") {
					obj.range = [this.getYMD(kfTime + yz * 86400), this.getYMD(kfTime + yz * 86400 + 20 * 31536000 + kfDay * 86400)]
				}
			}
		}
		return obj
	}

	private static getYMD(time, c = "-") {
		let date: Date = new Date(time * 1000);
		let day = date.getDate()
		let mon = date.getMonth() + 1
		let year = date.getFullYear()
		let str = year + "";//年
		str += c + (mon < 10 ? "0" + mon : "" + mon);	//月
		str += c + (day < 10 ? "0" + day : "" + day);	//日
		return str
	}

	private onSave() {
		if (!ChildTuiSongMsg.isOpenPf()) {
			return;
		}

		let s = this;
		if (s._datas.length == 0) return;
		let arr: any[] = []
		let kfTime = Model_GlobalMsg.kaiFuTime;
		let kfDay = Model_GlobalMsg.kaifuDay
		for (let i = 0; i < s._datas.length; i++) {
			let v = s._datas[i];
			if (v.arr.length > 1) {
				for (let j = 0; j < v.arr.length; j++) {
					let obj = ChildTuiSongMsg.createObj(v.arr[j].cfg, v.arr[j].status, kfTime, kfDay)
					arr.push(obj)
				}
			} else {
				let obj = ChildTuiSongMsg.createObj(v.cfg, v.status, kfTime, kfDay)
				arr.push(obj)
			}
		}

		if (HLSDK.whalePbSDK) {
			let info = ChildTuiSongMsg.getUseInfo();
			HLSDK.whalePbSDK.settaginfo(info, arr, function (res) {
				if (res) {

				} else {
					console.log("更新消息推送fail")
				}
			})
		}
		GGlobal.modelactPreView.CG7503(arr)
		ViewCommonWarn.text("保存设置成功");
		s.btnSave.enabled = false
	}

	public static isOpenPf() {
		//开放微端1  3   4
		let pf = PlatformManager.getPfIndex();
		if (pf == 1 || pf == 3 || pf == 4) {
			return true;
		}
		return false
	}
	//初始化
	public static initTSMsg(kaiFuDay, nowTime) {
		if (!ChildTuiSongMsg.isOpenPf()) {
			return;
		}

		let kfTime = nowTime - (kaiFuDay - 1) * 86400
		let objKey = {}
		let arr = [];
		for (let keys in Config.appts_313) {
			let cfg = Config.appts_313[keys]
			let obj = ChildTuiSongMsg.createObj(cfg, cfg.kg, kfTime, kaiFuDay)
			arr.push(obj);
		}
		if (HLSDK.whalePbSDK) {
			let info = ChildTuiSongMsg.getUseInfo();
			HLSDK.whalePbSDK.settaginfo(info, arr, function (res) {
				if (res) {
				} else {
					console.log("更新消息推送fail")
				}
			})
		}
		GGlobal.modelactPreView.CG7503(arr)
	}

	private static getUseInfo() {
		let loginArg = GGlobal.loginArg;
		var info = {
			role_id: Model_player.voMine.id,//用户ID
			role_name: Model_player.voMine.name,//用户名称
			serverName: loginArg.zoneid,//区服编号
			serverId: loginArg.zoneid + ''//区服名称
		}
		return info
	}
}