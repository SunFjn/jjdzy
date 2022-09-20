package com.teamtop.houtaiHttp.events.bsh;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

public class BshFunction {

	private static BshFunction ins;

	private BshFunction() {
		// TODO Auto-generated constructor stub
	}

	public static final BshFunction getIns() {
		if (ins == null) {
			ins = new BshFunction();
		}
		return ins;
	}

	public void gmHandle(Hero hero, String[] param) {
		try {
			List<Integer> zoneids = new ArrayList<>();
			String zoneidsStr = param[0];
			String[] groupArr = zoneidsStr.split(",");
			for (String group : groupArr) {
				String[] arr = group.split("_");
				for (String zoneidStr : arr) {
					if (!CommonUtil.isNull(zoneidStr)) {
						zoneids.add(Integer.parseInt(zoneidStr));
					}
				}
			}
			String commond = param[1];
			BshIO.getIns().syncBsh(hero, zoneids, commond);
		} catch (Exception e) {
			LogTool.error(e, BshFunction.class, "BshFunction gmHandle");
		}
	}

}
