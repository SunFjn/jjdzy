package com.teamtop.cross;

import com.teamtop.system.hero.Hero;

import io.netty.channel.Channel;

/**
 * CrossCG.java
 * 连接中央服
 */
public class CrossCG{

	private static CrossCG ins = null;

	public static CrossCG getIns(){
		if(ins == null){
			ins = new CrossCG();
		}
		return ins;
	}

	/**
	 * CG 请求登陆跨服 1663
	 * @param heroid| hid| long
	 */
	public void loginCross(Channel channel, Object[] datas){
		long heroid = (long)datas[0];
		CrossManager.getIns().loginCross(channel,  heroid);
	}  
	/**
	 * 跨服心跳包 1667
	 */
	public void crossHeart(Hero hero, Object[] datas){
		CrossManager.getIns().crossHeart(hero);
	} 
}