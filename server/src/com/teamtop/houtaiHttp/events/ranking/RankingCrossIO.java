package com.teamtop.houtaiHttp.events.ranking;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class RankingCrossIO {

	private static RankingCrossIO rankingIO;

	private RankingCrossIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RankingCrossIO getIns() {
		if (rankingIO == null) {
			rankingIO = new RankingCrossIO();
		}
		return rankingIO;
	}

	/**
	 * 获取排行榜信息
	 */
	public void getRankingInfo(String pf, int zoneid, int type, ChannelHandlerContext ctx) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Channel channel = zoneidToChannel.get(zoneid);
			if (channel == null) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(RankingEnum.type, type);
			NettyWrite.writeXData(channel, CrossConst.RANKING_INFO, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					JSONObject data = crossData.getObject(RankingEnum.info, JSONObject.class);
					HoutaiResponseUtil.responseSucc(ctx, "获取成功", data);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, RankingCrossIO.class, "RankingIO getRankingInfo");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/**
	 * hid 角色id openid 平台账号 name 角色名称 level 等级 fv 战力 pf 渠道 zoneid 区服 rank 排行
	 */
	public void getRankingInfoHandle(Channel channel, CrossData crossData) {
		try {
			int type = crossData.getObject(RankingEnum.type, Integer.class);
			JSONObject data = new JSONObject();
			List<JSONObject> list = new ArrayList<>();
			data.put("data", list);
			if (type == RankingConst.GOD_OF_WAR_RANKING) {
				List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
				int ranking = 1;
				for (int i = 0; i < 20; i++) {
					GodOfWarRank model = godOfWarRankList.get(i);
					JSONObject pInfo = new JSONObject();
					String pf = "";
					String openid = "";
					if (model.getRobotId() == 0) {
						Hero hero = HeroCache.getHero(model.getHid(), HeroConst.FIND_TYPE_BASIC);
						if (hero != null) {
							pf = hero.getPf();
							openid = hero.getOpenid();
						}
					}
					pInfo.put("hid", model.getHid());
					pInfo.put("openid", openid);
					pInfo.put("name", model.getName());
					pInfo.put("level", model.getLevel());
					pInfo.put("job", model.getCreateJob());
					pInfo.put("fv", model.getStrength());
					pInfo.put("pf", pf);
					pInfo.put("zoneid", model.getZoneid());
					pInfo.put("rank", ranking);
					pInfo.put("country", model.getCountry());
					pInfo.put("vipLevel", model.getVipLevel());
					list.add(pInfo);
					ranking++;
				}
			} else {
				ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(type);
				ConcurrentSkipListSet<BaseRankModel> tempSet = new ConcurrentSkipListSet<>(treeSet);
				int ranking = 1;
				for (BaseRankModel model : tempSet) {
					JSONObject pInfo = new JSONObject();
					Hero hero = HeroCache.getHero(model.getHid(), HeroConst.FIND_TYPE_BASIC);
					String pf = "";
					String openid = "";
					if (hero != null) {
						pf = hero.getPf();
						openid = hero.getOpenid();
					}
					pInfo.put("hid", model.getHid());
					pInfo.put("openid", openid);
					pInfo.put("name", model.getName());
					pInfo.put("level", model.getLevel());
					pInfo.put("job", model.getCreateJob());
					pInfo.put("fv", model.getStrength());
					pInfo.put("pf", pf);
					pInfo.put("zoneid", model.getZoneid());
					pInfo.put("rank", ranking);
					pInfo.put("country", model.getCountryType());
					pInfo.put("vipLevel", model.getVipLv());
					list.add(pInfo);
					ranking++;
				}
			}
			crossData.putObject(RankingEnum.info, data);
		} catch (Exception e) {
			LogTool.error(e, RankingCrossIO.class, "RankingIO getRankingInfoHandle");
		}
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

}
