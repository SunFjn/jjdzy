package com.teamtop.system.event.backstage.ex;

import com.teamtop.system.event.backstage.AbsBackstageEvent;
/**
 * XX后台测试事件<br/>
 * 包含8分钟同步和关闭服务器操作(通常为同步)
 * @author Administrator
 *
 */
public class XXEvent extends AbsBackstageEvent{

	@Override
	public void executeEightPre(int currTime) {
		System.err.println("8分钟保存一次");
	}

	@Override
	public void shutdownServer() {
		
	}

}
