package com.teamtop.system.house.yanhui.event;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yanhui.YanhuiConst;
import com.teamtop.system.house.yanhui.YanhuiFunction;
import com.teamtop.system.house.yanhui.YanhuiSender;
import com.teamtop.system.house.yanhui.cross.YanhuiEnum;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class YanhuiEvent extends AbsSystemEvent  {

	private static YanhuiEvent ins;
	public static YanhuiEvent getIns(){
		if(ins == null) {
			ins = new YanhuiEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
	}

	@Override
	public void login(Hero hero) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YANHUI)) return;
		//宴会开启推送图标
		boolean start = YanhuiFunction.getIns().isStart();
		if(start) {
			YanhuiSender.sendCmd_11472(hero.getId(), SystemIdConst.YANHUI, 1);
		}else {
			int hour = TimeDateUtil.getHour();
			if(hour>=YanhuiConst.START && hour <= YanhuiConst.END) {
				int minute = TimeDateUtil.getMinute();
				if(hour==YanhuiConst.END && minute>=YanhuiConst.MIN) {
				}else {
					YanhuiFunction.getIns().setStart(true);
					YanhuiSender.sendCmd_11472(hero.getId(), SystemIdConst.YANHUI, 1);
				}
			}
		}
		//宴会红点
		if(YanhuiFunction.getIns().isStart()) {
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(YanhuiEnum.hid.name(), hero.getId());
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_CROSSREDPOINT, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int id = crossData.getObject(YanhuiEnum.id.name(), Integer.class);
					YanhuiSender.sendCmd_11478(hero.getId(), id);//返回宴会id
					
					int state = crossData.getObject(YanhuiEnum.state.name(), Integer.class);
					if(state > 0) {
						if(state == 1) {
							//RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.YANHUI, RedPointConst.RED_1, RedPointConst.HAS_RED);
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YANHUI,RedPointConst.RED_1, RedPointConst.HAS_RED);
						}else {
							//可开启宴会boss红点
//							Struct_partyboss_298 struct_partyboss_298 = Config_partyboss_298.getIns().get(state);
//							if(struct_partyboss_298 != null) {
//								int[][] consume = struct_partyboss_298.getConsume();
//								if (UseAddUtil.canUse(hero, consume)) {
//									RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YANHUI,RedPointConst.RED_1, RedPointConst.HAS_RED);
//								}
//							}
						}
					}
				}
			});
		}
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if(cmdId == YanhuiConst.SHOW_ICON){
			//活动开启
			YanhuiFunction.getIns().setStart(true);
			YanhuiFunction.getIns().showAll(1);
		}else if(cmdId == YanhuiConst.HIDDEN_ICON){
			//关闭
			YanhuiFunction.getIns().setStart(false);
			YanhuiFunction.getIns().showAll(0);
		}
		LogTool.info("YanhuiEvent.fixTime cmdId:"+cmdId+" time:"+TimeDateUtil.printTime(now), this);
	}
	
	@Override
	public void logout(Hero hero){
		
	}

}
