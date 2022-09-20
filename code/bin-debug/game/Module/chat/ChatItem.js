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
var ChatItem = (function (_super) {
    __extends(ChatItem, _super);
    function ChatItem() {
        var _this = _super.call(this) || this;
        _this.linkTime = 0;
        _this.faceStr = "abcdefghijklmnopqrstuvwxyz";
        _this.longBoo = false;
        return _this;
    }
    ChatItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "ChatItem"));
    };
    ChatItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.headIcon = (s.getChild("headIcon"));
        s.excuseBt = (s.getChild("excuseBt"));
        s.nameLb = (s.getChild("nameLb"));
        s.contentLb = (s.getChild("contentLb"));
        s.contentLb.setXY(s.contentLb.x, s.contentLb.y - 5);
        s.titleIcon = (s.getChild("titleIcon"));
        s.excuseBt.addClickListener(s.OnExcuse, s);
        s.headIcon.addClickListener(s.OnLook, s);
        s.contentLb.addEventListener(egret.TextEvent.LINK, s.linkHandler, s);
        s.headIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.longStart, s);
        s.headIcon.addEventListener(egret.TouchEvent.TOUCH_END, s.longEnd, s);
    };
    ChatItem.prototype.linkHandler = function (event) {
        var s = this;
        if (event.text == "tujian") {
            GGlobal.layerMgr.open(UIConst.CHAT_TUJIAN, s.vo);
        }
        else if (event.text == "baowu" || event.text == "godWeapon") {
            GGlobal.layerMgr.open(UIConst.CHAT_BAOWU, s.vo);
        }
        else if (event.text == "wujiang") {
            GGlobal.layerMgr.open(UIConst.CHAT_WUJIANG, s.vo);
        }
        else if (event.text == "shjx") {
            GGlobal.layerMgr.open(UIConst.SHJXCHECKINFO, s.vo);
        }
        else if (event.text == "fuwen") {
            GGlobal.layerMgr.open(UIConst.BAZHENTU_SHOW, s.vo);
        }
        else if (event.text == "shaozhu") {
            GGlobal.layerMgr.open(UIConst.CHAT_SHAOZHU, s.vo);
        }
        else if (event.text == "yishou") {
            GGlobal.layerMgr.open(UIConst.CHAT_YISHOU, s.vo);
        }
        else if (event.text == "qice") {
            GGlobal.layerMgr.open(UIConst.CHAT_QICE, s.vo);
        }
        else if (event.text == "horse") {
            GGlobal.layerMgr.open(UIConst.CHAT_HORSE, s.vo);
        }
        else if (event.text == "maid") {
            GGlobal.layerMgr.open(UIConst.CHAT_MAID, s.vo);
        }
    };
    ChatItem.prototype.OnLook = function () {
        var t = this;
        if (t.longBoo) {
            return;
        }
        GGlobal.layerMgr.open(UIConst.CHAT_LOOK, this.vo);
    };
    ChatItem.prototype.OnExcuse = function () {
        if (Model_Chat.blackList.length >= Config.xtcs_004[2503].num) {
            ViewCommonWarn.text("黑名单已满");
            return;
        }
        ViewAlert.show("是否将该玩家加入黑名单并屏蔽聊天信息？", Handler.create(this, this.OnOk));
    };
    ChatItem.prototype.OnOk = function () {
        GGlobal.modelchat.CG_CHAT_ADD_BLACKLIST(this.vo.id, this.vo.name);
    };
    //GC广播聊天频道内容 
    ChatItem.prototype.show = function (vo) {
        var s = this;
        s.vo = vo;
        s.nameLb.visible = true;
        s.headIcon.visible = true;
        s.titleIcon.visible = true;
        var content = "";
        var cfg = Config.chenghao_702[vo.titleID];
        if (vo.showtype > 0) {
            var arr = vo.content.split("_");
            switch (vo.showtype) {
                case 1:
                    var tjcfg = Config.picture_005[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + tjcfg.name + "·图鉴】", Color.getColorStr(tjcfg.quality)), true, "tujian");
                    break;
                case 2:
                    var bwcfg = Config.bao_214[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + bwcfg.name + "】", Color.getColorStr(bwcfg.pin)), true, "baowu");
                    break;
                case 3:
                    var bfcfg = Config.book_213[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + bfcfg.name + "】", Color.getColorStr(bfcfg.pin)), true, "baowu");
                    break;
                case 4:
                    var ybcfg = Config.yb_217[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + ybcfg.name + "】", Color.getColorStr(ybcfg.pin)), true, "baowu");
                    break;
                case 5:
                    var sjcfg = Config.sword_216[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + sjcfg.name + "】", Color.getColorStr(sjcfg.pin)), true, "baowu");
                    break;
                case 6:
                    var zjcfg = Config.clothes_212[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + zjcfg.name + "】", Color.getColorStr(zjcfg.pinzhi)), true, "baowu");
                    break;
                case 7:
                    var tscfg = Config.book_215[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + tscfg.name + "】", Color.getColorStr(tscfg.pin)), true, "baowu");
                    break;
                case 8:
                    var wjcfg = Config.hero_211[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + wjcfg.name + "】", Color.getColorStr(wjcfg.pinzhi)), true, "wujiang");
                    break;
                case 9:
                    var fuwen = Config.bztzf_261[arr[0]];
                    content = HtmlUtil.createLink(ConfigHelp.createColorName("【" + fuwen.name + "】", fuwen.pz), true, "fuwen");
                    break;
                case 10:
                    var equip = Config.zhuangbei_204[arr[1]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + equip.n + "】", Color.getColorStr(equip.q)), true, "shjx");
                    break;
                case 11:
                    var shaozhu = Config.son_267[arr[1]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【少主·" + shaozhu.name + "】", Color.getColorStr(shaozhu.pz)), true, "shaozhu");
                    break;
                case 12:
                    var godWeapon = Config.sb_750[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【神兵·" + godWeapon.name + "】", Color.getColorStr(godWeapon.pinzhi)), true, "godWeapon");
                    break;
                case 13:
                    var godWeaponBody = Config.sbpf_750[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【神兵·" + godWeaponBody.mz + "】", Color.getColorStr(godWeaponBody.pz)), true, "godWeapon");
                    break;
                case 14:
                    var yishou = Config.ysl_752[arr[1]];
                    var costArr = JSON.parse(yishou.jihuo);
                    var itemVo = VoItem.create(costArr[0][1]);
                    content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【异兽·" + yishou.mingzi + "】", Color.getColorStr(itemVo.quality)), true, "yishou");
                    break;
                case 15:
                    var qice = Config.qc_760[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.font("【奇策·" + qice.name + "】", Color.getColorStr(qice.pz)), true, "qice");
                    break;
                case 16:
                case 18:
                    var horse = Config.zq_773[arr[1]];
                    content = HtmlUtil.createLink(HtmlUtil.font("【坐骑·" + horse.name + "】", Color.getColorStr(horse.quality)), true, "horse");
                    break;
                case 17:
                    var maid = Config.shinv_020[arr[0]];
                    content = HtmlUtil.createLink(HtmlUtil.font("【" + maid.mingzi + "】", Color.getColorStr(maid.pinzhi)), true, "maid");
                    break;
            }
            s.contentLb.font = "Microsoft YaHei";
        }
        else {
            var reg = /\[e:(\w+):e\]/g;
            if (reg.test(vo.content)) {
                var icon = vo.content.split(":")[1];
                s.contentLb.font = "ui://fx4pr5qeov4j13";
                content += s.faceStr.substr((parseInt(icon)), 1);
            }
            else {
                content += vo.content;
                s.contentLb.font = "Microsoft YaHei";
            }
            var aIdx = content.indexOf("@");
            if (aIdx != -1) {
                var arr = content.split("@");
                var contentVal = "";
                for (var i = 0; i < arr.length; i++) {
                    if (i == 0) {
                        contentVal += arr[i];
                        continue;
                    }
                    var strTX = arr[i];
                    var bIdx = strTX.indexOf("\t");
                    if (bIdx != -1) {
                        var strTX1 = strTX.substr(0, bIdx);
                        var strTX2 = strTX.substr(bIdx + 1);
                        arr[i] = "[color=#00F234]" + strTX1 + "[/color]" + " " + strTX2;
                    }
                    contentVal += "@" + arr[i];
                }
                content = contentVal;
            }
        }
        s.contentLb.text = content;
        if (cfg && cfg.xianshi) {
            s.titleIcon.visible = true;
            ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfg.picture + ".png", s.titleIcon); //此处会有一个BUG 不能用iconutl
        }
        else {
            s.titleIcon.visible = false;
        }
        if (vo.jinsheng > 1) {
            var cfg_1 = Config.up_231[vo.jinsheng];
            if (vo.id == Model_player.voMine.id) {
                s.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2)) + "    " + cfg_1.pin + cfg_1.name;
            }
            else {
                s.nameLb.text = vo.name + "    " + cfg_1.pin + cfg_1.name;
            }
        }
        else {
            if (vo.id == Model_player.voMine.id) {
                s.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2));
            }
            else {
                s.nameLb.text = vo.name;
            }
        }
        s.headIcon.show(vo);
        s.excuseBt.visible = Model_player.voMine.id != vo.id;
    };
    ChatItem.prototype.longStart = function (e) {
        var t = this;
        t.longBoo = false;
        t.longs = setTimeout(function () {
            t.longPress();
        }, 800);
    };
    ChatItem.prototype.longEnd = function () {
        var t = this;
        clearTimeout(t.longs);
    };
    ChatItem.prototype.longPress = function () {
        var t = this;
        t.longBoo = true;
        GGlobal.control.notify(Enum_MsgType.CHAT_LONG_CLICK, t.vo);
    };
    ChatItem.URL = "ui://fx4pr5qeov4j2";
    return ChatItem;
}(fairygui.GComponent));
__reflect(ChatItem.prototype, "ChatItem");
