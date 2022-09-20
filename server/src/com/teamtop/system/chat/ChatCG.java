package com.teamtop.system.chat;
import com.teamtop.system.hero.Hero;

/**
 * ChatCG.java
 * 聊天频道
 */
public class ChatCG{

	private static ChatCG ins = null;

	public static ChatCG getIns(){
		if(ins == null){
			ins = new ChatCG();
		}
		return ins;
	}

	/**
	 * 聊天频道聊天 451
	 * @param type| B(1跨服,2本服,3国家4系统)| byte
	 * @param msg| 内容| String
	 */
	public void chat(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		String msg = (String)datas[1];
		ChatManager.getIns().chat(hero, type, msg);
	} 
	/**
	 * CG 打开聊天界面获取数据 459
	 * @param type| 1跨服频道2本服频道3国家频道| byte
	 */
	public void openUI(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ChatManager.getIns().openUI(hero, type);
	} 
	/**
	 * CG 咨询客服 471
	 * @param content| 咨询内容| String
	 * @param tranid| 联运商id| int
	 */
	public void kefuRequest(Hero hero, Object[] datas){
		String content = (String)datas[0];
		int tranid = (int)datas[1];
		ChatManager.getIns().kefuRequest(hero, content, tranid);
	} 
	/**
	 * CG 添加黑名单 473
	 * @param hid| 拉黑玩家| long
	 * @param name| 名字| String
	 */
	public void addblack(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		String name = (String)datas[1];
		ChatManager.getIns().addblack(hero, hid, name);
	} 
	/**
	 * CG 取消拉黑 475
	 * @param hid| 取消拉黑| long
	 */
	public void minblack(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		ChatManager.getIns().minblack(hero, hid);
	} 
	/**
	 * CG 打开黑名单 477
	 */
	public void openBlack(Hero hero, Object[] datas){
		ChatManager.getIns().openBlack(hero);
	} 
	/**
	 * CG 聊天展示 481
	 * @param type| 类型（1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将9符文10兽灵装备展示11少主展示12专属神兵展示13专属神兵皮肤展示14异兽录展示15奇策展示16坐骑展示 17侍女 18坐骑幻化展示）| byte
	 * @param index| 要展示的索引id| int
	 */
	public void chatshow(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int index = (int)datas[1];
		ChatManager.getIns().chatshow(hero, type, index);
	} 
}