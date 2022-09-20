package com.teamtop.system.runningMan;

import java.util.List;

import com.teamtop.system.generalSoul.GeneralSoulFunction;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;

import excel.config.Config_ggzj_008;
import excel.struct.Struct_ggzj_008;

public class RunningManFuntion {
	
	private static RunningManFuntion ins = null;

	public static RunningManFuntion getIns() {
		if (ins == null) {
			ins = new RunningManFuntion();
		}
		return ins;
	}
	/**
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		int type = Integer.parseInt(param[0]);
		int num=Integer.parseInt(param[1]);
		
		Struct_ggzj_008 excel = Config_ggzj_008.getIns().get( num);
		if( excel==null){
			GlobalSender.sendCmd_260(hero.getId(), 1, "关卡ID "+num+"不存在");
			return;
		}
		RunningMan runningMan = hero.getRunningMan();
		runningMan.setMaxtodaynum(num);
		runningMan.setMaxHisnum(num);
		List<Struct_ggzj_008> sortList = Config_ggzj_008.getIns().getSortList();
		for(Struct_ggzj_008 data : sortList) {
			if( type>1){
				GeneralSoulFunction.getIns().activateGeneralSoul(hero, 1, data.getGuan());
			}
			if( type>2){
				GeneralSoulFunction.getIns().activateGeneralSoul(hero, 2, data.getGuan());
			}
			if( type>3){
				GeneralSoulFunction.getIns().activateGeneralSoul(hero, 3, data.getGuan());
			}
			if(data.getType()==type&&data.getGuan()<=num){
				GeneralSoulFunction.getIns().activateGeneralSoul(hero, type, data.getGuan());
			}
		}
		RunningManManager.getIns().openUi(hero);
		return;
	}

}
