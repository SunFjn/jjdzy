package com.teamtop.houtaiHttp.events.mail;

import io.netty.channel.ChannelHandlerContext;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.events.goodsApply.GoodsApplyHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

/**
 * 单服发送邮件http处理类
 * 
 * @author kyle
 *
 */
public class M_MailGoodsHttpEvent extends AbsHouTaiHttpEvent {
	private static M_MailGoodsHttpEvent ins = null;
	
	public static M_MailGoodsHttpEvent getIns(){
		if(ins == null){
			ins = new M_MailGoodsHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(M_MailGoodsHttpEvent.class);
	/**
	 * 使用 get请求
	 */
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		final long id = Long.parseLong(paramMap.get("hid"));
		try {
			//[id_num][id_num]
			String content =paramMap.get("content");
			String goods =paramMap.get("goods");
			final long yuanbao=Long.parseLong(paramMap.get("yuanbao"));
			final long coin=Long.parseLong(paramMap.get("coin"));
			//final M_MailGoods mailGoods = HoutaiDao.getIns().getMailGoodsById(id, zoneid);
		
			final M_MailGoods mailGoods =new M_MailGoods();
			if (content!=null) {
				content = URLDecoder.decode(content, "utf-8");
			}
			mailGoods.setContent(content);
			mailGoods.setGoods(goods);
			
			if (id!=0) {
				//发给单人的
				int[][] makeFujian = GoodsApplyHttpEvent.getIns().makeFujian(yuanbao,coin,goods);
				if(makeFujian != null){
					MailFunction.getIns().sendMailWithFujianData(id, MailConst.MAIL_ID_MAIL, new Object[]{MailConst.MAIL_ID_MAIL,mailGoods.getContent()}, makeFujian);
				}else {
					MailFunction.getIns().sendMailWithFujianData(id, MailConst.MAIL_ID_MAIL, new Object[]{MailConst.MAIL_ID_MAIL,mailGoods.getContent()},new int[0][]);
				}
			}else {
				Thread thread = new Thread(new Runnable() {
					@Override
					public void run() {
						try {
							sendAllheroFujinMailByLevel(mailGoods, mailGoods.getGoods(), yuanbao, coin);
							// 更新状态
							//mailGoods.setFlag(3);
							//HoutaiDao.getIns().updateMailGoods(mailGoods);
						} catch (Exception e) {
							logger.error(LogTool.exception(e, " send backstage mail goods exception id=" + id));
						}
					}
				});
				thread.start();
			}
			HttpUtil.responseSucc(ctx);
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			logger.error(LogTool.exception(e, " send backstage mail goods exception id=" + id));
		}
	}

	/**
	 * 发送全服邮件根据等级限制 有附件的邮件
	 * @param mailGoods 邮件内容
	 * @param fujian 邮件附件
	 * @throws Exception
	 */
	private void sendAllheroFujinMailByLevel(M_MailGoods mailGoods, String fujian,long yuanbao,long coin) throws Exception {
		
		List<Long> findAllHid = HeroDao.getIns().findAllHid(1);
		//普通邮件
		int[][] makeFujian = GoodsApplyHttpEvent.getIns().makeFujian(yuanbao,coin,fujian);
		for (long rb : findAllHid) {
			
			if(makeFujian != null){
				MailFunction.getIns().sendMailWithFujianData(rb, MailConst.MAIL_ID_MAIL, new Object[]{MailConst.MAIL_ID_MAIL,mailGoods.getContent()}, makeFujian);
			}else {
				MailFunction.getIns().sendMailWithFujianData(rb, MailConst.MAIL_ID_MAIL, new Object[]{MailConst.MAIL_ID_MAIL,mailGoods.getContent()},new int[0][]);
			}
			// 睡眠10毫秒
			Thread.sleep(10);
		}
		
		
		
		/*String levelrange = mailGoods.getLevelrange();
		String moneyrange = mailGoods.getMoneyrange();
		String content = mailGoods.getContent();
		int zoneid = mailGoods.getZoneid();
		List<MailTempHero> rids = getSendRids(mailGoods.getZsrange(),levelrange, moneyrange, zoneid);
		if (rids == null || rids.isEmpty()){
			return;
		}
		int type = mailGoods.getType();
		if(type == 0){
			//普通邮件
			int[][] makeFujian = GoodsApplyHttpEvent.getIns().makeFujian(0,0,fujian);
			for (MailTempHero rb : rids) {
				if (rb == null || mailGoods.getZoneid() != rb.getZoneid()){
					continue;
				}
				if(makeFujian != null){
					MailFunction.getIns().sendMailWithFujianData(rb.getHid(), MailConst.MAIL_ID_MAIL, new Object[]{MailConst.MAIL_ID_MAIL,content}, makeFujian);
				}else {
					MailFunction.getIns().sendMailWithFujianData(rb.getHid(), MailConst.MAIL_ID_MAIL, new Object[]{MailConst.MAIL_ID_MAIL,content},new int[0][]);
				}
				// 睡眠10毫秒
				Thread.sleep(10);
			}
		}else if(type == 1){
			//特殊邮件
			String link = mailGoods.getLink();
			for (MailTempHero rb : rids) {
				if (rb == null || mailGoods.getZoneid() != rb.getZoneid()){
					continue;
				}
				MailFunction.getIns().sendSpecialMail(rb.getHid(), MailConst.MAIL_ID_SPECIAL, new Object[]{content}, link);
				// 睡眠10毫秒
				Thread.sleep(10);
			}
		}*/
	}

	/**
	 * 确定需要发送的人id
	 * @param levelRange 等级范围
	 * @param moneyRange 充值范围
	 * @param zoneid 区号
	 * @return
	 */
	private List<MailTempHero> getSendRids(String zsrange,String levelRange, String moneyRange, int zoneid) {
		try {
			List<MailTempHero> result = null;
			return result;
		} catch (Exception e) {
			logger.error("findMailRidsByLevel exception:", e);
		}
		return null;
	}

}
