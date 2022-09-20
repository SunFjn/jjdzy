var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/***此类仅管理问鼎和BOSS战场*/ var ARPGMapManager = (function () {
    function ARPGMapManager() {
    }
    /**
     * mapid 首次需要进入的地图ID
     * fromSysID 用系统ID对主UI进行布局
     * isAutoExite 是否需要手动退出场景（场景控制器只有一个：比如A进入1副本地图并进入了战斗地图2，必须在1地图仍旧看到A，这时候就不能退出场景控制器）设置成false,需要手动移除arpgctr.forceExite
     * isCross 地图是否走的跨服协议
    */
    ARPGMapManager.enter = function (mapid, fromSysID, isAutoExite, isCross, moveAble) {
        if (fromSysID === void 0) { fromSysID = 0; }
        if (isAutoExite === void 0) { isAutoExite = true; }
        if (isCross === void 0) { isCross = true; }
        if (moveAble === void 0) { moveAble = true; }
        ModelArpgMap.getInstance().isCross = isCross;
        ModelArpgMap.getInstance().sceneMap = mapid;
        ModelArpgMap.getInstance().isAutoExite = isAutoExite;
        ModelArpgMap.moveEnable = moveAble;
        if (GGlobal.sceneType != SceneCtrl.ARPG) {
            GGlobal.mapscene.enterScene(SceneCtrl.ARPG);
        }
        else {
            this.changeScene(mapid);
        }
        this.setMainUI(fromSysID);
        this.currentSystem = fromSysID;
    };
    ARPGMapManager.exite = function () {
        this.currentSystem = 0;
        ModelArpgMap.getInstance().isAutoExite = true;
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    //根据系统ID重新布局界面
    ARPGMapManager.setMainUI = function (fromID) {
        if (!fromID)
            return;
        switch (fromID) {
            case UIConst.SYZLB:
                GGlobal.mainUICtr.setState(MainUIController.ARPGMAP);
                break;
            case UIConst.WENDINGTX:
                GGlobal.mainUICtr.setState(MainUIController.WENDINGTIANXIA);
                break;
            case UIConst.BOSS_BATTLEFIELD_LOCAL:
            case UIConst.BOSS_BATTLEFIELD_CROSS:
                GGlobal.mainUICtr.setState(MainUIController.BOSS_BATTLEFIELD);
                break;
            case UIConst.SANGUO_YITONG:
                GGlobal.mainUICtr.setState(MainUIController.SANGUO_YITONG);
                break;
            case UIConst.YANHUI:
                GGlobal.mainUICtr.setState(MainUIController.YANHUI);
                break;
        }
    };
    ARPGMapManager.changeScene = function (mapid) {
        if (mapid)
            ModelArpgMap.getInstance().CG_ENTER_SCENE(mapid);
    };
    /**当前玩法ID */
    ARPGMapManager.currentSystem = 0;
    return ARPGMapManager;
}());
__reflect(ARPGMapManager.prototype, "ARPGMapManager");
