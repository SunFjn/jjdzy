package com.teamtop.system.crossKing.local;
import com.teamtop.system.hero.Hero;

/**
 * CrossKingCG.java
 * 乱世枭雄(跨服王者)
 */
public class CrossKingCG{

	private static CrossKingCG ins = null;

	public static CrossKingCG getIns(){
		if(ins == null){
			ins = new CrossKingCG();
		}
		return ins;
	}

	/**
	 * CG申请面板数据（可以用于实时同步 1870返回） 1861
	 */
	public void openUi(Hero hero, Object[] datas){
		CrossKingManager.getIns().openUi(hero);
	} 
	/**
	 * CG 购买挑战次数 1863
	 * @param num| 购买次数| byte
	 */
	public void buyTimes(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		CrossKingManager.getIns().buyTimes(hero, num);
	} 
	/**
	 * GC 挑战对手 1865
	 * @param type| 挑战类型1普通2晋级| byte
	 * @param index| 对手索引（1-3）| int
	 * @param id| 对手id| long
	 */
	public void challenge(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int index = (int)datas[1];
		long id = (long)datas[2];
		CrossKingManager.getIns().challenge(hero, type, index, id);
	} 
	/**
	 * CG 战斗结束通知后端 1869
	 * @param brest| 0失败 1胜利| byte
	 */
	public void getBattleReward(Hero hero, Object[] datas){
		int brest = (byte)datas[0];
		CrossKingManager.getIns().getBattleReward(hero, brest);
	} 
	/**
	 * CG 获取晋级对手信息 1871
	 */
	public void getJingJi(Hero hero, Object[] datas){
		CrossKingManager.getIns().getJingJi(hero);
	} 
	/**
	 * CG 换一批 返回（1862，1872） 1873
	 * @param type| 0普通换一批1晋级挑战换一批| byte
	 */
	public void changeRanks(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CrossKingManager.getIns().changeRanks(hero, type);
	} 
	/**
	 * CG 打开排行榜 1875
	 * @param dw| 段位| byte
	 */
	public void openRanks(Hero hero, Object[] datas){
		int dw = (byte)datas[0];
		CrossKingManager.getIns().openRanks(hero, dw);
	} 
	/**
	 * CG 打开战报 1877
	 */
	public void openHis(Hero hero, Object[] datas){
		CrossKingManager.getIns().openHis(hero);
	} 
	/**
	 * CG 打开积分奖励 1879
	 */
	public void openRewards(Hero hero, Object[] datas){
		CrossKingManager.getIns().openRewards(hero);
	} 
	/**
	 * CG 领取积分奖励 1881
	 * @param index| 领取奖励| byte
	 */
	public void getjfreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		CrossKingManager.getIns().getjfreward(hero, index);
	} 
	/**
	 * CG 打开枭雄商店 1883
	 */
	public void openShop(Hero hero, Object[] datas){
		CrossKingManager.getIns().openShop(hero);
	} 
	/**
	 * CG 购买乱世商城商品 1885
	 * @param itemId| 商品id| byte
	 */
	public void buyItem(Hero hero, Object[] datas){
		int itemId = (byte)datas[0];
		CrossKingManager.getIns().buyItem(hero, itemId);
	} 
	/**
	 * CG 点开战报 1889
	 */
	public void openbao(Hero hero, Object[] datas){
		CrossKingManager.getIns().openbao(hero);
	} 
	/**
	 * 扫荡 1893
	 * @param beChaId| 扫荡玩家的id| long
	 */
	public void mopUpHandle(Hero hero, Object[] datas){
		long beChaId = (long)datas[0];
		CrossKingManager.getIns().mopUpHandle(hero, beChaId);
	} 
}