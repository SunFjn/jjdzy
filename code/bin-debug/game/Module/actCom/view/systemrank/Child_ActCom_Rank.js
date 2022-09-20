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
var Child_ActCom_Rank = (function (_super) {
    __extends(Child_ActCom_Rank, _super);
    function Child_ActCom_Rank() {
        var _this = _super.call(this) || this;
        _this._arr = [];
        /**上榜条件 */
        _this.rankCount = 0;
        /**大奖条件 */
        _this.bigCount = 0;
        _this.showStr = "";
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    Child_ActCom_Rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SystemRank", "Child_ActCom_Rank"));
    };
    Child_ActCom_Rank.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_ActCom_Rank.URL, Item_ActCom_Rank);
        f(Item_ActCom_Rank1.URL, Item_ActCom_Rank1);
        f(Item_ActCom_Rank2.URL, Item_ActCom_Rank2);
        f(ActCom_ListGrid.URL, ActCom_ListGrid);
    };
    Child_ActCom_Rank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
    };
    Child_ActCom_Rank.prototype.initView = function (pParent) {
    };
    Child_ActCom_Rank.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self._arr = [];
        var cfg = Config.xitong_001[pData.id];
        if (cfg.or == 0) {
            // self.rankCount = Config.xtcs_004[7150].num;
            // self.bigCount = Config.xtcs_004[7151].num;
            // self.showStr = "寻兽";
            // cfg = Config.wszwxsxspm_325[(self.vo.qs - 1) * 5 + 1];
            GGlobal.reddot.listen(UIConst.XIANSHAN_XUNSHOU, self.checkNotice, self);
            GGlobal.modelEightLock.CG4571(pData.id);
        }
        else {
            GGlobal.modelActivity.CG_OPENACT(pData.id);
        }
        self._cfg1 = Config.pmhdsbdjcsb_326[pData.id];
        self.rankCount = self._cfg1.sb;
        self.bigCount = self._cfg1.dj;
        self.showStr = self._cfg1.name;
        self._arr = GGlobal.model_actCom.getRankCfgs(pData.qs, pData.id);
        self._cfg = self._arr[0];
        IconUtil.setImg(self.bg, "resource/image/pic/bg7.jpg");
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
        self.list.numItems = self._awards.length;
        self._bigAwards = JSON.parse(self._cfg.reward1);
        self.bpList.numItems = self._bigAwards.length;
        // GGlobal.modelEightLock.CG4571(pData.id);
        GGlobal.control.listen(UIConst.ACTCOM_RANK, self.onUpdate, self);
        self.btnGo.addClickListener(self.goHandler, self);
    };
    /**销毁 */
    Child_ActCom_Rank.prototype.closePanel = function () {
        var self = this;
        IconUtil.setImg(self.bg, null);
        self.list.numItems = 0;
        self.item2.clean();
        self.item3.clean();
        self.item4.clean();
        self.item5.clean();
        Timer.instance.remove(self.onTick, self);
        GGlobal.control.remove(UIConst.ACTCOM_RANK, self.onUpdate, self);
        self.container.setUIRole(null);
        self.btnGo.removeClickListener(self.goHandler, self);
    };
    Child_ActCom_Rank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    Child_ActCom_Rank.prototype.itemRender1 = function (idx, obj) {
        var bol = false;
        if (this._firstVO && this._firstVO.count >= this.bigCount) {
            bol = true;
        }
        var item = obj;
        item.setVo(this._bigAwards[idx], bol);
    };
    /**更新数据 */
    Child_ActCom_Rank.prototype.onUpdate = function () {
        var self = this;
        var end = Model_GlobalMsg.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(self.onTick, self, 1000);
        }
        else {
            self.timeTxt.text = "剩余时间：活动已结束";
            self.btnGo.visible = false;
        }
        for (var i = 2; i < 6; i++) {
            // self["item" + i].setVO(i + (self.vo.qs - 1) * 5, i);
            var cfg = self._arr[i - 1];
            self["item" + i].setVO(i, self._arr[i - 1], self._cfg1);
        }
        self.item2.setData();
        self.item3.setData();
        var color0 = Model_GlobalMsg.myCount >= self.rankCount ? 2 : 6;
        var color1 = Model_GlobalMsg.myCount >= self.bigCount ? 2 : 6;
        self.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize(self.showStr + self.rankCount + "次", Color.getColorStr(color0));
        self.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize(self.showStr + self.bigCount + "次", Color.getColorStr(color1));
        if (!Model_GlobalMsg.rankData || Model_GlobalMsg.rankData.length <= 0) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
            self._firstVO = Model_GlobalMsg.rankData[0];
            self.nameTxt.text = self._firstVO.name;
            self.authenTxt.text = self.showStr + "：" + self._firstVO.count + "次";
            if (Model_GlobalMsg.myRank == 1) {
                self.nameTxt.color = Color.GREENINT;
                self.nameTxt.bold = true;
            }
            else {
                self.nameTxt.color = Color.WHITEINT;
            }
            self.container.setUIRole(Model_GlobalMsg.firstJob);
        }
        if (Model_GlobalMsg.myRank == 0 || Model_GlobalMsg.myRank > 20 || Model_GlobalMsg.myCount < self.rankCount) {
            self.myRankTxt.text = "我的排名：未上榜";
        }
        else {
            self.myRankTxt.text = "我的排名：" + Model_GlobalMsg.myRank;
        }
        self.myAuthenTxt.text = self.showStr + "：" + Model_GlobalMsg.myCount + "次";
        self.bpList.numItems = self._bigAwards.length;
    };
    Child_ActCom_Rank.prototype.onTick = function () {
        var self = this;
        var end = Model_GlobalMsg.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
            self.btnGo.visible = true;
        }
        else {
            self.timeTxt.text = "剩余时间：活动已结束";
            Timer.instance.remove(self.onTick, self);
            self.btnGo.visible = false;
        }
    };
    Child_ActCom_Rank.prototype.goHandler = function () {
        var self = this;
        if (self.vo.id == UIConst.ACTCOM_RANK) {
            GGlobal.layerMgr.open(UIConst.XIANSHAN_XUNSHOU);
        }
        else if (self.vo.id == UIConst.ACTCOM_JDPM) {
            GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING);
        }
        else if (self.vo.id == UIConst.ACTCOM_QYPM) {
            GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN);
        }
    };
    Child_ActCom_Rank.prototype.checkNotice = function () {
        var self = this;
        if (self.vo.id == UIConst.ACTCOM_RANK) {
            var count = Model_Bag.getItemCount(GGlobal.modelxsxs.itemID);
            self.btnGo.checkNotice = count > 0;
        }
    };
    Child_ActCom_Rank.pkg = "ActCom_SystemRank";
    Child_ActCom_Rank.URL = "ui://qz5r0meldsdy0";
    return Child_ActCom_Rank;
}(fairygui.GComponent));
__reflect(Child_ActCom_Rank.prototype, "Child_ActCom_Rank", ["IPanel"]);
