package com.teamtop.system.tigerPass.cross;

import java.util.HashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.tigerPass.TigerPassConst;
import com.teamtop.system.tigerPass.TigerPassFunction;
import com.teamtop.system.tigerPass.TigerPassManager;
import com.teamtop.system.tigerPass.TigerPassSender;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class TigerPassLocalIO {
	
	private static TigerPassLocalIO ins;
	public static TigerPassLocalIO getIns(){
		if(ins == null) {
			ins = new TigerPassLocalIO();
		}
		return ins;
	}
	
	
	public void LTCjoinEmploy(Hero hero) {
		try {
			TigerPassEmployer tigerPassEmployer=new TigerPassEmployer();
			TigerPassFunction.getIns().makeTigerPassEmployer(tigerPassEmployer, hero);
			
			CrossData crossData = new CrossData();
			crossData.putObject(TigerPassEnum.employ, tigerPassEmployer);
		
			
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null || !channel.isOpen()) {
				TigerPassSender.sendCmd_8914(hero.getId(), 1);
				return;
			}
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.TIGER_JOIN_EMPLOY, hero.getId(), crossData);
			if(writeBlockData == null) {
				return;
			}
			Integer result = writeBlockData.getObject(TigerPassEnum.addemployresult,Integer.class);
            if (result==0) {
				//上传成功
            	hero.getTigerPass().setJoinEmploySate(1);
            	TigerPassSender.sendCmd_8914(hero.getId(), 0);
				return;
			}else {
				//已经存在
				TigerPassSender.sendCmd_8914(hero.getId(), 2);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, TigerPassLocalIO.class, "LTCjoinEmploy has wrong");
		}
	}
	/**
	 * 刷新列表
	 * @param hero
	 */
	public void LTCreshList(Hero hero) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(TigerPassEnum.hid, hero.getId());
			
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null || !channel.isOpen()) {
				TigerPassSender.sendCmd_8916(hero.getId(), 3);
				return;
			}
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.TIGER_RESH_EMPLOYLIST, hero.getId(), crossData);
			if(writeBlockData == null) {
				return;
			}
			Integer result = writeBlockData.getObject(TigerPassEnum.reshresult,Integer.class);
			
			if (result==0) {
		        HashMap<Long,TigerPassEmployer> employMap =  writeBlockData.getObject(TigerPassEnum.employMap,new TypeReference<HashMap<Long,TigerPassEmployer>>(){}.getType());
		        if (employMap!=null) {
		        	hero.getTigerPass().setTigerPassEmployers(employMap);
				}
		        if (employMap.size()==6) {
		        	//刷新成功
		        	Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.FRESH_COST);
		        	UseAddUtil.use(hero, struct_xtcs_004.getOther(), SourceGoodConst.RESH_TIGER, true, null);
		        	TigerPassManager.getIns().openemploy(hero);
		        	TigerPassSender.sendCmd_8916(hero.getId(), 0);
				}else {
					TigerPassManager.getIns().openemploy(hero);
					TigerPassSender.sendCmd_8916(hero.getId(), 4);
				}
				return;
			}else {
				//暂无佣兵
				TigerPassSender.sendCmd_8916(hero.getId(), 2);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassLocalIO.class, "LTCreshList has wrong");
		}
	}
	/**
	 * 雇佣此玩家
	 * @param hero
	 */
	public void chooseemploy(Hero hero,TigerPassEmployer choose,int[][] cost) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(TigerPassEnum.choosehid, choose.getHid());
			
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null || !channel.isOpen()) {
				TigerPassSender.sendCmd_8912(hero.getId(), 4, choose.getHid(), 0, 0, 0, 0, "");
				return;
			}
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.TIGER_CHOOSE_EMPLOY, hero.getId(), crossData);
			if(writeBlockData == null) {
				return;
			}
			Integer result = writeBlockData.getObject(TigerPassEnum.chooserest,Integer.class);
			Integer chooserestnum = writeBlockData.getObject(TigerPassEnum.chooserestnum,Integer.class);
			
			choose.setBechoosenum(chooserestnum);
			if (result==0) {
				UseAddUtil.use(hero, cost, SourceGoodConst.TIGER_CHOOSE_COST, true, null);
				//成功雇佣
				hero.getTigerPass().setChooseHid(choose.getHid());
				hero.getTigerPass().setChooseNum(hero.getTigerPass().getChooseNum()-1);
				TigerPassSender.sendCmd_8912(hero.getId(), 0, choose.getHid(), choose.getIcon(), choose.getFrame(), choose.getVip(), choose.getTotalStrength(), choose.getNameZoneid());
			}else {
				TigerPassSender.sendCmd_8912(hero.getId(), 2, choose.getHid(), 0, 0, 0, 0, "");
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassLocalIO.class, "chooseemploy has wrong");
		}
		
	}
	/**
	 * 被雇佣后发奖励
	 * @param channel
	 * @param crossData
	 */
	public void LRCbechooseReward(Channel channel, CrossData crossData) {
		Long employerhid = crossData.getObject(TigerPassEnum.hid,Long.class);
		MailFunction.getIns().sendMailWithFujianData2(employerhid, MailConst.TIGER_BECHOOSE_REWARD,new Object[] {MailConst.TIGER_BECHOOSE_REWARD}, TigerPassFunction.getIns().getTigerEmployReward());
	}

}
