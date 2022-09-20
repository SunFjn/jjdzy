package com.teamtop.system.directUp;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_zsd_257;
import excel.struct.Struct_zsd_257;

public abstract class DirectUPAbs {
	protected Integer type;

	public int directUP(Hero hero) {
		int systemId = Config_zsd_257.getIns().get(type).getDay();
		if (!HeroFunction.getIns().checkSystemOpen(hero, systemId)) {
			return DirectUPConst.NOTSTART_FAILURE;
		}
		int[][] directUPTOOL = getDirectUPTOOL(type);
		if (!UseAddUtil.canUse(hero, directUPTOOL)) {
			return DirectUPConst.NOTNUM_FAILURE;
		}
		if (!directUPHandlerBefore(hero)) {
			return DirectUPConst.OVER_FAILURE;
		}
		UseAddUtil.use(hero, directUPTOOL, SourceGoodConst.DirectUPTOOL_CONSUME, true);
		directUPHandler(hero);
		return DirectUPConst.SUCCESS;
	}
	
	protected abstract boolean directUPHandlerBefore(Hero hero);
	protected abstract void directUPHandler(Hero hero);

	private int[][] getDirectUPTOOL(Integer type) {
		Struct_zsd_257 struct_zsd_257 = Config_zsd_257.getIns().get(type);
		return new int[][] { new int[] { GameConst.TOOL, struct_zsd_257.getItem(), 1 } };
	}
}
