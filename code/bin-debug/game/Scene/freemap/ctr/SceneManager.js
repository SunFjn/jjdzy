var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.showScene = function () {
        SceneManager.cleanScene();
        SceneManager.nowScene.show();
    };
    /**
     * 清理上个场景
    */
    SceneManager.cleanScene = function () {
        if (SceneManager.nowScene) {
            SceneManager.nowScene.disposeByChangeScene();
        }
    };
    SceneManager.sortChild = function () {
        this.nowScene && this.nowScene.sortChild();
    };
    SceneManager.init = function () {
        SceneManager.nowScene = ArpgMap.getInstance();
        ArpgMap.getInstance().addLayer();
    };
    /***
     * 销毁ARPG地图
    */
    SceneManager.destory = function () {
        var sc = SceneManager.nowScene;
        if (sc) {
            sc.destory();
        }
        SceneManager.nowScene = null;
    };
    SceneManager.checkTransPoint = function (hero) {
        var global_x = hero.x;
        var global_y = hero.y;
        var obj_jump = AStar.checkJumpArea(global_x, global_y);
        if (obj_jump == null) {
            if (hero.isOnJumpPoint)
                hero.isOnJumpPoint = false;
            return;
        }
        var m = ModelArpgMap.getInstance();
        var distmapid = obj_jump.mapid;
        var cfg = m.mapCfg();
        var distmapinfo = cfg[distmapid];
        if (distmapinfo == null) {
            return;
        }
        if (obj_jump != null && ModelArpgMap.sceneReady) {
            if (hero.isOnJumpPoint)
                return;
            if (obj_jump.objType == UnitType.PORTAL) {
                m.targetSceneId = obj_jump.mapid;
                hero.move_state = Enum_MoveState.STAND;
                m.CG_ENTER_SCENE(obj_jump.mapid);
                hero.isOnJumpPoint = true;
            }
        }
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
