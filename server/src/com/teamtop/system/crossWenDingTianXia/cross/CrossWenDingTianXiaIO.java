package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaCache;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaFunction;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_wdtx_260;
import excel.config.Config_wdtxlzjl_260;
import excel.config.Config_wdtxpoint_260;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_wdtx_260;
import excel.struct.Struct_wdtxlzjl_260;
import excel.struct.Struct_wdtxpoint_260;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

/**
 * 子服和中央服通讯IO
 * @author Administrator
 *
 */
public class CrossWenDingTianXiaIO {
	private static CrossWenDingTianXiaIO ins = null;

	public static CrossWenDingTianXiaIO getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaIO();
		}
		return ins;
	}

	/**
	 * 获取所有子服服务器战力与区号
	 */
	public void getAllServerTop10StrengthCL(Channel channel,CrossData data){
		int cmd = CrossConst.CROSS_WEN_DING_TIAN_XIA_GET_TOP10_STR_CL;
//		if(GameProperties.gmFlag) {
//		}else {
			boolean isOpen = CrossWenDingTianXiaFunction.getIns().isOpen();
			if(!isOpen)
				return;
//		}
		
		boolean newServer = CrossWenDingTianXiaFunction.getIns().isNewServer();
		long rankTop10Strength = 0;
		if( !newServer) {//开服大于N天，就4个区一个房间
			rankTop10Strength = CrossWenDingTianXiaFunction.getIns().getRankTop10Strength();
		}
		
		int firstZoneId = GameProperties.getFirstZoneId();
		data.putObject( CrossEnum.totalStrength, rankTop10Strength);
		data.putObject(CrossEnum.time, GameProperties.serverOpenTime);
		data.putObject( CrossEnum.zoneid, firstZoneId);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	/**
	 * 通知子服活动开始
	 */
	public void sendBeginTimeAndStarCL(Channel channel,CrossData data){
		int cmd = CrossConst.CROSS_WEN_DING_TIAN_XIA_BEGIN_CL;
		Integer time = data.getObject( CrossEnum.time, Integer.class);
		Integer state = data.getObject( CrossEnum.data1, Integer.class);
		String nameYuXi = data.getObject( CrossEnum.data2, String.class);
		CrossWenDingTianXiaCrossCache.setEndTime(time);
		CrossWenDingTianXiaCache.setState(state);
		LogTool.info("CrossWenDingTianXiaIO sendBeginTimeAndStarCL state="+state+", time="+time, CrossWenDingTianXiaIO.class);
		
		if(state == CrossWenDingTianXiaConst.STATE_1) {
			ChatManager.getIns().broadCast(ChatConst.CROSS_WDTX_BIGEN, new Object[] {});
		}else if( state == CrossWenDingTianXiaConst.STATE_2&& nameYuXi!=null) {
			ChatManager.getIns().broadCast(ChatConst.CROSS_WDTX_END_YU_XI_HERO, new Object[] { nameYuXi});
		}else if(state == CrossWenDingTianXiaConst.STATE_2&& nameYuXi==null) {
			ChatManager.getIns().broadCast(ChatConst.CROSS_WDTX_END_NOT_YU_XI_HERO, new Object[] { });
		}
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
		while(iterator.hasNext()) {
			Entry<Long, Hero> next = iterator.next();
			Hero hero = next.getValue();
			CrossWenDingTianXiaFunction.getIns().checkRed(hero);
		}
	}
	
	/**
	 * 通知子服发放排行奖励
	 */
	public void sendRankAwardsCL(Channel channel,CrossData data){
		int cmd = CrossConst.CROSS_WEN_DING_TIAN_XIA_SEND_RANK_AWARDS_CL;
		long hid = data.getObject( CrossEnum.hid, Long.class);
		int rank = data.getObject( CrossEnum.data1, Integer.class);
		int type = data.getObject( CrossEnum.data2, Integer.class);
		int idExcel = data.getObject( CrossEnum.data3, Integer.class);

		if(type==CrossWenDingTianXiaConst.TYPE_AWARDS_0) {
			int zid = CommonUtil.getZoneIdById(hid);
			int[][] rankAwards = CrossWenDingTianXiaFunction.getIns().getRankAwards(rank, zid);
			MailFunction.getIns().sendMailWithFujianData2( hid, MailConst.MAIL_WDTX_RANK_AWARDS, new Object[] { MailConst.MAIL_WDTX_RANK_AWARDS, rank}, rankAwards);
			LogTool.info("SendRankAwardsCL rank.hid:"+hid+" rank:"+rank, this);
		}else if(type==CrossWenDingTianXiaConst.TYPE_AWARDS_1) {
			Struct_wdtxlzjl_260 excel = Config_wdtxlzjl_260.getIns().get(idExcel);
			int[][] reward = excel.getReward();
			MailFunction.getIns().sendMailWithFujianData2( hid, MailConst.MAIL_WDTX_BU_FA_AWARDS, new Object[] { MailConst.MAIL_WDTX_BU_FA_AWARDS}, reward);
			LogTool.info("SendRankAwardsCL kill.hid:"+hid+" rank:"+idExcel, this);
		}else if(type==CrossWenDingTianXiaConst.TYPE_AWARDS_2) {
			Struct_wdtx_260 excel = Config_wdtx_260.getIns().get( idExcel);
			boolean newServer = CrossWenDingTianXiaFunction.getIns().isNewServer();
			int[][] reward1 = null;
			if(newServer) {
				reward1 = excel.getReward1();
			}else {
				reward1 = excel.getReward2();
			}
			MailFunction.getIns().sendMailWithFujianData2( hid, MailConst.MAIL_WDTX_BU_FA_AWARDS, new Object[] { MailConst.MAIL_WDTX_BU_FA_AWARDS}, reward1);
			LogTool.info("SendRankAwardsCL layer.hid:"+hid+" rank:"+idExcel, this);
		}else if(type==CrossWenDingTianXiaConst.TYPE_AWARDS_3) {
			Struct_xtcs_004 xtcsExcel = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_YU_XI_AWARDS);
			MailFunction.getIns().sendMailWithFujianData2( hid, MailConst.MAIL_WDTX_SUPER_AWARDS, new Object[] { MailConst.MAIL_WDTX_SUPER_AWARDS}, xtcsExcel.getOther());
			LogTool.info("SendRankAwardsCL yuXi.hid:"+hid, this);
		}else if(type==CrossWenDingTianXiaConst.TYPE_AWARDS_4) {
			Struct_wdtxpoint_260 excel = Config_wdtxpoint_260.getIns().get( idExcel);
			MailFunction.getIns().sendMailWithFujianData2( hid, MailConst.MAIL_ID_WDTX_SCORE_AWARDS, new Object[] { MailConst.MAIL_ID_WDTX_SCORE_AWARDS}, excel.getReward());
			LogTool.info("SendRankAwardsCL score.hid:"+hid+" id:"+idExcel, this);
		}
	}
	
	/**
	 * GM开启活动
	 */
	public void gmLC(Channel channel,CrossData data){
		int cmd = CrossConst.CROSS_WEN_DING_TIAN_XIA_GM_GM_GM_LC;
		Integer cmdInt = data.getObject(CrossEnum.data1, Integer.class);
		CrossWenDingTianXiaCrossEvent.getIns().fixTime(cmdInt, 0);
		LogTool.info("WDTX.gmLC："+cmdInt, this);
	}

	/**
	 * 保存MVP数据
	 */
	public void saveMvpCL(Channel channel,CrossData data){
		int cmd = CrossConst.CROSS_WEN_DING_TIAN_XIA_SAVE_MVP_CL;
		String nameMvp = data.getObject(CrossEnum.data1, String.class);

		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WDTX_MVP);
		globalData.setContent(nameMvp);
	}
	
	
}
