package com.teamtop.system.activity.ativitys.caoCaoCome;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;

public class CaoCaoComeEvent extends AbsSystemEvent {
	private static CaoCaoComeEvent ins;

	public static CaoCaoComeEvent getIns() {
		if (ins == null) {
			ins=new CaoCaoComeEvent();
		}
		return ins;
	}
	private CaoCaoComeEvent() {
		
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		CaoCaoComeFunction.getIns().quit(hero);
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
			return;
		}
        CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		if (caoCaoComeCache.getState()==CaoCaoComeConst.STATE1) {
			GlobalSender.sendCmd_264(hero.getId(),ActivitySysId.CAOCAOCOME_SYSID, 0, 1);
		}
		
	}
	
	@Override
	public void logout(Hero hero){
		CaoCaoComeFunction.getIns().quit(hero);
		
	}

}
