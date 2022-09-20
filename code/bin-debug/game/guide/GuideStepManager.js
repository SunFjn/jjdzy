var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideStepManager = (function () {
    function GuideStepManager() {
        this._restrictMap = {};
        this._restrictCount = 0;
        this._handupremain = 10000;
        this.guideList = [];
        this.source = [];
        this.flagDict = {};
    }
    /**
     * 是否允许自动新手的服务器标识
     */
    GuideStepManager.isServerAuto = function () {
        var ret = GuideStepManager.serverAuto;
        return ret;
    };
    Object.defineProperty(GuideStepManager.prototype, "restrictCount", {
        get: function () {
            return this._restrictCount;
        },
        enumerable: true,
        configurable: true
    });
    GuideStepManager.prototype.addRestrict = function (ident) {
        if (ident == null) {
            return;
        }
        if (this._restrictMap[ident] == null) {
            this._restrictMap[ident] = true;
            this._restrictCount++;
            if (this._restrictCount == 1) {
                if (this.curStep && this.curStep.pause) {
                    this.curStep.pause(this.curStep);
                }
            }
        }
    };
    GuideStepManager.prototype.removeRestrict = function (ident) {
        if (this._restrictMap[ident]) {
            delete this._restrictMap[ident];
            this._restrictCount--;
            if (this._restrictCount == 0) {
                if (this.curStep && this.curStep.resume) {
                    this.curStep.resume(this.curStep);
                }
            }
        }
    };
    Object.defineProperty(GuideStepManager, "instance", {
        get: function () {
            if (GuideStepManager._instance == null) {
                GuideStepManager._instance = new GuideStepManager();
            }
            return GuideStepManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param 默认指向右<br>
     * 指向下 rotate:-90 px:0 py:-50
     * @auto 自动执行 如果为可视对象为可视对象抛出消息，否则认为是函数来执行
     * @passRestrict 是否忽略限制来执行自动操作
     */
    GuideStepManager.prototype.showGuide = function (target, ax, ay, auto, isTop, passRestrict) {
        if (auto === void 0) { auto = null; }
        if (isTop === void 0) { isTop = false; }
        if (passRestrict === void 0) { passRestrict = false; }
        if (Model_player.taskId <= 0 || Model_player.taskSt == 2) {
            target = null;
        }
        if (target != null) {
            QuestGuideArrow.instance.focuseTo(target, ax, ay, isTop);
            QuestGuideArrow.instance.passRestrict = passRestrict;
        }
        this._auto = null;
    };
    /**
     * @param 默认指向右<br>
    * 指向下 rotate:-90 px:0 py:-50
    * @auto 自动执行 如果为可视对象为可视对象抛出消息，否则认为是函数来执行
     * @passRestrict 是否忽略限制来执行自动操作
    */
    GuideStepManager.prototype.showGuide1 = function (index, target, ax, ay, rotate, px, py, isTop, auto, passRestrict) {
        if (rotate === void 0) { rotate = 0; }
        if (px === void 0) { px = -106; }
        if (py === void 0) { py = 5; }
        if (isTop === void 0) { isTop = false; }
        if (auto === void 0) { auto = null; }
        if (passRestrict === void 0) { passRestrict = false; }
        var self = this;
        if (index == -1) {
            QuestGuideArrow1.instance.focuseTo(target, ax, ay, rotate, px, py, isTop);
            var taskID = Config.mission_243[Model_player.taskId].next;
            if ((taskID > Config.xtcs_004[2801].num && Model_player.taskId < Config.xtcs_004[2806].num)) {
                self.showText("恭喜[color=#15F234]通过新手[/color]，江湖险恶，少侠一路保重！");
            }
            else {
                self.showText("点击领取奖励");
            }
        }
        else {
            var type = Config.mission_243[Model_player.taskId].type;
            var cfg = Config.xszy_243[type * 100 + index];
            if (cfg && cfg.miaoshu != "0") {
                if (Model_player.taskId <= 0 || Model_player.taskSt == 2) {
                    target = null;
                }
                if (target != null) {
                    QuestGuideArrow1.instance.focuseTo(target, ax, ay, rotate, px, py, isTop);
                    self.showText(cfg.miaoshu);
                }
                self._auto = null;
            }
            else {
                self.hideArrow1();
            }
        }
    };
    GuideStepManager.prototype.showText = function (v) {
        QuestGuideArrow1.instance.setText(v);
    };
    GuideStepManager.prototype.checkCurrentGuide = function () {
    };
    GuideStepManager.prototype.run = function () {
        if (!GGlobal.mapscene)
            return;
        this._timerCounter -= GGlobal.mapscene.dt;
        this._timerCounter = 100;
        if (this._restrictCount == 0) {
            if (this._timerCounter >= 0) {
                this.tickNow();
                this.handup();
            }
        }
    };
    GuideStepManager.prototype.tickNow = function () {
        var matchStep = this.selectBestStep();
        if (matchStep == null) {
            this.exit("finish");
            return;
        }
        if (matchStep.source.prefault && matchStep.finishCheck(matchStep) == false) {
            this.exit("fault");
            return;
        }
        if (this.curStep != matchStep) {
            if (this.curStep != null) {
                if (this.curStep.exit != null) {
                    this.curStep.exit(this.curStep);
                }
            }
            this.curStep = matchStep;
            if (this.curStep != null) {
                if (this.curStep.enter != null) {
                    this.curStep.enter(this.curStep);
                }
            }
        }
    };
    GuideStepManager.prototype.exit = function (reason) {
        if (this.curStep) {
            if (this.curStep.exit != null) {
                this.curStep.exit(this.curStep);
            }
        }
        GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, this.run, this);
        this.curStep = null;
        this.guideList.length = 0;
        this.cleanupVars();
        this.checkArrowTarget();
    };
    //清空信息
    GuideStepManager.prototype.cleanupVars = function () {
    };
    GuideStepManager.prototype.selectBestStep = function () {
        var testStep = this.curStep;
        var retStep;
        while (testStep != null && testStep.preStep != null) {
            if (testStep.source.irreversible) {
                break;
            }
            testStep = testStep.preStep;
        }
        while (testStep) {
            if (this.checkNext(testStep) == false) {
                retStep = testStep;
                break;
            }
            testStep = testStep.nextStep;
        }
        return retStep;
    };
    GuideStepManager.prototype.checkNext = function (step) {
        var ret = false;
        if (ret == false) {
            if (step.finishCheck(step) == true) {
                ret = true;
            }
        }
        return ret;
    };
    GuideStepManager.prototype.handup = function () {
        this._handupremain -= 200;
        if (this._handupremain <= 0) {
            if (this.curStep != null) {
                if (this.curStep.auto != null) {
                    this.curStep.auto(this.curStep);
                }
            }
            this._handupremain = GuideStepManager.TIMEDELTAMAX;
        }
    };
    GuideStepManager.prototype.doSeq = function (seq, restrict) {
        if (restrict === void 0) { restrict = true; }
        if (this.curStep && this.curStep.source && this.curStep.source.exitPre) {
            this.curStep.exit(this.curStep);
        }
        this.source = seq;
        this.fill();
        if (this.guideList.length) {
            GGlobal.control.listen(Enum_MsgType.MSG_ENTERFRAME, this.run, this);
        }
    };
    GuideStepManager.prototype.doTempSeq = function (seq) {
    };
    GuideStepManager.prototype.fill = function () {
        this.guideList.length = 0;
        var preStep;
        for (var i = 0; i < this.source.length; i++) {
            var step = {};
            var type = this.source[i].type;
            var arg = this.source[i].arg;
            step.finishCheck = (type + "_finishCheck" in this) ? this[type + "_finishCheck"] : null;
            step.enter = (type + "_enter" in this) ? this[type + "_enter"] : null;
            step.exit = (type + "_exit" in this) ? this[type + "_exit"] : null;
            step.finish = (type + "_finish" in this) ? this[type + "_finish"] : null;
            step.arg = arg;
            step.source = this.source[i];
            this.guideList.push(step);
            if (preStep != null) {
                step.preStep = preStep;
                preStep.nextStep = step;
            }
            preStep = step;
        }
        this.curStep = this.guideList[0];
        if (this.curStep && this.curStep.enter) {
            this.curStep.enter(this.curStep);
        }
    };
    //---------[打开面板
    GuideStepManager.prototype.openui_finishCheck = function (step) {
        var ret = false;
        if (typeof step.arg === "number") {
            if (step.source.panelId) {
                ret = GGlobal.layerMgr.isOpenView(step.arg) || GGlobal.layerMgr.isOpenView(step.source.panelId) || GGlobal.layerMgr.lastPanelId == step.source.panelId;
            }
            else {
                var cfg = Config.mission_243[step.source.taskid];
                if (cfg && cfg.type == 7) {
                    ret = GGlobal.layerMgr.isOpenView(step.arg) || GGlobal.sceneType == SceneCtrl.PEACOCK;
                }
                else {
                    ret = GGlobal.layerMgr.isOpenView(step.arg);
                }
            }
        }
        if (!ret)
            ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.openui_enter = function (step) {
        if (typeof step.arg === "number" && !GuideStepManager.instance.finishCheck(step)) {
            if (step.arg == UIConst.NANZHENG_BEIZHAN) {
                GGlobal.layerMgr.getView(UIConst.COUNTRY).guidePage(step);
            }
            else {
                if (GGlobal.isEnterGame) {
                    ViewMainUIBottomUI1.instance.updateNewerGuide();
                }
            }
        }
    };
    GuideStepManager.prototype.openui_exit = function (step) {
    };
    /**穿戴装备 */
    GuideStepManager.prototype.keyEquip_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.keyEquip_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.ROLE).guidePage(step);
    };
    /**关卡通关 */
    GuideStepManager.prototype.guanqia_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.guanqia_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.GUANQIABOSSUI).guidePage(step);
    };
    /**技能升级 */
    GuideStepManager.prototype.keySkill_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.keySkill_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.MAIN_SKILL).guideUpgradeSkill(step);
    };
    /**武将TAB页*/
    GuideStepManager.prototype.generalTab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.WU_JIANG) &&
            GGlobal.layerMgr.getView(UIConst.WU_JIANG).guideCheckTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.generalTab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.WU_JIANG).guideTab(step);
    };
    /**武将升级 */
    GuideStepManager.prototype.keyGeneralUpLevel_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.keyGeneralUpLevel_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.WU_JIANG).guidePage(step);
    };
    /**领取晋升任务经验 */
    GuideStepManager.prototype.jinSheng_draw_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || GGlobal.layerMgr.getView(UIConst.JINSHENG).guideFinishCheck(step.source.taskid);
        return ret;
    };
    GuideStepManager.prototype.jinSheng_draw_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.JINSHENG).guide_jinSheng_draw(step);
    };
    /**激活晋升官职 */
    GuideStepManager.prototype.jinSheng_jihuo_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.jinSheng_jihuo_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.JINSHENG).guide_jinSheng_jihuo(step);
    };
    /**选中升星grid*/
    GuideStepManager.prototype.baowu_Grid_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || GGlobal.layerMgr.getView(UIConst.BAOWU).check_baowu_select(step.arg);
        return ret;
    };
    GuideStepManager.prototype.baowu_Grid_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BAOWU).guide_baowu_select(step);
    };
    /**升星按钮 */
    GuideStepManager.prototype.baowu_upstar_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || GGlobal.layerMgr.getView(UIConst.BAOWU).check_baowu_upstar();
        return ret;
    };
    GuideStepManager.prototype.baowu_upstar_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BAOWU).guide_baowu_upstar(step);
    };
    /**选择对应宝物 */
    GuideStepManager.prototype.baowu_select_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || GGlobal.layerMgr.getView(UIConst.BAOWU).check_use_grid();
        return ret;
    };
    GuideStepManager.prototype.baowu_select_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BAOWU).guide_use_grid(step);
    };
    /**宝物使用按钮 */
    GuideStepManager.prototype.baowu_use_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || GGlobal.layerMgr.isOpenView(UIConst.BAOWU_EQUIP);
        return ret;
    };
    GuideStepManager.prototype.baowu_use_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BAOWU).guide_baowu_useBt(step);
    };
    /**更换宝物 */
    GuideStepManager.prototype.baowu_change_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.baowu_change_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BAOWU_EQUIP).guide_equip_baowu(step);
    };
    /**boss标签切换 */
    GuideStepManager.prototype.DRBOSS_tab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) ||
            (GGlobal.layerMgr.isOpenView(UIConst.BOSS) && GGlobal.layerMgr.getView(UIConst.BOSS).check_guideTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.DRBOSS_tab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BOSS).guideTab(step.arg);
    };
    /**挑战个人boss */
    GuideStepManager.prototype.DRBOSS_battle_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.DRBOSS_battle_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BOSS).guide_DRBOSS_battle(step);
    };
    /**挑战个人boss */
    GuideStepManager.prototype.QMBOSS_battle_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.QMBOSS_battle_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BOSS).guide_QMBOSS_battle(step);
    };
    /**进入副本tab页 */
    GuideStepManager.prototype.fuben_tab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.BOSS) && GGlobal.layerMgr.getView(UIConst.FUBEN).check_guideTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.fuben_tab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.FUBEN).guideTab(step.arg);
    };
    /**铜雀台挑战 */
    GuideStepManager.prototype.peacock_battleBt_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || GGlobal.sceneType == SceneCtrl.PEACOCK;
        ;
        return ret;
    };
    GuideStepManager.prototype.peacock_battleBt_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.FUBEN).guide_peacock_battle(step);
    };
    /**铜雀台退出战斗 */
    GuideStepManager.prototype.peacockExit_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) && GGlobal.sceneType != SceneCtrl.PEACOCK;
        return ret;
    };
    GuideStepManager.prototype.peacockExit_enter = function (step) {
        if (GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN1)) {
            ViewCommonWin1.step = step;
            GGlobal.layerMgr.getView(UIConst.COMMON_WIN1).guide_exit(step);
        }
    };
    /**进入熔炼tab页 */
    GuideStepManager.prototype.rongLian_tab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.RONGLIAN) && GGlobal.layerMgr.getView(UIConst.RONGLIAN).check_guideTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.rongLian_tab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.RONGLIAN).guideTab(step.arg);
    };
    /**熔炼 */
    GuideStepManager.prototype.ronglianBt_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.ronglianBt_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.RONGLIAN).guide_ronglian(step);
    };
    /**锻造tab */
    GuideStepManager.prototype.daunzao_tab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.DUANZAO_STRENG) && GGlobal.layerMgr.getView(UIConst.DUANZAO_STRENG).check_guideTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.daunzao_tab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.DUANZAO_STRENG).guideTab(step.arg);
    };
    /**锻造tab */
    GuideStepManager.prototype.duanzao_keyStreng_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.duanzao_keyStreng_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.DUANZAO_STRENG).guide_duanzao_keyStreng(step);
    };
    /**随机加入国家 */
    GuideStepManager.prototype.country_random_join_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.country_random_join_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.COUNTRY_SELECT).guide_country_random_join(step);
    };
    /**南征北战战斗 */
    GuideStepManager.prototype.NZBZ_battle_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.NZBZ_battle_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.NANZHENG_BEIZHAN).guide_NZBZ_battle(step);
    };
    /**晋升tab页 */
    GuideStepManager.prototype.role_tab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || ((GGlobal.layerMgr.isOpenView(UIConst.JINSHENG) && GGlobal.layerMgr.getView(UIConst.JINSHENG)).check_guideTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.role_tab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.JINSHENG).guideTab(step.arg);
    };
    /**将衔升级 */
    GuideStepManager.prototype.jiangxian_up_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.jiangxian_up_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.JINSHENG).guide_jianxian(step);
    };
    /**转生Tab */
    GuideStepManager.prototype.zhaunsheng_tab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.ROLE) && GGlobal.layerMgr.getView(UIConst.ROLE).check_guideTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.zhaunsheng_tab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.ROLE).guideTab(step);
    };
    /**转生 */
    GuideStepManager.prototype.zhuanshengBt_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.zhuanshengBt_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.ROLE).guidePage(step);
    };
    /**武将TAB页*/
    GuideStepManager.prototype.zhanjiaTab_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.ZHAN_JIA) && GGlobal.layerMgr.getView(UIConst.ZHAN_JIA).guideCheckTab(step.arg));
        return ret;
    };
    GuideStepManager.prototype.zhanjiaTab_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.ZHAN_JIA).guideTab();
    };
    /**战甲升阶 */
    GuideStepManager.prototype.keyZhanJiaUpLevel_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.keyZhanJiaUpLevel_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.ZHAN_JIA).guide_keyZhanJiaUpLevel(step.arg);
    };
    /**玲珑阁 */
    GuideStepManager.prototype.LLG_draw_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) && (GGlobal.layerMgr.isOpenView(UIConst.LING_LONG_SHOW) && !ViewLingLongShow.isGuide || ViewLingLongShow.isGuide);
        return ret;
    };
    GuideStepManager.prototype.LLG_draw_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.LING_LONG).guide_draw(step);
    };
    /**玲珑阁 奖励界面*/
    GuideStepManager.prototype.LLG_rewardShow_finishCheck = function (step) {
        var ret = !GGlobal.layerMgr.isOpenView(UIConst.LING_LONG_SHOW);
        return ret;
    };
    GuideStepManager.prototype.LLG_rewardShow_enter = function (step) {
        if (GGlobal.layerMgr.isOpenView(UIConst.LING_LONG_SHOW)) {
            GGlobal.layerMgr.getView(UIConst.LING_LONG_SHOW).guide_sureBt(step);
        }
    };
    /**自动闯关 */
    GuideStepManager.prototype.auto_guanqia_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.auto_guanqia_enter = function (step) {
        ViewGuanQiaBossEntry.createInstance().guideAuto(step);
    };
    /**功能预览 */
    GuideStepManager.prototype.functionView_draw_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.functionView_draw_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.FUNCTIONPREVIEW).guideDraw();
    };
    /**材料副本 */
    GuideStepManager.prototype.cailiao_battle_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.cailiao_battle_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.FUBEN_CAILIAO).guideCaiLiao(step);
    };
    /**宝物升阶 */
    GuideStepManager.prototype.baowu_upLv_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.baowu_upLv_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.BAOWU).guide_baowu_upLv(step);
    };
    /**三国战神 */
    GuideStepManager.prototype.sgzs_battle_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.sgzs_battle_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.SANGUO_ZHANSHEN).guide_sgzs(step);
    };
    /**藏宝阁 */
    GuideStepManager.prototype.CBG_draw_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) && (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW2) && !View_Reward_Show2.isGuide || View_Reward_Show2.isGuide);
        return ret;
    };
    GuideStepManager.prototype.CBG_draw_enter = function (step) {
        if (GGlobal.layerMgr.isOpenView(UIConst.CANGBAOGE)) {
            GGlobal.layerMgr.getView(UIConst.CANGBAOGE).guide_draw(step);
        }
    };
    /**藏宝阁 奖励界面*/
    GuideStepManager.prototype.CBG_rewardShow_finishCheck = function (step) {
        var ret = !GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW2);
        return ret;
    };
    GuideStepManager.prototype.CBG_rewardShow_enter = function (step) {
        if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW2)) {
            GGlobal.layerMgr.getView(UIConst.REWARD_SHOW2).guide_sureBt(step);
        }
    };
    /**闯关有礼*/
    GuideStepManager.prototype.chuangguanyouli_draw_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        ViewChuangGuanYL.isGuide = !GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.chuangguanyouli_draw_enter = function (step) {
        ViewChuangGuanYL.step = step;
        GGlobal.layerMgr.getView(UIConst.CHUANGGUANYOULI).guideDraw(step);
    };
    /**关卡大地图*/
    GuideStepManager.prototype.guanqiaMap_Draw_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    /**选中升星grid*/
    GuideStepManager.prototype.shenJian_Grid_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.SHEN_JIAN) &&
            GGlobal.layerMgr.getView(UIConst.SHEN_JIAN).check_shenjian_select(step.arg));
        return ret;
    };
    GuideStepManager.prototype.shenJian_Grid_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.SHEN_JIAN).guide_shenjian_select(step);
    };
    /**升星按钮 */
    GuideStepManager.prototype.shenJian_upstar_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.SHEN_JIAN) &&
            GGlobal.layerMgr.getView(UIConst.SHEN_JIAN).check_shenjian_upstar(step.arg));
        return ret;
    };
    GuideStepManager.prototype.shenJian_upstar_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.SHEN_JIAN).guide_shenjian_upstar(step);
    };
    GuideStepManager.prototype.guanqiaMap_Draw_enter = function (step) {
    };
    /**选中对应的武将格子 */
    GuideStepManager.prototype.wujiang_Grid_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.WU_JIANG) &&
            GGlobal.layerMgr.getView(UIConst.WU_JIANG).check_wujiang_select());
        return ret;
    };
    GuideStepManager.prototype.wujiang_Grid_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.WU_JIANG).guide_wujiang_select(step);
    };
    /**武将激活 */
    GuideStepManager.prototype.wujiang_upstar_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.WU_JIANG) &&
            GGlobal.layerMgr.getView(UIConst.WU_JIANG).check_wujiang_upstar());
        return ret;
    };
    GuideStepManager.prototype.wujiang_upstar_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.WU_JIANG).guide_wujiang_upstar(step);
    };
    /**切换武将*/
    GuideStepManager.prototype.wujiang_changeBt_finishCheck = function (step) {
        var ret = GuideStepManager.instance.finishCheck(step);
        return ret;
    };
    GuideStepManager.prototype.wujiang_changeBt_enter = function (step) {
        GGlobal.layerMgr.getView(UIConst.WU_JIANG).guide_wujiang_change(step);
    };
    GuideStepManager.prototype.finishCheck = function (step) {
        var ret = Model_player.taskSt == 1;
        return ret;
    };
    GuideStepManager.prototype.resetToStageCenter = function () {
        GuideStepManager.instance.showGuide(fairygui.GRoot.inst, App.stage.stageWidth / 2, App.stage.stageHeight / 2);
    };
    //记录数据
    GuideStepManager.prototype.saveIntFlag_finishCheck = function (step) {
        var ret = true;
        var key = step.arg.key;
        var value = Number(step.arg.value);
        this.flagDict[key] = value;
        return ret;
    };
    GuideStepManager.prototype.openui_finish = function (step) {
    };
    GuideStepManager.prototype.openui_auto = function (step) {
    };
    //----------打开面板]
    //---------[打开面板
    GuideStepManager.prototype.closeui_finishCheck = function (step) {
        var ret = false;
        if (typeof step.arg === "number") {
            ret = !GGlobal.layerMgr.isOpenView(step.arg);
        }
        return ret;
    };
    GuideStepManager.prototype.closeui_enter = function (step) {
        if (typeof step.arg === "number") {
            (GGlobal.layerMgr.getView(step.arg)).guideClosePanel(step);
        }
    };
    GuideStepManager.prototype.closeui_exit = function (step) {
    };
    GuideStepManager.prototype.taskFinsh_enter = function (step) {
        ViewMainUIBottomUI1.instance.updateNewerGuide();
    };
    GuideStepManager.prototype.taskFinsh_finishCheck = function (step) {
        var ret = Model_player.taskId != step.source.taskid;
        return ret;
    };
    //----------打开面板]
    GuideStepManager.prototype.releaseArrow = function () {
        GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, this.run, this);
        this.curStep = null;
        this.guideList.length = 0;
        QuestGuideArrow.instance.release();
        QuestGuideArrow1.instance.release();
    };
    GuideStepManager.prototype.checkArrowTarget = function () {
        var arrow = QuestGuideArrow.instance;
        ViewMainUIBottomUI1.instance.updateNewerGuide();
    };
    GuideStepManager.prototype.hideArrow = function () {
        QuestGuideArrow.instance.hide();
        QuestGuideArrow1.instance.release();
    };
    GuideStepManager.prototype.hideArrow1 = function () {
        QuestGuideArrow1.instance.release();
    };
    GuideStepManager.prototype.onEvent = function (event) {
        if (this.curStep && this.curStep.onEvent) {
            this.curStep.onEvent(this.curStep, event);
        }
    };
    GuideStepManager.serverAuto = false;
    GuideStepManager.TIMEDELTAMAX = 10000;
    return GuideStepManager;
}());
__reflect(GuideStepManager.prototype, "GuideStepManager");
