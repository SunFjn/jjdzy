class ViewMaintainServer extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;
	public static URL: string = "ui://a056duzj10veut";


	private static _inst: ViewMaintainServer;
	public static getInst(): ViewMaintainServer {
		return this._inst || (this._inst = new ViewMaintainServer());
	}
	public constructor() {
		super();
		this.imgCompHandle();
	}

	private panel: fairygui.GComponent;
	private backImg: fairygui.GLoader;
	protected imgCompHandle(): void {
		let s = this;
		s.panel = fairygui.UIPackage.createObject("Login", "ViewMaintainServer").asCom;
		s.addChild(s.panel);
		this.backImg = s.panel.getChild("n0").asLoader;
		IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "Maintain.png");
		let n0 = s.panel.getChild("n0").asLoader;
		s.lb = s.panel.getChild("lb").asRichTextField;
		let shape = s.panel.getChild("n3").asGraph;
		let scaleNum = LayerManager.getFullScreenSc();
		n0.setSize(631 * scaleNum, 375 * scaleNum);
		s.lb.setSize(479 * scaleNum, 82 * scaleNum);
		shape.setSize(App.stage.stageWidth, App.stage.stageHeight);
	}

	private reqPHP() {
		let loginArg = GGlobal.loginArg;
		let request = Model_UserData.getNotice(Model_UserData.MAINTAIN, loginArg.open_id, loginArg.loginIP, loginArg.zoneid);
		this.request = request;
		request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
	}

	private request;
	private onGetComplete(event: egret.Event): void {
		var request = <egret.HttpRequest>event.currentTarget;
		egret.log("get data : ", request.response);
		let requestData = JSON.parse(request.response);
		if (requestData.result == 1) {
			this.lb.text = "维护时间：" + requestData.content;
		} else {
			egret.callLater(this.delayEnterGame, this);
		}
		this.removeList();
	}

	private needExite = true;
	private delayEnterGame() {
		this.needExite = false;
		this.closeHandle();
		GameLoginView1.getInst().directEnterGame();
	}

	private removeList() {
		let s = this;
		s.request.removeEventListener(egret.Event.COMPLETE, s.onGetComplete, s);
		s.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, s.onGetIOError, s);
		s.request.removeEventListener(egret.ProgressEvent.PROGRESS, s.onGetProgress, s);
		s.request = null;
	}

	private onGetIOError(event: egret.IOErrorEvent): void {
	}

	private onGetProgress(event: egret.ProgressEvent): void {
	}

	public onShown(): void {
		let s = this;
		this.addClickListener(this.closeHandle, this);
		s.reqPHP();
	}

	protected onHide(): void {
		let s = this;
		if (GGlobal.sdk && this.needExite) {
			GGlobal.sdk.exitApp();
		} else if (HLSDK.whalePbSDK && this.needExite) {
			HLSDK.logout();
		}
		this.removeClickListener(s.closeHandle, s);
		if (s.displayObject.stage) {
			GGlobal.main.removeChild(s.displayObject);
		}
		IconUtil.setImg(s.backImg, null);
	}

	private closeHandle() {
		this.onHide();
	}

	public show() {
		GGlobal.main.addChild(this.displayObject);
		return this;
	}
}