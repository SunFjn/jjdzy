package com.teamtop.houtaiHttp.events.rechargeWhiteList;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.system.event.backstage.events.backstage.rechargeWhiteList.M_RechargeWhiteList;
import com.teamtop.system.event.backstage.events.backstage.rechargeWhiteList.RechargeWhiteListDao;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class RechargeWLGetHttpEvent extends AbsHouTaiHttpEvent {

	private static RechargeWLGetHttpEvent ins;

	private RechargeWLGetHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RechargeWLGetHttpEvent getIns() {
		if (ins == null) {
			ins = new RechargeWLGetHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String account = paramMap.get("account");
			if (CommonUtil.isNull(pf)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			List<JSONObject> list = new ArrayList<>();
			if (StringUtils.isEmpty(account)) {
				List<M_RechargeWhiteList> allList = RechargeWhiteListDao.getIns().findAll();
				int size = allList.size();
				M_RechargeWhiteList whiteList = null;
				for (int i = 0; i < size; i++) {
					whiteList = allList.get(i);
					JSONObject accountData = new JSONObject();
					accountData.put("account", whiteList.getOpenid());
					accountData.put("status", whiteList.getState());
					accountData.put("createtime", whiteList.getTime());
					list.add(accountData);
				}
			} else {
				M_RechargeWhiteList whiteList = RechargeWhiteListDao.getIns().findByOpenid(account);
				int status = -1;
				int createtime = 0;
				if (whiteList != null) {
					status = whiteList.getState();
					createtime = whiteList.getTime();
				}
				JSONObject accountData = new JSONObject();
				accountData.put("account", account);
				accountData.put("status", status);
				accountData.put("createtime", createtime);
				list.add(accountData);
			}
			String dataStr = JSON.toJSONString(list);
			HoutaiResponseUtil.responseSucc(ctx, "获取成功", dataStr);
		} catch (Exception e) {
			LogTool.error(e, RechargeWLGetHttpEvent.class, "RechargeWLGetHttpEvent");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
