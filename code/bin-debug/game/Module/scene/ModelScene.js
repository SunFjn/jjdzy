var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ModelScene = (function (_super) {
    __extends(ModelScene, _super);
    function ModelScene() {
        return _super.call(this) || this;
    }
    ModelScene.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(132, this.scPlayerList, this);
    };
    /**心跳包 */
    ModelScene.prototype.CG_HEARTBEAT_181 = function () {
        var ba = this.getBytes();
        this.sendSocket(181, ba);
    };
    /**请求在线玩家列表*/
    ModelScene.prototype.csPlayerList = function () {
        var ba = this.getBytes();
        this.socket.sendCMDBytes(131, ba);
    };
    ModelScene.prototype.scPlayerList = function (self, ba) {
        var playerList = [];
        for (var i = 0, len = ba.readShort(); i < len; i++) {
            playerList.push({
                type: "player",
                id: ba.readLong(),
                name: ba.readUTF(),
                job: ba.readByte(),
                gangName: ba.readUTF(),
                shenBing: ba.readByte(),
                title: ba.readInt(),
                body: ba.readInt()
            });
        }
        self.notify(ModelScene.MSG_PLIST, playerList);
    };
    ModelScene.prototype.returnMainScene = function () {
        if (GGlobal.layerMgr.isOpenView(UIConst.QXZL)) {
            GGlobal.layerMgr.close2(UIConst.QXZL);
        }
        if (ModelArpgMap.getInstance().isAutoExite == false)
            return; //在ARPG地图里面的切换不允许跳转进关卡
        var mainSceneID = this.lastMainSceneID;
        var curScenetype = GGlobal.mapscene.scenetype;
        var targetsceneid = 0;
        if (mainSceneID) {
            targetsceneid = mainSceneID;
        }
        else {
            targetsceneid = SceneCtrl.GUANQIA;
        }
        if (GGlobal.mapscene.scenetype != targetsceneid) {
            GGlobal.mapscene.enterScene(targetsceneid);
        }
    };
    ModelScene.MSG_PLIST = "p_list";
    return ModelScene;
}(BaseModel));
__reflect(ModelScene.prototype, "ModelScene");
