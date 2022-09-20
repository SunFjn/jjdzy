package com.teamtop.util.log;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

/**
 * 流水的日志工具事件类
 * @author hepl
 *
 */
public class LogFlowEvent extends AbsSystemEvent {
	private static LogFlowEvent ins = null;
	
	public static LogFlowEvent getIns(){
		if(ins == null){
			ins = new LogFlowEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		//不处理
		
	}

	@Override
	public void login(Hero hero) {
		//不处理
		
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if(cmdId == 1){
			//定时删除一个月前的日志
			LogFlowUtil.deleteOldLog(now);
			//定时删除两天前的zip压缩文件
			LogFlowUtil.deleteOldZipLog(now);
		}
	}

}
