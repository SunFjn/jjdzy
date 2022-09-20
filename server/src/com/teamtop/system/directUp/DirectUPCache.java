package com.teamtop.system.directUp;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.directUp.imp.BingFaDirectUP;
import com.teamtop.system.directUp.imp.ExcaliburDirectUP;
import com.teamtop.system.directUp.imp.GodBookDirectUP;
import com.teamtop.system.directUp.imp.SpecialTreasureDirectUP;
import com.teamtop.system.directUp.imp.TreasureDirectUP;
import com.teamtop.system.directUp.imp.WuJiangDirectUP;
import com.teamtop.system.directUp.imp.ZhanJiaDirectUP;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class DirectUPCache extends AbsServerEvent {
	/** 直升丹按不同系统的实现Map */
	private static Map<Integer, DirectUPAbs> directUPAbsMap = new HashMap<>();

	public static Map<Integer, DirectUPAbs> getDirectUPAbsMap() {
		return directUPAbsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		directUPAbsMap.put(1, new WuJiangDirectUP(1));
		directUPAbsMap.put(2, new ZhanJiaDirectUP(2));
		directUPAbsMap.put(3, new TreasureDirectUP(3));
		directUPAbsMap.put(4, new GodBookDirectUP(4));
		directUPAbsMap.put(5, new ExcaliburDirectUP(5));
		directUPAbsMap.put(6, new BingFaDirectUP(6));
		directUPAbsMap.put(7, new SpecialTreasureDirectUP(7));
	}

}
