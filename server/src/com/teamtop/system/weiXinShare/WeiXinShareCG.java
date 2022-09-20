package com.teamtop.system.weiXinShare;
import com.teamtop.system.hero.Hero;

/**
 * WeiXinShareCG.java
 * 微信分享
 */
public class WeiXinShareCG{

	private static WeiXinShareCG ins = null;

	public static WeiXinShareCG getIns(){
		if(ins == null){
			ins = new WeiXinShareCG();
		}
		return ins;
	}

	/**
	 * 打开界面 7751
	 */
	public void openUI(Hero hero, Object[] datas){
		WeiXinShareManager.getIns().openUI(hero);
	} 
	/**
	 * 完成分享 7753
	 */
	public void completeShare(Hero hero, Object[] datas){
		WeiXinShareManager.getIns().completeShare(hero);
	} 
	/**
	 * 获取第一次分享奖励 7755
	 */
	public void getFirstShareAward(Hero hero, Object[] datas){
		WeiXinShareManager.getIns().getFirstShareAward(hero);
	} 
	/**
	 * 抽奖 7757
	 */
	public void draw(Hero hero, Object[] datas){
		WeiXinShareManager.getIns().draw(hero);
	} 
	/**
	 * 获取累计分享奖励 7759
	 * @param cfgId| 配置id| int
	 */
	public void getCumulativeAward(Hero hero, Object[] datas){
		int cfgId = (int)datas[0];
		WeiXinShareManager.getIns().getCumulativeAward(hero, cfgId);
	} 
	/**
	 * 打开分享豪礼界面 7761
	 */
	public void openShareUI(Hero hero, Object[] datas){
		WeiXinShareManager.getIns().openShareUI(hero);
	} 
	/**
	 * 获取好友数量奖励 7763
	 */
	public void getNumberAward(Hero hero, Object[] datas){
		WeiXinShareManager.getIns().getNumberAward(hero);
	} 
	/**
	 * 获取好友等级奖励 7765
	 * @param friendHid| 好友hid| long
	 */
	public void getLevelAward(Hero hero, Object[] datas){
		long friendHid = (long)datas[0];
		WeiXinShareManager.getIns().getLevelAward(hero, friendHid);
	} 
	/**
	 * 获取红包奖励 7767
	 * @param index| index| int
	 */
	public void getHongBaoAward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		WeiXinShareManager.getIns().getHongBaoAward(hero, index);
	} 
}