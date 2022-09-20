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
var ChildGm = (function (_super) {
    __extends(ChildGm, _super);
    function ChildGm() {
        var _this = _super.call(this) || this;
        _this.inputId = "410001";
        return _this;
    }
    ChildGm.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "ChildGm"));
    };
    ChildGm.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbInput = (this.getChild("lbInput"));
        this.lbInput0 = (this.getChild("lbInput0"));
        this.lbTitle = (this.getChild("lbTitle"));
        this.btnSend = (this.getChild("btnSend"));
        this.lbTitle0 = (this.getChild("lbTitle0"));
        this.lbInput.color = 0xffffff;
        this.lbInput0.color = 0xffffff;
        this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendMsg, this);
        // this.lbInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTips,this);
        // this.lbInput0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTips,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.closeTips, this);
    };
    Object.defineProperty(ChildGm.prototype, "vo", {
        set: function (v) {
            this.arg = v;
            var style = this.arg.style;
            this.fillText();
            this.lbInput.removeEventListener(egret.TextEvent.CHANGE, this.onTextChangeHandler, this);
            this.lbInput.removeEventListener(egret.TextEvent.FOCUS_IN, this.onTextChangeHandler, this);
            if (style == Model_GM.TYPE1_TOOP_EQUIP || style == Model_GM.TYPE5_WDTX || style == Model_GM.TYPE6_HUO_BI) {
                this.lbInput.addEventListener(egret.TextEvent.CHANGE, this.onTextChangeHandler, this);
                this.lbInput.addEventListener(egret.TextEvent.FOCUS_IN, this.onTextChangeHandler, this);
            }
            else if (style == Model_GM.TYPE2_INPUT) {
            }
            else if (style == Model_GM.TYPE3_NO_INPUT) {
                this.lbInput.visible = false;
            }
            else if (style == Model_GM.TYPE4_TIMER) {
                // this.imgback.width = 300;
                this.lbInput.width = 300;
            }
            else {
            }
        },
        enumerable: true,
        configurable: true
    });
    ChildGm.prototype.onSendMsg = function (e) {
        var content = this.lbInput.text.toString();
        var style = this.arg.style;
        if (this.arg.type == "addEnemy") {
            this.createEnemy(content);
            GGlobal.layerMgr.close2(UIConst.GM);
            return;
        }
        else if (this.arg.type == "removeEnemys") {
            this.removeEnemys();
            return;
        }
        else if (this.arg.type == "updateRole") {
            this.updateSkill(parseInt(content));
            return;
        }
        else if (this.arg.type == "openConsole") {
            if (HLSDK.whalePbSDK) {
                HLSDK.whalePbSDK.setDebug(true);
            }
            return;
        }
        else if (this.arg.type == "pvpBattle") {
            var ba = new BaseBytes();
            ba.writeByte(parseInt(content));
            GGlobal.modelGM.sendSocket(3869, ba);
            GGlobal.layerMgr.close2(UIConst.GM);
            return;
        }
        if (style == Model_GM.TYPE1_TOOP_EQUIP || style == Model_GM.TYPE6_HUO_BI) {
            var msg = this.msgMake(content);
            if (msg == null) {
                ViewCommonWarn.text("没有该名字物品");
            }
            else {
                GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, msg);
            }
        }
        else if (style == Model_GM.TYPE2_INPUT) {
            if (this.lbInput0.visible == true) {
                content = content + "_" + this.lbInput0.text;
            }
            if (this.arg.type == 1 && this.arg.index == 99) {
                if (Config.zhuansheng_705[content] == null) {
                    ViewCommonWarn.text("没有该转生id");
                    return;
                }
            }
            else if (this.arg.type == 5 && this.arg.index == 9999) {
                eval(content);
                return;
            }
            GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, content);
            this.arg.text = content;
        }
        else if (style == Model_GM.TYPE3_NO_INPUT) {
            if (this.lbInput0.visible == true) {
                content = content + "_" + this.lbInput0.text;
            }
            GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, content);
        }
        else if (style == Model_GM.TYPE5_WDTX) {
            var msg = this.msgMake(content);
            GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, msg);
        }
        else {
            if (this.lbInput0.visible == true) {
                content = content + "_" + this.lbInput0.text;
            }
            GGlobal.modelGM.CG_GM_CMD(this.arg.type, this.arg.index, content);
        }
    };
    ChildGm.prototype.closeTips = function () {
        var style = this.arg.style;
        if (style == Model_GM.TYPE1_TOOP_EQUIP || style == Model_GM.TYPE6_HUO_BI) {
        }
        else {
            ViewGmTip.instance.hide();
        }
    };
    ChildGm.prototype.createEnemy = function (content) {
        if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
            var scene = GGlobal.mapscene;
            scene.clearForce(2);
            var enemyArr = content.split("_");
            for (var i = 0; i < enemyArr.length; i++) {
                var enemy = scene.sceneCtrl.createEmeny(enemyArr[i]);
                scene.sceneCtrl.setMonsterPos(enemy);
                var ai = new GuanQiaCommonAI();
                ai.role = enemy;
                enemy.addPlug(ai);
                scene.addUnit(enemy);
            }
        }
    };
    ChildGm.prototype.updateSkill = function (id) {
        var cfgInfo = Config.NPC_200[id];
        var skills = JSON.parse(cfgInfo.skill);
        var arr = [];
        var role = Model_player.voMine.sceneChar;
        if (skills) {
            for (var i = 0; i < skills.length; i += 1) {
                var pg = Vo_Skill.create(parseInt(skills[i][0]), parseInt(skills[i][1]), 1);
                arr.push(pg);
            }
            Model_player.voMine.chongId = 0;
            // Model_player.voMine.body = cfgInfo.mod;
            Model_player.voMine.setBody(cfgInfo.mod);
            Model_player.voMine.skillList = arr;
            role.attack_index = 1;
            role.attackCount = 0;
            role.waitRushID = 0;
            role.waitSkillID = 0;
            role.skillList = arr;
            if (cfgInfo.weapon) {
                Model_player.voMine.weapon = cfgInfo.mod;
                role.setWeapon(cfgInfo.mod);
            }
            else {
                Model_player.voMine.weapon = 0;
                role.setWeapon(0);
            }
            role.setBody(cfgInfo.mod);
        }
    };
    ChildGm.prototype.removeEnemys = function () {
        if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
            var enemys = GGlobal.mapscene.filterRole(MapScene.ISLIFEENEMY, 1);
            for (var i = 0; i < enemys.length; i++) {
                GGlobal.mapscene.removeUnit(enemys[i]);
            }
        }
    };
    ChildGm.prototype.msgMake = function (context) {
        if (this.arg.style == Model_GM.TYPE1_TOOP_EQUIP) {
            var itemLib = Config.daoju_204;
            var equipLib = Config.zhuangbei_204;
            var id = Number(context);
            for (var key in itemLib) {
                var itemInfo = itemLib[key];
                var itemName = itemInfo.name;
                var itemID = itemInfo.id;
                if (itemName == context) {
                    return "1_" + this.inputId + "_" + this.lbInput0.text;
                }
                else if (id != undefined && itemID == id) {
                    return "1_" + id + "_" + this.lbInput0.text;
                }
            }
            for (var key in equipLib) {
                var equipInfo = equipLib[key];
                var equipName = equipInfo.n;
                var equipID = equipInfo.id;
                if (equipName == context) {
                    return "2_" + this.inputId + "_" + this.lbInput0.text;
                }
                else if (id != undefined && equipID == id) {
                    return "1_" + id + "_" + this.lbInput0.text;
                }
            }
        }
        else if (this.arg.style == Model_GM.TYPE5_WDTX) {
            return this.inputId + "_" + this.lbInput0.text;
        }
        else if (this.arg.style == Model_GM.TYPE6_HUO_BI) {
            var huoBiList = Model_GM.HUO_BI_LIST;
            for (var key_1 in huoBiList) {
                var temp = huoBiList[key_1];
                var nameTemp = temp.text;
                var idTemp = temp.id;
                if (nameTemp == context) {
                    return this.inputId + "_" + this.lbInput0.text;
                }
                else if (idTemp == parseInt(context)) {
                    return context + "_" + this.lbInput0.text;
                }
            }
        }
        return null;
    };
    ChildGm.prototype.onTextChangeHandler = function (event) {
        if (this.lbInput.text == "") {
            ViewGmTip.instance.hide();
            return;
        }
        if (this.arg.style == Model_GM.TYPE1_TOOP_EQUIP) {
            ViewGmTip.instance.show(this.lbInput.text, this.setInputLink, this, Model_GM.TYPE1_TOOP_EQUIP);
        }
        else if (this.arg.style == Model_GM.TYPE5_WDTX) {
            ViewGmTip.instance.show(this.lbInput.text, this.setInputLink, this, Model_GM.TYPE5_WDTX);
        }
        else if (this.arg.style == Model_GM.TYPE6_HUO_BI) {
            ViewGmTip.instance.show(this.lbInput.text, this.setInputLink, this, Model_GM.TYPE6_HUO_BI);
        }
    };
    ChildGm.prototype.setInputLink = function (v) {
        this.lbInput.text = v.text;
        this.inputId = v.id;
    };
    ChildGm.prototype.fillText = function () {
        var title = this.arg.title;
        var text = this.arg.text;
        this.lbTitle0.visible = true;
        this.lbInput0.visible = true;
        this.lbInput.visible = true;
        this.lbInput.width = 127;
        this.lbTitle.visible = true;
        // this.imgback.width = 132;
        // this.imgback.visible = true;
        // this.imgback0.width = 78;
        // this.imgback0.visible = true;
        if (title[1] != null) {
            this.lbTitle.text = title[0];
            this.lbInput.text = text[0];
            this.lbTitle0.text = title[1];
            this.lbInput0.text = text[1];
        }
        else {
            this.lbTitle.text = title;
            this.lbInput.text = text;
            this.lbTitle0.visible = false;
            this.lbInput0.visible = false;
            // this.imgback0.visible = false;
        }
    };
    ChildGm.URL = "ui://vm9a8xq87jrg1";
    return ChildGm;
}(fairygui.GComponent));
__reflect(ChildGm.prototype, "ChildGm");
