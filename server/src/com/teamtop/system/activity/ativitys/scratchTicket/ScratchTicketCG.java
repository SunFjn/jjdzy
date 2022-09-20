package com.teamtop.system.activity.ativitys.scratchTicket;
import com.teamtop.system.hero.Hero;

/**
 * ScratchTicketCG.java
 * 刮刮乐
 */
public class ScratchTicketCG{

	private static ScratchTicketCG ins = null;

	public static ScratchTicketCG getIns(){
		if(ins == null){
			ins = new ScratchTicketCG();
		}
		return ins;
	}

	/**
	 * 购买刮卡抽奖 11791
	 */
	public void draw(Hero hero, Object[] datas){
		ScratchTicketManager.getIns().draw(hero);
	} 
	/**
	 * 刮开刮刮卡领奖 11793
	 */
	public void getReward(Hero hero, Object[] datas){
		ScratchTicketManager.getIns().getReward(hero);
	} 
}