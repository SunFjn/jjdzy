/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class GameLoginView1 extends fairygui.GComponent {

	public btnEnter: ServerBtn;
	public btnNotice: fairygui.GLoader;
	public lbServer: fairygui.GRichTextField;
	public btnChange: fairygui.GLoader;
	public lbAccounts: fairygui.GTextInput;
	public accSelGrp: fairygui.GGroup;
	public newSign: fairygui.GLoader;
	public static URL: string = "ui://a056duzjpc650";

	private static _inst: GameLoginView1;
	public static getInst(): GameLoginView1 {
		return this._inst || (this._inst = new GameLoginView1());
	}
	public constructor() {
		super();
	}
	private hasInit: boolean = false;
	private panel: fairygui.GComponent;
	private initView() {
		GGlobal.createPack("Login");
		let s = this;
		this.panel = fairygui.UIPackage.createObject("Login", "GameLoginView1").asCom;
		fairygui.UIObjectFactory.setPackageItemExtension(GameServerList.URL, GameServerList);
		fairygui.UIObjectFactory.setPackageItemExtension(ServerBtn.URL, ServerBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(ServerTabbutton.URL, ServerTabbutton);
		fairygui.UIObjectFactory.setPackageItemExtension(GameLoginBroadcast.URL, GameLoginBroadcast);
		s.addChild(s.panel);

		s.lbServer = <fairygui.GRichTextField><any>(s.panel.getChild("lbServer"));
		s.btnChange = <fairygui.GLoader><any>(s.panel.getChild("btnChange"));
		s.btnEnter = <ServerBtn><any>(s.panel.getChild("btnEnter"));
		s.btnNotice = <fairygui.GLoader><any>(s.panel.getChild("btnNotice"));
		s.lbAccounts = <fairygui.GTextInput><any>(s.panel.getChild("lbAccounts"));
		s.accSelGrp = <fairygui.GGroup><any>(s.panel.getChild("accSelGrp"));
		s.newSign = <fairygui.GLoader><any>(s.panel.getChild("newSign"));
		this.panel.scaleX = this.panel.scaleY = LayerManager.getFullScreenSc();
		let xx = (App.stage.stageWidth - this.panel.width * this.panel.scaleX) >> 1;
		let yy = (App.stage.stageHeight - this.panel.height * this.panel.scaleY) >> 1;
		this.panel.setXY(xx, yy);//不考虑横屏
		this.lbAccounts.text = "g200";
		if (!GGlobal.sdk) {
			var acc = egret.localStorage.getItem("account");
			this.lbAccounts.text = acc ? acc : "g200";
		}
		s.onListen();
		if (GGlobal.sdk) {
			s.accSelGrp.visible = false;
			if (GGlobal.loginArg && GGlobal.loginArg.account) {
				this.lbAccounts.text = GGlobal.loginArg.account;
			}
		}
		if ((!GGlobal.sdk || Model_UserData.isWhitePlayer) && this.accSelGrp) {
			this.accSelGrp.visible = true;
		}
	}

	public setServerDate(serverdata) {
		GameLoginView1.getInst().serverdata = serverdata;
		if (serverdata && serverdata.white) Model_UserData.isWhitePlayer = serverdata.white == 1;
		if (serverdata && serverdata.black) Model_UserData.isBlackPlayer = serverdata.black == 1;
		if (serverdata && serverdata.newPlayer) Model_UserData.newPlayer = serverdata.newPlayer == 1;
		if ((!GGlobal.sdk || Model_UserData.isWhitePlayer) && this.accSelGrp) {
			this.accSelGrp.visible = true;
		}
		if(serverdata.newPlayer){//直接进入游戏
			this.enterGame();
		}
	}

	private resize() {
		let sw = App.stage.stageWidth;
		let sh = App.stage.stageHeight;
		let rate = sh / sw;
		let mx = sw / 600;
		let my = sh / 800;
		let sc = Math.max(mx, my);
	}
	/**选择服务器*/
	private selectHD(data) {
		if (!this.serverdata) {
			return;
		}
		if (!GGlobal.loginArg) {
			GGlobal.loginArg = {};
		}
		var loginArg = GGlobal.loginArg;
		loginArg.ip = data.ip;
		loginArg.zoneid = data.zoneid;
		loginArg.port = data.port;
		loginArg.pf = data.pf;
		loginArg.state = data.state;
		loginArg.platform = data.platform;
		if (!GGlobal.sdk) {
			loginArg.account = this.lbAccounts.text;
		}
		this.lbServer.text = data.alias;
		if (this.newSign) {
			//0维护 1新 2火爆
			this.newSign.url = ["ui://a056duzjpc659", "ui://a056duzjpc657", "ui://a056duzjpc658"][data.state];
		}
	}
	public serverdata;
	private serverPanel: GameServerList;
	private openServerList() {
		if (!this.serverPanel) {
			this.serverPanel = GameServerList.createInstance();
			this.serverPanel.selectHD = Handler.create(this, this.selectHD);
		}
		this.serverPanel.scaleX = this.serverPanel.scaleY = LayerManager.getFullScreenSc();
		let xx = (App.stage.stageWidth - this.serverPanel.width * this.serverPanel.scaleX) >> 1;
		let yy = (App.stage.stageHeight - this.serverPanel.height * this.serverPanel.scaleY) >> 1;
		this.serverPanel.setXY(xx, yy);//不考虑横屏
		App.stage.addChild(this.serverPanel.displayObject);
		this.serverPanel.showList(this.serverdata);
	}
	private enterGame() {
		let state = GGlobal.loginArg.state;
		var loginArg = GGlobal.loginArg;
		if (!GGlobal.sdk || Model_UserData.isWhitePlayer) {
			loginArg.account = this.lbAccounts.text;
			loginArg.open_id = loginArg.account;
		}
		if (GGlobal.sdk && Model_UserData.isBlackPlayer) {
			GGlobal.sdk.blackPlayerWarning();
			return;
		}

		if (state == 0) {
			ViewMaintainServer.getInst().show().onShown();
		} else {
			this.directEnterGame();
		}
	}

	public directEnterGame() {
		const self = this;
		var loginArg = GGlobal.loginArg;
		if (!GGlobal.sdk) {
			loginArg.account = self.lbAccounts.text;
			egret.localStorage.setItem("account", loginArg.account);
		}
		self.hideSomePart();
		if (self.resolve) {
			self.resolve();
		}
	}

	private hideSomePart() {
		var self = this;
		if (self.displayObject.stage) {
			GGlobal.main.removeChild(self.displayObject);
		}
	}

	//0：维护，1：正常，2：火爆，3：白名单
	private broadcastPanel;//公告界面 
	private openNotice() {
		if (!this.broadcastPanel) {
			this.broadcastPanel = GameLoginBroadcast.createInstance();
		}
		App.stage.addChild(this.broadcastPanel.displayObject);
	}

	public onListen() {
		let s = this;
		s.btnChange.addClickListener(s.openServerList, s);
		s.btnEnter.addClickListener(s.enterGame, s);
		s.btnNotice.addClickListener(s.openNotice, s);
	}

	public onRemoveListen() {
		let s = this;
		s.btnChange.removeClickListener(s.openServerList, s);
		s.btnEnter.removeClickListener(s.enterGame, s);
		s.btnNotice.removeClickListener(s.openNotice, s);
	}

	public uidispose() {
		this.onRemoveListen();
		if (this.displayObject && this.displayObject.parent) {
			this.displayObject.parent.removeChild(this.displayObject);
		}
		RES.destroyRes("Login_atlas0");
	}
	public show() {
		var self = this;
		if (!self.hasInit) {
			self.hasInit = true;
			self.initView();
		}
		GGlobal.main.addChild(this.displayObject);
		//历史服务器存在的话取历史服务器的数据,默认是第一个唉
		let data;
		if (this.serverdata && this.serverdata.recent && this.serverdata.recent[0]) {
			data = this.serverdata.recent[0];
		}
		else {
			data = this.serverdata.formal[0];
		}
		self.selectHD(data);
		return this;
	}
	public async loginEnd() {
		var self = this;
		return new Promise(function (resolve) {
			self.resolve = resolve;
		});
	}
	private resolve: Function;
}