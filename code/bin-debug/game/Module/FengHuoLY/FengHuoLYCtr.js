var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FengHuoLYCtr = (function () {
    function FengHuoLYCtr() {
        this.maxW = 2300;
        this.maxH = 2000;
    }
    FengHuoLYCtr.getInstance = function () {
        if (!this.instance) {
            this.instance = new FengHuoLYCtr();
        }
        return this.instance;
    };
    FengHuoLYCtr.prototype.enter = function () {
        var sf = this;
        MainUIController.setSkillEnable(false);
        GGlobal.mainUICtr.setState(MainUIController.FHLY);
        sf.top = FengHuoLYTop.createInstance();
        sf.bottom = FengHuoLYUI.createInstance();
        sf.top.enter();
        sf.bottom.enter();
        GGlobal.modelFengHuoLY.inActivity = true;
        GGlobal.socketMgr.registerReconnectHD("FengHuoLYCtr", Handler.create(this, this.onSocketClose));
        GGlobal.control.listen(Enum_MsgType.ADD_ACTIVITYICON, sf.activityEnd, sf);
        GGlobal.control.listen(Enum_MsgType.ENTER_SERVERBATTLE, FengHuoLYCtr.enterBattle, sf);
        GGlobal.control.listen(Enum_MsgType.EXIT_SERVERBATTLE, FengHuoLYCtr.exiteBattle, sf);
    };
    FengHuoLYCtr.prototype.exite = function () {
        var sf = this;
        if (sf.top)
            sf.top.exite();
        if (sf.bottom)
            sf.bottom.exite();
        MainUIController.setSkillEnable(true);
        Model_WorldNet.exiteCross();
        console.log("烽火 离开断开中央服");
        GGlobal.modelFengHuoLY.destory();
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
        GGlobal.modelFengHuoLY.inActivity = false;
        GGlobal.socketMgr.removeReconnectHD("FengHuoLYCtr");
        GGlobal.control.remove(Enum_MsgType.ADD_ACTIVITYICON, sf.activityEnd, sf);
        GGlobal.control.remove(Enum_MsgType.ENTER_SERVERBATTLE, FengHuoLYCtr.enterBattle, sf);
        GGlobal.control.remove(Enum_MsgType.EXIT_SERVERBATTLE, FengHuoLYCtr.exiteBattle, sf);
    };
    FengHuoLYCtr.prototype.onSocketClose = function () {
        GGlobal.modelFengHuoLY.exite();
    };
    FengHuoLYCtr.prototype.activityEnd = function (arr) {
        var id = arr[0];
        var st = arr[1];
        if (id != UIConst.FHLY || st == 2) {
            return;
        }
        console.log(" fenghuolangyan map  end");
        if (GGlobal.sceneType == SceneCtrl.FHLY) {
            GGlobal.mapscene.sceneCtrl.exitT();
        }
        GGlobal.modelFengHuoLY.exite();
        GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
        GGlobal.layerMgr.open(UIConst.FHLY_END);
    };
    FengHuoLYCtr.enterBattle = function () {
        GGlobal.layerMgr.closeAllPanelExcept([FengHuoLangYanScene]);
        var view = GGlobal.layerMgr.getView(UIConst.FHLY);
        // MainUIController.setSkillEnable(false);
        if (view) {
            view.visible = false;
            view.modalLayer.visible = false;
        }
        var sf = FengHuoLYCtr.getInstance();
        if (sf.top) {
            sf.top.visible = false;
        }
        if (sf.bottom) {
            sf.bottom.visible = false;
        }
    };
    FengHuoLYCtr.exiteBattle = function () {
        console.log("fhly exiteBattle");
        var view = GGlobal.layerMgr.getView(UIConst.FHLY);
        if (view) {
            view.modalLayer.visible = true;
            view.visible = true;
        }
        var sf = FengHuoLYCtr.getInstance();
        if (sf.top) {
            sf.top.visible = true;
        }
        if (sf.bottom) {
            sf.bottom.visible = true;
        }
        if (GGlobal.modelFengHuoLY.inActivity) {
            // MainUIController.setSkillEnable(false);
            GGlobal.mainUICtr.setState(MainUIController.FHLY);
        }
        else {
            // MainUIController.setSkillEnable(true);
            GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
        }
    };
    FengHuoLYCtr.prototype.mapMove = function (xx, yy) {
        var sgw = fairygui.GRoot.inst.width;
        var sgh = fairygui.GRoot.inst.height;
    };
    return FengHuoLYCtr;
}());
__reflect(FengHuoLYCtr.prototype, "FengHuoLYCtr");
