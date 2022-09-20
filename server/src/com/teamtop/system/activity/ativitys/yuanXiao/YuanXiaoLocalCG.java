package com.teamtop.system.activity.ativitys.yuanXiao;
import com.teamtop.system.hero.Hero;

/**
 * YuanXiaoLocalCG.java
 * 做元宵
 */
public class YuanXiaoLocalCG{

	private static YuanXiaoLocalCG ins = null;

	public static YuanXiaoLocalCG getIns(){
		if(ins == null){
			ins = new YuanXiaoLocalCG();
		}
		return ins;
	}

	/**
	 * CG 打开抢夺材料界面 11631
	 * @param type| 打卡某个材料抢夺界面| byte
	 */
	public void openBattle(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		YuanXiaoLocalManager.getIns().openBattle(hero, type);
	} 
	/**
	 * CG 请求掠夺 11633
	 * @param type| 目标材料对象| byte
	 * @param ghid| 目标id| long
	 */
	public void battleHid(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		long ghid = (long)datas[1];
		YuanXiaoLocalManager.getIns().battleHid(hero, type, ghid);
	} 
	/**
	 * CG刷新 11635
	 * @param type| 材料x（24 25 26）| byte
	 */
	public void refresh(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		YuanXiaoLocalManager.getIns().refresh(hero, type);
	} 
	/**
	 * CG 制作元宵 11637
	 */
	public void make(Hero hero, Object[] datas){
		YuanXiaoLocalManager.getIns().make(hero);
	} 
	/**
	 * CG 获取元宵免费材料 11639
	 */
	public void getCaiLiao(Hero hero, Object[] datas){
		YuanXiaoLocalManager.getIns().getCaiLiao(hero);
	} 
}