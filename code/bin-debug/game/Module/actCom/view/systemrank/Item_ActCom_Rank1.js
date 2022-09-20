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
var Item_ActCom_Rank1 = (function (_super) {
    __extends(Item_ActCom_Rank1, _super);
    function Item_ActCom_Rank1() {
        var _this = _super.call(this) || this;
        _this._idx = 0; //位置
        _this._index = 0;
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    Item_ActCom_Rank1.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SystemRank", "Item_ActCom_Rank1"));
    };
    Item_ActCom_Rank1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
    };
    Item_ActCom_Rank1.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    Item_ActCom_Rank1.prototype.itemRender1 = function (idx, obj) {
        var bol = false;
        if (this._rank && this._rank.count >= this._cfg.dj) {
            bol = true;
        }
        var item = obj;
        item.setVo(this._bigAwards[idx], bol);
    };
    Item_ActCom_Rank1.prototype.setVO = function (idx, cfg, cfg1) {
        var self = this;
        self._idx = idx;
        // self._index = id;
        // let cfg = Config.wszwxsxspm_325[id];
        self._cfg = cfg1;
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self._awards.length;
        self._bigAwards = JSON.parse(cfg.reward1);
        self.bpList.numItems = self._bigAwards.length;
    };
    /**更新数据 */
    Item_ActCom_Rank1.prototype.setData = function () {
        var self = this;
        self._rank = Model_GlobalMsg.rankData[self._idx - 1];
        if (!self._rank) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
            self.nameTxt.text = self._rank.name;
            var showStr = "";
            // if (Model_GlobalMsg.sysID == UIConst.ACTCOM_RANK) {
            // 	showStr = "寻兽";
            // }
            if (self._cfg) {
                showStr = self._cfg.name;
            }
            self.jdTxt.text = showStr + "：" + self._rank.count + "次";
            if (Model_GlobalMsg.myRank == self._idx) {
                self.nameTxt.color = Color.GREENINT;
                self.nameTxt.bold = true;
            }
            else {
                self.nameTxt.color = Color.WHITEINT;
            }
        }
        var headVO;
        if (self._idx == 2) {
            headVO = Model_GlobalMsg.headData[0];
        }
        else {
            headVO = Model_GlobalMsg.headData[1];
        }
        if (!headVO) {
            self.viewHead.setdata(null);
        }
        else {
            self.viewHead.setdata(headVO.headId, -1, "", headVO.vip, false, null, headVO.country);
        }
        self.bpList.numItems = self._bigAwards.length;
    };
    Item_ActCom_Rank1.prototype.clean = function () {
        var self = this;
        self.bpList.numItems = 0;
    };
    Item_ActCom_Rank1.URL = "ui://qz5r0meldsdy2";
    return Item_ActCom_Rank1;
}(fairygui.GLabel));
__reflect(Item_ActCom_Rank1.prototype, "Item_ActCom_Rank1");
