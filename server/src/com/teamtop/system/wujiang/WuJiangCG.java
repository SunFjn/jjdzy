package com.teamtop.system.wujiang;
import com.teamtop.system.hero.Hero;

/**
 * WuJiangCG.java
 * 武将
 */
public class WuJiangCG{

	private static WuJiangCG ins = null;

	public static WuJiangCG getIns(){
		if(ins == null){
			ins = new WuJiangCG();
		}
		return ins;
	}

	/**
	 * CG 武将升阶 653
	 * @param type| 升阶方式0普通 1一键| byte
	 */
	public void upWuJie(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().upWuJie(hero, type);
	} 
	/**
	 * CG 获取武将信息 651
	 */
	public void getWuJiang(Hero hero, Object[] datas){
		WuJiangManager.getIns().getWuJiang(hero);
	} 
	/**
	 * CG 激活/升级技能 655
	 * @param index| 位置id 12345| byte
	 */
	public void jihuoSkill(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		WuJiangManager.getIns().jihuoSkill(hero, index);
	} 
	/**
	 * CG 武将激活 659
	 * @param type| 武将编号| byte
	 */
	public void jihuowj(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().jihuowj(hero, type);
	} 
	/**
	 * CG 升星武将 661
	 * @param type| 武将编号| byte
	 */
	public void upWJStar(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().upWJStar(hero, type);
	} 
	/**
	 * CG 使用武将丹药 663
	 * @param goalid| 0培养丹 1资质丹| byte
	 * @param type| 使用方式0 1颗 1一键| byte
	 */
	public void useDan(Hero hero, Object[] datas){
		int goalid = (byte)datas[0];
		int type = (byte)datas[1];
		WuJiangManager.getIns().useDan(hero, goalid, type);
	} 
	/**
	 * CG 一键穿将印 665
	 */
	public void wearWJEQ(Hero hero, Object[] datas){
		WuJiangManager.getIns().wearWJEQ(hero);
	} 
	/**
	 * CG 合成将印 667
	 * @param part| 位置| byte
	 */
	public void hechengJY(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		WuJiangManager.getIns().hechengJY(hero, part);
	} 
	/**
	 * CG 升级某部位将印 669
	 * @param part| 将印位置| byte
	 */
	public void upJY(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		WuJiangManager.getIns().upJY(hero, part);
	} 
	/**
	 * CG 分解将印 671
	 * @param uid| 装备唯一id| long
	 */
	public void decompose(Hero hero, Object[] datas){
		long uid = (long)datas[0];
		WuJiangManager.getIns().decompose(hero, uid);
	} 
	/**
	 * CG 切换出战武将 673
	 * @param type| 武将type| byte
	 */
	public void changeJob(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().changeJob(hero, type);
	} 
	/**
	 * CG 神将之力进阶 675
	 * @param wujiangid| 武将id| int
	 */
	public void wujiangStrUp(Hero hero, Object[] datas){
		int wujiangid = (int)datas[0];
		WuJiangManager.getIns().wujiangStrUp(hero, wujiangid);
	} 
	/**
	 * 获取神将信息 677
	 */
	public void getShenJiang(Hero hero, Object[] datas){
		WuJiangManager.getIns().getShenJiang(hero);
	} 
	/**
	 * 神将激活 679
	 * @param type| 神将编号| byte
	 */
	public void shenJiangJiHuo(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().shenJiangJiHuo(hero, type);
	} 
	/**
	 * 突破/升级神将等级 681
	 * @param type| 神将编号| byte
	 */
	public void upShenJiangLv(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().upShenJiangLv(hero, type);
	} 
	/**
	 * 升级神将天赋 683
	 * @param type| 神将编号| byte
	 */
	public void upShenJiangTf(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		WuJiangManager.getIns().upShenJiangTf(hero, type);
	} 
	/**
	 * 神将之力技能进阶 685
	 * @param type| 武将id| int
	 */
	public void generalSkillUp(Hero hero, Object[] datas){
		int type = (int)datas[0];
		WuJiangManager.getIns().generalSkillUp(hero, type);
	} 
}