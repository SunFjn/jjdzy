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
var ViewLiangCaoRank = (function (_super) {
    __extends(ViewLiangCaoRank, _super);
    function ViewLiangCaoRank() {
        var _this = _super.call(this) || this;
        _this.itemRenderPersonal = function (idx, obj) {
            var item = obj;
            item.setdata(idx);
        };
        _this.itemRenderServer = function (idx, obj) {
            var item = obj;
            item.setdata(idx);
        };
        _this.itemRenderScore = function (idx, obj) {
            var item = obj;
            item.setdata(idx);
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.modelLiangCao;
            var idx = self.c1.selectedIndex;
            switch (idx) {
                case 0:
                    self.personList.numItems = 10; // model.rankdata_person.length;
                    break;
                case 1:
                    self.serverList.numItems = 3; //model.server_data.length;
                    if (model.mvp_name) {
                        self.lbMvp.text = model.mvp_name + "\n积分：" + model.mvp_score;
                        ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_frame), self.frameIcon);
                        ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_head), self.headIcon);
                    }
                    else {
                        self.lbMvp.text = "";
                    }
                    ConfigHelp.createViewGridList(self.list, ConfigHelp.getSystemDesc(7601), self);
                    break;
                case 2:
                    self.scoreList.numItems = model.rankdata_score.length;
                    break;
            }
            var rank = model.myRank;
            self.lbRank.text = "我的排名：" + ((rank == 0 || rank > 20) ? "未上榜" : rank);
            self.lbScore.text = "我的积分：" + model.myScore;
            self.tab2.checkNotice = GGlobal.reddot.checkCondition(UIConst.LIANGCAO_RANK);
        };
        _this.onChangeController = function () {
            var idx = _this.c1.selectedIndex;
            if (idx == 0) {
                GGlobal.modelLiangCao.CG_BattleGoods_personalRank_10129(0);
            }
            else if (idx == 1) {
                GGlobal.modelLiangCao.CG_BattleGoods_personalRank_10129(1);
            }
            else {
                GGlobal.modelLiangCao.CG_BattleGoods_ui_10123();
            }
            _this.update();
        };
        _this.eventFun = function (v) {
            var self = _this;
            var event = EventUtil.register;
            event(v, self.c1, fairygui.StateChangeEvent.CHANGED, self.onChangeController, self);
        };
        _this.loadRes("liangcao", "liangcao_atlas0");
        return _this;
    }
    ViewLiangCaoRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoRank"));
    };
    ViewLiangCaoRank.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("liangcao");
        self.view = fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoRank").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.personList.callbackThisObj = self;
        self.personList.itemRenderer = self.itemRenderPersonal;
        self.serverList.callbackThisObj = self;
        self.serverList.itemRenderer = self.itemRenderServer;
        self.scoreList.callbackThisObj = self;
        self.scoreList.itemRenderer = self.itemRenderScore;
        _super.prototype.childrenCreated.call(this);
    };
    ViewLiangCaoRank.prototype.onShown = function () {
        var self = this;
        self.eventFun(1);
        self.update();
        GGlobal.modelLiangCao.CG_BattleGoods_personalRank_10129(0);
        GGlobal.control.listen(UIConst.LIANGCAO_RANK, self.update, self);
    };
    ViewLiangCaoRank.prototype.onHide = function () {
        var self = this;
        self.eventFun(0);
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.LIANGCAO_RANK, self.update, self);
        GGlobal.layerMgr.close(UIConst.LIANGCAO_RANK);
    };
    ViewLiangCaoRank.URL = "ui://mbcu0qc0hd208";
    return ViewLiangCaoRank;
}(UIModalPanel));
__reflect(ViewLiangCaoRank.prototype, "ViewLiangCaoRank");
