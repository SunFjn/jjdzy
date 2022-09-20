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
/**
 * 少主祈愿排名
 */
var ChildShaoZhuQYRank = (function (_super) {
    __extends(ChildShaoZhuQYRank, _super);
    function ChildShaoZhuQYRank() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    Object.defineProperty(ChildShaoZhuQYRank, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = (fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuQYRank"));
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildShaoZhuQYRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
        self.item2.setVO(2);
        self.item3.setVO(3);
        self.item4.setVO(4);
        self.item5.setVO(5);
    };
    ChildShaoZhuQYRank.prototype.show = function () {
        IconUtil.setImg(this.bg, "resource/image/pic/bg7.jpg");
        var self = this;
        var cfg = Config.szqypm_272[1];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self._awards.length;
        self._bigAwards = JSON.parse(cfg.big);
        self.bpList.numItems = self._bigAwards.length;
        // GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_QY_RANK);
        GGlobal.modelShaoZhuAct.CG_OPEN_UI();
        GGlobal.control.listen(UIConst.SHAOZHU_QY_RANK, self.onUpdate, self);
        self.btnGo.addClickListener(self.goHandler, self);
    };
    /**销毁 */
    ChildShaoZhuQYRank.prototype.disposePanel = function () {
        IconUtil.setImg(this.bg, null);
        var self = this;
        self.list.numItems = 0;
        self.bpList.numItems = 0;
        GGlobal.control.remove(UIConst.SHAOZHU_QY_RANK, self.onUpdate, self);
        self.onUpdate();
        self.container.setUIRole(null);
        self.btnGo.removeClickListener(self.goHandler, self);
        Timer.instance.remove(this.onTick, this);
    };
    ChildShaoZhuQYRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ChildShaoZhuQYRank.prototype.itemRender1 = function (idx, obj) {
        var bol = false;
        if (this._firstVO && this._firstVO.jdCount >= Config.xtcs_004[6204].num) {
            bol = true;
        }
        var item = obj;
        item.setVo(this._bigAwards[idx], bol);
    };
    /**更新数据 */
    ChildShaoZhuQYRank.prototype.onUpdate = function () {
        var self = this;
        this.item2.setData();
        this.item3.setData();
        var end = ModelShaoZhuAct.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            if (timeRemain >= 24 * 60 * 60 * 1000) {
                self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
            }
            else {
                self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
            }
            Timer.instance.listen(this.onTick, this, 1000);
        }
        else {
            this.timeTxt.text = "剩余时间：活动已结束";
            this.btnGo.visible = false;
        }
        var color0 = ModelShaoZhuAct.myjdCount >= Config.xtcs_004[6203].num ? 2 : 6;
        var color1 = ModelShaoZhuAct.myjdCount >= Config.xtcs_004[6204].num ? 2 : 6;
        this.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize("祈愿" + Config.xtcs_004[6203].num + "次", Color.getColorStr(color0));
        this.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize("祈愿" + Config.xtcs_004[6204].num + "次", Color.getColorStr(color1));
        if (!ModelShaoZhuAct.rankData || ModelShaoZhuAct.rankData.length <= 0) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
            self._firstVO = ModelShaoZhuAct.rankData[0];
            self.nameTxt.text = self._firstVO.name;
            self.authenTxt.text = "祈愿：" + self._firstVO.jdCount + "次";
            if (ModelShaoZhuAct.myRank == 1) {
                self.nameTxt.color = Color.GREENINT;
                self.nameTxt.bold = true;
            }
            else {
                self.nameTxt.color = Color.WHITEINT;
            }
            if (ModelShaoZhuAct.modId > 1000 && ModelShaoZhuAct.modId < 100000) {
                var mx = Config.sz_739[ModelShaoZhuAct.modId].moxing;
                self.container.setUIRole(mx);
            }
            else {
                self.container.setUIRole(ModelShaoZhuAct.modId);
            }
        }
        if (ModelShaoZhuAct.myRank == 0 || ModelShaoZhuAct.myRank > 20 || ModelShaoZhuAct.myjdCount < Config.xtcs_004[6203].num) {
            self.myRankTxt.text = "我的排名：未上榜";
        }
        else {
            self.myRankTxt.text = "我的排名：" + ModelShaoZhuAct.myRank;
        }
        self.myAuthenTxt.text = "祈愿：" + ModelShaoZhuAct.myjdCount + "次";
        self.bpList.numItems = self._bigAwards.length;
    };
    ChildShaoZhuQYRank.prototype.onTick = function () {
        var end = ModelShaoZhuAct.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            if (timeRemain >= 24 * 60 * 60 * 1000) {
                this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
            }
            else {
                this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
            }
            this.btnGo.visible = true;
        }
        else {
            this.timeTxt.text = "剩余时间：活动已结束";
            Timer.instance.remove(this.onTick, this);
            this.btnGo.visible = false;
        }
    };
    ChildShaoZhuQYRank.prototype.goHandler = function () {
        GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN);
    };
    ChildShaoZhuQYRank.URL = "ui://w5ll6n5jfoqs1v";
    return ChildShaoZhuQYRank;
}(fairygui.GComponent));
__reflect(ChildShaoZhuQYRank.prototype, "ChildShaoZhuQYRank");
