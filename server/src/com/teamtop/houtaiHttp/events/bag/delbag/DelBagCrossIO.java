package com.teamtop.houtaiHttp.events.bag.delbag;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class DelBagCrossIO {
	private static DelBagCrossIO ins = null;

	public static DelBagCrossIO getIns() {
		if (ins == null) {
			ins = new DelBagCrossIO();
		}
		return ins;
	}

	private DelBagCrossIO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 中央服向子服请求获取背包数据
	 * 
	 * @param zoneid
	 * @param player
	 * @param condArray
	 * @param goodsList
	 * @param ctx
	 */
	public void delBag(int zoneid, int player, String[] condArray, List<String[]> goodsList,
			ChannelHandlerContext ctx) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Channel channel = zoneidToChannel.get(zoneid);
			CrossData crossData = new CrossData();
			crossData.putObject(DelBagCrossEnum.zoneid, zoneid);
			crossData.putObject(DelBagCrossEnum.player, player);
			crossData.putObject(DelBagCrossEnum.condArray, condArray);
			crossData.putObject(DelBagCrossEnum.goodsList, goodsList);
			NettyWrite.writeXData(channel, CrossConst.DELBAG, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					// TODO Auto-generated method stub
					boolean callbackFlag = crossData.getObject(DelBagCrossEnum.callbackState, Boolean.class);
					if (!callbackFlag) {
						HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
						return;
					}
					Boolean flag = crossData.getObject(DelBagCrossEnum.state, Boolean.class);
					if (flag) {
						HoutaiResponseUtil.responseSucc(ctx);
					} else {
						HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5006, ctx);
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DelBagCrossIO.class, "DelBagCrossIO delBag, ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

	/**
	 * 子服获取玩家背包
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void delBagHandle(Channel channel, CrossData crossData) {
		int zoneid = crossData.getObject(DelBagCrossEnum.zoneid, Integer.class);
		// 1角色名，2角色id，3平台账号
		int player = crossData.getObject(DelBagCrossEnum.player, Integer.class);
		String[] condArray = crossData.getObject(DelBagCrossEnum.condArray, String[].class);
		List<String[]> goodsList = crossData.getObject(DelBagCrossEnum.goodsList,
				new TypeReference<List<String[]>>() {
				}.getType());
		long hid = 0;
		try {
			String condStr = condArray[0];
			if (player == 1) {
				hid = HeroDao.getIns().getHidByName(condStr, zoneid);
			} else if (player == 2) {
				hid = Long.parseLong(condStr);
			} else if (player == 3) {
				hid = HeroDao.getIns().findHidByOpenid(condStr, zoneid);
			}
			if (hid == 0) {
				crossData.putObject(DelBagCrossEnum.state, false);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			boolean flag = true;
			for (String[] goods : goodsList) {
				int id = Integer.parseInt(goods[0]);
				int num = Integer.parseInt(goods[1]);
				boolean deleteflag = BagFunction.getIns().houtaiBagDel(hid, id, num);
				if (deleteflag == false) {
					flag = false;
				}
			}
			crossData.putObject(DelBagCrossEnum.state, flag);
			crossData.putObject(DelBagCrossEnum.callbackState, true);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			crossData.putObject(DelBagCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, DelBagCrossIO.class, "DelBagCrossIO delBagHandle, ");
		}
	}
}
