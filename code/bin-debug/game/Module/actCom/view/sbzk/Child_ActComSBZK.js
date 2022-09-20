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
 * 神兵折扣活动
 */
var Child_ActComSBZK = (function (_super) {
    __extends(Child_ActComSBZK, _super);
    function Child_ActComSBZK() {
        var _this = _super.call(this) || this;
        //>>>>end
        _this.datas = [];
        _this._maxCount = 0;
        return _this;
    }
    Child_ActComSBZK.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSBZK", "Child_ActComSBZK"));
    };
    Child_ActComSBZK.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActComSBZK.setExtends = function () {
    };
    Child_ActComSBZK.prototype.initView = function (pParent) {
        // let self = this;
        // for (let key in Config.sbzk_281) {
        //     let cfg:Isbzk_281 = Config.sbzk_281[key];
        //     self.datas.push(Config.sbzk_281[key]);
        // 	let arr = JSON.parse(cfg.time);
        // self["num" + key].text = arr[0][0] + "次";
        // 	self._maxCount = arr[0][0];
        // }
        // ImageLoader.instance.loader(Enum_Path.PIC_URL + "shenbingzhekou.jpg", this.bgImg);
    };
    Child_ActComSBZK.prototype.openPanel = function (pData) {
        this._vo = pData;
        this.datas = [];
        this.disGroup0.visible = false;
        this.disGroup1.visible = false;
        if (pData.id == UIConst.ACTCOM_SBZK) {
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SBZK);
            this.tipsTxt.text = "活动期间打造神兵可享折扣优惠。打造次数越多，折扣力度越大。";
            IconUtil.setImg1(Enum_Path.PIC_URL + "shenbingzhekou.jpg", this.bgImg);
            for (var key in Config.sbzk_281) {
                var cfg = Config.sbzk_281[key];
                this.datas.push(Config.sbzk_281[key]);
                var arr = JSON.parse(cfg.time);
                if (this["num" + (Number(key) - 1)]) {
                    this["num" + (Number(key) - 1)].text = arr[0][0] + "次";
                }
                this._maxCount = arr[0][0];
            }
            this.goBtn.text = "前往打造";
            this.disGroup0.visible = true;
        }
        else {
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SJZK);
            this.tipsTxt.text = "活动期间神将阁寻宝可享折扣优惠，寻宝次数越多，折扣力度越大";
            IconUtil.setImg1(Enum_Path.PIC_URL + "shenjiangzhekou.jpg", this.bgImg);
            for (var key in Config.herooff_287) {
                var cfg = Config.herooff_287[key];
                this.datas.push(Config.herooff_287[key]);
                var arr = JSON.parse(cfg.time);
                if (this["num" + (Number(key) - 1)]) {
                    this["num" + (Number(key) - 1)].text = arr[0][0] + "次";
                }
                this._maxCount = arr[0][0];
            }
            this.goBtn.text = "前往寻宝";
            this.disGroup1.visible = true;
        }
        this.show();
        this.y = 264;
    };
    Child_ActComSBZK.prototype.closePanel = function (pData) {
        IconUtil.setImg1(null, this.bgImg);
        this.disposePanel();
    };
    Child_ActComSBZK.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActComSBZK.prototype.disposePanel = function () {
        var self = this;
        self.goBtn.removeClickListener(self.onGoto, self);
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.control.remove(UIConst.ACTCOM_SBZK, self.updateView, self);
        GGlobal.control.remove(UIConst.ACTCOM_SJZK, self.updateView, self);
    };
    Child_ActComSBZK.prototype.show = function () {
        var self = this;
        self.goBtn.addClickListener(self.onGoto, self);
        Timer.instance.listen(self.onUpdate, self);
        GGlobal.control.listen(UIConst.ACTCOM_SBZK, self.updateView, self);
        self._act = this._vo;
        // if (this._vo.id == UIConst.ACTCOM_SBZK) {
        // 	self._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_SBZK);
        // } else {
        // 	self._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_SJZK);
        // }
        GGlobal.control.listen(UIConst.ACTCOM_SJZK, self.updateView, self);
    };
    /**
     * 更新页面数据
     */
    Child_ActComSBZK.prototype.updateView = function () {
        var self = this;
        var index = 0;
        var curCfg;
        var len = self.datas.length;
        var arr;
        self.expbar.max = 100;
        var count = 0;
        if (this._vo.id == UIConst.ACTCOM_SBZK) {
            count = GGlobal.model_actCom.forgeNum;
        }
        else {
            count = GGlobal.model_actCom.treasure;
        }
        if (count >= self._maxCount) {
            self.expbar.value = 100;
            self.expbar._titleObject.text = "max";
            return;
        }
        for (var i = 0; i < len; i++) {
            var cfg = self.datas[i];
            arr = JSON.parse(cfg.time);
            if (count <= arr[0][0]) {
                index = i;
                curCfg = cfg;
                break;
            }
        }
        if (count <= 0) {
            self.expbar.value = 0;
        }
        else {
            // self.expbar.value = (25 * index) * (count / arr[0][0]);
            arr = JSON.parse(curCfg.time);
            var lastCfg = self.datas[index - 1];
            var arr1 = JSON.parse(lastCfg.time);
            self.expbar.value = 25 * (index - 1) + 25 * ((count - arr1[0][0]) / (arr[0][0] - arr1[0][0]));
        }
        self.expbar._titleObject.text = count + "/" + self._maxCount;
    };
    Child_ActComSBZK.prototype.onUpdate = function () {
        var end = this._act ? this._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    /**
     * 前往按钮
     */
    Child_ActComSBZK.prototype.onGoto = function () {
        if (this._vo.id == UIConst.ACTCOM_SBZK) {
            GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_DUANZAO);
        }
        else {
            GGlobal.layerMgr.open(UIConst.CANGBAOGE);
        }
    };
    Child_ActComSBZK.pkg = "actComSBZK";
    Child_ActComSBZK.URL = "ui://6gtjahseo65r0";
    return Child_ActComSBZK;
}(fairygui.GComponent));
__reflect(Child_ActComSBZK.prototype, "Child_ActComSBZK", ["IPanel"]);
