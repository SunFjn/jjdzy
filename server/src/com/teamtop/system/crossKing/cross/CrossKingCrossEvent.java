package com.teamtop.system.crossKing.cross;

import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

/**
 * 最强王者跨服事件
 * @author lobbyer
 * @date 2016年8月20日
 */
public class CrossKingCrossEvent extends AbsSystemEvent {
	
	private static CrossKingCrossEvent ins;
	public static CrossKingCrossEvent getIns(){
		if(ins == null) {
			ins = new CrossKingCrossEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void fixTime(int cmdId, int now) {
		CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
		if(cmdId == 1) {//开启
			if(info != null && info.getState() == CrossKingConst.STATE_START){
				LogTool.warn("CrossKing fixTime start cmdId:"+cmdId+" but infoState is:"+info.getState(),CrossKingCrossEvent.class);
				return;
			}else{
				CrossKingCrossFunction.getIns().start();
			}
		}else if(cmdId == 2) {//关闭
			if(info != null && info.getState() != CrossKingConst.STATE_START){
				LogTool.warn("CrossKing fixTime end cmdId:"+cmdId+" but infoState is:"+info.getState(),CrossKingCrossEvent.class);
				return;
			}else{
				CrossKingCrossFunction.getIns().end();
			}
		}else if (cmdId==3) {//遍历正在战斗的集合
			CrossKingCrossFunction.getIns().checkBattleMap();
		}
	}
	@Override
	public void loginReset(Hero hero, int now) {
	}
	@Override
	public void zeroHero(Hero hero, int now) {
		
	}
	

}
