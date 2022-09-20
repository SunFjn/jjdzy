class Main extends egret.Sprite {
    public static  body_part_type:PartType=PartType.DB;
    public static  skill_part_type:PartType=PartType.DB;
    public constructor() {
        super();
        RES.setMaxLoadingThread(6);
        egret.TextField.default_fontFamily = "Microsoft YaHei";
        egret.TextField.default_size = 24;
        egret.ImageLoader.crossOrigin = "anonymous";
        fairygui.UIConfig.modalLayerAlpha = 0.6;
        fairygui.UIConfig.buttonSound = "common_b8ux3dh";
        fairygui.UIConfig.defaultFont = "Microsoft YaHei";
        GGlobal.main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    isLowFPS;
    isNewRole;
    mainResolve;
    isLoginAwait;
    setloadVis;
    hideLoadBg;
    showStoreAni;
    /**
     * 1 微信登录
     * 2 H5登录页面 需要修改index.html
     * 3 兼容之前的登录页
    */
    public entrance;
    private onAddToStage(event: egret.Event) {
        const self = this;
        let entrance: WxMain | H5Main | OldMain|ADBMain;
        App.stage = GGlobal.stage = egret.MainContext.instance.stage;
        if (this.getLoginArg() && this.getLoginArg().mainType) {
            GameConfig.codeType = this.getLoginArg().mainType;
        }
        switch (GameConfig.codeType) {
            case 1:
                entrance = new WxMain();
                break;
            case 2:
                entrance = new H5Main();
                break;
            case 3:
                entrance = new ADBMain();
                break;
        }
        self.entrance = entrance;
        self.mainResolve = entrance.mainResolve;
        self.setloadVis = entrance.setloadVis;
        self.hideLoadBg = entrance.hideLoadBg;
        self.showStoreAni = entrance.showStoreAni;

        GameConfig.initProductInof();
        self.addEventListener(egret.Event.ENTER_FRAME, self.frameLogic, self);
        self.setAdaptation();
    }

    public setAdaptation() {
        let isMobile = egret.Capabilities.isMobile;
        if (!isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    }

    public getLoginArg() {
        return (window as any).loginArg;
    }

    public showFenHaoByServer() {
        (window as any).showFenHaoByServer();
    }

    public getWhiteState() {
        return (window as any).whitelist;
    }

    public drawBlackBg() {
        var shap: fairygui.GGraph = new fairygui.GGraph();
        shap.setSize(App.stage.stageWidth, App.stage.stageHeight);
        shap.drawRect(0, 0, 0, 0x0, 1);
        GGlobal.main.addChildAt(shap.displayObject, 0);
    }

    public _last = 0;
    public logicDetail = 0;
    public frameLogic() {
        const self = this;
        var nowTime = egret.getTimer();
        var dt = nowTime - self._last;
        if (dt < 20) {
            return;
        }
        self._last = nowTime;
        self.isLowFPS = dt > 50;
        if (GGlobal.mapscene) {
            GGlobal.mapscene.update(dt);
        }
        Timer.instance.run();
        if (nowTime - this.logicDetail > 150) {
            this.logicDetail = nowTime;
            GGlobal.control.notify(Enum_MsgType.MSG_ENTERFRAME);
        }
        RESManager.checkRes(dt);
    }
}