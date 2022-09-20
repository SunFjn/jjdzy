package com.teamtop.houtaiHttp.events.recharge;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 充值后台接口
 * @author Administrator
 *
 */
public class RechargeHoutaiHttpEvent extends AbsHouTaiHttpEvent{
	private static RechargeHoutaiHttpEvent ins = null;

	public static RechargeHoutaiHttpEvent getIns() {
		if (ins == null) {
			ins = new RechargeHoutaiHttpEvent();
		}
		return ins;
	}
	private Logger logger = LoggerFactory.getLogger(RechargeHoutaiHttpEvent.class);
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		long hid = 0;
		int money = 0;
//		long product_id = 1;
		try {
			/*String dingdanState=paramMap.get("game_order");
			//1元宝
			//2特权卡
			hid =Long.parseLong(paramMap.get(HoutaiConst.extras_params).split("_")[0]);
			product_id=Long.parseLong(paramMap.get(HoutaiConst.product_id));
			money=(int)(Double.parseDouble(paramMap.get(HoutaiConst.amount)));//充值金额，单位分
			logger.info("recharge get,product_id:"+product_id+",money:"+money+",hid:"+hid);
			HeroFunction.getIns().recharge(hid, money * RechargeConst.BaseYb, false, product_id, paramMap);
			HttpUtil.responseSucc(ctx);
			logger.info("recharge succ,hid:"+hid);*/
		} catch (NumberFormatException e) {
			logger.error(LogTool.exception(e, hid,"recharge err,money:"+money));
			HttpUtil.responseFail(ctx);
		}
	}
	//1、CP需要对商品价格和平台传过去的实际支付金额做比较。出现金额不等时就返回发货失败。等客服处理掉单事件!!!
	//2、发货通知可能会被多次发起，CP务必做好相关状态的逻辑处理，避免玩家因此重复获得商品。!!!
	@Override
	public void handlePost(byte[] data,Map<String, String> param,ChannelHandlerContext ctx){
		try {
			/*String passthrough_params=param.get(HoutaiConst.passthrough_params);
			int app_server  =Integer.parseInt(param.get(HoutaiConst.app_server));
			long cp_order_num=Long.parseLong(param.get(HoutaiConst.cp_order_num));
			int product_id=Integer.parseInt(param.get(HoutaiConst.product_id));
			B_PayAccount m_PayAccount=HoutaiDao.getIns().getB_PayAccount(cp_order_num, app_server);
			if(m_PayAccount==null) {
				logger.warn("cp_order_num: "+cp_order_num+"recharge has wrong:product_id is exist");
				HttpUtil.responseFail(ctx);
				return;
			}
			if (m_PayAccount.getPayState()!=RechargeConst.RECHARGE_STATE0) {
				logger.warn("cp_order_num: "+cp_order_num+"recharge has wrong:m_PayAccount.getPayState()!=0");
				HttpUtil.responseFail(ctx);
				return;
			}
			//分
			long money=Long.parseLong(param.get(HoutaiConst.money));
			if (m_PayAccount.getPayNum()!=money) {
				logger.warn("cp_order_num: "+cp_order_num+"recharge has wrong:m_PayAccount.getPayNum()!=money");
				HttpUtil.responseFail(ctx);
				return;
			}
			if (product_id!=m_PayAccount.getProduct_id()) {
				logger.warn("cp_order_num: "+cp_order_num+" product_id"+product_id+" product_id!=m_PayAccount.getProduct_id()");
				HttpUtil.responseFail(ctx);
				return;
			}
			long hid  =m_PayAccount.getHid();
			logger.info("recharge get begin,cp_order_num:"+cp_order_num+",money:"+money+",hid:"+hid);
			HeroFunction.getIns().recharge(hid, (int)money/1000, false, product_id, param);
			HttpUtil.responseSucc(ctx);
			logger.info("recharge get over,cp_order_num:"+cp_order_num+",money:"+money+",hid:"+hid);*/
			return;
		} catch (Exception e) {
			LogTool.error(e, RechargeHoutaiHttpEvent.class, "RechargeHoutaiHttpEvent has wrong");
			HttpUtil.responseFail(ctx);
		}
	}
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		String a = "1000";
		/*String decode = URLDecoder.decode(a, "utf-8");*/
		//int money=(int)(Double.parseDouble("0.01")*10*100);//充值金额，单位分
		System.err.println(a.split("_")[0]);

	}
}
