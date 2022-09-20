package com.teamtop.system.event.backstage.ex;

import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.hero.Hero;
/**
 * 测试事件YY<br/>
 * 包含登陆，服务器启动，一小时执行一次
 * @author Administrator
 *
 */
public class YYEvent extends AbsBackstageEvent{

	@Override
	public void login(int currTime, Hero hero) {
	}

	@Override
	public void executeOneHour(int currTime) {
	}

	@Override
	public void startServer() {
	}	
	
}	
