package com.teamtop.system.hero;
import com.teamtop.system.hero.Hero;

import io.netty.channel.Channel;

/**
 * HeroCG.java
 * Hero
 */
public class HeroCG{

	private static HeroCG ins = null;

	public static HeroCG getIns(){
		if(ins == null){
			ins = new HeroCG();
		}
		return ins;
	}

	/**
	 * 登陆 101
	 * @param loginData| 登陆信息 json数据| String
	 * @throws Exception 
	 */
	public void login(Channel channel, Object[] datas) throws Exception{
		String loginData = (String)datas[0];
		HeroManager.getIns().login(channel, loginData);
	} 
	/**
	 * 客户端加载数据已经准备好，申请服务端初始数据 103
	 */
	public void loadAlready(Hero hero, Object[] datas){
		HeroManager.getIns().loadAlready(hero);
	} 
	/**
	 * 创建账号 105
	 * @param job| 职业| byte
	 * @param name| 名字| String
	 */
	public void create(Channel channel, Object[] datas){
		int job = (byte)datas[0];
		String name = (String)datas[1];
		HeroManager.getIns().create(channel, job, name);
	} 
	/**
	 * 转生提升 113
	 */
	public void rebornUp(Hero hero, Object[] datas){
		HeroManager.getIns().rebornUp(hero);
	} 
	/**
	 * 请求附近玩家数据 131
	 */
	public void askSceneHeros(Hero hero, Object[] datas){
		HeroManager.getIns().askSceneHeros(hero);
	} 
	/**
	 * CG 创建角色界面加载完毕 133
	 */
	public void inCreateRoleUI(Channel channel, Object[] datas){
		HeroManager.getIns().inCreateRoleUI(channel);
	} 
	/**
	 * 请求充值 135
	 * @param type| 充值类型（1：充值界面充值，2：特权卡）| int
	 * @param id| 对应充值项id| int
	 * @param param| 特殊参数(供前后端数据定制使用)| String
	 */
	public void requestRecharge(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int id = (int)datas[1];
		String param = (String)datas[2];
		HeroManager.getIns().requestRecharge(hero, type, id, param);
	} 
	/**
	 * 打开充值界面 137
	 */
	public void openRecharge(Hero hero, Object[] datas){
		HeroManager.getIns().openRecharge(hero);
	} 
	/**
	 * 前端请求改名 143
	 * @param name| 要修改的名字| String
	 */
	public void changeName(Hero hero, Object[] datas){
		String name = (String)datas[0];
		HeroManager.getIns().changeName(hero, name);
	} 
	/**
	 * 玩家设置修改 147
	 * @param key| key| String
	 * @param value| value| String
	 */
	public void cG_PLAYERSETTING(Hero hero, Object[] datas){
		String key = (String)datas[0];
		String value = (String)datas[1];
		HeroManager.getIns().cG_PLAYERSETTING(hero, key, value);
	} 
	/**
	 * 操作造成伤害 149
	 * @param index| 操作编号| int
	 * @param num| 数量| int
	 */
	public void operateDamage(Hero hero, Object[] datas){
		int index = (int)datas[0];
		int num = (int)datas[1];
		HeroManager.getIns().operateDamage(hero, index, num);
	} 
	/**
	 * 操作技能或道具改编战力 151
	 * @param index| 编号| int
	 * @param num| 数量| int
	 */
	public void operateStrength(Hero hero, Object[] datas){
		int index = (int)datas[0];
		int num = (int)datas[1];
		HeroManager.getIns().operateStrength(hero, index, num);
	} 
	/**
	 * CG 获取官衔 153
	 */
	public void getGuan(Hero hero, Object[] datas){
		HeroManager.getIns().getGuan(hero);
	} 
	/**
	 * CG 升级官衔 155
	 */
	public void upGuan(Hero hero, Object[] datas){
		HeroManager.getIns().upGuan(hero);
	} 
	/**
	 * 获取福利大厅公告 169
	 */
	public void getWelfareNotice(Hero hero, Object[] datas){
		HeroManager.getIns().getWelfareNotice(hero);
	}
	/**
	 * CG 登录状态流水 171
	 * @param state| 1创角开始 2结束创角 3加在公共资源 4加载配置 5 预加载 6过场动画 7正式进入第一关| byte
	 */
	public void loginstate(Channel channel, Object[] datas){
		int state = (byte)datas[0];
		HeroManager.getIns().loginstate(channel, state);
	}
	/**
	 * CG 点开更新公告 173
	 */
	public void openupdate(Hero hero, Object[] datas){
		HeroManager.getIns().openupdate(hero);
	} 
}