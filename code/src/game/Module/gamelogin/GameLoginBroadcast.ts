/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class GameLoginBroadcast extends fairygui.GComponent {

	public lbContent: fairygui.GRichTextField;
	public btnClose: fairygui.GLoader;
	public bg: fairygui.GGraph;
	public static URL: string = "ui://a056duzjluu2m";

	public static createInstance(): GameLoginBroadcast {
		return <GameLoginBroadcast><any>(fairygui.UIPackage.createObject("Login", "GameLoginBroadcast"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbContent = <fairygui.GRichTextField><any>(this.getChild("lbContent"));
		this.btnClose = <fairygui.GLoader><any>(this.getChild("btnClose"));
		this.bg = <fairygui.GGraph><any>(this.getChild("bg"));
		var app = App.stage;
		this.scaleX = this.scaleY = LayerManager.getFullScreenSc();
		this.setXY((app.stageWidth - this.width * this.scaleX) >> 1, (app.stageHeight - this.height * this.scaleY) >> 1);
		this.onListen();
	}

	private closeHd() {
		this.uidispose();
	}

	private getBroadCastContent() {
		if (GGlobal.sdk) {
			let request = Model_UserData.getPhpParam(Model_UserData.BROADCAST, GGlobal.loginArg.open_id, GGlobal.loginArg.pfcode);
			request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
			request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		} else {
			let loader: egret.URLLoader = new egret.URLLoader();
			loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
			loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
			let url: string = GGlobal.resHead + "loginlib/broadcast.php";
			let request: egret.URLRequest = new egret.URLRequest(url);
			//开始加载
			loader.load(request);
		}
	}

	private onGetComplete(event: egret.Event): void {
		var request = <egret.HttpRequest>event.currentTarget;
		egret.log("get data : ", request.response);
		this.lbContent.text = request.response;
	}

	private onGetIOError(event: egret.IOErrorEvent): void {
		egret.log("get error broadcast: " + event);
	}

	private onGetProgress(event: egret.ProgressEvent): void {
		egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
	}

	private onLoadComplete(event: egret.Event): void {
		egret.log("onLoadComplete");
		var loader: egret.URLLoader = <egret.URLLoader>event.target;
		this.lbContent.text = loader.data;
	}

	private onLoadError(): void {
		egret.log("onLoadError login broadcast");
	}

	private onListen() {
		this.getBroadCastContent();
		this.btnClose.addClickListener(this.closeHd, this);
		this.bg.addClickListener(this.closeHd, this);
	}

	private onRemove() {

		this.btnClose.removeClickListener(this.closeHd, this);
		this.bg.removeClickListener(this.closeHd, this);
	}

	public uidispose() {
		if (this.displayObject && this.displayObject.parent) {
			this.displayObject.parent.removeChild(this.displayObject);
		}
	}
}