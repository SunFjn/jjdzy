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
var ChildSettingHead = (function (_super) {
    __extends(ChildSettingHead, _super);
    function ChildSettingHead() {
        var _this = _super.call(this) || this;
        _this._headVo = null;
        _this._frameVo = null;
        return _this;
    }
    ChildSettingHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("setting", "ChildSettingHead"));
    };
    ChildSettingHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.listHead = (this.getChild("listHead"));
        this.lab1 = (this.getChild("lab1"));
        this.listFrame = (this.getChild("listFrame"));
        this.lab2 = (this.getChild("lab2"));
        this.labHead = (this.getChild("labHead"));
        this.labFrame = (this.getChild("labFrame"));
        this.labOperate = (this.getChild("labOperate"));
        this.checkBox = (this.getChild("checkBox"));
        this.btnChange = (this.getChild("btnChange"));
        this.vhead = (this.getChild("vhead"));
        this.listHead.itemRenderer = this.renderHead;
        this.listHead.callbackThisObj = this;
        this.listHead.setVirtual();
        this.listFrame.itemRenderer = this.renderFrame;
        this.listFrame.callbackThisObj = this;
        this.listFrame.setVirtual();
        this.vhead.touchable = false;
    };
    ChildSettingHead.prototype.addListen = function () {
        this.checkBox.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onChanged, this);
        this.listHead.addEventListener(fairygui.ItemEvent.CLICK, this.onClickHead, this);
        this.listFrame.addEventListener(fairygui.ItemEvent.CLICK, this.onClickFrame, this);
        GGlobal.control.listen(Enum_MsgType.SETTING_HIDE_COUNTRY, this.upCountry, this);
        this.btnChange.addClickListener(this.onChange, this);
    };
    ChildSettingHead.prototype.removeListen = function () {
        this.checkBox.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.onChanged, this);
        this.listHead.removeEventListener(fairygui.ItemEvent.CLICK, this.onClickHead, this);
        this.listFrame.removeEventListener(fairygui.ItemEvent.CLICK, this.onClickFrame, this);
        GGlobal.control.remove(Enum_MsgType.SETTING_HIDE_COUNTRY, this.upCountry, this);
        this.btnChange.removeClickListener(this.onChange, this);
    };
    ChildSettingHead.prototype.update = function () {
        this.checkBox.selected = Model_Setting.showCamp == 1;
        this._headVo = Config.shezhi_707[Model_Setting.headId];
        this._frameVo = Config.shezhi_707[Model_Setting.frameId];
        this.listFrame.numItems = Model_Setting.frameList.length;
        var frameSelected = 0;
        for (var i = 0; i < Model_Setting.frameList.length; i++) {
            if (Model_Setting.frameList[i].id == Model_Setting.frameId) {
                frameSelected = i;
                break;
            }
        }
        this.listFrame.selectedIndex = frameSelected;
        this.listFrame.scrollToView(Math.floor(frameSelected / 4) * 4);
        this.frameId = Model_Setting.frameList[frameSelected];
        this.listHead.numItems = Model_Setting.headList.length;
        var headSelected = 0;
        for (var i = 0; i < Model_Setting.headList.length; i++) {
            if (Model_Setting.headList[i].id == Model_Setting.headId) {
                headSelected = i;
                break;
            }
        }
        this.listHead.selectedIndex = headSelected;
        this.listHead.scrollToView(Math.floor(headSelected / 4) * 4);
        this.headId = Model_Setting.headList[headSelected];
        this.upCountry();
    };
    ChildSettingHead.prototype.renderHead = function (index, obj) {
        var item = obj;
        item.vo = Model_Setting.headList[index];
    };
    ChildSettingHead.prototype.renderFrame = function (index, obj) {
        var item = obj;
        item.vo = Model_Setting.frameList[index];
    };
    ChildSettingHead.prototype.onClickHead = function (e) {
        var selectHead = e.itemObject;
        if (selectHead.isLocked) {
            this.lockedCondition(selectHead.vo);
            this.headId = selectHead.vo;
        }
        else {
            this.headId = selectHead.vo;
        }
    };
    ChildSettingHead.prototype.onClickFrame = function (e) {
        var selectFrame = e.itemObject;
        if (selectFrame.isLocked) {
            this.lockedCondition(selectFrame.vo);
            this.frameId = selectFrame.vo;
        }
        else {
            this.frameId = selectFrame.vo;
        }
    };
    ChildSettingHead.prototype.lockedCondition = function (vo) {
        var conditionArr = ConfigHelp.SplitStr(vo.condition);
        var condition0 = Number(conditionArr[0][0]);
        var condition1 = Number(conditionArr[0][1]);
        if (condition0 == 1) {
            ViewCommonWarn.text("VIP" + condition1 + "激活");
        }
        else if (condition0 == 2) {
            var item = VoItem.create(condition1);
            ViewCommonWarn.text("获取道具" + item.name + "激活");
        }
        else if (condition0 == 3) {
            ViewCommonWarn.text(vo.need);
        }
        else if (condition0 == 4) {
            ViewCommonWarn.text(vo.need);
        }
    };
    ChildSettingHead.prototype.onChange = function () {
        if (Model_Setting.frameIdArr.indexOf(Number(this._frameVo.id)) == -1) {
            ViewCommonWarn.text("未激活");
            return;
        }
        if (Model_Setting.headIdArr.indexOf(Number(this._headVo.id)) == -1) {
            ViewCommonWarn.text("未激活");
            return;
        }
        if (this._frameVo.id != Model_Setting.frameId || this._headVo.id != Model_Setting.headId) {
            GGlobal.modelSetting.CGChangeIcon(this._headVo.id, this._frameVo.id);
        }
    };
    Object.defineProperty(ChildSettingHead.prototype, "frameId", {
        set: function (v) {
            this._frameVo = v;
            this.vhead.vo = { head: this._headVo ? this._headVo.picture : "", frame: v.picture };
            var actStr = "";
            if (Model_Setting.frameIdArr.indexOf(Number(v.id)) == -1) {
                actStr = "[color=#ff0000](未激活)[/color]";
            }
            else {
                actStr = "[color=#12F60D](已激活)[/color]";
            }
            this.labFrame.text = "头像框:[color=#EEC315]【" + v.name + "】[/color]" + actStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildSettingHead.prototype, "headId", {
        set: function (v) {
            this._headVo = v;
            this.vhead.vo = { head: v.picture, frame: this._frameVo ? this._frameVo.picture : "" };
            var actStr = "";
            if (Model_Setting.headIdArr.indexOf(Number(v.id)) == -1) {
                actStr = "[color=#ff0000](未激活)[/color]";
            }
            else {
                actStr = "[color=#12F60D](已激活)[/color]";
            }
            this.labHead.text = "头像:[color=#EEC315]【" + v.name + "】[/color]" + actStr;
        },
        enumerable: true,
        configurable: true
    });
    ChildSettingHead.prototype.onChanged = function (e) {
        Model_Setting.showCamp = this.checkBox.selected ? 1 : 0;
        GGlobal.modelSetting.CGOperateCountry(Model_Setting.showCamp);
        GGlobal.control.notify(Enum_MsgType.SETTING_HIDE_COUNTRY);
        ViewCommonWarn.text("更改成功");
    };
    ChildSettingHead.prototype.upCountry = function () {
        this.vhead.showCountry(Model_Setting.showCamp ? false : true);
    };
    ChildSettingHead.URL = "ui://dt6yws4jg30n2";
    return ChildSettingHead;
}(fairygui.GComponent));
__reflect(ChildSettingHead.prototype, "ChildSettingHead");
