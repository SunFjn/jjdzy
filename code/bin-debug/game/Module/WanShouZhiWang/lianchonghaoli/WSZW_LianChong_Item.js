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
 * 连充豪礼item
 */
var WSZW_LianChong_Item = (function (_super) {
    __extends(WSZW_LianChong_Item, _super);
    function WSZW_LianChong_Item() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    WSZW_LianChong_Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.btnGet.addClickListener(this.onClickGet, this);
        this.btnRec.addClickListener(this.onClickRec, this);
    };
    WSZW_LianChong_Item.prototype.clean = function () {
        this.list.numItems = 0;
    };
    WSZW_LianChong_Item.prototype.setVo = function (v, hid, index) {
        var self = this;
        self._vo = v;
        self._hid = hid;
        if (self._hid == UIConst.WSZW_LIANCHONGHAOLI) {
            self._cfg = Config.lchl_756[self._vo.id];
            var day = 0;
            if (index == 0) {
                day = Model_WanShouZhiWang.days[0];
            }
            else if (index == 1) {
                day = Model_WanShouZhiWang.days[1];
            }
            else {
                day = Model_WanShouZhiWang.days[2];
            }
            self._index = index;
            self._status = v ? v.status : 0;
            var colorStr = day >= self._cfg.tianshu ? Color.GREENSTR : Color.REDSTR;
            self.lab.text = "累计" + self._cfg.tianshu + "天充值满" + self._cfg.rmb + "元" + HtmlUtil.fontNoSize("（" + day + "/" + self._cfg.tianshu + "）", colorStr);
        }
        else if (self._hid == UIConst.XINHD_LXCZ) {
            self._cfg = Config.lxcz_764[self._vo.id];
            var day = 0;
            if (index == 0) {
                day = Model_WanShouZhiWang.days[0];
            }
            else if (index == 1) {
                day = Model_WanShouZhiWang.days[1];
            }
            else {
                day = Model_WanShouZhiWang.days[2];
            }
            self._index = index;
            self._status = v ? v.status : 0;
            var colorStr = day >= self._cfg.tianshu ? Color.GREENSTR : Color.REDSTR;
            self.lab.text = "累计" + self._cfg.tianshu + "天充值满" + self._cfg.rmb + "元" + HtmlUtil.fontNoSize("（" + day + "/" + self._cfg.tianshu + "）", colorStr);
        }
        if (self._status == 0) {
            self.btnGet.touchable = self.btnGet.visible = false;
            self.btnRec.touchable = self.btnRec.visible = true;
            self.imgGet.visible = false;
        }
        else if (self._status == 1) {
            self.btnGet.checkNotice = self.btnGet.touchable = self.btnGet.visible = true;
            self.btnRec.touchable = self.btnRec.visible = false;
            self.imgGet.visible = false;
        }
        else if (self._status == 2) {
            self.btnGet.touchable = self.btnGet.visible = false;
            self.btnRec.touchable = self.btnRec.visible = false;
            self.imgGet.visible = true;
        }
        else {
            self.btnGet.touchable = self.btnGet.visible = false;
            self.btnRec.touchable = self.btnRec.visible = false;
            self.imgGet.visible = false;
        }
        self._listData = null;
        //奖励显示
        self._listData = ConfigHelp.makeItemListArr(self._cfg.jiangli);
        self.list.numItems = self._listData ? self._listData.length : 0;
    };
    WSZW_LianChong_Item.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    WSZW_LianChong_Item.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (this._hid == UIConst.WSZW_LIANCHONGHAOLI) {
            GGlobal.modelWanShouZhiWang.CG_LIANCHONG_GETAWARD(this._vo.id, this._index);
        }
        else if (this._hid == UIConst.XINHD_LXCZ) {
            GGlobal.modelWanShouZhiWang.CG_GETAWARD10201(this._vo.id, this._index);
        }
    };
    WSZW_LianChong_Item.prototype.onClickRec = function () {
        ViewChongZhi.tryToOpenCZ();
    };
    WSZW_LianChong_Item.URL = "ui://niyo89miq6qw2";
    return WSZW_LianChong_Item;
}(fairygui.GComponent));
__reflect(WSZW_LianChong_Item.prototype, "WSZW_LianChong_Item");
