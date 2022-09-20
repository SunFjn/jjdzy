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
 * 洗练排名
 */
var Child_XiLianRank = (function (_super) {
    __extends(Child_XiLianRank, _super);
    function Child_XiLianRank() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    Child_XiLianRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "Child_XiLianRank"));
    };
    Child_XiLianRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.list = (this.getChild("list"));
        this.bpList = (this.getChild("bpList"));
        this.c1 = this.getController("c1");
        this.bg = (this.getChild("bg"));
        this.myRankTxt = (this.getChild("myRankTxt"));
        this.myAuthenTxt = (this.getChild("myAuthenTxt"));
        this.sbTxt = (this.getChild("sbTxt"));
        this.bpTxt = (this.getChild("bpTxt"));
        this.timeTxt = (this.getChild("timeTxt"));
        this.nameTxt = (this.getChild("nameTxt"));
        this.authenTxt = (this.getChild("authenTxt"));
        this.item2 = (this.getChild("item2"));
        this.item3 = (this.getChild("item3"));
        this.item4 = (this.getChild("item4"));
        this.item5 = (this.getChild("item5"));
        this.container = (this.getChild("container"));
        this.btnGo = (this.getChild("btnGo"));
        this.list.itemRenderer = this.itemRender;
        this.list.callbackThisObj = this;
        this.bpList.itemRenderer = this.itemRender1;
        this.bpList.callbackThisObj = this;
        this.item2.setVO(2);
        this.item3.setVO(3);
        this.item4.setVO(4);
        this.item5.setVO(5);
    };
    Object.defineProperty(Child_XiLianRank, "instance", {
        get: function () {
            if (Child_XiLianRank._instance == null) {
                Child_XiLianRank._instance = Child_XiLianRank.createInstance();
            }
            return Child_XiLianRank._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_XiLianRank.prototype.show = function (p, id) {
        var self = this;
        self._hid = id;
        p.addChild(self);
        self.setXY(0, 257);
        IconUtil.setImg(self.bg, "resource/image/pic/bg6.jpg");
        var cfg = Config.shxlpm_268[1];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self._awards.length;
        self._bigAwards = JSON.parse(cfg.reward1);
        self.bpList.numItems = self._bigAwards.length;
        // GGlobal.modelEightLock.CG4571(id);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, self.onUpdate, self);
        self.onUpdate();
        self.btnGo.addClickListener(self.goHandler, self);
    };
    /**注销事件 */
    Child_XiLianRank.prototype.disposePanel = function () {
        var self = this;
        if (self.parent) {
            self.parent.removeChild(self);
        }
        IconUtil.setImg(self.bg, null);
        self.list.numItems = 0;
        self.bpList.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, self.onUpdate, self);
        self.container.setUIRole(null);
        self.btnGo.removeClickListener(self.goHandler, self);
        Timer.instance.remove(self.onTick, self);
    };
    Child_XiLianRank.prototype.dispose = function () {
        Child_XiLianRank._instance = null;
        _super.prototype.dispose.call(this);
    };
    Child_XiLianRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    Child_XiLianRank.prototype.itemRender1 = function (idx, obj) {
        var bol = false;
        if (this._firstVO && this._firstVO.jdCount >= Config.xtcs_004[5704].num) {
            bol = true;
        }
        var item = obj;
        item.setVo(this._bigAwards[idx], bol);
    };
    /**更新数据 */
    Child_XiLianRank.prototype.onUpdate = function () {
        var self = this;
        this.item2.setData();
        this.item3.setData();
        var end = Model_ActHolyBeast.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            if (timeRemain >= 24 * 60 * 60 * 1000) {
                self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
            }
            else {
                self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
            }
            Timer.instance.listen(self.onTick, self, 1000);
        }
        else {
            self.timeTxt.text = "剩余时间：活动已结束";
            self.btnGo.visible = false;
        }
        var color0 = Model_ActHolyBeast.myjdCount >= Config.xtcs_004[5703].num ? 2 : 6;
        var color1 = Model_ActHolyBeast.myjdCount >= Config.xtcs_004[5704].num ? 2 : 6;
        self.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize("圣兽洗练" + Config.xtcs_004[5703].num + "次", Color.getColorStr(color0));
        self.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize("圣兽洗练" + Config.xtcs_004[5704].num + "次", Color.getColorStr(color1));
        if (!Model_ActHolyBeast.rankData || Model_ActHolyBeast.rankData.length <= 0) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
            self._firstVO = Model_ActHolyBeast.rankData[0];
            self.nameTxt.text = self._firstVO.name;
            self.authenTxt.text = "圣兽洗练：" + self._firstVO.jdCount + "次";
            if (Model_ActHolyBeast.myRank == 1) {
                self.nameTxt.color = Color.GREENINT;
                self.nameTxt.bold = true;
            }
            else {
                self.nameTxt.color = Color.WHITEINT;
            }
            if (Model_ActHolyBeast.modId > 1000 && Model_ActHolyBeast.modId < 100000) {
                var mx = Config.sz_739[Model_ActHolyBeast.modId].moxing;
                self.container.setUIRole(mx);
            }
            else {
                self.container.setUIRole(Model_ActHolyBeast.modId);
            }
        }
        if (Model_ActHolyBeast.myRank == 0 || Model_ActHolyBeast.myRank > 20 || Model_ActHolyBeast.myjdCount < Config.xtcs_004[5703].num) {
            self.myRankTxt.text = "我的排名：未上榜";
        }
        else {
            self.myRankTxt.text = "我的排名：" + Model_ActHolyBeast.myRank;
        }
        self.myAuthenTxt.text = "圣兽洗练：" + Model_ActHolyBeast.myjdCount;
        self.bpList.numItems = self._bigAwards.length;
    };
    /**活动时间刷新 */
    Child_XiLianRank.prototype.onTick = function () {
        var end = Model_ActHolyBeast.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (end - servTime > 0) {
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
    /**前往按钮事件 */
    Child_XiLianRank.prototype.goHandler = function () {
        GGlobal.layerMgr.open(UIConst.SHJX);
    };
    Child_XiLianRank.URL = "ui://d5y9ngt6cl031l";
    return Child_XiLianRank;
}(fairygui.GComponent));
__reflect(Child_XiLianRank.prototype, "Child_XiLianRank", ["IActHolyBeast"]);
