package com.teamtop.system.crossTeamFuBen;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.activity.ativitys.doubleProduce.DoubleProduceFunction;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
/**
 * 跨服组队副本 客户端登陆事件
 */
public class CrossTeamFubenLoginEvent extends AbsCrossLoginEvent{
	private static CrossTeamFubenLoginEvent ins = null;

	public static CrossTeamFubenLoginEvent getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenLoginEvent();
		}
		return ins;
	}

	@Override
	public Channel localAsk(Hero hero, int type, List<Object[]> param) {
		return Client_2.getIns().getCrossChannel();
	}

	@Override
	public CrossSelectRoom crossSelectRoom(int type, String param) {
		return new CrossSelectRoom(1, GameProperties.cross_domainName_2, GameProperties.serverPort);
	}
	
	@Override
	public void crossAfterLoginSucc(Hero hero, int crossLoginRoomId) {
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		int excelID = crossTeamFuBen.getFristId();
		int teamID = crossTeamFuBen.getTeamID();
		if(teamID == 0){
			CrossTeamFubenManager.getIns().openUI(hero, excelID);
		}else {
			CrossTeamFubenManager.getIns().joinByTeamID(hero, teamID, 0);
		}
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		int fristId = crossTeamFuBen.getFristId();
		int timesBattled = crossTeamFuBen.getTimesBattled();
		int teamID = crossTeamFuBen.getTeamID();
		int awardsState = crossTeamFuBen.getAwardsState();
		int addTimes = crossTeamFuBen.getAddTimes();
		crossData.putObject( CrossEnum.data1, fristId);
		crossData.putObject( CrossEnum.data2, timesBattled);
		crossData.putObject( CrossEnum.data3, teamID);
		crossData.putObject( CrossEnum.DATA4, awardsState);
		crossData.putObject( CrossEnum.DATA5, DoubleProduceFunction.getIns().checkIsStart(hero));
		crossData.putObject(CrossEnum.DATA6, addTimes);
	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		Integer excelID = crossData.getObject( CrossEnum.data1, Integer.class);
		Integer timesBattled = crossData.getObject( CrossEnum.data2, Integer.class);
		Integer teamID = crossData.getObject( CrossEnum.data3, Integer.class);
		Integer awardsState = crossData.getObject( CrossEnum.DATA4, Integer.class);
		Boolean isDouble = crossData.getObject( CrossEnum.DATA5, Boolean.class);
		Integer addTimes = crossData.getObject(CrossEnum.DATA6, Integer.class);
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		if(crossTeamFuBen==null){
			crossTeamFuBen = new CrossTeamFuBen();
			hero.setCrossTeamFuBen(crossTeamFuBen);
		}
		crossTeamFuBen.setTimesBattled(timesBattled);
		crossTeamFuBen.setAddTimes(addTimes);
		crossTeamFuBen.setFristId(excelID);
		crossTeamFuBen.setTeamID(teamID);
		crossTeamFuBen.setAwardsState(awardsState);
		crossTeamFuBen.setDouble(isDouble);
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}
	
	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		int timesBattled = crossTeamFuBen.getTimesBattled();
		crossData.putObject( CrossEnum.data2, timesBattled);

		CrossTeamFubenManager.getIns().leave(hero);
		LogTool.info("crossLogout finish,hid:"+hero.getId()+" times:"+timesBattled, this);
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		//Integer timesBattled = crossData.getObject( CrossEnum.data2, Integer.class);
		//CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		//crossTeamFuBen.setTimesBattled(timesBattled);
	}
	
}
