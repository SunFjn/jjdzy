package com.teamtop.houtaiHttp.events.bag.getbag;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.bag.BagGrid;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class BagCrossIO {
	private static BagCrossIO ins = null;

	public static BagCrossIO getIns() {
		if (ins == null) {
			ins = new BagCrossIO();
		}
		return ins;
	}

	private BagCrossIO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 中央服向子服请求获取背包数据
	 * 
	 * @param zoneid
	 * @param player
	 * @param condArray
	 * @param ctx
	 */
	public void getBag(int zoneid, int player, String[] condArray, ChannelHandlerContext ctx) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Channel channel = zoneidToChannel.get(zoneid);
			CrossData crossData = new CrossData();
			crossData.putObject(BagCrossEnum.zoneid, zoneid);
			crossData.putObject(BagCrossEnum.player, player);
			crossData.putObject(BagCrossEnum.condArray, condArray);
			NettyWrite.writeXData(channel, CrossConst.GETBAG, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					// TODO Auto-generated method stub
					boolean flag = crossData.getObject(BagCrossEnum.callbackState, Boolean.class);
					if (!flag) {
						HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
						return;
					}
					Map<Integer, BagGrid> itemData = crossData.getObject(BagCrossEnum.itemdataMap,
							new TypeReference<Map<Integer, BagGrid>>() {
							}.getType());
					JSONArray jsonArray = new JSONArray();
					for (BagGrid bagGrid : itemData.values()) {
						JSONObject data = new JSONObject();
						data.put("type", bagGrid.getType());
						data.put("sysId", bagGrid.getSysId());
						data.put("num", bagGrid.getNum());
						data.put("unitId", bagGrid.getUnitId());
						data.put("expirationTime", bagGrid.getExpirationTime());
						jsonArray.add(data);
					}
					JSONObject data = new JSONObject();
					data.put("bagdata", jsonArray);
					HoutaiResponseUtil.responseSucc(ctx, "", data);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, BagCrossIO.class, "BagCrossIO getBag, ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

	/**
	 * 子服获取玩家背包
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getBagHandle(Channel channel, CrossData crossData) {
		int zoneid = crossData.getObject(BagCrossEnum.zoneid, Integer.class);
		// 1角色名，2角色id，3平台账号
		int player = crossData.getObject(BagCrossEnum.player, Integer.class);
		String[] condArray = crossData.getObject(BagCrossEnum.condArray, String[].class);
		long hid = 0;
		try {
			for (String condStr : condArray) {
				if (player == 1) {
					hid = HeroDao.getIns().getHidByName(condStr, zoneid);
				} else if (player == 2) {
					hid = Long.parseLong(condStr);
				} else if (player == 3) {
					hid = HeroDao.getIns().findHidByOpenid(condStr, zoneid);
				}
				if (hid == 0) {
					continue;
				}
				Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BAG);
				Map<Integer, BagGrid> itemData = hero.getBag().getItemData();
				crossData.putObject(BagCrossEnum.itemdataMap, itemData);
				crossData.putObject(BagCrossEnum.callbackState, true);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			crossData.putObject(BagCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, BagCrossIO.class, "BagCrossIO getBagHandle, ");
		}
	}
}
