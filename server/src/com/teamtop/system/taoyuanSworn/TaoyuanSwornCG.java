package com.teamtop.system.taoyuanSworn;
import com.teamtop.system.hero.Hero;

/**
 * TaoyuanSwornCG.java
 * 桃园结义
 */
public class TaoyuanSwornCG{

	private static TaoyuanSwornCG ins = null;

	public static TaoyuanSwornCG getIns(){
		if(ins == null){
			ins = new TaoyuanSwornCG();
		}
		return ins;
	}

	/**
	 * CG 打开结义列表 3101
	 * @param page| 分页| int
	 */
	public void getInfos(Hero hero, Object[] datas){
		int page = (int)datas[0];
		TaoyuanSwornManager.getIns().getInfos(hero, page);
	} 
	/**
	 * CG 打开我的义盟 3103
	 */
	public void openMyGang(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().openMyGang(hero);
	} 
	/**
	 * CG 申请加入义盟 3105
	 * @param id| 义盟唯一id| long
	 */
	public void applyJoin(Hero hero, Object[] datas){
		long id = (long)datas[0];
		TaoyuanSwornManager.getIns().applyJoin(hero, id);
	} 
	/**
	 * CG 获取申请列表 3107
	 */
	public void getApplyMember(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().getApplyMember(hero);
	} 
	/**
	 * 批准申请 3109
	 * @param type| 1.同意 2拒绝 3全部拒绝| byte
	 * @param hid| 玩家id| long
	 */
	public void approvalApply(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		long hid = (long)datas[1];
		TaoyuanSwornManager.getIns().approvalApply(hero, type, hid);
	} 
	/**
	 * CG 取消申请加入义盟 3111
	 * @param id| 义盟id| long
	 */
	public void cancelApply(Hero hero, Object[] datas){
		long id = (long)datas[0];
		TaoyuanSwornManager.getIns().cancelApply(hero, id);
	} 
	/**
	 * CG 退出义盟 3113
	 */
	public void quit(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().quit(hero);
	} 
	/**
	 * CG 踢人 3115
	 * @param hid| 兄弟id| long
	 */
	public void expel(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		TaoyuanSwornManager.getIns().expel(hero, hid);
	} 
	/**
	 * CG 领取礼包 3117
	 * @param taskid| 任务id| int
	 * @param type|  1人礼包 2人礼包 3人礼包| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int taskid = (int)datas[0];
		int type = (byte)datas[1];
		TaoyuanSwornManager.getIns().getreward(hero, taskid, type);
	} 
	/**
	 * 转让大哥 3119
	 * @param hid| 对方id| long
	 */
	public void transfer(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		TaoyuanSwornManager.getIns().transfer(hero, hid);
	} 
	/**
	 * 申请大哥 3121
	 */
	public void applyBrother(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().applyBrother(hero);
	} 
	/**
	 * 招募兄弟 3123
	 */
	public void recruiting(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().recruiting(hero);
	} 
	/**
	 * 修改义盟名字 3125
	 * @param name| 义盟名字| String
	 */
	public void changeName(Hero hero, Object[] datas){
		String name = (String)datas[0];
		TaoyuanSwornManager.getIns().changeName(hero, name);
	} 
	/**
	 * 打开桃园BOSS界面 3131
	 */
	public void openTaoyuanBossUI(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().openTaoyuanBossUI(hero);
	} 
	/**
	 * 开启桃园BOSS 3133
	 * @param bossId| BOSS id | int
	 */
	public void chooseBoss(Hero hero, Object[] datas){
		int bossId = (int)datas[0];
		TaoyuanSwornManager.getIns().chooseBoss(hero, bossId);
	} 
	/**
	 * 领取桃园BOSS奖励 3135
	 */
	public void getBossReward(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().getBossReward(hero);
	} 
	/**
	 * 挑战BOSS 3137
	 */
	public void challengeBOSS(Hero hero, Object[] datas){
		TaoyuanSwornManager.getIns().challengeBOSS(hero);
	} 
	/**
	 * 创建义盟 3127
	 * @param name| 义盟名称| String
	 */
	public void create(Hero hero, Object[] datas){
		String name = (String)datas[0];
		TaoyuanSwornManager.getIns().create(hero, name);
	} 
	/**
	 * 通知/退出/复活桃园BOSS 0.退出 1复活 2通知后端本人死亡 3141
	 * @param type| 0.退出 1复活 2通知后端本人死亡| byte
	 */
	public void quitTaoyuanBoss(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		TaoyuanSwornManager.getIns().quitTaoyuanBoss(hero, type);
	} 
}