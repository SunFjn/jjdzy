/**
 * 跨服王者战斗逻辑管理
 * @author: lujiahao 
 * @date: 2019-12-14 10:44:59 
 */
class KfwzCtrl extends SceneCtrl implements ISceneCtrl {
    private static _instance: KfwzCtrl;
    public static get instance(): KfwzCtrl {
        if (!this._instance) this._instance = new KfwzCtrl();
        return this._instance;
    }

    constructor() {
        super();
    }

    //=========================================== API ==========================================
    private _pveOverFlag = false;
    public leftPlayerArr: Vo_Player[] = [];
    public rightPlayerArr: Vo_Player[] = [];
    public leftMap: { [id: number]: Vo_Player } = {};
    public rightMap: { [id: number]: Vo_Player } = {};
    public onEnter(pScene: MapScene) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t_model.isInBattle = true;
        t.st = -1; //重置状态
        t.scene = pScene;
        // t.leftPlayerArr.length = 0;
        // t.rightPlayerArr.length = 0;
        // t.leftMap = {};
        // t.rightMap = {};
        t._pveOverFlag = false;
        pScene.setLeftAndRight();
        pScene.initWithID(401005);
        MainUIController.showBottomExite(true, Handler.create(t, t.onClickEixt), t);
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, t.failHandler, t);
        GGlobal.control.register(true, Enum_MsgType.KFWZ_BATTLE_PLAYER_DEAD, t.onPlayerDead, t);
        GGlobal.layerMgr.close2(UIConst.ARENA);
        GGlobal.layerMgr.open(UIConst.KFWZ_BATTLE);
        GGlobal.mainUICtr.setState(MainUIController.KFWZ);

        t.createMyChars();

        if (t_model.battleType == 1) {
            GGlobal.control.register(true, Enum_MsgType.KFWZ_BATTLE_PVE_OVER, t.onPVEOver, t);
        }
        else {
            // GGlobal.control.register(true, Enum_MsgType.MSG_ADDROLEDETAIL, t.onAddRole, t);
            // console.log("===================== 玩家数据 侦听++++++++");
        }
        SimpleTimer.ins().removeTimer(t.onDelayOpen, t);
    }

    private onPlayerDead(pData: { deadVo: VoBattlePlayerKfwz }) {
        //收到服务器告诉我死亡后，需要及时移除死亡玩家的模型
        let t = this;
        if (pData.deadVo) {
            let t_role: SceneCharRole = t.scene.getUnit(pData.deadVo.roleId);
            if (t_role) {
                t_role.takeMaxHurt();
                // t.removeVo(t_role.id);
            }
        }
    }

    private onPVEOver(pData: { result: number }) {
        let t = this;
        t._pveOverFlag = true;
        if (pData.result == 0) {
            //胜利
            //立马杀死对方
            for (let v of t.rightPlayerArr) {
                let t_role = t.scene.getUnit(v.id);
                if (t_role) {
                    t_role.takeMaxHurt();
                    t.removeVo(v.id);
                }
            }
        }
        else {
            //失败
            //立马杀死自己
            for (let v of t.leftPlayerArr) {
                let t_role = t.scene.getUnit(v.id);
                if (t_role) {
                    t_role.takeMaxHurt();
                    t.removeVo(v.id);
                }
            }
        }
    }

    private removeVo(pId: number) {
        let t = this;
        for (let i = t.leftPlayerArr.length - 1; i >= 0; i--) {
            let t_vo = t.leftPlayerArr[i];
            if (t_vo && t_vo.id == pId) {
                t.leftPlayerArr.splice(i, 1);
                delete t.leftMap[pId];
                return;
            }
        }
        for (let i = t.rightPlayerArr.length - 1; i >= 0; i--) {
            let t_vo = t.rightPlayerArr[i];
            if (t_vo && t_vo.id == pId) {
                t.rightPlayerArr.splice(i, 1);
                delete t.rightMap[pId];
                return;
            }
        }
    }

    // private onAddRole(pVo: Vo_Player) {
    //     if (!pVo)
    //         return;
    //     let t = this;
    //     let t_model = GGlobal.modelKfwz;
    //     let t_bvo = t_model.getBattleVoByRoleId(pVo.id);
    //     if (t_bvo) {
    //         switch (t_bvo.force) {
    //             case 1:
    //                 t.createLeftUnit(pVo);
    //                 break;
    //             case 2:
    //                 t.createRightUnit(pVo);
    //                 break;
    //         }
    //     }
    // }

    public onExit(scene: MapScene): void {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (!t_model.hasResult && GGlobal.mapscene.tempSceneType == SceneCtrl.KFWZ) {
            //如果临时缓存的场景类型是跨服王者，则表示这是从当前场景切换到当前场景，则跳过onExit
            return;
        }
        t_model.isInBattle = false;
        t.scene.setLeftAndRight();
        Model_battle.battleId = 0;
        scene.removeAll();
        GGlobal.layerMgr.close(UIConst.ALERT);
        t.leftPlayerArr.length = 0;
        t.rightPlayerArr.length = 0;
        t.leftMap = {};
        t.rightMap = {};
        // GGlobal.control.notify(Enum_MsgType.EXIT_SERVERBATTLE);
        GGlobal.layerMgr.close2(UIConst.KFWZ_BATTLE);
        MainUIController.showBottomExite(false);
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, t.failHandler, t);
        GGlobal.control.register(false, Enum_MsgType.KFWZ_BATTLE_PLAYER_DEAD, t.onPlayerDead, t);
        GGlobal.control.register(false, Enum_MsgType.KFWZ_BATTLE_PVE_OVER, t.onPVEOver, t);
        // GGlobal.control.register(false, Enum_MsgType.MSG_ADDROLEDETAIL, t.onAddRole, t);

        if (!t_model.hasResult) {
            SimpleTimer.ins().addTimer(t.onDelayOpen, t, 500, 1);
        }

        if (t_model.delay2Exit) {
            //如果在战斗中结束活动，则需要在退出战斗后主动发送退出活动的请求
            t_model.cmdSendExit();
        }
    }

    private onDelayOpen() {
        // GGlobal.layerMgr.open(UIConst.KFWZ);
        GGlobal.modelKfwz.onResultExit();
    }

    private failHandler(): void {
        GGlobal.modelScene.returnMainScene();
    }

    protected onClickEixt(): void {
        let self = this;
        // let tips = "退出将视为挑战失败，是否确认？\n(挑战次数不返还)";
        // if (GGlobal.modelFengHuoLY.inActivity || GGlobal.modelWenDingTX.ACtiving) {
        // 	tips = "退出将视为挑战失败，是否确认？";
        // }
        let tips = "退出按失败结算，是否确认退出？";
        ViewAlert.show(tips, Handler.create(self, self.okHandler));
    }

    private okHandler(): void {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        t_model.CG_CrossTeamKing_quitBattle_10863();
        // GGlobal.modelbattle.CG_EXIT_BATTLE();
    }

    protected oldTime = 0;
    protected st: number = -1;
    public update(ctx): void {
        let t = this;
        var now = egret.getTimer();
        let t_model = GGlobal.modelKfwz;
        if (t.st == -1) {
            //初始化
            t.setState(0);
        } else if (t.st == 0) {
            if (t_model.battleType == 0) {
                //玩家
                var myhp = t.scene.getForceCount(1);
                var playerhp = t.scene.getForceCount(2);
                if (playerhp <= 0) {
                    t.setState(1);
                } else if (myhp <= 0) {
                    t.setState(2);
                } else {//没结果 战斗超过30秒判定输

                }
            }
            else {
                //电脑
                if (t._pveOverFlag)
                    return;
                let t_deadPvo: Vo_Player;
                let t_myHp = t.scene.getForceHp(1);
                let t_enemyHp = t.scene.getForceHp(2);
                if (t_enemyHp <= 0) {
                    //电脑死了
                    t_deadPvo = t.rightPlayerArr[0];
                }
                else if (t_myHp <= 0) {
                    //我方死了
                    t_deadPvo = t.leftPlayerArr[0];
                }
                if (t_deadPvo) {
                    t_model.updateBattleDead(t_deadPvo.id);
                    t.removeVo(t_deadPvo.id);
                    //检查某一方结束
                    let t_result = t_model.checkIsAllOver();
                    switch (t_result) {
                        case 0: //还没结束
                            GGlobal.mapscene.enterScene(SceneCtrl.KFWZ);
                            return;
                            break;
                        case 1: //我方死光
                            // ViewCommonFail.show();
                            t_model.cmdSendOverPVE(1);
                            break;
                        case 2: //敌方死光
                            // ViewCommonWin.show(5000);
                            t_model.cmdSendOverPVE(0);
                            break;
                    }
                }
            }
            t.aiUpdate(ctx);
        } else {

        }
        let t_role = null;
        let t_vo = t.leftPlayerArr[0];
        if (t_vo && t_vo.sceneChar) {
            t_role = t.scene.getUnit(t_vo.sceneChar.id);
        }
        t.watch(t_role);
    }

    public setState(st: number): void {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        switch (st) {
            case 0:
                console.log("======== 创建敌方玩家");
                let t_enemyList = t_model.enemyBattleList;
                let t_enemyVo: VoBattlePlayerKfwz;
                for (let v of t_enemyList) {
                    if (!v.isDead) {
                        t_enemyVo = v;
                        break;
                    }
                }
                if (t_enemyVo) {
                    let t_str = "";
                    for (let v of t_enemyList) {
                        t_str += v.roleId + ",";
                    }
                    console.log("==========bvoList = " + t_str);

                    if (t_enemyVo.type == 1) {
                        //NPC
                        let t_pvo = GGlobal.modelPlayer.getPlayerVo(t_enemyVo.roleId);
                        if (t_pvo) {
                            t.createRightUnit(t_pvo);
                            console.log("====== npc 创建");

                        }
                    }
                    else {
                        //玩家
                        let t_list: Vo_Player[] = t.getServerDataList();
                        if (t_list) {
                            for (let v of t_list) {
                                console.log("===pvo id", v.id);
                                if (v.id == t_enemyVo.roleId) {
                                    t.createRightUnit(v);
                                    console.log("====== 玩家 创建");
                                    break;
                                }
                            }
                        }
                    }
                    console.log("========= √ 有合适的敌方玩家数据");
                }
                else {
                    console.log("========= × 没有合适的敌方玩家数据");
                }
                break;
            case 1:
                break;
            case 2:
                break;
        }
        t.oldTime = egret.getTimer();
        t.st = st;
    }

    private getServerDataList(): Vo_Player[] {
        let t_allList: Vo_Player[] = [];
        let t_list1 = Model_battle.leftPlayerArr;
        let t_list2 = Model_battle.rightPlayerArr;
        if (t_list1) {
            t_allList = t_allList.concat(t_list1)
        }
        if (t_list2) {
            t_allList = t_allList.concat(t_list2);
        }
        return t_allList;
    }

    public createMyChars() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (t_model.battleType == 1) {
            //打电脑
            for (let v of t_model.myBattleList) {
                if (!v.isDead) {
                    let t_pvo = GGlobal.modelPlayer.getPlayerVo(v.roleId);
                    if (v.roleId == Model_player.voMine.id) {
                        t_pvo = Model_player.voMine;
                    }
                    if (t_pvo) {
                        t.createLeftUnit(t_pvo);
                    }
                    break;
                }
            }
        }
        else {
            //打人
            let t_myList = t_model.myBattleList;
            let t_bvo: VoBattlePlayerKfwz;
            for (let v of t_myList) {
                if (!v.isDead) {
                    t_bvo = v;
                    break;
                }
            }
            if (t_bvo) {
                let t_list = t.getServerDataList();
                for (let i = 0; i < t_list.length; i++) {
                    var t_vo: Vo_Player = t_list[i];
                    if (t_vo.id == t_bvo.roleId) {
                        t.createLeftUnit(t_vo);
                        break;
                    }
                }
            }
        }
    }

    protected createRightUnit(pVo: Vo_Player) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (!t.rightMap[pVo.id]) {
            pVo.updateChars();
            let t_role = pVo.sceneChar;
            if (!t.scene.getUnit(t_role.id)) {
                t.setBossPos(t_role);
                t_role.curhp = pVo.hp;
                t_role.invalid |= 1023;
                t_role.force = 2;
                t_role.setDir(-1);
                if (t_model.battleType == 0) {
                    t_role.clearHurt = 1;
                }
                t.scene.addUnit(t_role);
                t.addHpAndName(t_role, false);
            }
            if (!t.rightMap[pVo.id]) {
                t.rightPlayerArr.push(pVo);
                t.rightMap[pVo.id] = pVo;
            }
        }

        let t_role = pVo.sceneChar;
        if (t_role) {
            t_role.isSilent = false;
            if (t_role.isHero()) {
                ViewMainUIBottomUI1.instance.setSkillCM(false);
            }
            t.setBossPos(t_role);
            t_role.setDir(-1);
            t_role.invalid |= 1023;
        }
    }

    protected createLeftUnit(pVo: Vo_Player) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (!t.leftMap[pVo.id]) {
            pVo.updateChars();
            let t_role = pVo.sceneChar;
            if (!t.scene.getUnit(t_role.id)) {
                t.setRolePos(t_role);
                if (t_model.battleType == 0) {
                    t_role.curhp = pVo.currentHp;
                    console.log("我方血量===", pVo.currentHp, pVo.hp);
                    console.log(pVo.name, pVo.id);
                }
                else {
                    t_role.curhp = pVo.hp;
                }
                t_role.invalid |= 1023;
                t_role.force = 1;
                t_role.setDir(1);
                if (t_model.battleType == 0) {
                    t_role.clearHurt = 1;
                }
                t.scene.addUnit(t_role);
                t.addHpAndName(t_role, true);
            }
            if (!t.leftMap[pVo.id]) {
                t.leftPlayerArr.push(pVo);
                t.leftMap[pVo.id] = pVo;
            }
        }

        let t_role = pVo.sceneChar;
        if (t_role) {
            if (t_model.battleType == 0) {
                console.log("血量重新赋值 = ", pVo.currentHp, pVo.hp);
                console.log(pVo.name, pVo.id);
                t_role.curhp = pVo.currentHp;
            }
            t_role.isSilent = false;
            if (t_role.isHero()) {
                ViewMainUIBottomUI1.instance.setSkillCM(false);
            }
            t.setRolePos(t_role);
            t_role.setDir(1);
            t_role.invalid |= 1023;
        }

        if (pVo.id == Model_player.voMine.id) {
            //是自己的话显示技能按钮
            MainUIController.setSkillEnable(true);
        }
        else {
            //否则隐藏技能按钮
            MainUIController.setSkillEnable(false);
        }
    }

    public aiUpdate(ctx) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        for (let v of t.leftPlayerArr) {
            if (v) {
                let t_bvo = t_model.getBattleVoByRoleId(v.id);
                if (t_bvo && t_bvo.isDead == 0) {
                    GuanQiaAI.thinkAttack(v.sceneChar, ctx);
                }
            }
        }
        for (let v of t.rightPlayerArr) {
            if (v) {
                let t_bvo = t_model.getBattleVoByRoleId(v.id);
                if (t_bvo && t_bvo.isDead == 0) {
                    GuanQiaAI.thinkAttack(v.sceneChar, ctx);
                }
            }
        }
    }

    public setRolePos(role: SceneCharRole) {
        let self = this;
        var x = self.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = 100;
        role.y = 720;
    }

    public setBossPos(role: SceneCharRole) {
        let self = this;
        let cx = self.scene.map.focusx;
        role.x = cx + 350;
        role.y = 720;
    }

    private watch(pRole: SceneCharRole) {
        if (!pRole)
            return;
        let t = this;
        t.scene.map.watchFocus(pRole.x, pRole.y);
        t.scene.moveMidbg(pRole.x);
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}