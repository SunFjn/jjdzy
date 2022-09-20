package com.teamtop.system.cdkey.cross;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.cdkey.CDkeyCache;
import com.teamtop.system.cdkey.CDkeyConst;
import com.teamtop.system.cdkey.CDkeyDao;
import com.teamtop.system.cdkey.CDkeyManager;
import com.teamtop.system.cdkey.model.CDkeyData;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_jhm_721;
import excel.struct.Struct_jhm_721;
import io.netty.channel.Channel;

public class CDkeyIO {
	private static CDkeyIO ins = null;

	public static CDkeyIO getIns() {
		if (ins == null) {
			ins = new CDkeyIO();
		}
		return ins;
	}

	private CDkeyIO() {
	}

	/**
	 * 子服向后台中央服发送验证激活码请求
	 * 
	 * @param hero
	 * @param cdkey
	 */
	public void getCDkeyAward(Hero hero, String cdkey) {
		Channel channel = Client_1.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CDkeyEnum.cdkey, cdkey);
		crossData.putObject(CDkeyEnum.pf, hero.getPf());
		crossData.putObject(CDkeyEnum.gainCDkeyRecordMap, hero.getCdkey().getGainCDkeyRecordMap());
		crossData.putObject(CDkeyEnum.commCDkeyMap, hero.getCdkey().getCommCDkeyMap());

		NettyWrite.writeXData(channel, CrossConst.GETCDKEYAWARD, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
//					String openid = (String) crossData.getObject(BlackListEnum.openid, String.class);
//					Integer zoneid = (Integer) crossData.getObject(BlackListEnum.zoneid, Integer.class);
				int state = (Integer) crossData.getObject(CDkeyEnum.state, Integer.class);
				CDkeyData cdkeyData = new CDkeyData();
				cdkeyData.setCdkey(cdkey);
				if (state == CDkeyConst.CROSS_STATE_SUCCESS) {
					int type = (Integer) crossData.getObject(CDkeyEnum.type, Integer.class);
					cdkeyData.setType(type);
				}
				try {
					CDkeyManager.getIns().getCDkeyAwardCallback(hero, state, cdkeyData);
				} catch (Exception e) {
					LogTool.error(e, CDkeyIO.class, "CDkeyIO getCDkeyAward callBack error!");
				}
			}
		});
	}

	/**
	 * 后台中央服验证激活码并返回子服回调
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void checkCDkey(Channel channel, CrossData crossData) {
		String cdkey = (String) crossData.getObject(CDkeyEnum.cdkey, String.class);
		
		Type classType = new TypeReference<Map<Integer, Integer>>() {}.getType();
		Map<Integer, Integer> gainCDkeyRecordMap = (Map<Integer, Integer>) crossData
				.getObject(CDkeyEnum.gainCDkeyRecordMap, classType);
		
		Type classType1 = new TypeReference<Map<Integer, Set<String>>>() {}.getType();
		Map<Integer, Set<String>> commCDkeyMap = (Map<Integer, Set<String>>) crossData
				.getObject(CDkeyEnum.commCDkeyMap, classType1);
		
		String pf = crossData.getObject(CDkeyEnum.pf, String.class);
		try {
			CDkeyData cdkeyData = CDkeyCache.getCdkeyCacheMap().get(cdkey);
			if (cdkeyData == null) {// 激活码有误
				crossData.putObject(CDkeyEnum.state, CDkeyConst.CROSS_STATE_FAULT);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			int type = cdkeyData.getType();

			Set<String> set = commCDkeyMap.get(type);
			if (set != null && set.contains(cdkey)) {
				crossData.putObject(CDkeyEnum.state, CDkeyConst.CROSS_STATE_HAD_USED);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			Map<Integer, String[]> configCdkeyMap = CDkeyCache.getConfigCdkeyMap();
			String[] qudaoArray = configCdkeyMap.get(type);
			String qudaoArrayStr = JSON.toJSONString(qudaoArray);
			LogTool.info("cdkey :" + cdkey + " qudaoArrayStr:" + qudaoArrayStr, CDkeyIO.class);
			String[] pfs = pf.split("\\-");
			String Bigpf = pfs[0];
			LogTool.info("cdkey :" + cdkey + " Bigpf :" + Bigpf + " pf:" + pf, CDkeyIO.class);

			if (!CommonUtil.isArrayContainObj(qudaoArray, Bigpf, "\\-", 0)) {
				crossData.putObject(CDkeyEnum.state, CDkeyConst.CROSS_STATE_FAULT);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			Struct_jhm_721 struct_jhm_721 = Config_jhm_721.getIns().get(type);
			int tongma = struct_jhm_721.getTongma();
			if (tongma != CDkeyConst.COMM_TYPE) {
				if (cdkeyData.getIsUsed() == CDkeyConst.USED) {// 激活码已被使用
					crossData.putObject(CDkeyEnum.state, CDkeyConst.CROSS_STATE_USED);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}
			}
			int currentTime = TimeDateUtil.getCurrentTime();

			String startTimeStr = struct_jhm_721.getTime1();
			String endTimeStr = struct_jhm_721.getTime2();
			int startTime = TimeDateUtil.getTimeIntByStrTime(startTimeStr, "yyyy-MM-dd hh:mm:ss");
			int endTime = TimeDateUtil.getTimeIntByStrTime(endTimeStr, "yyyy-MM-dd hh:mm:ss");
			if (currentTime < startTime && currentTime > endTime) {// 激活码已过期
				crossData.putObject(CDkeyEnum.state, CDkeyConst.CDKEY_STATE_OUTOFDATE);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if (!gainCDkeyRecordMap.containsKey(type)) {
				gainCDkeyRecordMap.put(type, 0);
			}
			int sameTypeGainNum = gainCDkeyRecordMap.get(type);
			int maxNum = struct_jhm_721.getMax();
			if (tongma != CDkeyConst.COMM_TYPE && sameTypeGainNum >= maxNum) {// 同类型激活码领取达到上限
				crossData.putObject(CDkeyEnum.state, CDkeyConst.CROSS_STATE_GAINLIMIT);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			crossData.putObject(CDkeyEnum.type, type);
			crossData.putObject(CDkeyEnum.state, CDkeyConst.CROSS_STATE_SUCCESS);
			cdkeyData.setIsUsed(CDkeyConst.USED);// 设置激活码已被使用
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			int houtaiZoneid = CrossZone.houtai;
			CDkeyDao.getIns().update(cdkeyData, houtaiZoneid); // 更新激活码已被使用

		} catch (Exception e) {
			LogTool.error(e, CDkeyIO.class, "CDkeyIO checkCDkey callBack error! cdkey:" + cdkey + " pf" + pf);
		}
	}

	/**
	 * 后台中央服收到子服通知加载激活码
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void loadCDkey(Channel channel, CrossData crossData) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			int houtaiZoneid = CrossZone.houtai;
			Map<String, CDkeyData> cdkeyCacheMap = CDkeyCache.getCdkeyCacheMap();
			List<CDkeyData> findAllCDkeyData = CDkeyDao.getIns().findAllCDkeyData(houtaiZoneid);
			for (CDkeyData cdkeyData : findAllCDkeyData) {
				cdkeyCacheMap.put(cdkeyData.getCdkey(), cdkeyData);
			}
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, CDkeyIO.class, "CDkeyIO loadCDkey error!");
		}
	}

}
