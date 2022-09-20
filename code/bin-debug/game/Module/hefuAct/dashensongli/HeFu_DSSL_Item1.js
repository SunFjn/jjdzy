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
var HeFu_DSSL_Item1 = (function (_super) {
    __extends(HeFu_DSSL_Item1, _super);
    function HeFu_DSSL_Item1() {
        return _super.call(this) || this;
    }
    HeFu_DSSL_Item1.createInstance = function () {
        return (fairygui.UIPackage.createObject("hefuActCZFL", "HeFu_CZFL_Item"));
    };
    HeFu_DSSL_Item1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.btnGet.addClickListener(this.onClickGet, this);
    };
    HeFu_DSSL_Item1.prototype.setVo = function (vo) {
        var m = GGlobal.model_actCom;
        this.noticeGroup.visible = false;
        this._vo = vo;
        if (vo.tj1 <= 0 && vo.tj2 <= 0) {
            this.tipsTxt.text = "";
        }
        else if (vo.tj1 > 0) {
            this.tipsTxt.text = "VIP" + vo.tj1 + "可额外领取";
        }
        else {
            this.tipsTxt.text = "充值" + vo.tj2 + "元可额外领取";
        }
        var gift = m.giftObj[vo.id];
        this.noticeGroup.visible = false;
        if (gift) {
            if (gift.status == 0) {
                this.btnGet.visible = true;
                this.btnGet.grayed = true;
                this.btnGet.enabled = false;
                this.receivedImg.visible = false;
            }
            else if (gift.status == 1) {
                this.btnGet.visible = true;
                this.btnGet.grayed = false;
                this.btnGet.enabled = true;
                this.btnGet.checkNotice = true;
                this.receivedImg.visible = false;
            }
            else {
                this.btnGet.visible = false;
                this.receivedImg.visible = true;
                this.tipsTxt.text = "";
            }
        }
        else {
            this.receivedImg.visible = false;
            var dashen = m.dashenObj[vo.id];
            if (dashen) {
                if (dashen.num > 0) {
                    this.noticeGroup.visible = true;
                    this.numLb.text = dashen.num.toString();
                    if (vo.tj1 <= 0 && vo.tj2 <= 0) {
                        this.btnGet.grayed = false;
                        this.btnGet.enabled = true;
                    }
                    else if (vo.tj1 > 0 && Model_player.voMine.viplv >= vo.tj1) {
                        this.btnGet.grayed = false;
                        this.btnGet.enabled = true;
                    }
                    else if (vo.tj2 > 0 && m.dsslRecharge >= vo.tj2) {
                        this.btnGet.grayed = false;
                        this.btnGet.enabled = true;
                    }
                    else {
                        this.btnGet.grayed = true;
                        this.btnGet.enabled = false;
                    }
                }
                else {
                    this.btnGet.grayed = true;
                    this.btnGet.enabled = false;
                }
            }
        }
        var reward = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(vo.reward));
        this.item.tipEnabled = true;
        this.item.isShowEff = true;
        this.item.vo = reward[0];
    };
    HeFu_DSSL_Item1.prototype.onClickGet = function () {
        var dashen = GGlobal.model_actCom.dashenObj[this._vo.id];
        if (dashen && dashen.num <= 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        GGlobal.model_actCom.CG_DSSL_GETREWARD(this._vo.id);
    };
    HeFu_DSSL_Item1.URL = "ui://07jsdu7hhilo8";
    return HeFu_DSSL_Item1;
}(fairygui.GComponent));
__reflect(HeFu_DSSL_Item1.prototype, "HeFu_DSSL_Item1");
