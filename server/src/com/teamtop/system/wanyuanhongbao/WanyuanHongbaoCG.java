package com.teamtop.system.wanyuanhongbao;
import com.teamtop.system.hero.Hero;

public class WanyuanHongbaoCG {
	
	private static WanyuanHongbaoCG ins = null;
	
	public static WanyuanHongbaoCG getIns() {
		if(ins == null) {
			ins = new WanyuanHongbaoCG();
		}
		return ins;
	}
	
	/**
	 * 打开界面 20011
	 */
	public void openUI(Hero hero, Object[] datas){
		int type = (byte) datas[0];
		WanyuanHongbaoManager.getIns().openUI(hero,type);
	}
	
	/**
	 * 领取奖励 20013
	 * @param awardsId| 奖励id，为配置表奖励id| int
	 */
	public void getAwards(Hero hero, Object[] datas){
		int awardsId = (short)datas[0];
		WanyuanHongbaoManager.getIns().getAwards(hero, awardsId);
	} 
}
