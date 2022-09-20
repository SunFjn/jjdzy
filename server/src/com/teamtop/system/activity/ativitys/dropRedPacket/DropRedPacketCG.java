package com.teamtop.system.activity.ativitys.dropRedPacket;
import com.teamtop.system.hero.Hero;

/**
 * DropRedPacketCG.java
 * 新活动-天降红包
 */
public class DropRedPacketCG{

	private static DropRedPacketCG ins = null;

	public static DropRedPacketCG getIns(){
		if(ins == null){
			ins = new DropRedPacketCG();
		}
		return ins;
	}

	/**
	 * 发红包 11373
	 * @param id| 红包类型，配置表id| int
	 */
	public void send(Hero hero, Object[] datas){
		int id = (int)datas[0];
		DropRedPacketManager.getIns().send(hero, id);
	} 
	/**
	 * 发红包界面 11371
	 */
	public void sendUI(Hero hero, Object[] datas){
		DropRedPacketManager.getIns().sendUI(hero);
	} 
	/**
	 * 领红包 11375
	 * @param id| 红包id| long
	 */
	public void get(Hero hero, Object[] datas){
		long id = (long)datas[0];
		DropRedPacketManager.getIns().get(hero, id);
	} 
	/**
	 * 打开记录界面 11377
	 * @param id| 红包id| long
	 */
	public void openRecordUI(Hero hero, Object[] datas){
		long id = (long)datas[0];
		DropRedPacketManager.getIns().openRecordUI(hero, id);
	} 
}