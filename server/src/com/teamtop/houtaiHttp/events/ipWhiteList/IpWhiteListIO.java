package com.teamtop.houtaiHttp.events.ipWhiteList;

import java.util.Iterator;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.account.Account;
import com.teamtop.system.account.AccountDao;
import com.teamtop.system.event.backstage.events.backstage.ipWhiteList.IpWhiteListDao;
import com.teamtop.system.event.backstage.events.backstage.ipWhiteList.M_IpWhiteList;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.OldPlayerDao;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class IpWhiteListIO {

	private static IpWhiteListIO ins;

	private IpWhiteListIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized IpWhiteListIO getIns() {
		if (ins == null) {
			ins = new IpWhiteListIO();
		}
		return ins;
	}

	public void ipWhiteListSet(ChannelHandlerContext ctx, String ip, int num, int type) {
		try {
			//1.查询状态 2.开启 3.关闭 4.设置数量 5添加IP白名单 6删除IP白名单
			IpWhiteListDao dao = IpWhiteListDao.getDao();
			switch (type) {
			case 1:
				JSONObject data = new JSONObject();
				int state = 2;
				if(IpWhiteListCache.OPEN_SWITCH == 1) {
					state = 1;
				}
				data.put("type", state);
				HoutaiResponseUtil.responseSucc(ctx, "查询IP开关状态!", data);
				return;
			case 2:
				IpWhiteListCache.OPEN_SWITCH = 1;
				break;
			case 3:
				IpWhiteListCache.OPEN_SWITCH = 0;
				break;
			case 4:
				IpWhiteListCache.LIMIT_NUM = num;
				break;
			case 5:
				M_IpWhiteList m_IpWhiteList = dao.findByIp(ip);
				if(m_IpWhiteList==null) {
					m_IpWhiteList = new M_IpWhiteList();
					m_IpWhiteList.setIp(ip);
					m_IpWhiteList.setState(1);
					m_IpWhiteList.setTime(TimeDateUtil.getCurrentTime());
					dao.insert(m_IpWhiteList);
				}else {
					m_IpWhiteList.setState(1);
					m_IpWhiteList.setTime(TimeDateUtil.getCurrentTime());
					dao.update(m_IpWhiteList);
				}
				break;
			case 6:
				M_IpWhiteList m_IpWhiteList1 = dao.findByIp(ip);
				if(m_IpWhiteList1!=null) {
					m_IpWhiteList1.setState(0);
					m_IpWhiteList1.setTime(TimeDateUtil.getCurrentTime());
					dao.update(m_IpWhiteList1);
				}
				break;

			default:
				break;
			}
			if (type == 2 || type == 3) {
				CrossData crossData = new CrossData();
				crossData.putObject(IpWhiteListEnum.type.name(), type);
				Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
				for (; iterator.hasNext();) {
					Channel channel = iterator.next();
					NettyWrite.writeXData(channel, CrossConst.IPWHITELIST_SET, crossData);
				}
			}
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, IpWhiteListIO.class, "IpWhiteListIO ip=" + ip + ", num=" + num + ", type=" + type);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	public void ipWhiteListHandle(Channel channel, CrossData crossData) {
		int cmd = CrossConst.IPWHITELIST_SET;
		int type = -1;
		try {
			type = crossData.getObject(IpWhiteListEnum.type.name(), Integer.class);
			switch (type) {
			case 2:
				IpWhiteListCache.OPEN_SWITCH = 1;
				break;
			case 3:
				IpWhiteListCache.OPEN_SWITCH = 0;
				break;
			}
		} catch (Exception e) {
			LogTool.error(e, IpWhiteListIO.class, "IpWhiteListIO type=" + type);
		}
	}

	/**
	 * 检测ip注册上限
	 * @param account
	 * @param tempData
	 * @return true 达到限制
	 */
	public boolean checkIpLimit(Account account, TempData tempData, boolean isCreate) {
		// if (account == null) {
		// return;
		// }
		String openId = account.getOpenid();
		if(IpWhiteListCache.checkSet.contains(openId)) {
			return false;
		}
		if(!isCreate) {
			try {	
				if(account.getOverState()==0) {
					account.setOverState(2);
					AccountDao.getIns().update(account);
					return false;
				}
			} catch (Exception e) {
				LogTool.error(e, IpWhiteListIO.class,
						"IpWhiteListIO checkIpLimit openId=" + openId);
			}
		}
		IpWhiteListCache.checkSet.add(openId);
		boolean result = false;
		if (account.getOverState() == 1) {
			Channel playerChannel = tempData.getChannel();
			if (playerChannel != null) {
				NettyWrite.writeData(playerChannel, new Object[] { "账号异常", 0 }, HeroCmd.GC_NoticeMsg_164);
				playerChannel.close();
			}
			result = true;
		} else if (account.getOverState() == 2) {
			return false;
		}
		String createip = "";
		try {
			if (IpWhiteListCache.OPEN_SWITCH == 0) {
				return false;
			}
			CrossData crossData = new CrossData();
			createip = account.getCreateip();
			crossData.putObject(IpWhiteListEnum.ip.name(), createip);
			Channel crossChannel = Client_1.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.IPWHITELIST_CHECK, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int overState = -1;
					try {
						overState = crossData.getObject(IpWhiteListEnum.overState.name(), Integer.class);
						if (overState == 1) {
							account.setOverState(overState);
							Channel playerChannel = tempData.getChannel();
							if (playerChannel != null) {
								NettyWrite.writeData(playerChannel, new Object[] { "账号异常", 0 }, HeroCmd.GC_NoticeMsg_164);
								playerChannel.close();
							}
						} else {
							if (account.getOverState() == 1) {
								account.setOverState(2);
							} else {
								account.setOverState(2);
							}
						}
						AccountDao.getIns().update(account);
						IpWhiteListCache.checkSet.remove(account.getOpenid());
					} catch (Exception e) {
						IpWhiteListCache.checkSet.remove(account.getOpenid());
						LogTool.error(e, IpWhiteListIO.class, "IpWhiteListIO overState=" + overState + ", openId="
								+ account.getOpenid() + ", createip=" + account.getCreateip());
					}
				}
			});
		} catch (Exception e) {
			IpWhiteListCache.checkSet.remove(account.getOpenid());
			LogTool.error(e, IpWhiteListIO.class,
					"IpWhiteListIO checkIpLimit openId=" + openId + ", createip=" + createip);
		}
		return result;
	}

	/**
	 * 中央服检测ip注册上限，返回结果
	 * @param channel
	 * @param crossData
	 */
	public void checkIpLimitHandle(Channel channel, CrossData crossData) {
		int cmd = CrossConst.IPWHITELIST_CHECK;
		String ip = "";
		try {
			int overState = 0;
			if (IpWhiteListCache.LIMIT_NUM > 0) {
				ip = crossData.getObject(IpWhiteListEnum.ip.name(), String.class);
				IpWhiteListDao dao = IpWhiteListDao.getDao();
				M_IpWhiteList m_IpWhiteList = dao.findByIp(ip);
				if (m_IpWhiteList == null || (m_IpWhiteList != null && m_IpWhiteList.getState() == 0)) {
					// 不是白名单,检测是否达到上限
					int num = OldPlayerDao.getIns().findSameIpOpenidNum(ip);
					if (num >= IpWhiteListCache.LIMIT_NUM) {
						overState = 1;
					}
				}
			}
			crossData.putObject(IpWhiteListEnum.overState.name(), overState);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, IpWhiteListIO.class, "IpWhiteListIO checkIpLimitHandle ip=" + ip);
		}
	}

}
