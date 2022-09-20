var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CollectManager = (function () {
    function CollectManager() {
    }
    Object.defineProperty(CollectManager, "isCollecting", {
        get: function () {
            return CollectManager._isCollecting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectManager, "npc", {
        get: function () {
            return CollectManager._npc;
        },
        enumerable: true,
        configurable: true
    });
    CollectManager.begin = function (npc, needTime, callBack, obj, label) {
        if (needTime === void 0) { needTime = 5000; }
        if (callBack === void 0) { callBack = null; }
        if (obj === void 0) { obj = null; }
        if (label === void 0) { label = ""; }
        if (CollectManager.isCollecting) {
            return;
        }
        CollectManager._isFinish = false;
        //设置采集时间
        CollectManager.NEED_TIME = needTime;
        if (obj) {
            CollectManager._obj = obj;
            CollectManager._obj.npc = npc;
        }
        CollectManager._callBack = callBack;
        if (CollectManager._isCollecting)
            return;
        CollectManager._isCollecting = true;
        CollectManager._npc = npc;
        ARPGNpc.setCollectViewLabel(label);
        CollectManager.beginTime = egret.getTimer();
        CollectManager._npc.isCollect = true;
        GGlobal.control.listen(Enum_MsgType.MSG_ENTERFRAME, CollectManager.run);
    };
    /**
     *采集中断或结束
     * @param $type =0是中断或结束会发送协议通知  =1不发送协议
     */
    CollectManager.end = function ($type) {
        if ($type === void 0) { $type = 0; }
        var sId = GGlobal.sceneID;
        if (!CollectManager._isCollecting)
            return;
        CollectManager._isCollecting = false;
        CollectManager._npc.isCollect = false;
        CollectManager._callBack = null;
        GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, CollectManager.run);
        var sceneType = ModelArpgMap.getInstance().sceneType;
        if (CollectManager._isFinish) {
            switch (sceneType) {
                case EnumMapType.SANGUO_YT:
                    GGlobal.modelSanGuoYT.CG_YITONG_COLLECT_RESULT_5809(CollectManager._npc.id);
                    break;
                case EnumMapType.LIANGCAO:
                    GGlobal.modelLiangCao.CG_BattleGoods_getBoxReward_10113(CollectManager._npc.id);
                    break;
            }
        }
        else {
            switch (sceneType) {
                case EnumMapType.SANGUO_YT:
                    GGlobal.modelSanGuoYT.CG_YITONG_STOP_COLLECT_5807(CollectManager._npc.id);
                    break;
                case EnumMapType.LIANGCAO:
                    GGlobal.modelLiangCao.CG_BattleGoods_stopgetbox_10111(CollectManager._npc.id);
                    break;
            }
        }
    };
    CollectManager.serverEnd = function () {
        var sId = GGlobal.sceneID;
        if (!CollectManager._isCollecting)
            return;
        CollectManager._isCollecting = false;
        CollectManager._npc.isCollect = false;
        CollectManager._callBack = null;
        GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, CollectManager.run);
    };
    CollectManager.run = function (interval) {
        var now = egret.getTimer();
        var rate = (now - CollectManager.beginTime) / CollectManager.NEED_TIME;
        CollectManager._npc.updateCollectPro(rate * 100);
        if (rate >= 1) {
            CollectManager._isFinish = true;
            var sId = GGlobal.sceneID;
            if (CollectManager._callBack != null) {
                CollectManager._callBack.run();
            }
            else {
            }
            CollectManager.end();
            CollectManager._curPoint = new egret.Point(CollectManager._npc.x - CameraManager.sightX - 34, CollectManager._npc.y - CameraManager.sightY - 34);
        }
    };
    CollectManager.NEED_TIME = 5000;
    CollectManager._isCollecting = false;
    return CollectManager;
}());
__reflect(CollectManager.prototype, "CollectManager");
