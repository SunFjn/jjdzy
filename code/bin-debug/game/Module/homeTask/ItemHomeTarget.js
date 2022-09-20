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
var ItemHomeTarget = (function (_super) {
    __extends(ItemHomeTarget, _super);
    function ItemHomeTarget() {
        return _super.call(this) || this;
    }
    ItemHomeTarget.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeTask", "ItemHomeTarget"));
    };
    ItemHomeTarget.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnLQ.addClickListener(s.onGet, s);
        s.btn.addClickListener(s.onGo, s);
    };
    Object.defineProperty(ItemHomeTarget.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            s.lbHuoYue.text = v.name;
            //领取状态
            s.imgYWC.visible = v.state == 2;
            s.btn.visible = v.state == 0;
            s.btnLQ.visible = v.state == 1;
            //奖励
            var icon = ConfigHelp.makeItemListArr(JSON.parse(v.award));
            s.gird.tipEnabled = s.gird.isShowEff = true;
            s.gird.vo = icon[0];
            // if (v.lib.type == 301 || v.lib.type == 302) {//特殊处理 by 苏波
            // 	s.progress.max = 1
            // 	s.progress.value = v.state == 0 ? 0 : 1
            // } else {
            if (v.lib.type == 301) {
                var m = GGlobal.model_HomeMaid;
                var ct = m.getQualityCt(v.lib.canshu1); //
                //进度
                s.progress.max = v.lib.canshu2;
                // let val = GGlobal.model_HomeTask.progreGoal[v.lib.type]
                var val = ct > v.lib.canshu2 ? v.lib.canshu2 : ct;
                s.progress.value = val ? val : 0;
            }
            else if (v.lib.type == 302) {
                var m = GGlobal.model_HomeMaid;
                var ct = m.getStarCt(v.lib.canshu2); //
                //进度
                s.progress.max = v.lib.canshu1;
                // let val = GGlobal.model_HomeTask.progreGoal[v.lib.type]
                var val = ct > v.lib.canshu1 ? v.lib.canshu1 : ct;
                s.progress.value = val ? val : 0;
            }
            else {
                //进度
                s.progress.max = v.lib.canshu1;
                var val = GGlobal.model_HomeTask.progreGoal[v.lib.type];
                s.progress.value = val ? val : 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemHomeTarget.prototype.onGet = function () {
        var s = this;
        if (!s._vo) {
            return;
        }
        GGlobal.model_HomeTask.CG_GET_GOAL_REWARD_11415(s._vo.id);
    };
    ItemHomeTarget.prototype.onGo = function () {
        var s = this;
        if (!s._vo) {
            return;
        }
        if (s._vo.nextto == 0) {
            var arr = JSON.parse(s._vo.lib.nextto2);
            var min = 0;
            var builderID = 0;
            for (var i = 0; i < arr.length; i++) {
                var cfg = Config.zsfl_019[arr[i][0]];
                var builderLv = GGlobal.homemodel.getBuildCfgIDByType(cfg.zslx);
                if (i == 0) {
                    min = builderLv;
                    builderID = cfg.npc;
                }
                else if (builderLv < min) {
                    min = builderLv;
                    builderID = cfg.npc;
                }
            }
            GGlobal.layerMgr.open(UIConst.HOME_JIAJU_UI, builderID);
        }
        else {
            GGlobal.layerMgr.open(s._vo.nextto);
        }
        GGlobal.layerMgr.close2(UIConst.HOME_TASK);
    };
    ItemHomeTarget.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.gird.clean();
    };
    ItemHomeTarget.URL = "ui://oy62ymetd8t65";
    return ItemHomeTarget;
}(fairygui.GComponent));
__reflect(ItemHomeTarget.prototype, "ItemHomeTarget");
