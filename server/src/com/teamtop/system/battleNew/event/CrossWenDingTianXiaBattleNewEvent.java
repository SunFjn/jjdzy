package com.teamtop.system.battleNew.event;

import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaCrossFunction;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

public class CrossWenDingTianXiaBattleNewEvent extends BattleNewEvent {

	private static CrossWenDingTianXiaBattleNewEvent ins;

	public CrossWenDingTianXiaBattleNewEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossWenDingTianXiaBattleNewEvent getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaBattleNewEvent();
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
		if(hero!=null) {
			CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
			if(wdtxData!=null) {
				wdtxData.setHp(winHp);
				wdtxData.setHuDun( winHuDun);
//				System.out.println("打赢的玩家设置hp:"+winHp+" 护盾:"+winHuDun);
			}
		}

		CrossWenDingTianXiaCrossFunction.getIns().battleEnd( winHID, failHID);
	}

	@Override
	public boolean isNomalSendBack() {
		return true;
	}

	@Override
	public int[][] battleCountWin(long battleUid) {
		return null;
	}

	@Override
	public int[][] battleCountLose(long battleUid) {
		return null;
	}

	@Override
	public void afterBattleEnd(BattleNewInfo battleNewInfo) {
		// TODO Auto-generated method stub
		
	}

}
