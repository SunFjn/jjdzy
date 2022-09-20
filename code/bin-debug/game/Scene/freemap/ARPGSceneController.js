var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ARPGSceneController = (function () {
    function ARPGSceneController() {
    }
    ARPGSceneController.getSceneType = function () {
        var map = Config.map_200[ModelArpgMap.getInstance().sceneMap];
        var mapType = map.severtype;
        return mapType;
    };
    //注册管理器实现退出和进入逻辑
    ARPGSceneController.managerDictionary = {};
    ARPGSceneController.registerManager = function () {
        var self = ARPGSceneController;
        self.managerDictionary[EnumMapType.LIANGCAO] = LiangCaoManager.getInstance();
        self.managerDictionary[EnumMapType.HOME] = HomeManager.getInstance();
    };
    //是否退出活动`后面的活动走系统自带的退出协议 不需要前端主动退出地图
    ARPGSceneController.isExiteAct = function () {
        ModelArpgMap.getInstance().isAutoExite = true;
    };
    /**
     * 进入ARPG控制器  后端拉入场景 前端加载地图配置完成后调用
     * 从横版地图切换到可自由走动地图会调用一次
    */
    ARPGSceneController.enter = function () {
        var model = ModelArpgMap.getInstance();
        var mapid = model.sceneMap;
        model.isCross = true;
        var dic = ARPGSceneController.managerDictionary;
        var sceneType = ModelArpgMap.getInstance().sceneType;
        if (dic[sceneType]) {
            GGlobal.mapscene.enterScene(SceneCtrl.ARPG);
            model.isCross = true;
            dic[sceneType].enter();
        }
    };
    /**
     * 每次切换场景控制器会调用
     * 一般在ARPG场景 只在进入战斗场景和回到关卡才会切换控制器
     * */
    ARPGSceneController.exite = function () {
        var dic = ARPGSceneController.managerDictionary;
        var sceneType = ModelArpgMap.getInstance().sceneType;
        if (dic[sceneType]) {
            dic[sceneType].exite();
        }
    };
    return ARPGSceneController;
}());
__reflect(ARPGSceneController.prototype, "ARPGSceneController");
