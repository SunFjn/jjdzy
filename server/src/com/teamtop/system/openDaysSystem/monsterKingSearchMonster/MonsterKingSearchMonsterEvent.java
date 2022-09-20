package com.teamtop.system.openDaysSystem.monsterKingSearchMonster;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSender;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.OpenSystemInfo;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchPartInfo;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;

public class MonsterKingSearchMonsterEvent extends AbsSystemEvent {

	private static MonsterKingSearchMonsterEvent ins;

	private MonsterKingSearchMonsterEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingSearchMonsterEvent getIns() {
		if (ins == null) {
			ins = new MonsterKingSearchMonsterEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if(OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
			if(MonsterKingSearchMonsterSysCache.isOpen==false) {
				MonsterKingSearchMonsterFunction.getIns().zeroCheck();
			}
		}
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
			return;
		}
		int partId = CrossCache.getlocalPartId();
		MonsterKingSearchPartInfo partInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
		if (partInfo == null) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
		int endTime = partInfo.getEndTime();
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int open = hdfl_012.getOpen();
		OpenSystemInfo openSystemInfo = OpenDaysSystemSysCache.getOpenMap().get(uid);
		int startTime = openSystemInfo.getStartTime();
		int opEndTime = openSystemInfo.getEndTime();
		int qs = openSystemInfo.getQs();
		int openDays = TimeDateUtil.betweenOpen(endTime);
		if (openDays <= open) {
			OpenDaysSystemSender.sendCmd_4572(hero.getId(), 0, uid, SystemIdConst.MONSTER_KING_SEARCH_MONSTER, qs,
					startTime, opEndTime);
		}
	}

	@Override
	public void zeroPub(int now) {
		if (!CrossZone.isCrossServer()) {
			MonsterKingSearchMonsterFunction.getIns().zeroCheck();
			return;
		}
		MonsterKingSearchMonsterFunction.getIns().sendReward();
	}

}
