package com.teamtop.houtaiHttp.events.simulateLoginRecharge;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.event.backstage.events.backstage.recharge.B_PayAccount;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_shop_011;
import excel.struct.Struct_shop_011;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class SimulateRechargeHttpEvent extends AbsHouTaiHttpEvent {

	private static SimulateRechargeHttpEvent ins;

	private SimulateRechargeHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SimulateRechargeHttpEvent getIns() {
		if (ins == null) {
			ins = new SimulateRechargeHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		int zoneid = -1;
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			if (CommonUtil.isNull(zoneidStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			zoneid = Integer.parseInt(zoneidStr);
			Channel channel = Client_1.getIns().getCrossChannel();
			JSONObject data = new JSONObject();
			if (channel == null || !channel.isActive()) {
				HoutaiResponseUtil.responseFail(false, 1, "后台中央服未链接,无法接单", data, ctx);
				return;
			}
			if (!HeroCache.isCanRecharge()) {
				HoutaiResponseUtil.responseFail(false, 2, "充值入口关闭", data, ctx);
				return;
			}
			createOrder(data, ctx);
			sendOrder(data, ctx);
			HoutaiResponseUtil.responseSucc(ctx, "充值流程正常", data);
		} catch (Exception e) {
			LogTool.error(e, SimulateRechargeHttpEvent.class, "SimulateRechargeHttpEvent zoneid=" + zoneid);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/**
	 * 生成订单
	 */
	public void createOrder(JSONObject data, ChannelHandlerContext ctx) {
		try {
			int zoneid = GameProperties.getFirstZoneId();
			B_PayAccount m_PayAccount = HoutaiDao.getIns().getB_PayAccount(1001, zoneid);
			if (m_PayAccount == null) {
				int itemId = 1;
				Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(itemId);
				m_PayAccount = new B_PayAccount();
				m_PayAccount.setProduct_id(1001);
				m_PayAccount.setItemId(itemId);
				m_PayAccount.setItemName("模拟充值");
				m_PayAccount.setItemInfo(struct_shop_011.getExplain());
				m_PayAccount.setParameters("");

				m_PayAccount.setCreatetime(0);
				m_PayAccount.setCreatTime(TimeDateUtil.getCurrentTime());
				m_PayAccount.setUpdateTime(TimeDateUtil.getCurrentTime());
				m_PayAccount.setHid(100);
				m_PayAccount.setItemNum(1);
				m_PayAccount.setLv(1);
				m_PayAccount.setName("模拟充值");
				m_PayAccount.setZoneid(zoneid);
				m_PayAccount.setOpenid("hzp");
				m_PayAccount.setApp_custom("");
				m_PayAccount.setLoginpfcode("jysgzj01-apk");
				m_PayAccount.setPfcode("jysgzj01-apk");
				m_PayAccount.setPfopenid("hzp");
				m_PayAccount.setUsesys("android");
				m_PayAccount.setLoginsys("");
				m_PayAccount.setIsBlackList(1);
				m_PayAccount.setJob(1);
				HoutaiDao.getIns().insertB_PayAccount(zoneid, m_PayAccount);
			} else {
				m_PayAccount.setOrder_formType(0);
				m_PayAccount.setPayType("");
				m_PayAccount.setProduct_sdkid("");
				m_PayAccount.setSuccessPayNum(0);
				m_PayAccount.setPayState(RechargeConst.RECHARGE_STATE0);
				m_PayAccount.setVipLv(1);
				m_PayAccount.setPayTime(0);
				m_PayAccount.setUpdateTime(0);
				HoutaiDao.getIns().updateB_PayAccount(zoneid, m_PayAccount);
			}
		} catch (Exception e) {
			LogTool.error(e, SimulateRechargeHttpEvent.class, "SimulateRechargeHttpEvent createOrder");
			HoutaiResponseUtil.responseFail(false, 2, "充值订单生成失败", data, ctx);
		}
	}

	/** 发货 */
	public void sendOrder(JSONObject data, ChannelHandlerContext ctx) {
		try {
			int zoneid = GameProperties.getFirstZoneId();
			B_PayAccount m_PayAccount = HoutaiDao.getIns().getB_PayAccount(1001, zoneid);
			m_PayAccount.setOrder_formType(1);
			m_PayAccount.setPayType("模拟充值");
			m_PayAccount.setProduct_sdkid("123456789");
			m_PayAccount.setSuccessPayNum(1);
			m_PayAccount.setPayState(RechargeConst.RECHARGE_STATE1);
			m_PayAccount.setVipLv(1);
			m_PayAccount.setPayTime(TimeDateUtil.getCurrentTime());
			m_PayAccount.setUpdateTime(TimeDateUtil.getCurrentTime());
			HoutaiDao.getIns().updateB_PayAccount(zoneid, m_PayAccount);
		} catch (Exception e) {
			LogTool.error(e, SimulateRechargeHttpEvent.class, "SimulateRechargeHttpEvent createOrder");
			HoutaiResponseUtil.responseFail(false, 3, "充值发货失败", data, ctx);
		}
	}

}
