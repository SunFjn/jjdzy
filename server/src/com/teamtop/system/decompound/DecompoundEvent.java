package com.teamtop.system.decompound;

import com.teamtop.system.compound.CompoundEvent;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_decompose_204;
import excel.struct.Struct_decompose_204;

public class DecompoundEvent extends AbsSystemEvent{
	
	private static CompoundEvent ins = null;

	public static CompoundEvent getIns() {
		if (ins == null) {
			ins = new CompoundEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, DecompoundConst.SYS_DECOMPOUND)) {
			return;
		}
		boolean isHong=false;
		for (Struct_decompose_204 decompose_204:Config_decompose_204.getIns().getSortList()) {
			
			int type=decompose_204.getType();
			int[][] consume=decompose_204.getConsume();
			int[][] data = new int[1][];
			data[0] = new int[]{type,decompose_204.getId(),1};
			int[][] maxConsume=CommonUtil.arrayPlusArrays(consume, data);
			
			if (UseAddUtil.canUse(hero, maxConsume)) {
				isHong=true;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, DecompoundConst.SYS_DECOMPOUND, 0, RedPointConst.HAS_RED);
		}
		
	}

}