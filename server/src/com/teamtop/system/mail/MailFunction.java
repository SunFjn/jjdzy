package com.teamtop.system.mail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bag.GridTempData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.dao.MailDao;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.system.mail.model.MailAdjunct;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mail_206;
import excel.struct.Struct_mail_206;

public class MailFunction {
	private static MailFunction mailFunction;

	public static MailFunction getIns() {
		if(mailFunction == null) {
			mailFunction = new MailFunction();
		}
		return mailFunction;
	}
	
	public boolean sendMailWithFujianDataExcel(long receiverId, int MailSysId,
			Object[] contentData, int[][] fujianData){
		int len = fujianData==null?0:fujianData.length;
		GridTempData[] gridTempData = new GridTempData[len];
		for(int i = 0; i < fujianData.length; i ++) {
			int[] jl = fujianData[i];
			gridTempData[i] = new GridTempData(jl[1],jl[2],0,jl[0]);
		}
		return sendMailWithGridTempData(receiverId, MailSysId, contentData, gridTempData);
	}
	/**
	 * 发送邮件
	 * @param receiverId 接收者id
	 * @param MailSysId 邮件系统id  MailConst
	 * @param contentData 信件内容(内容表id_内容参数1_内容参数2;如：
	 *            1001_10_100表示在竞技场中获得第十名，声望上升100点，参数个数根据内容改变)
	 * @param fujianData 附件格式[type,sysid, num,unitId]，参考GridTempData。unitId是唯一ID，没ID填0
	 * 		    无附件：fujianData = new int[0][];
	 * @return
	 */
	public boolean sendMailWithFujianData(long receiverId, int MailSysId,
			Object[] contentData, int[][] fujianData){
		int len = fujianData==null?0:fujianData.length;
		GridTempData[] gridTempData = new GridTempData[len];
		for(int i = 0; i < fujianData.length; i ++) {
			int[] jl = fujianData[i];
			gridTempData[i] = new GridTempData(jl[1],jl[2],jl[3],jl[0]);
		}
		return sendMailWithGridTempData(receiverId, MailSysId, contentData, gridTempData);
	}
	
	/**
	 * 发送邮件
	 * @param receiverId 接收者id
	 * @param MailSysId 邮件系统id  MailConst
	 * @param contentData 信件内容(内容表id_内容参数1_内容参数2;如：
	 *            1001_10_100表示在竞技场中获得第十名，声望上升100点，参数个数根据内容改变)
	 *            new Object[] { mailID,data1,data2}
	 * @param fujianData 附件格式[type,sysid, num]
	 * 		    无附件：fujianData = new int[0][];
	 * @return
	 */
	public boolean sendMailWithFujianData2(long receiverId, int MailSysId,
			Object[] contentData, int[][] fujianData){
		int len = fujianData==null?0:fujianData.length;
		GridTempData[] gridTempData = new GridTempData[len];
		for(int i = 0; i < fujianData.length; i ++) {
			int[] jl = fujianData[i];
			gridTempData[i] = new GridTempData(jl[1],jl[2],0,jl[0]);
		}
		return sendMailWithGridTempData(receiverId, MailSysId, contentData, gridTempData);
	}
	
	/**
	 * 后台发送邮件 
	 * 定制的邮件标题和内容
	 * @param receiverId 接收者id
	 * @param MailSysId 邮件系统id MailConst 一般为0
	 * @param title 邮件标题
	 * @param content 信件内容
	 * @param fujianData 附件格式[type,sysid, num] 无附件：fujianData = new int[0][];
	 * @return
	 */
	public boolean sendMailWithFujianData2(long receiverId, int MailSysId, String title, String content,
			int[][] fujianData) {
		int len = fujianData == null ? 0 : fujianData.length;
		GridTempData[] gridTempData = new GridTempData[len];
		for (int i = 0; i < fujianData.length; i++) {
			int[] jl = fujianData[i];
			gridTempData[i] = new GridTempData(jl[1], jl[2], 0, jl[0]);
		}
		return sendMailWithGridTempData(receiverId, title, content, gridTempData);
	}

	/**
	 * 发送邮件
	 * 
	 * @param receiverId
	 *            接收者id
	 * @param MailSysId
	 *            邮件系统id MailConst
	 * @param contentData
	 *            信件内容(内容表id_内容参数1_内容参数2;如：
	 *            1001_10_100表示在竞技场中获得第十名，声望上升100点，参数个数根据内容改变)
	 * @param gridTempData
	 *            附件格式为GridTempData对象数组
	 * @return
	 */
	public boolean sendMailWithGridTempData(long receiverId, int MailSysId,
			Object[] contentData, GridTempData[] gridTempData) {
		String receiver = null;
		try{
			//参数校验
			if(receiverId<=0||MailSysId<=0){
				throw new Exception("paramters is rong");
			}
			Struct_mail_206 mailSys=Config_mail_206.getIns().get(MailSysId);
			if (mailSys==null) {
				throw new Exception("mailSys data not find mailSysId:"+MailSysId);
			}
			String title=mailSys.getTitle();
			// 4.判断内容是否为空
			if (StringUtils.isBlank(title) && contentData==null&& (gridTempData == null ||gridTempData.length == 0)) {
				throw new Exception("mail contentData is empty");
			}
			//验证附件的合法性
			List<MailAdjunct> fjList = checkFujian(gridTempData);
			if(fjList==null)throw new Exception(" fujian data is rong ");
			int len = contentData.length;
			StringBuffer sb = new StringBuffer();
			// 整合信件内容
			for (int x = 0; x < len; x++) {
				Object contentStr = contentData[x];
				String split = "_";
				if (x == len - 1)
					sb.append(contentStr);
				else
					sb.append(contentStr).append(split);
			}
			String content = sb.toString();
			
			int fjLen = fjList.size();
			MailAdjunct[] adjs = new MailAdjunct[fjLen];
			for (int i = 0; i < fjLen; i ++) {
				adjs[i] = fjList.get(i);
			}
			//判断角色是否在线
			if(!CrossZone.isCrossServer()){
				boolean isOnline = HeroFunction.getIns().isOnline(receiverId);
				Hero hero;
				if(isOnline) {
					hero = HeroCache.getHero(receiverId);
				}else{
					hero = HeroDao.getIns().findBasic(receiverId);
				}
				if(hero!=null){
					receiver = hero.getNameZoneid();
				}else{
					return false;
				}
			}
			// 邮件操作
			Mail mail = new Mail();
			mail.setReceiverId(receiverId);
			mail.setReceiver(receiver);
			mail.setContent(content);
			mail.setTitle(title);
			mail.setSendTime(TimeDateUtil.getCurrentTime());
			if (fjList.size() == 0) {
				mail.setIsGetAdj(MailConst.ADJ_STATE_0);
			} else {
				mail.setIsGetAdj(MailConst.ADJ_STATE_1);
			}
			mail.setIsRead(MailConst.MAIL_NOT_READ);
			if (adjs.length > 0) {
				mail.setMailAdjuncts(adjs);
			}
			mail.setFlag(MailSysId);
			MailDao mailDao = MailDao.getIns();
			mailDao.addMail(mail);
			// TODO 信件后台日志
			// m_FlowMailFunction.receiveMail(mail,zoneid);
			// TODO 这是神马 ？推送给前端新装备
			// sendNewEquip(createList, hero.getId());
		} catch (Exception e) {
			LogTool.error(e, MailFunction.class, " receiverId:" + receiverId + " send sysmail exception:" + MailSysId);
			return false;
		}
		return true;
	}

	/**
	 * 发送邮件
	 * 
	 * @param receiverId 接收者id
	 * @param MailSysId 邮件系统id MailConst
	 * @param contentData 信件内容(内容表id_内容参数1_内容参数2;如：1001_10_100表示在竞技场中获得第十名，声望上升100点，参数个数根据内容改变)
	 * @param gridTempData 附件格式为GridTempData对象数组
	 * @return
	 */
	public boolean sendMailWithGridTempData(long receiverId, String title, String content,
			GridTempData[] gridTempData) {
		String receiver = null;
		try {
			// 参数校验
			// 4.判断内容是否为空
			if (StringUtils.isBlank(title) && StringUtils.isBlank(content)
					&& (gridTempData == null || gridTempData.length == 0)) {
				throw new Exception("mail contentData is empty");
			}
			// 验证附件的合法性
			List<MailAdjunct> fjList = checkFujian(gridTempData);
			if (fjList == null)
				throw new Exception(" fujian data is rong ");

			int fjLen = fjList.size();
			MailAdjunct[] adjs = new MailAdjunct[fjLen];
			for (int i = 0; i < fjLen; i++) {
				adjs[i] = fjList.get(i);
			}
			// 判断角色是否在线
			boolean isOnline = HeroFunction.getIns().isOnline(receiverId);
			Hero hero;
			if (isOnline) {
				hero = HeroCache.getHero(receiverId);
			} else {
				hero = HeroDao.getIns().findBasic(receiverId);
			}
			if (hero != null) {
				receiver = hero.getNameZoneid();
			} else {
				return false;
			}

			// 邮件操作
			Mail mail = new Mail();
			mail.setTitle(title);
			mail.setReceiverId(receiverId);
			mail.setReceiver(receiver);
			mail.setContent(content);
			mail.setSendTime(TimeDateUtil.getCurrentTime());
			if(fjList.size() == 0){
				mail.setIsGetAdj(MailConst.ADJ_STATE_0);
			}else{
				mail.setIsGetAdj(MailConst.ADJ_STATE_1);
			}
			mail.setIsRead(MailConst.MAIL_NOT_READ);
			if(adjs.length > 0) {
				mail.setMailAdjuncts(adjs);
			}
			mail.setFlag(0);
			MailDao mailDao = MailDao.getIns();
			mailDao.addMail(mail);
			//TODO 信件后台日志
			//m_FlowMailFunction.receiveMail(mail,zoneid);
			//TODO 这是神马 ？推送给前端新装备
//			sendNewEquip(createList, hero.getId());
		} catch (Exception e) {
			LogTool.error(e, MailFunction.class,
					" receiverId:" + receiverId + " send sysmail exception: mailId=" + 0 + ", title=" + title);
			return false;
		}
		return true;
	}
	
	/**
	 * 检查信件附件并返回传化后的附件对象集合
	 * @param dealAnti 
	 * @param fujian
	 *            信件附件信息 [U:信件附件信息包括（B:附件物品类型 - I:物品系统ID - I:物品数量 - I:绑定状态（0
	 *            未绑定，1 绑定））]
	 * @return null 附件异常  list<MailFj> 正常
	 */
	private List<MailAdjunct> checkFujian(GridTempData[] fujianData){
		try{
			if(ArrayUtils.isEmpty(fujianData)) return new ArrayList<MailAdjunct>(0);
			int len = fujianData.length;
			List<MailAdjunct> adjs = new ArrayList<MailAdjunct>(fujianData.length);
			for(int i=0;i<len;i++){
				GridTempData gtd = fujianData[i];
				MailAdjunct adj = new MailAdjunct();
				int num = gtd.getNum();
				if(num <= 0){
					continue;
				}
				adj.setNum(num);
				adj.setSysId(gtd.getSysid());
				adj.setType(gtd.getType());
				adj.setUnitId(gtd.getUnitId());
//				if(gtd.getType() == GameConst.TOOL) {//道具到期时间
//					int expirationTime = calExpirationTime(gtd.getSysid());
//					adj.setExpiredTime(expirationTime);
//				}
				adjs.add(adj);
			}
			return adjs;
		}catch(Exception e){
			LogTool.error(e, MailFunction.class, "");
			return null;
		}
	}
	
	/**
	 * 删除过期邮件
	 */
	public void delOverTimeMail() {
		try{
			MailDao.getIns().deleteOverSomeDays();
		}catch(Exception e) {
			LogTool.error(e, MailFunction.class, "delOverTimeMail error.");
		}
	}
	
	/**
	 * 转换物品格式成邮件附件
	 * @author lobbyer
	 * @param goods
	 * @return
	 * @date 2017年1月4日
	 */
	public int[][] transToMailAdj(int[][] goods){
		List<int[]> list = new ArrayList<int[]>();
		Map<Integer, int[]> showMap = new HashMap<Integer, int[]>();
		for(int[] good:goods) {
			int goodType = good[0]+good[1]+good[3];
			int[] is = showMap.get(goodType);
			if(is == null) {
				int uid = 0;
				if(good.length>4) uid = good[4];
				is = new int[]{good[0],good[1],good[2],good[3],uid};
				showMap.put(goodType, is);
			}else{
				is[2] = is[2] + good[2];
			}
		}
		list.addAll(showMap.values());
		int[][] data = new int[list.size()][];
		return list.toArray(data);
	}
	
	/**
	 * GM处理邮件
	 * @author lobbyer
	 * @param hero
	 * @param type
	 * @param param
	 * @date 2017年4月13日
	 */
	public void GMMail(Hero hero,int type, String[] param) {
		MailDao mailDao = MailDao.getIns();
		switch (type) {
		case 2:
			//发送一封邮件给自己
			int goodType = Integer.parseInt(param[0]);//道具或装备类型
			int sysId = Integer.parseInt(param[1]);//物品id
			int num = Integer.parseInt(param[2]);//个数
			int[][] fujianData = null;
			if(num==0){
				fujianData = new int[0][];
			}else if( goodType==GameConst.TOOL){
				fujianData = new int[1][];
				fujianData[0]=new int[]{GameConst.TOOL, sysId,num,0};
			}else{
				fujianData = new int[num][];
				for( int i=0;i<num;i++){
					fujianData[i]=new int[]{GameConst.EQUIP, sysId,1,0};
				}
			}
			MailFunction.getIns().sendMailWithFujianData(hero.getId(), MailConst.MAIL_ID_YIBAO, new Object[]{MailConst.MAIL_ID_YIBAO}, fujianData);
			System.out.println("GM "+hero.getName()+"童鞋给自己发一封邮件");
			
//			ShenBingManager.getIns().jiHuo(hero, 1);
//			ShenBingManager.getIns().upgradeStar(hero, 1, 1);
//			ShenBingManager.getIns().upgradeRank(hero, 1);
//			ShenBingManager.getIns().useRankDan(hero, 1);
			break;
		case 3:
			int goodType1 = Integer.parseInt(param[0]);//道具或装备类型
			int sysId1 = Integer.parseInt(param[1]);//物品id
			int num1 = Integer.parseInt(param[2]);//个数
			int[][] fujianData1 = null;
			if(num1==0){
				fujianData1 = new int[0][];
			}else if( goodType1==GameConst.TOOL){
				fujianData1 = new int[1][];
				fujianData1[0]=new int[]{GameConst.TOOL, sysId1,num1,1};
			}else{
				fujianData1 = new int[num1][];
				for( int i=0;i<num1;i++){
					fujianData1[i]=new int[]{GameConst.EQUIP, sysId1,1,1};
				}
			}
			
			try {
				List<Long> findAllHid = HeroDao.getIns().findAllHid(hero.getZoneid());
				for(long hidTemp:findAllHid){
					MailFunction.getIns().sendMailWithFujianData(hidTemp, MailConst.MAIL_ID_YIBAO, new Object[]{MailConst.MAIL_ID_YIBAO}, fujianData1);
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			System.out.println("GM "+hero.getName()+"童鞋给全服发一封邮件");
			break;
		case 4:
			//清空所以邮件
			try {
				mailDao.delAllByHid(hero.getId());
				MailManager.getIns().openMail_All(hero);
				System.out.println("GM "+hero.getName()+"童鞋清空了所有邮件");
			} catch (Exception e) {
				e.printStackTrace();
			}
//			if(num <= 0) return;
//			UseAddUtil.add(hero, new int[][]{new int[]{goodType,sysId,num}}, SourceGoodConst.INCOME_GM, null, true);
			break;
		}
	}
	
}
