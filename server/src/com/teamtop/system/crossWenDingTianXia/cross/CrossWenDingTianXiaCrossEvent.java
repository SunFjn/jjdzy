package com.teamtop.system.crossWenDingTianXia.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 */
public class CrossWenDingTianXiaCrossEvent extends AbsSystemEvent {
	private static CrossWenDingTianXiaCrossEvent ins;
	public static CrossWenDingTianXiaCrossEvent getIns(){
		if(ins == null) {
			ins = new CrossWenDingTianXiaCrossEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void loginReset(Hero hero, int now) {
		super.loginReset(hero, now);
	}

	@Override
	public void logout(Hero hero) {
	}

	@Override
	public void fixTime(int cmdId, int now) {
		now = TimeDateUtil.getCurrentTime();
//		周x 19:28  上传战力进行排行
//		周x 19:29  开始匹配
//		周x 19:30-19:50  通知子服开放入口，开打
//		周x 19:50  通知子服关闭入口，结束
//		int week = TimeDateUtil.getWeek();//子服判断，新服特殊处理，开GM功能的区，无视特殊需求
//		if(week==1||week==3||week==5||week==7) {
//			return;
//		}
		LogTool.info("WDTX.FixTime bigan.cmd:"+cmdId, this);
		if( cmdId==1){
			//刷新子服状态
			CrossWenDingTianXiaCrossFunction.getIns().resetState();
		}else if( cmdId==2){
			//上传战力进行排行
			CrossWenDingTianXiaCrossToLocal.getIns().getAllServerTop10StrengthCL();
		}else if( cmdId==3){
			//开始匹配
			CrossWenDingTianXiaCrossFunction.getIns().initRoomByStrengthAndZID();
		}else if( cmdId==4){
			//活动开启
			CrossWenDingTianXiaCrossFunction.getIns().begin();
		}else if( cmdId==5){
			//活动结束
			CrossWenDingTianXiaCrossFunction.getIns().end();
		}
		LogTool.info("WDTX.FixTime.cmd:"+cmdId, this);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
	}

	@Override
	public void zeroPub(int now) {
	}
}
