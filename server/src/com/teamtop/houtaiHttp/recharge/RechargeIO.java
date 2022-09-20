package com.teamtop.houtaiHttp.recharge;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.houtaiHttp.events.rechargeWhiteList.RechargeWhiteListIO;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.event.backstage.events.backstage.recharge.B_PayAccount;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class RechargeIO {
	
	private static RechargeIO rechargeIO;

	private RechargeIO() {
		
	}

	public static synchronized RechargeIO getIns() {
		if (rechargeIO == null) {
			rechargeIO = new RechargeIO();
		}
		return rechargeIO;
	}
	/**
	 * 收到中央服充值请求
	 * @param channel
	 * @param data
	 */
	public void LRCPayOrderFrom(Channel channel,CrossData data) {
		int callbackcmd = data.getCallbackCmd();
		long cp_order_num = 0;
		long hid = 0;
		try {
			Type type = new TypeReference<HashMap<String, String>>() {}.getType();
			Map<String, String> param=data.getObject(CrossEnum.rechargedata, type);
			data.finishGet();
			int app_server  =Integer.parseInt(param.get(HoutaiConst.app_server));
			cp_order_num = Long.parseLong(param.get(HoutaiConst.cp_order_num));
			long money=Long.parseLong(param.get(HoutaiConst.money));
			LogTool.info("接收到充值信息 cp_order_num="+cp_order_num+"， 金额(分)="+money, RechargeIO.class);
			B_PayAccount m_PayAccount=HoutaiDao.getIns().getB_PayAccount(cp_order_num, app_server);
			if(m_PayAccount==null) {
				LogTool.info("PayAccount为空，接收到充值信息 cp_order_num="+cp_order_num+"， 金额(分)="+money, RechargeIO.class);
				String massage = "cp_order_num: "+cp_order_num+"recharge has wrong:product_id is no exist";
				LogTool.warn(massage,RechargeIO.class);
				data.putObject(CrossEnum.rechargeresult, 0);
				NettyWrite.writeCallbackData(channel, data, callbackcmd);
				AlarmSystemFunction.getIns().alarmSend(AlarmType.RECHARGE_SEND, hid, new Object[] { cp_order_num, massage });
				return;
			}
			hid = m_PayAccount.getHid();
			if (m_PayAccount.getPayState()!=RechargeConst.RECHARGE_STATE0) {
				String massage = "cp_order_num: "+cp_order_num+"recharge has wrong:m_PayAccount.getPayState()!=0";
				LogTool.warn(massage,RechargeIO.class);
				data.putObject(CrossEnum.rechargeresult, 1);
				NettyWrite.writeCallbackData(channel, data, callbackcmd);
				LogTool.info("state!=0，接收到充值信息 cp_order_num="+cp_order_num+"， 金额(分)="+money, RechargeIO.class);
				// AlarmSystemFunction.getIns().alarmSend(AlarmType.RECHARGE_SEND, hid, new
				// Object[] { cp_order_num, massage });
				return;
			}
			if(RechargeWhiteListIO.getIns().checkRechargeWhiteList(m_PayAccount.getOpenid(), m_PayAccount.getZoneid())) {
				//若是白名单不用验证金钱数 
				//直接用订单内的值
				money=m_PayAccount.getPayNum();
				LogTool.info("recharge get begin,cp_order_num:"+cp_order_num+",money:"+money+",RechargeWhiteListIO Openid: "+m_PayAccount.getOpenid(),RechargeIO.class);
			}else {
				//验证金钱数
				if (m_PayAccount.getPayNum()!=money) {
					String massage = "cp_order_num: "+cp_order_num+"recharge has wrong:m_PayAccount.getPayNum()!=money";
					LogTool.warn(massage,RechargeIO.class);
					data.putObject(CrossEnum.rechargeresult, 0);
					NettyWrite.writeCallbackData(channel, data, callbackcmd);
					AlarmSystemFunction.getIns().alarmSend(AlarmType.RECHARGE_SEND, hid, new Object[] { cp_order_num, massage });
					LogTool.info("金钱不对，接收到充值信息 cp_order_num="+cp_order_num+"， 金额(分)="+money+",getPayNum="+m_PayAccount.getPayNum(), RechargeIO.class);
					return;
				}
				
			}
			LogTool.info("recharge get begin,cp_order_num:"+cp_order_num+",money:"+money+",hid:"+hid,RechargeIO.class);
			data.putObject(CrossEnum.rechargeresult, 1);
			NettyWrite.writeCallbackData(channel, data, callbackcmd);
			HeroFunction.getIns().rechargeHero(hid, false, m_PayAccount.getItemId(), param, null);
			if(m_PayAccount.getIsBlackList()==1) {
				int itemId = m_PayAccount.getItemId();
				//白名单充值预警
				AlarmSystemFunction.getIns().alarmSend(AlarmType.WHITE_RECHARGE, hid, new Object[] { cp_order_num, itemId });
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeIO.class, "LRCPayOrderFrom has wrong");
			data.putObject(CrossEnum.rechargeresult, 0);
			NettyWrite.writeCallbackData(channel, data, callbackcmd);
			AlarmSystemFunction.getIns().alarmSend(AlarmType.RECHARGE_SEND, hid, new Object[] { cp_order_num });
			return;
		}
		
	}
}
