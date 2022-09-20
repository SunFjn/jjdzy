package com.teamtop.houtaiHttp.events.switchOnOff;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.exclusiveActivity.ExclusiveActivitySwitchOnOff;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.modifyNameSwitch.ModifyNameSwitchOnOff;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.wxhoutai.WxhuotaiShowSwitchOnOff;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class SwitchOnOffHttpEvent extends AbsHouTaiHttpEvent {

	private static SwitchOnOffHttpEvent ins;

	private SwitchOnOffHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static SwitchOnOffHttpEvent getIns() {
		if (ins == null) {
			ins = new SwitchOnOffHttpEvent();
		}
		return ins;
	}

	private static Map<Integer, SwitchOnOffInf> switchOnOffMap = new HashMap<>();

	static {
		switchOnOffMap.put(OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType(), new WxhuotaiShowSwitchOnOff());
		switchOnOffMap.put(OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType(), new ModifyNameSwitchOnOff());
		switchOnOffMap.put(OnOffTypeEnum.EXACT_SWITCH_ONOFF.getCountryType(), new ExclusiveActivitySwitchOnOff());
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String switchTypeStr = paramMap.get("switchType");
			if (CommonUtil.isNull(switchTypeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			Integer switchType = Integer.valueOf(switchTypeStr);
			SwitchOnOffInf switchOnOffInf = switchOnOffMap.get(switchType);
			switchOnOffInf.transactionHandle(paramMap, ctx);
		} catch (Exception e) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			LogTool.error(e, this, "SwitchOnOffHttpEvent has wrong");
		}

	}

}
