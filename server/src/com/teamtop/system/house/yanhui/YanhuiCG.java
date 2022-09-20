package com.teamtop.system.house.yanhui;
import com.teamtop.system.hero.Hero;

/**
 * YanhuiCG.java
 * 宴会
 */
public class YanhuiCG{

	private static YanhuiCG ins = null;

	public static YanhuiCG getIns(){
		if(ins == null){
			ins = new YanhuiCG();
		}
		return ins;
	}

	/**
	 * 打开宴会列表界面 11451
	 */
	public void openListUI(Hero hero, Object[] datas){
		YanhuiManager.getIns().openListUI(hero);
	} 
	/**
	 * 前往进入宴会场景 11453
	 */
	public void enterScene(Hero hero, Object[] datas){
		YanhuiManager.getIns().enterScene(hero);
	} 
	/**
	 * 赴宴 11455
	 * @param uid| 宴会唯一id| int
	 * @param type| 礼物类型| byte
	 */
	public void fuyan(Hero hero, Object[] datas){
		int uid = (int)datas[0];
		int type = (byte)datas[1];
		YanhuiManager.getIns().fuyan(hero, uid, type);
	} 
	/**
	 * 举办宴会 11457
	 * @param type| 宴会类型| byte
	 * @param accept| 是否接受普通赴宴礼物（0.接受 1.不接受）| byte
	 */
	public void juban(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int accept = (byte)datas[1];
		YanhuiManager.getIns().juban(hero, type, accept);
	} 
	/**
	 * 敬酒 11459
	 * @param id| 敬酒类型| byte
	 */
	public void jingjiu(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		YanhuiManager.getIns().jingjiu(hero, id);
	} 
	/**
	 * 敬酒领奖 11461
	 * @param id| 敬酒标识id| int
	 */
	public void lingjiang(Hero hero, Object[] datas){
		int id = (int)datas[0];
		YanhuiManager.getIns().lingjiang(hero, id);
	} 
	/**
	 * 开启比武 11463
	 * @param bossId| BOSSID| int
	 */
	public void kaiqiBiwu(Hero hero, Object[] datas){
		int bossId = (int)datas[0];
		YanhuiManager.getIns().kaiqiBiwu(hero, bossId);
	} 
	/**
	 * 邀请 11465
	 */
	public void yaoqing(Hero hero, Object[] datas){
		YanhuiManager.getIns().yaoqing(hero);
	} 
	/**
	 * 离开宴会场景 11467
	 */
	public void quit(Hero hero, Object[] datas){
		YanhuiManager.getIns().quit(hero);
	} 
	/**
	 * 挑战boss 11469
	 * @param bossId| boss ID| int
	 */
	public void battleboss(Hero hero, Object[] datas){
		int bossId = (int)datas[0];
		YanhuiManager.getIns().battleboss(hero, bossId);
	} 
	/**
	 * 前端通知boss挑战结果 11471
	 * @param battlerest| 1赢了 0输了| byte
	 * @param bossId| boss ID| int
	 */
	public void battlerest(Hero hero, Object[] datas){
		int battlerest = (byte)datas[0];
		int bossId = (int)datas[1];
		YanhuiManager.getIns().battlerest(hero, battlerest, bossId);
	} 
	/**
	 * 战斗结束后前端请求重新进入场景 11475
	 */
	public void backIntoScene(Hero hero, Object[] datas){
		YanhuiManager.getIns().backIntoScene(hero);
	} 
	/**
	 * 申请加入宴会 11479
	 * @param id| 宴会唯一id| int
	 * @param type| 1.申请 0.取消申请| byte
	 */
	public void shenqing(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int type = (byte)datas[1];
		YanhuiManager.getIns().shenqing(hero, id, type);
	} 
	/**
	 * 勾选申请 11481
	 * @param type| 0.无需申请 1.需申请（默认是0）| byte
	 */
	public void gouxuan(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		YanhuiManager.getIns().gouxuan(hero, type);
	} 
	/**
	 * 批准申请进宴会 11483
	 * @param type| -1.全部拒绝 0.拒绝 1.同意 2.全部同意| byte
	 * @param thid| 玩家id| long
	 */
	public void pizhunShenqing(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		long thid = (long)datas[1];
		YanhuiManager.getIns().pizhunShenqing(hero, type, thid);
	} 
}