package com.teamtop.system.mount;
import com.teamtop.system.hero.Hero;

/**
 * MountCG.java
 * 坐骑
 */
public class MountCG{

	private static MountCG ins = null;

	public static MountCG getIns(){
		if(ins == null){
			ins = new MountCG();
		}
		return ins;
	}

	/**
	 * 打开坐骑界面 11021
	 */
	public void openMountUI(Hero hero, Object[] datas){
		MountManager.getIns().openMountUI(hero);
	} 
	/**
	 * 骑乘 11023
	 * @param mountId| 坐骑id(0.取消骑乘)| int
	 */
	public void ride(Hero hero, Object[] datas){
		int mountId = (int)datas[0];
		MountManager.getIns().ride(hero, mountId);
	} 
	/**
	 * 激活或升星 11025
	 * @param mountId| 坐骑id| int
	 */
	public void upStar(Hero hero, Object[] datas){
		int mountId = (int)datas[0];
		MountManager.getIns().upStar(hero, mountId);
	} 
	/**
	 * 坐骑升级 11027
	 * @param mountId| 坐骑id| int
	 */
	public void upMountLv(Hero hero, Object[] datas){
		int mountId = (int)datas[0];
		MountManager.getIns().upMountLv(hero, mountId);
	} 
	/**
	 * 打开坐骑幻化界面 11029
	 */
	public void openMountUnrealUI(Hero hero, Object[] datas){
		MountManager.getIns().openMountUnrealUI(hero);
	} 
	/**
	 * 骑乘(幻化) 11031
	 * @param mountId| 坐骑id(0.取消骑乘)| int
	 */
	public void rideUnreal(Hero hero, Object[] datas){
		int mountId = (int)datas[0];
		MountManager.getIns().rideUnreal(hero, mountId);
	} 
	/**
	 * 激活坐骑(幻化) 11033
	 * @param mountId| 坐骑id| int
	 */
	public void activation(Hero hero, Object[] datas){
		int mountId = (int)datas[0];
		MountManager.getIns().activation(hero, mountId);
	} 
	/**
	 * 坐骑幻化升阶 11035
	 * @param mountId| 坐骑id| int
	 */
	public void upMountUnrealLv(Hero hero, Object[] datas){
		int mountId = (int)datas[0];
		MountManager.getIns().upMountUnrealLv(hero, mountId);
	} 
}