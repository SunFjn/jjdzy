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
var ChilHSCB = (function (_super) {
    __extends(ChilHSCB, _super);
    function ChilHSCB() {
        return _super.call(this) || this;
    }
    ChilHSCB.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ChilHSCB"));
    };
    ChilHSCB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
        this.layerArr = [this.layer0, this.layer1, this.layer2, this.layer3];
        this.listRew.itemRenderer = this.renderHandle;
        this.listRew.callbackThisObj = this;
        this.listBig.itemRenderer = this.renderBig;
        this.listBig.callbackThisObj = this;
    };
    ChilHSCB.prototype.onShow = function () {
        IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "hscb.jpg");
        GGlobal.model_HSCB.CG_OPENUI_7931();
        this.btnBat.addClickListener(this.onChallenge, this);
        this.btnRank.addClickListener(this.onRank, this);
        GGlobal.model_HSCB.listen(Model_HSCB.msg_openui, this.onUpdate, this);
    };
    ChilHSCB.prototype.onHide = function () {
        IconUtil.setImg(this.imgBg, null);
        this.btnBat.removeClickListener(this.onChallenge, this);
        this.btnRank.removeClickListener(this.onRank, this);
        GGlobal.model_HSCB.remove(Model_HSCB.msg_openui, this.onUpdate, this);
        for (var i = 0; i < this.layerArr.length; i++) {
            var item = this.layerArr[i];
            item.removeEvent();
        }
        this.listRew.numItems = 0;
        this.listBig.numItems = 0;
    };
    ChilHSCB.prototype.onChallenge = function () {
        GGlobal.model_HSCB.CG_UPLAYER_7933();
    };
    ChilHSCB.prototype.onRank = function () {
        GGlobal.layerMgr.open(UIConst.HSCB_RANK);
    };
    ChilHSCB.prototype.onUpdate = function () {
        var s = this;
        var m = GGlobal.model_HSCB;
        var curLayer = m.curLayer + 1;
        var arr = [];
        var i = m.curLayer <= 0 ? 1 : m.curLayer;
        while (true) {
            var v = Config.hscb_751[i];
            if (v) {
                arr.push(v);
            }
            else {
                break;
            }
            if (arr.length >= 4)
                break;
            i++;
        }
        if (arr.length < 4) {
            i = m.curLayer - 1;
            while (true) {
                var v = Config.hscb_751[i];
                if (v) {
                    arr.unshift(v);
                }
                else {
                    break;
                }
                if (arr.length >= 4)
                    break;
                i--;
            }
        }
        if (arr.length == 0)
            return;
        for (var i_1 = 0; i_1 < s.layerArr.length; i_1++) {
            var v = s.layerArr[i_1];
            v.vo = arr[i_1];
        }
        var layVo = Config.hscb_751[curLayer];
        if (!layVo) {
            s.lbCur.text = "当前关卡：" + (curLayer - 1) + "关";
            layVo = Config.hscb_751[curLayer - 1];
            s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(layVo.gqjl));
            s.listRew.numItems = s._rewArr.length;
            this.imgPass.visible = true;
            this.btnBat.visible = false;
        }
        else {
            s.lbCur.text = "当前关卡：" + curLayer + "关";
            s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(layVo.gqjl));
            s.listRew.numItems = s._rewArr.length;
            this.imgPass.visible = false;
            this.btnBat.visible = true;
        }
        //大奖
        var maxCfg = m.getBigRewCfg(curLayer);
        s._bigArr = ConfigHelp.makeItemListArr(JSON.parse(maxCfg.dj));
        s.listBig.numItems = s._bigArr.length;
        s.lbBig.text = maxCfg.id + "关大奖";
        if (maxCfg.zl == 0) {
            this.lbPower.text = "战力飙升";
        }
        else {
            this.lbPower.text = "战力+" + maxCfg.zl;
        }
        //第一
        if (m.firName) {
            s.vhead.setdata(m.firHead, 0, m.firName, 0, false, m.firFrame);
            s.lbRank.text = "通关" + m.firLayer + "层";
        }
        else {
            s.vhead.setdata(0, 0, "虚位以待");
            s.lbRank.text = "";
        }
    };
    ChilHSCB.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._rewArr[index];
    };
    ChilHSCB.prototype.renderBig = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._bigArr[index];
    };
    ChilHSCB.URL = "ui://7a366usaql4nf";
    return ChilHSCB;
}(fairygui.GComponent));
__reflect(ChilHSCB.prototype, "ChilHSCB");
