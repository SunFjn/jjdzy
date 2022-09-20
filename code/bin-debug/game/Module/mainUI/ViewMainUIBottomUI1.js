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
/** a is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewMainUIBottomUI1 = (function (_super) {
    __extends(ViewMainUIBottomUI1, _super);
    function ViewMainUIBottomUI1() {
        var _this = _super.call(this) || this;
        _this.baseSkillGroupX = 0;
        _this.chatArr = [];
        _this.skills = [];
        _this._taskVisible = true;
        //宝物现世，公告的位置
        _this._tipBTNS = [];
        //乱世枭雄战报位置
        _this.report_btn = [];
        return _this;
    }
    ViewMainUIBottomUI1.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ViewMainUIBottomUI1"));
    };
    ViewMainUIBottomUI1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        GGlobal.autoSkill = Config.xtcs_004[4423].num;
        var a = this;
        CommonManager.parseChildren(a, a);
        a.skill0.type = 1;
        a.skill1.type = 0;
        a.skill2.type = 0;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.tipBtnContainer.callbackThisObj = a;
        a.tipBtnContainer.itemRenderer = a.renderTipBtnHandler;
        a.tipContainer.callbackThisObj = a;
        a.tipContainer.itemRenderer = a.renderReportHandler;
        a.skills = [a.skill2, a.skill1, a.skill0, a.angerSkill];
        a.baseSkillGroupX = a.skillGroup.x;
        a.resetPosition();
        a.skill0.addClickListener(a.onTianShuSkill, a);
        a.skill1.addClickListener(a.onBWSkill, a);
        a.skill2.addClickListener(a.onBWSkill, a);
        a.angerSkill.addClickListener(a.onGodSkill, a);
        a.autoBt.addClickListener(a.onAutoT, a);
        a.chatBt.addClickListener(a.OnChat, a);
        a.taskImg.addClickListener(a.OnTask, a);
        a.changeBt.addClickListener(a.OnChange, a);
        a.bqBt.addClickListener(a.bqHandler, a);
        a.setGodSkill();
        a.updateChat();
        a.updateTask();
        a.showTask();
        a.updateAuto();
        var c = GGlobal.control;
        a.setItemSkill();
        a.setTianShuSkill();
        a.changeBt.visible = false;
        c.listen(Enum_MsgType.BAOWU_SKILL_UPDATE, a.setItemSkill, a);
        if (!ModuleManager.isOpen(UIConst.MAIN_SKILL_GOD)) {
            c.listen(Enum_MsgType.MSG_GQ_UPDATE, a.setGodSkill, a);
        }
        c.listen(Enum_MsgType.MSG_TS_WAEAR, a.setTianShuSkill, a);
        c.listen(Enum_MsgType.ROLE_RAGE_UPDATE, a.updateGodSkill, a);
        c.listen(Enum_MsgType.WUJIANG_CHANGE_JOB, a.setGodSkill, a);
        c.listen(Enum_MsgType.CHAT, a.updateChat, a);
        c.listen(Enum_MsgType.SCENE_TASK, a.updateTask, a);
        c.listen(Enum_MsgType.SHOW_TASK, a.showTask, a);
        c.listen(Enum_MsgType.HIDE_TASK, a.hideTask, a);
        c.listen(Enum_MsgType.ONRESIZE, a.resetPosition, a);
        Timer.instance.listen(a.updateCD, a, 500);
        if (GGlobal.modelGuanQia.curGuanQiaLv < 12) {
            a.autoBt.visible = a.imgAuto.visible = false;
            c.listen(Enum_MsgType.MSG_GQ_UPDATE, a.updateGuanQia, a);
        }
        else {
            a.autoSkillHandler();
        }
        a.updateNewerGuide();
    };
    ViewMainUIBottomUI1.prototype.bqHandler = function () {
        var self = this;
        if (self.useSkillPrompt())
            return;
        var vomine = Model_player.voMine;
        var buffID = JSON.parse(Config.skill_210[Model_Skill.bqSkillID].buff)[0][1];
        if (!vomine.buffCDData[buffID] && buffID > 0 && !vomine.sceneChar.buffData[buffID]) {
            vomine.sceneChar.waitSkillID = Model_Skill.bqSkillID;
            vomine.sceneChar.waitSkillPos = 8;
        }
        else {
            ViewCommonWarn.text("技能冷却中");
        }
    };
    ViewMainUIBottomUI1.prototype.OnChange = function () {
    };
    ViewMainUIBottomUI1.prototype.updateGuanQia = function () {
        var a = this;
        if (GGlobal.modelGuanQia.curGuanQiaLv == 12) {
            a.autoBt.visible = a.imgAuto.visible = true;
            GGlobal.layerMgr.open(UIConst.FUNCTIONNOTICE);
            GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, a.updateGuanQia, a);
        }
    };
    ViewMainUIBottomUI1.prototype.autoSkillHandler = function () {
        var self = this;
        Model_player.voMine.setAutoSkill(!Model_player.voMine.autoSkill);
        this.updateAuto();
    };
    ViewMainUIBottomUI1.prototype.onAutoT = function (e) {
        if (e === void 0) { e = null; }
        if (e) {
            e.stopPropagation();
        }
        var s = this;
        var m = GGlobal.modelGuanQia;
        if (m.curGuanQiaLv < GGlobal.autoSkill) {
            ViewCommonWarn.text("自动施法通关" + GGlobal.autoSkill + "关后开启");
            return;
        }
        if (Model_player.voMine.autoSkill) {
            Model_player.voMine.setAutoSkill(false);
            s.updateAuto();
            return;
        }
        ViewAlert.show("自动施法将自动使用<font color='#15f234'>宝物</font>、<font color='#15f234'>天书</font>、<font color='#15f234'>神技</font>\n（挑战关卡小怪不会触发）", Handler.create(s, function func() {
            Model_player.voMine.setAutoSkill(!Model_player.voMine.autoSkill);
            s.updateAuto();
        }, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
    };
    ViewMainUIBottomUI1.prototype.updateAuto = function () {
        var self = this;
        var isAuto = Model_player.voMine.autoSkill;
        if (isAuto && GGlobal.modelGuanQia.curGuanQiaLv >= GGlobal.autoSkill) {
            self.imgAuto.icon = CommonManager.getUrl("MainUI", "Bt_ZDTZ_down");
            Model_player.voMine.setAutoSkill(true);
        }
        else {
            self.imgAuto.icon = CommonManager.getUrl("MainUI", "autoSkill");
        }
    };
    ViewMainUIBottomUI1.prototype.OnTask = function () {
        if (!(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
            if (Config.mission_243[Model_player.taskId].type == 1 && this.fitToOpenMap()) {
                ViewGQDetail.trytoOpen();
                return;
            }
        }
        if (Model_player.taskSt == 1) {
            GGlobal.modelPlayer.CG_SCENETASK_DRAWREWARD(Model_player.taskId);
        }
        else {
            var cfg = Config.mission_243[Model_player.taskId];
            GGlobal.layerMgr.open(cfg.open);
            if (cfg.type == 17) {
                GGlobal.modelPlayer.CG_SCENETASK_SUBMISSION(cfg.open);
            }
        }
    };
    ViewMainUIBottomUI1.prototype.fitToOpenMap = function () {
        var cfg = Config.mission_243[Model_player.taskId];
        if (cfg) {
            var curGQId = cfg.can2 - 1;
            var dCfg = Config.dgq_205[ModelGuanQia.curGQID];
            if (dCfg) {
                var infoArr = JSON.parse(dCfg.guanqia);
                var low = infoArr[0][0], max = infoArr[0][1];
                if (curGQId >= low && curGQId <= max) {
                    return ModelGuanQia.hasPassed();
                }
            }
            else {
                return false;
            }
        }
        return false;
    };
    ViewMainUIBottomUI1.prototype.showEff = function () {
        EffectMgr.addEff("uieff/10007", this.taskImg.displayObject, this.taskImg.width / 2, this.taskImg.height / 2, 400, 400, false);
    };
    ViewMainUIBottomUI1.prototype.updateTask = function () {
        if (Model_player.taskSt == 2) {
            this.hideTask();
            if (this.taskEff) {
                EffectMgr.instance.removeEff(this.taskEff);
                this.taskEff = null;
            }
            return;
        }
        var taskId = Model_player.taskId;
        if (taskId > 0) {
            var cfg = Config.mission_243[taskId];
            var reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
            this.lbAward.text = "x" + reward[0].count;
            var value = 0;
            switch (cfg.type) {
                case 1:
                    Model_player.taskData--;
                    value = cfg.can2 - 1;
                    break;
                case 3:
                case 4:
                case 6:
                case 7:
                case 9:
                case 12:
                case 13:
                case 14:
                case 15:
                case 18:
                case 19:
                case 22:
                case 23:
                case 24:
                case 25:
                case 26:
                case 29:
                case 33:
                case 34:
                case 39:
                case 40:
                case 41:
                case 46:
                case 47:
                case 49:
                case 50:
                case 51:
                case 52:
                    value = cfg.can2;
                    break;
                case 2:
                case 5:
                    value = 10;
                    break;
                case 8:
                case 10:
                case 11:
                case 16:
                case 17:
                case 20:
                case 21:
                case 27:
                case 42:
                case 43:
                case 44:
                case 45:
                case 48:
                    if (Model_player.taskData >= cfg.can2)
                        Model_player.taskData = 1;
                    else {
                        Model_player.taskData = 0;
                    }
                    value = 1;
                    break;
            }
            var color = 0;
            if (Model_player.taskSt == 0) {
                if (Model_player.taskData >= value)
                    Model_player.taskSt = 1;
                color = Model_player.taskData >= value ? 2 : 6;
                if (this.taskEff) {
                    EffectMgr.instance.removeEff(this.taskEff);
                    this.taskEff = null;
                }
            }
            else if (Model_player.taskSt == 1) {
                if (!this.taskEff) {
                    this.taskEff = EffectMgr.addEff("uieff/10017", this.taskImg.displayObject, this.taskImg.width / 2, this.taskImg.height / 2 + 10, 800);
                }
                Model_player.taskData = value;
                color = 2;
            }
            this.lbTask.text = cfg.tips + HtmlUtil.fontNoSize("(" + Model_player.taskData + "/" + value + ")", Color.getColorStr(color));
            if (cfg.type == 21 && GGlobal.modelGuanQia.auto) {
                GGlobal.modelPlayer.CG_SCENETASK_SUBMISSION(1);
            }
        }
        // if (taskId == 1) {
        // 	this.updateNewerGuide();
        // }
    };
    ViewMainUIBottomUI1.prototype.OnChat = function () {
        if (Model_GlobalMsg.kaifuDay > 7) {
            GGlobal.layerMgr.open(UIConst.CHAT);
        }
        else {
            GGlobal.layerMgr.open(UIConst.CHAT, 1);
        }
    };
    ViewMainUIBottomUI1.prototype.renderHandler = function (index, obj) {
        var chatLb = obj.asLabel;
        chatLb.getTextField().singleLine = true;
        var vo = this.chatArr[index];
        var content = "";
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
        }
        else {
            var reg = /\[e:(\w+):e\]/g;
            if (reg.test(vo.content)) {
                content = "/表情";
            }
            else {
                content = vo.content;
            }
        }
        if (vo.id == Model_player.voMine.id) {
            chatLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2)) + ":" + HtmlUtil.fontNoSize(content, "#bdbdbd");
        }
        else if (vo.id == 0) {
            chatLb.text = HtmlUtil.fontNoSize("系统", Color.getColorStr(1)) + ":" + HtmlUtil.fontNoSize(content, "#bdbdbd");
        }
        else {
            chatLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(1)) + ":" + HtmlUtil.fontNoSize(content, "#bdbdbd");
        }
    };
    ViewMainUIBottomUI1.prototype.updateChat = function () {
        var chatArr1;
        if (Model_GlobalMsg.kaifuDay > 7) {
            chatArr1 = Model_Chat.chatArr[0];
        }
        else {
            chatArr1 = Model_Chat.chatArr[1];
        }
        if (chatArr1) {
            var len = chatArr1.length;
            var arr = [];
            this.chatArr = [];
            if (Model_Chat.checkSel) {
                for (var i = 0; i < len; i++) {
                    var vo = chatArr1[i];
                    if (vo.level >= Config.xtcs_004[2502].num || vo.id == Model_player.voMine.id) {
                        arr.push(vo);
                    }
                }
            }
            else {
                arr = chatArr1;
            }
            if (arr.length >= 2) {
                this.chatArr = [arr[arr.length - 2], arr[arr.length - 1]];
                this.list.numItems = 2;
            }
            else {
                this.chatArr = arr;
                this.list.numItems = this.chatArr.length;
            }
        }
    };
    ViewMainUIBottomUI1.prototype.updateGodSkill = function () {
        if (Model_player.voMine.sceneChar && this.angerSkill.vo) {
            this.angerSkill.setRage(Model_player.voMine.sceneChar.rage);
            var max = Config.changshu_101[3].num / 100;
            if (Model_player.voMine.sceneChar.rage >= max) {
                if (!this.godEff) {
                    this.godEff = EffectMgr.addEff("uieff/10010", this.angerSkill.displayListContainer, this.angerSkill.width / 2, this.angerSkill.height / 2, 800, -1, true);
                    this.godEff.touchEnabled = false;
                }
            }
            else {
                if (this.godEff) {
                    EffectMgr.instance.removeEff(this.godEff);
                    this.godEff = null;
                }
            }
        }
    };
    ViewMainUIBottomUI1.prototype.onGodSkill = function () {
        var a = this;
        if (a.useSkillPrompt())
            return;
        if (!ModuleManager.isOpen(UIConst.MAIN_SKILL_GOD, true))
            return;
        if (a.angerSkill.vo) {
            var vomine = Model_player.voMine;
            var role = vomine.sceneChar;
            if (!role || role.curhp <= 0)
                return;
            var max = Config.changshu_101[3].num / 100;
            if (role.rage >= max) {
                role.waitSkillID = a.angerSkill.vo.id;
                role.waitSkillPos = 3;
                Model_player.voMine.setAutoSkill(false);
                a.updateAuto();
            }
            else {
                ViewCommonWarn.text("怒气值不足");
            }
        }
    };
    ViewMainUIBottomUI1.prototype.onBWSkill = function (event) {
        var a = this;
        if (a.useSkillPrompt())
            return;
        var skill = event.currentTarget;
        if (skill.vo) {
            var vomine = Model_player.voMine;
            var role = vomine.sceneChar;
            // if (Model_player.taskId <= Config.xtcs_004[2807].num) {
            // 	if (skill.vo.remaincd <= 0) {
            // 		role.waitSkillID = skill.vo.id;
            // 	} else {
            // 		ViewCommonWarn.text("技能冷却中");
            // 	}
            // } else {
            if (!ModuleManager.isOpen(UIConst.BAOWU, true))
                return;
            if (role.isSilent) {
                ViewCommonWarn.text("技能沉默中");
                return;
            }
            var remaincd = void 0;
            var skillPos = 0;
            if (!role || role.curhp <= 0)
                return;
            if (skill.id == a.skill2.id) {
                remaincd = vomine.skillcdList[2];
                skillPos = 2;
            }
            else {
                remaincd = vomine.skillcdList[1];
                skillPos = 1;
            }
            if (remaincd <= 0) {
                role.waitSkillID = skill.vo.id;
                role.waitSkillPos = skillPos;
                Model_player.voMine.setAutoSkill(false);
                a.updateAuto();
            }
            else {
                ViewCommonWarn.text("宝物冷却中");
            }
            // }
        }
        else {
            GGlobal.layerMgr.open(UIConst.BAOWU);
        }
    };
    ViewMainUIBottomUI1.prototype.onTianShuSkill = function (event) {
        var a = this;
        if (a.useSkillPrompt())
            return;
        if (a.skill0.vo) {
            var vomine = Model_player.voMine;
            var role = vomine.sceneChar;
            // if (Model_player.taskId <= Config.xtcs_004[2807].num) {
            // 	if (a.skill0.vo.remaincd <= 0) {
            // 		role.waitSkillID = a.skill0.vo.id;
            // 	} else {
            // 		ViewCommonWarn.text("技能冷却中");
            // 	}
            // } else {
            if (!ModuleManager.isOpen(UIConst.TIANSHU, true))
                return;
            if (role.isSilent) {
                ViewCommonWarn.text("技能沉默中");
                return;
            }
            if (vomine.skillcdList[0] <= 0) {
                role.waitSkillID = a.skill0.vo.id;
                role.waitSkillPos = 4;
                Model_player.voMine.setAutoSkill(false);
                a.updateAuto();
            }
            else {
                ViewCommonWarn.text("天书冷却中");
            }
            // }
        }
        else {
            GGlobal.layerMgr.open(UIConst.TIANSHU);
        }
    };
    ViewMainUIBottomUI1.prototype.setGodSkill = function () {
        var a = this;
        var skillVo;
        if (ModuleManager.isOpen(UIConst.MAIN_SKILL_GOD)) {
            GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, a.setGodSkill, a);
            var len = Model_player.voMine.skillList.length;
            for (var i = 0; i < len; i++) {
                if (Model_player.voMine.skillList[i].type == Model_Skill.TYPE3) {
                    skillVo = Model_player.voMine.skillList[i];
                    break;
                }
            }
        }
        a.angerSkill.setVo(skillVo);
    };
    ViewMainUIBottomUI1.prototype.useSkillPrompt = function () {
        var ret = !Model_player.voMine.sceneChar || (Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0);
        if (ret) {
            ViewCommonWarn.text("死亡中不能使用技能");
        }
        return ret;
    };
    ViewMainUIBottomUI1.prototype.setSkill = function () {
        var self = this;
        if (Model_player.taskId <= Config.xtcs_004[2807].num) {
            var index = 0;
            var skillList = Model_player.voMine.skillList;
            for (var i = 0; i < skillList.length; i++) {
                if (skillList[i].type == Model_Skill.TYPE2) {
                    index++;
                    self["skill" + (3 - index)].setVo(skillList[i]);
                }
            }
            self.changeBt.visible = Model_player.taskId == Config.xtcs_004[2807].num;
        }
        else {
            self.setItemSkill();
            self.setTianShuSkill();
            GGlobal.control.remove(Enum_MsgType.WUJIANG_CHANGE_JOB, self.setSkill, self);
            GGlobal.control.remove(Enum_MsgType.SCENE_TASK, self.setSkill, self);
        }
    };
    ViewMainUIBottomUI1.prototype.setItemSkill = function () {
        // if (Model_player.taskId <= Config.xtcs_004[2807].num) return;
        var a = this;
        var skillVo0 = Model_BaoWu.skillVo(0);
        a.skill2.setVo(skillVo0);
        var skillVo1 = Model_BaoWu.skillVo(1);
        a.skill1.setVo(skillVo1);
    };
    ViewMainUIBottomUI1.prototype.setTianShuSkill = function () {
        // if (Model_player.taskId <= Config.xtcs_004[2807].num) return;
        var a = this;
        var skillVo = GGlobal.modeltianshu.getTianShuSkill();
        a.skill0.setVo(skillVo);
    };
    ViewMainUIBottomUI1.prototype.setSkillCM = function (value) {
        var self = this;
        self.skill0.setCM(value);
        self.skill1.setCM(value);
        self.skill2.setCM(value);
    };
    ViewMainUIBottomUI1.prototype.updateCD = function () {
        var a = this;
        var vomine = Model_player.voMine;
        // if (Model_player.taskId <= Config.xtcs_004[2807].num) {
        // 	let index = 0;
        // 	let skillList = Model_player.voMine.skillList;
        // 	for (let i = 0; i < skillList.length; i++) {
        // 		if (skillList[i].type == Model_Skill.TYPE2) {
        // 			index++;
        // 			a["skill" + (3 - index)].setCDRemain(skillList[i].remaincd);
        // 		}
        // 	}
        // } else {
        if (a.skill0.vo) {
            a.skill0.setCDRemain(vomine.skillcdList[0]);
        }
        if (a.skill1.vo) {
            a.skill1.setCDRemain(vomine.skillcdList[1]);
        }
        if (a.skill2.vo) {
            a.skill2.setCDRemain(vomine.skillcdList[2]);
        }
        // }
        a.bqBt.visible = vomine.qcRage >= ~~(Config.changshu_101[75].num / 100) && a.skillGroup.visible;
        if (!a.bqEff && a.bqBt.visible) {
            a.bqEff = EffectMgr.addEff("uieff/10059", a.bqBt.displayListContainer, a.bqBt.width / 2, a.bqBt.height / 2 + 7);
            a.bqEff.getMC().touchEnabled = false;
        }
        else if (a.bqEff && !a.bqBt.visible) {
            EffectMgr.instance.removeEff(a.bqEff);
            a.bqEff = null;
        }
        a.tipContainer.visible = !a.bqBt.visible && a.tipBtnContainer.visible;
        if (!GGlobal.mapscene || !vomine || !vomine.sceneChar) {
            return;
        }
        if (GGlobal.mapscene && GGlobal.sceneType == SceneCtrl.GUANQIA) {
            a.guide.visible = false;
            a.closeMustGui();
            return;
        }
        if (GGlobal.modelGuanQia.curGuanQiaLv < Config.xtcs_004[2802].num) {
            var max = Config.changshu_101[3].num / 100;
            if (a.guide.data == 3 && vomine.sceneChar.rage < max) {
                a.guide.visible = false;
            }
            else if (a.guide.data == 2 && a.skill2.vo && vomine.skillcdList[2] > 0) {
                a.guide.visible = false;
            }
            else if (a.guide.data == 1 && a.skill1.vo && vomine.skillcdList[1] > 0) {
                a.guide.visible = false;
            }
            if (!a.guide.visible) {
                if (GGlobal.modelGuanQia.curGuanQiaLv <= 3) {
                    if (vomine.sceneChar.rage >= max) {
                        if (GGlobal.modelGuanQia.curGuanQiaLv <= ViewJuQingPanel.maxGua && ViewJuQingPanel.status != 1) {
                            return;
                        }
                        a.guide.setXY(534, 101);
                        a.guide.imgAuto.url = "ui://7gxkx46wpo2d5d";
                        a.guide.visible = true;
                        a.guide.data = 3;
                    }
                    else if (a.skill2.vo && vomine.skillcdList[2] <= 0) {
                        a.guide.setXY(GGlobal.layerMgr.offx + 455, 120);
                        a.guide.imgAuto.url = "ui://7gxkx46wpo2d5e";
                        a.guide.visible = true;
                        a.guide.data = 2;
                    }
                    else if (a.skill1.vo && vomine.skillcdList[1] <= 0) {
                        a.guide.setXY(GGlobal.layerMgr.offx + 485, 35);
                        a.guide.imgAuto.url = "ui://7gxkx46wpo2d5e";
                        a.guide.visible = true;
                        a.guide.data = 1;
                    }
                    if (a.guide.visible) {
                        a.guide.imgAuto.scaleX = -1;
                        //强制指引
                        if (a.guide.data == 3) {
                            a.showMustGui();
                            return;
                        }
                    }
                }
                else {
                    if (vomine.sceneChar.rage >= max) {
                        a.guide.setXY(GGlobal.layerMgr.offx + 534, 101);
                        a.guide.imgAuto.url = "ui://7gxkx46wpo2d5d";
                        a.guide.visible = true;
                        a.guide.data = 3;
                    }
                    else if (a.skill2.vo && vomine.skillcdList[2] <= 0) {
                        a.guide.setXY(GGlobal.layerMgr.offx + 455, 120);
                        a.guide.imgAuto.url = "ui://7gxkx46wpo2d5e";
                        a.guide.visible = true;
                        a.guide.data = 2;
                    }
                    else if (a.skill1.vo && vomine.skillcdList[1] <= 0) {
                        a.guide.setXY(GGlobal.layerMgr.offx + 485, 35);
                        a.guide.imgAuto.url = "ui://7gxkx46wpo2d5e";
                        a.guide.visible = true;
                        a.guide.data = 1;
                    }
                    if (a.guide.visible) {
                        a.guide.imgAuto.scaleX = -1;
                    }
                }
                a.closeMustGui();
            }
        }
    };
    ViewMainUIBottomUI1.prototype.showMustGui = function () {
        var a = this;
        GGlobal.layerMgr.closeAllPanel();
        //LockStageMgr.startLockRect(a.angerSkill, a.angerSkill.width, a.angerSkill.height);
        if (a._qguiArr == null) {
            //手指引
            a._qguiArr = new QuestGuideArrow();
            a._qguiArr.focuseTo(a.angerSkill, a.angerSkill.width / 2 - 6, a.angerSkill.height / 2 - 2);
            //箭头指引
            var pit = a.guide.localToRoot();
            GGlobal.layerMgr.UI_Popup.addChild(a.guide);
            a.guide.x = pit.x;
            a.guide.y = pit.y;
            a.guide.alpha = 0;
            a._qguiArr.alpha = 0;
            egret.Tween.get(a.guide).to({ alpha: 1 }, 1000);
            egret.Tween.get(a._qguiArr).to({ alpha: 1 }, 1000);
        }
    };
    ViewMainUIBottomUI1.prototype.closeMustGui = function () {
        var a = this;
        LockStageMgr.endLockRect();
        if (a._qguiArr) {
            if (a._qguiArr.parent)
                a._qguiArr.parent.removeChild(a._qguiArr);
            a._qguiArr.release();
            a._qguiArr = null;
            a.addChild(a.guide);
        }
    };
    ViewMainUIBottomUI1.prototype.setSkillEnable = function (val) {
        var self = this;
        self.skillGroup.visible = val;
        if (!val)
            self.bqBt.visible = val;
    };
    Object.defineProperty(ViewMainUIBottomUI1, "instance", {
        get: function () {
            if (!ViewMainUIBottomUI1._instance)
                ViewMainUIBottomUI1._instance = this.createInstance();
            return ViewMainUIBottomUI1._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewMainUIBottomUI1.prototype.resetPosition = function () {
        var a = this;
        a.skillGroup.x = a.baseSkillGroupX + GGlobal.layerMgr.offx;
        a.setXY((fairygui.GRoot.inst.width - a.width) >> 1, fairygui.GRoot.inst.height - 450 + 25);
    };
    ViewMainUIBottomUI1.prototype.checkTaskShow = function () {
        if (this._taskVisible) {
            this.showTask();
        }
    };
    ViewMainUIBottomUI1.prototype.showTask = function () {
        var self = this;
        if (Model_player.taskSt != 2) {
            self._taskVisible = true;
            self.taskGroup.visible = true;
        }
        if (!self.bqBt.visible) {
            self.tipContainer.visible = true;
        }
        self.tipBtnContainer.visible = true;
    };
    ViewMainUIBottomUI1.prototype.hideTask = function () {
        var self = this;
        self._taskVisible = false;
        self.tipContainer.visible = false;
        self.taskGroup.visible = false;
        self.tipBtnContainer.visible = false;
    };
    ViewMainUIBottomUI1.prototype.updateNewerGuide = function () {
        var self = this;
        if ((Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
            self.guideCursor();
        }
        else {
            GuideStepManager.instance.releaseArrow();
        }
    };
    ViewMainUIBottomUI1.prototype.guideCursor = function () {
        var self = this;
        if (Model_player.taskId > 0) {
            if (Model_player.taskSt == 0) {
                GuideStepManager.instance.showGuide1(1, self.taskBt, self.taskBt.width / 2, 0, -90, -106, -100);
            }
            else {
                GuideStepManager.instance.showGuide1(-1, self.taskBt, self.taskBt.width / 2, 0, -90, -106, -100);
            }
        }
        GuideStepManager.instance.showGuide(self.taskBt, self.taskBt.width / 2 + 20, self.taskBt.height / 2 + 20);
    };
    ViewMainUIBottomUI1.prototype.autoFunc = function () {
        if (this.taskGroup.visible == false) {
            return;
        }
    };
    ViewMainUIBottomUI1.prototype.showTipBtn = function () {
        var sf = this;
        sf._tipBTNS = [];
        var temp = GGlobal.mainUICtr.tipBTNS;
        for (var i = 0, j = temp.length; i < j; i++) {
            if (ModuleManager.isOpen(temp[i])) {
                sf._tipBTNS.push(temp[i]);
            }
        }
        this.tipBtnContainer.numItems = sf._tipBTNS.length;
    };
    ViewMainUIBottomUI1.prototype.renderTipBtnHandler = function (idx, obj) {
        var item = obj;
        var arr = this._tipBTNS;
        item.setID(arr[idx]);
    };
    ViewMainUIBottomUI1.prototype.showReportTip = function () {
        var sf = this;
        var temp = GGlobal.mainUICtr.REPORT_BTNS;
        sf.report_btn = temp;
        this.tipContainer.numItems = temp.length;
    };
    ViewMainUIBottomUI1.prototype.renderReportHandler = function (idx, obj) {
        var item = obj;
        var arr = this.report_btn;
        item.setReportID(arr[idx]);
    };
    ViewMainUIBottomUI1.URL = "ui://7gxkx46wtw1l1p";
    return ViewMainUIBottomUI1;
}(fairygui.GComponent));
__reflect(ViewMainUIBottomUI1.prototype, "ViewMainUIBottomUI1");
