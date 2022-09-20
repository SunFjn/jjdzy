package com.teamtop.system.monsterSpirit;
import com.teamtop.system.hero.Hero;

/**
 * MonsterSpiritAwakeCG.java
 * 兽魂觉醒
 */
public class MonsterSpiritAwakeCG{

	private static MonsterSpiritAwakeCG ins = null;

	public static MonsterSpiritAwakeCG getIns(){
		if(ins == null){
			ins = new MonsterSpiritAwakeCG();
		}
		return ins;
	}

	/**
	 * 印记替换 5691
	 * @param type| 兽灵类型| byte
	 * @param site| 装备位置| short
	 */
	public void replace(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int site = (short)datas[1];
		MonsterSpiritManager.getIns().replace(hero, type, site);
	} 
	/**
	 * 一键升星 5693
	 * @param type| 兽灵类型1青龙2白虎3朱雀4玄武  | int
	 * @param site| 洗练装备位置| int
	 * @param star| 当前星级| int
	 */
	public void oneKeyWash(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int site = (int)datas[1];
		int star = (int)datas[2];
		MonsterSpiritManager.getIns().oneKeyWash(hero, type, site, star);
	} 
	/**
	 * 打开兽魂化形界面 5695
	 * @param type| 类型 1青龙2白虎3朱雀4玄武| byte
	 */
	public void openMsChange(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		MonsterSpiritManager.getIns().openMsChange(hero, type);
	} 
	/**
	 * 兽灵化形 5697
	 * @param type| 类型 1青龙2白虎3朱雀4玄武| byte
	 * @param modelId| 兽魂化形表的id| int
	 */
	public void msChange(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int modelId = (int)datas[1];
		MonsterSpiritManager.getIns().msChange(hero, type, modelId);
	} 
	/**
	 * 兽灵化形激活 5699
	 * @param type| 类型 1青龙2白虎3朱雀4玄武| byte
	 * @param modelId| 表的兽灵id| int
	 */
	public void msChangeFight(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int modelId = (int)datas[1];
		MonsterSpiritManager.getIns().msChangeFight(hero, type, modelId);
	} 
}