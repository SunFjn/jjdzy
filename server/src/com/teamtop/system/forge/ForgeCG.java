package com.teamtop.system.forge;
import com.teamtop.system.hero.Hero;

/**
 * ForgeCG.java
 * 锻造
 */
public class ForgeCG{

	private static ForgeCG ins = null;

	public static ForgeCG getIns(){
		if(ins == null){
			ins = new ForgeCG();
		}
		return ins;
	}

	/**
	 * CG 强化 553
	 * @param id| 要强化的位置| byte
	 */
	public void strengthen(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		ForgeManager.getIns().strengthen(hero, id);
	} 
	/**
	 * CG 宝石镶嵌 555
	 * @param part| 装备部位| byte
	 * @param index| 宝石位置| byte
	 * @param baoshi| 宝石id| int
	 */
	public void gem(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		int index = (byte)datas[1];
		int baoshi = (int)datas[2];
		ForgeManager.getIns().gem(hero, part, index, baoshi);
	} 
	/**
	 * CG 获取装备锻造信息 551
	 */
	public void getForges(Hero hero, Object[] datas){
		ForgeManager.getIns().getForges(hero);
	} 
	/**
	 * CG 拆除宝石 557
	 * @param part| 装备位置| byte
	 * @param index| 宝石位置| byte
	 * @param baoshiid| 宝石id| int
	 */
	public void chaiBaoShi(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		int index = (byte)datas[1];
		int baoshiid = (int)datas[2];
		ForgeManager.getIns().chaiBaoShi(hero, part, index, baoshiid);
	} 
	/**
	 * CG 在背包内合成 559
	 * @param baoshiId| 目标宝石id| int
	 */
	public void hechengbag(Hero hero, Object[] datas){
		int baoshiId = (int)datas[0];
		ForgeManager.getIns().hechengbag(hero, baoshiId);
	} 
	/**
	 * CG 合成宝石在装备上 561
	 * @param baoshi| 宝石id| int
	 * @param part| 装备位置| byte
	 * @param index| 宝石位置| byte
	 */
	public void hecheng(Hero hero, Object[] datas){
		int baoshi = (int)datas[0];
		int part = (byte)datas[1];
		int index = (byte)datas[2];
		ForgeManager.getIns().hecheng(hero, baoshi, part, index);
	} 
	/**
	 * CG 一键镶嵌 563
	 * @param index| 装备部位| byte
	 */
	public void oneKeyBao(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		ForgeManager.getIns().oneKeyBao(hero, index);
	} 
	/**
	 * CG 升星 565
	 * @param part| 装备位置| byte
	 */
	public void upStar(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		ForgeManager.getIns().upStar(hero, part);
	} 
	/**
	 * CG 铸魂单次铸魂 567
	 * @param type| 铸魂类型0 1 2| byte
	 * @param part| 部位| byte
	 */
	public void zhuHun(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int part = (byte)datas[1];
		ForgeManager.getIns().zhuHun(hero, type, part);
	} 
	/**
	 * CG 噬魂 569
	 * @param index| 第几种噬魂| byte
	 * @param type| 1单次噬魂 2一键噬魂| byte
	 */
	public void shihun(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		int type = (byte)datas[1];
		ForgeManager.getIns().shihun(hero, index, type);
	} 
	/**
	 * CG 一键强化 571
	 */
	public void oneKeyStre(Hero hero, Object[] datas){
		ForgeManager.getIns().oneKeyStre(hero);
	} 
	/**
	 * CG 一键铸魂 573
	 * @param part| 部位| byte
	 * @param type| 方式低 中 高| byte
	 */
	public void oneKeyZhuHun(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		int type = (byte)datas[1];
		ForgeManager.getIns().oneKeyZhuHun(hero, part, type);
	} 
	/**
	 * CG 一键合成宝石 575
	 * @param sysid| 宝石系统id| int
	 */
	public void oneKeyHeBao(Hero hero, Object[] datas){
		int sysid = (int)datas[0];
		ForgeManager.getIns().oneKeyHeBao(hero, sysid);
	} 
	/**
	 * 套装升阶 577
	 * @param upSuit| 1强化套装2宝石套装3升星套装| byte
	 */
	public void suitUpgrade(Hero hero, Object[] datas){
		int upSuit = (byte)datas[0];
		ForgeManager.getIns().suitUpgrade(hero, upSuit);
	} 
	/**
	 * 完美升星 579
	 * @param part| 装备部位| byte
	 */
	public void perUpStar(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		ForgeManager.getIns().perUpStar(hero, part);
	} 
	/**
	 * CG 获取转生装备炼魂大师等级经验 583
	 */
	public void lHDaShiLv(Hero hero, Object[] datas){
		ForgeManager.getIns().lHDaShiLv(hero);
	} 
	/**
	 * CG 提升炼魂大师 585
	 */
	public void addLHDaShiLv(Hero hero, Object[] datas){
		ForgeManager.getIns().addLHDaShiLv(hero);
	} 
	/**
	 * CG 增加某件转生装备炼魂等级 587
	 * @param part| 装备位置| byte
	 * @param type| 炼魂方式| byte
	 */
	public void addLHLv(Hero hero, Object[] datas){
		int part = (byte)datas[0];
		int type = (byte)datas[1];
		ForgeManager.getIns().addLHLv(hero, part, type);
	} 
}