package com.teamtop.system.battleNew.event;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.system.zcBoss.ZcBoss;
import com.teamtop.system.zcBoss.ZcBossConst;
import com.teamtop.system.zcBoss.ZcBossHeroManager;
import com.teamtop.system.zcBoss.ZcBossHeroSender;
import com.teamtop.system.zcBoss.ZcBossJoiner;
import com.teamtop.system.zcBoss.cross.ZcBossCrossCache;
import com.teamtop.system.zcBoss.cross.ZcBossCrossFunction;
import com.teamtop.system.zcBoss.cross.ZcBossCrossScene;

import excel.config.Config_bosszc_010;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_bosszc_010;

public class ZCBossCrossBattleNewEvent extends BattleNewEvent {
	
	private static ZCBossCrossBattleNewEvent ins;

	public ZCBossCrossBattleNewEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ZCBossCrossBattleNewEvent getIns() {
		if (ins == null) {
			ins = new ZCBossCrossBattleNewEvent();
		}
		return ins;
	}

	
	@Override
	public void battleEnd(BattleNewInfo battleNewInfo) {
		
		long winHID = BattleNewFunction.getIns().getWinHID(battleNewInfo);
		long failHID = BattleNewFunction.getIns().getFailHID(battleNewInfo);
		long winHp = battleNewInfo.getPlayerDataMap().get(winHID).getHp();
		long winHuDun = battleNewInfo.getPlayerDataMap().get(winHID).getHudun();
		//处理战斗结束逻辑
		Hero hero = HeroCache.getHero(winHID);
		int zoneid = hero.getZoneid();
		int partId = CrossCache.getPartId(zoneid);
		ZcBossJoiner zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
		int bossIndex=0;
		if(hero!=null&&zcBossJoiner!=null) {
			//胜利者
			zcBossJoiner.setHp(winHp);
			hero.getFinalFightAttr().setHp(winHp);
			zcBossJoiner.setHuDun( winHuDun);
			zcBossJoiner.setTimeBattleBegin(0);
			ZcBoss zcBoss = ZcBossCrossCache.getIns().getZcBossByIndex(zcBossJoiner.getInBossId(), partId);
			bossIndex=zcBoss.getIndex();
			int sceneUnitId = ZcBossCrossCache.getIns().getBossSceneUnitId(bossIndex, partId);
			////胜利者 留在场景
			ZcBossCrossScene.getIns().in(hero, zcBoss.getMapId(), (int)sceneUnitId);
			int num = Config_xtcs_004.getIns().get(ZcBossConst.ZCBOSS_WIN).getNum();
			UseAddUtil.add(hero, GameConst.ZCBOSSJF, num, SourceGoodConst.ZCBOSS_WIN, true);
			Map<Object,Object> datas = new HashMap<Object, Object>(2);
			datas.put(SceneXData.nowHp, zcBossJoiner.getHp());//当前气血
			datas.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//最大气血
			SceneFunction.getIns().boardcastNewState(hero, datas, false);
			
		}
		
		Hero failhero = HeroCache.getHero(failHID);
		if (failhero!=null) {
			ZcBossJoiner failZcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(failhero.getId());
			if (failZcBossJoiner!=null) {
				bossIndex=failZcBossJoiner.getInBossId();
				//失败者被踢出场景
				ZcBossHeroManager.getIns().quit(failhero);
				int num = Config_xtcs_004.getIns().get(ZcBossConst.ZCBOSS_FAILE).getNum();
				UseAddUtil.add(failhero, GameConst.ZCBOSSJF,num, SourceGoodConst.ZCBOSS_FAIL, true);
				Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(bossIndex);
				UseAddUtil.add(failhero, struct_bosszc_010.getLose(), SourceGoodConst.ZCBOSS_BATTLE_FAIL, UseAddUtil.getDefaultMail(), true);

			}
		}
		ZcBossHeroSender.sendCmd_4458(winHID, winHID, failHID);
		ZcBossHeroSender.sendCmd_4458(failHID, winHID, failHID);
		if (bossIndex!=0) {
			Object[] breadSate=new Object[2];
			breadSate[0]=new Object[] {0,0,winHID};
			breadSate[1]=new Object[] {0,0,failHID};
			ZcBossCrossFunction.getIns().broadSates(bossIndex, breadSate, partId);
		}
		
	}

	@Override
	public boolean isNomalSendBack() {
		return true;
	}

	@Override
	public int[][] battleCountWin(long battleUid) {
		int num = Config_xtcs_004.getIns().get(ZcBossConst.ZCBOSS_WIN).getNum();
		List<int[]> dropArr = new ArrayList<int[]>();
		dropArr.add(new int[] {GameConst.ZCBOSSJF,0,num,0});
		int[][] drops = new int[dropArr.size()][];
		dropArr.toArray(drops);
		return drops;
	}

	@Override
	public int[][] battleCountLose(long battleUid) {
		int num = Config_xtcs_004.getIns().get(ZcBossConst.ZCBOSS_FAILE).getNum();
		List<int[]> dropArr = new ArrayList<int[]>();
		dropArr.add(new int[] {GameConst.ZCBOSSJF,0,num,0});
		int[][] drops = new int[dropArr.size()][];
		dropArr.toArray(drops);
		return drops;
	}

	@Override
	public void afterBattleEnd(BattleNewInfo battleNewInfo) {
		// TODO Auto-generated method stub
		
	}
}
