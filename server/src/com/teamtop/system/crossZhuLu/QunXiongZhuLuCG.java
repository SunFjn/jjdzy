package com.teamtop.system.crossZhuLu;
import com.teamtop.system.hero.Hero;

/**
 * QunXiongZhuLuCG.java
 * 群雄逐鹿
 */
public class QunXiongZhuLuCG{

	private static QunXiongZhuLuCG ins = null;

	public static QunXiongZhuLuCG getIns(){
		if(ins == null){
			ins = new QunXiongZhuLuCG();
		}
		return ins;
	}

	/**
	 * 进入地图 8951
	 */
	public void enterMap(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().enterMap(hero);
	} 
	/**
	 * 打开排名界面 8953
	 */
	public void openRankUI(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().openRankUI(hero);
	} 
	/**
	 * 打开任务界面 8955
	 */
	public void openTaskUI(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().openTaskUI(hero);
	} 
	/**
	 * 打开宝库界面 8957
	 */
	public void openBaoKuUI(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().openBaoKuUI(hero);
	} 
	/**
	 * 打开战况界面 8959
	 */
	public void openRecord(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().openRecord(hero);
	} 
	/**
	 * 宝库兑换 8961
	 * @param goodsId| 商品id| int
	 */
	public void exchange(Hero hero, Object[] datas){
		int goodsId = (int)datas[0];
		QunXiongZhuLuManager.getIns().exchange(hero, goodsId);
	} 
	/**
	 * 领取任务奖励 8963
	 * @param taskId| 任务id| int
	 */
	public void getTaskReward(Hero hero, Object[] datas){
		int taskId = (int)datas[0];
		QunXiongZhuLuManager.getIns().getTaskReward(hero, taskId);
	} 
	/**
	 * 打开国家排名界面 8965
	 * @param countryId| 国家id| int
	 */
	public void openCountryRankUI(Hero hero, Object[] datas){
		int countryId = (int)datas[0];
		QunXiongZhuLuManager.getIns().openCountryRankUI(hero, countryId);
	} 
	/**
	 * 移动到某城池 8967
	 * @param cityId| 城池id| int
	 */
	public void move(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		QunXiongZhuLuManager.getIns().move(hero, cityId);
	} 
	/**
	 * 查看城池信息 8969
	 * @param cityId| 城池id| int
	 * @param page| 页码| int
	 */
	public void showCityInfo(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		int page = (int)datas[1];
		QunXiongZhuLuManager.getIns().showCityInfo(hero, cityId, page);
	} 
	/**
	 * 攻击/驻守城池 8971
	 * @param index| 攻击位置| int
	 */
	public void attack(Hero hero, Object[] datas){
		int index = (int)datas[0];
		QunXiongZhuLuManager.getIns().attack(hero, index);
	} 
	/**
	 * CG 前端发送战斗结果 8973
	 * @param result| 战斗结果0失败1成功2退出| byte
	 * @param index| 位置| int
	 */
	public void battleResult(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		int index = (int)datas[1];
		QunXiongZhuLuManager.getIns().battleResult(hero, result, index);
	} 
	/**
	 * CG 购买体力 8975
	 */
	public void buySta(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().buySta(hero);
	} 
	/**
	 * 查看驻守奖励信息 8977
	 */
	public void getDefendAwardInfo(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().getDefendAwardInfo(hero);
	} 
	/**
	 * 获取驻守奖励 8979
	 */
	public void gotDefendAward(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().gotDefendAward(hero);
	} 
	/**
	 * 打开个人排行 8983
	 */
	public void openPersonRankUI(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().openPersonRankUI(hero);
	} 
	/**
	 * 单枪匹马buff购买 8985
	 */
	public void buffBuy(Hero hero, Object[] datas){
		QunXiongZhuLuManager.getIns().buffBuy(hero);
	} 
}