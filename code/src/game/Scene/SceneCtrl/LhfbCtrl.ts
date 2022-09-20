/**
 * 轮回副本战斗场景控制
 * @author: lujiahao 
 * @date: 2020-03-05 10:57:57 
 */
class LhfbCtrl extends BossCtrl {
    private static _instance: LhfbCtrl;
    public static get instance(): LhfbCtrl {
        if (!this._instance)
            this._instance = new LhfbCtrl();
        return this._instance;
    }

    private roleList: SceneCharRole[] = [];

    constructor() {
        super();
    }

    //=========================================== API ==========================================
    public onEnter(pScene: MapScene) {
        ViewCommonWin.hide();
        ViewBattleFault.hide();
        let t = this;
        t.st = -1;
        t.scene = pScene;
        t.initState = 0;
        let t_model = GGlobal.modelLhfb;
        t_model.isInBattle = true;
        let t_copyVo = t_model.getCopyVoByLunhuiId(t_model.teamVo.lunhuiId);
        t.setMapHead(t_copyVo.mapId);
        t.setSt(0);
        GGlobal.mapscene.map.watchFocus(0, 0);
        GGlobal.layerMgr.close2(UIConst.LHFB);
        // GGlobal.layerMgr.close2(UIConst.SIXWAY);
        // GGlobal.layerMgr.closeAllPanel();
        GGlobal.layerMgr.closeAllPanelExcept([]);
        GGlobal.mainUICtr.setState(MainUIController.BATTLE);
        MainUIController.showBottomExite(true, Handler.create(t, t.onClickEixt), t);
        GGlobal.control.register(true, Enum_MsgType.LHFB_BATTLE_HP_UPDATE, t.onBattleHpUpdate, t);
        GGlobal.control.register(true, Enum_MsgType.LHFB_BATTLE_DEAD, t.onBattleDead, t);
        // super.onEnter(pScene);

        t.createEnemys();
        t.createMyChars();

        SimpleTimer.ins().removeTimer(t.onDelayOpen, t);
    }

    public onExit(scene: MapScene): void {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        t_model.isInBattle = false;
        t.fightStartTime = 0;
        View_BossSceneHead.hide();
        t.scene.ctx = {};
        let vomine = Model_player.voMine;
        let role: SceneCharRole = vomine.sceneChar;
        if (role) {
            role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        t.scene.removeAll();
        MainUIController.showBottomExite(false);
        t.deadInvide |= 1;
        t.setSt(-1);
        t.others.length = 0;
        t.roleList.length = 0;
        t.enemyBoss = null;

        GGlobal.control.register(false, Enum_MsgType.LHFB_BATTLE_HP_UPDATE, t.onBattleHpUpdate, t);

        if (!t_model.hasResult) {
            SimpleTimer.ins().addTimer(t.onDelayOpen, t, 500, 1);
        }
    }

    private onDelayOpen() {
        GGlobal.modelLhfb.onResultExit();
    }

    protected onClickEixt(): void {
        let self = this;
        let tips = "退出按失败结算，是否确认退出？";
        ViewAlert.show(tips, Handler.create(self, self.okHandler));
    }

    private okHandler(): void {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        // GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        // t_model.CG_RebornFB_leaveBattle_11887();
        t_model.CG_RebornFB_exitTeam_11873();
        // GGlobal.modelbattle.CG_EXIT_BATTLE();
    }

    private onBattleHpUpdate() {
        let t = this;
        t.updateData();
    }

    private onBattleDead(pData: { roleId: number }) {
        let t = this;
        t.updateRoleDead(pData.roleId);
    }

    protected updateRoleDead(roleId: number) {
        let t = this;
        for (let i = t.roleList.length - 1; i >= 0; i--) {
            let scenechar = t.roleList[i];
            if (scenechar.id == roleId) {
                scenechar.curhp = 0;
                t.roleList.splice(i, 1);
                if (scenechar && scenechar.view && scenechar.view.parent) {//当前角色还存在于此场景
                    scenechar.deadThrow(5, 5);
                }
                break;
            }
        }
        if (Model_player.isMineID(roleId)) {
            Model_player.voMine.sceneChar = null;
        }
    }

    protected initState: number = 0;
    protected updateData(): void {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        if (!(t.initState & 1)) {//是否初始化
            t.initState |= 1;
            let t_copyVo = t_model.getCopyVoByLunhuiId(t_model.teamVo.lunhuiId);
            let t_bossId = t_copyVo.levelVo.cfg.boss
            let boss = Config.NPC_200[t_bossId];
            View_BossSceneHead.show(t_bossId, true, t_model.bossHpMax);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, t_model.bossHp);
        if (t_model.bossHp <= 0) {//BOSS被击杀
            t.setSt(2);
        }

        for (let v of t.roleList) {
            let t_bvo = t_model.getBattleVoByRoleId(v.id);
            if (t_bvo) {
                if (v.curhp != t_bvo.curHp) {
                    v.curhp = t_bvo.curHp;
                    if (t_bvo.curHp <= 0) {
                        v.deadThrow(5, 5);
                        if (Model_player.isMineID(v.id))
                            Model_player.voMine.sceneChar = null;
                    }
                }
            }
        }
    }

    private fightStartTime = 0;
    public st = 0;
    public update(ctx) {
        let t = this;
        if (egret.getTimer() - t.fightStartTime < 400) {
            return;
        }
        if (t.st == 0) {
            t.aiUpdate(ctx);
            if (Model_player.voMine && (Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0) || !Model_player.voMine.sceneChar) {
                if (t.enemyBoss) {
                    t.scene.map.watchFocus(t.enemyBoss.x, t.enemyBoss.y);
                }
            } else {
                t.scene.watchMainRole();
            }
        } else if (t.st == 2) {
        } else if (t.st == 1) {
        }
    }

    // protected dieTime: number;
    public setSt(st) {
        let s = this;
        if (st == 0) {
        } else if (st == 1) {//自己死亡，直接退出

        } else if (st == 2) {//BOSS死亡
            // s.dieTime = egret.getTimer();
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.st = st;
    }

    public createEnemys() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_copyVo = t_model.getCopyVoByLunhuiId(t_model.teamVo.lunhuiId);
        let t_bossId = t_copyVo.levelVo.cfg.boss
        let boss = Config.NPC_200[t_bossId];
        if (boss) {
            t_model.bossHp = boss.hp
            t_model.bossHpMax = boss.hp;
        }

        t.enemyBoss = t.createEmeny(t_bossId);
        let ai = new CommonAICtrl();
        ai.role = t.enemyBoss;
        t.enemyBoss.addPlug(ai);
        let bati = BaTiState.create();//获得霸体
        bati.maxTime = 9999999999;//长期霸体
        bati.role = t.enemyBoss;
        t.enemyBoss.addPlug(bati);
        t.enemyBoss.clearHurt = 1;
        t.enemyBoss.force = 2;
        t.setBossPos(t.enemyBoss);
        t.scene.addUnit(t.enemyBoss);

        View_BossSceneHead.show(t_bossId, true);
    }

    public createMyChars() {
        let t = this;
        let t_myvo = Model_player.voMine;
        t_myvo.updateChars()
        let t_role = t_myvo.sceneChar;
        t.setRolePos(t_role, -180);
        t_role.invalid |= 1023;
        t_role.force = 1;
        t_role.immuneDmg = 1;
        t_role.clearHurt = 1;
        if (!t.scene.getUnit(t_role.id)) {
            t.scene.addUnit(t_role);
            t.addHpAndName(t_role, true);
        }
        t.roleList.push(t_role);

        let t_model = GGlobal.modelLhfb;
        let t_list = t_model.teamVo.memberList;

        for (let v of t_list) {
            if (v.roleId != Model_player.voMine.id) {
                let t_pvo: Vo_Player = GGlobal.modelPlayer.playerDetailDic[v.roleId];
                t_pvo.updateChars();
                let t_role1 = t_pvo.sceneChar;

                if (!t.scene.getUnit(t_role1.id)) {
                    t.setRolePos(t_role1);
                    t_role1.invalid |= 255;
                    t_role1.force = 1;
                    t_role1.clearHurt = 1;
                    t.scene.addUnit(t_role1);
                    t.addHpAndName(t_role1, true);
                }
                else {
                    t.setRolePos(t_role1);
                }
                t.roleList.push(t_role1);
            }
        }
    }

    public aiUpdate(ctx) {
        for (let i = 0; i < this.roleList.length; i++) {
            GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
        }
    }

    public searchEnemy(term: SceneCharRole, role: SceneCharRole, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {//自己和其他玩家不攻击
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}