package com.teamtop.houtaiHttp.events.goodsApply;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_zhuangbei_204;
import io.netty.channel.ChannelHandlerContext;

/**
 * 物品申请
 * @author hepl
 *
 */
public class GoodsApplyHttpEvent extends AbsHouTaiHttpEvent {
	private static GoodsApplyHttpEvent ins = null;
	
	public static GoodsApplyHttpEvent getIns(){
		if(ins == null){
			ins = new GoodsApplyHttpEvent();
		}
		return ins;
	}

	private static Logger logger = LoggerFactory.getLogger(GoodsApplyHttpEvent.class);
	/**
	 * 元宝与绑定元宝申请最大上限
	 */
	private static final int MAX_GLOD = 100000;
	/**
	 * 绑定银两申请最大上限
	 */
	private static final int MAX_SILVER = 100000000;
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			
			HttpUtil.responseSucc(ctx);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "GoodsApplyHttpEvent has error!"));
			HttpUtil.responseFail(ctx);
		}
	}

	/**
	 * 发送申请物品的邮件
	 * @param goods
	 */
	public void sendMail(M_Goods goods) throws Exception{
		long hid = goods.getHid();
		if(hid == 0){
			//根据名称或者openid查找hid
			String name = goods.getName();
			String openid = goods.getOpenid();
			int zoneid = goods.getZoneid();
			if(name != null && !"".equals(name)){
				hid = HeroDao.getIns().getHidByName(name, zoneid);
			}else if(openid != null && !"".equals(openid)){
				hid = HeroDao.getIns().findHidByOpenid(openid, zoneid);
			}
		}
		//验证货币上限
		long yuanbao = goods.getYuanbao();
		long coin = goods.getCoin();
		if(yuanbao > MAX_GLOD || coin > MAX_GLOD){
			throw new Exception("money over max value!");
		}
		//邮件内容
		String mailContent = goods.getMail();
		int[][] fujianData = makeFujian(yuanbao, coin, goods.getGoods());
		if(fujianData != null){
			//发送邮件
			MailFunction.getIns().sendMailWithFujianData(hid, MailConst.MAIL_HOUTAI_ID, new Object[]{MailConst.MAIL_HOUTAI_ID, mailContent}, fujianData);
		}
	}
	/**
	 * 生成发邮件的附件形式
	 * @param yuanbao 元宝
	 * @param bindyuanbao 绑定元宝
	 * @param silver 银两
	 * @param bindsilver 绑定银两
	 * @param goodsArr 后台保存的物品 [id_num][id_num]
	 * @return
	 * @throws Exception
	 */
	public int[][] makeFujian(long yuanbao,long coin,String goodsArr) throws Exception{
		//验证货币上限
		goodsArr = "[" + goodsArr + "]";
		int[][] tempGoods = ExcelJsonUtils.toObj(goodsArr, int[][].class);
		List<int[]> tempList = new ArrayList<int[]>();
		Struct_zhuangbei_204 zhuangbei_300 = null;
		Struct_daoju_204 item_501 = null;
		for(int i=0; i<tempGoods.length; i++){
			int[] data = tempGoods[i];
			if(data == null || data.length == 0){
				continue;
			}
			zhuangbei_300 = Config_zhuangbei_204.getIns().get(data[0]);
			if(zhuangbei_300 == null){
				item_501 = Config_daoju_204.getIns().get(data[0]);
				if(item_501 != null){
					tempList.add(new int[]{GameConst.TOOL, data[0], data[1],0});
				}else {
					if(data[0] == GameConst.YUANBAO || data[0] == GameConst.COIN){
						tempList.add(new int[]{data[0], 0, data[1], 0});
					}
				}
			}else {
				tempList.add(new int[]{GameConst.EQUIP, data[0], data[1],0});
			}
		}
		//添加货币
		if(yuanbao > 0){
			tempList.add(new int[]{GameConst.YUANBAO, 0, (int) yuanbao, 0});
		}
		if(coin > 0){
			tempList.add(new int[]{GameConst.COIN, 0, (int) coin, 0});
		}
		if(tempList.isEmpty()){
			return null;
		}
		int[][] fujianData = new int[tempList.size()][];
		return tempList.toArray(fujianData);
	}
	
}
