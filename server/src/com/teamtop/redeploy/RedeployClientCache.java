package com.teamtop.redeploy;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.redeploy.model.RedeployClient;
import com.teamtop.redeploy.ui.BanshuPanel;
import com.teamtop.redeploy.ui.NewNewIos;
import com.teamtop.redeploy.ui.TWPanel;
import com.teamtop.redeploy.ui.TXPanel;
import com.teamtop.redeploy.ui.TanwanXinxinPanel;
import com.teamtop.redeploy.ui.VIETNAMPanel;
import com.teamtop.redeploy.ui.WanZiPanel;
import com.teamtop.redeploy.ui.Weiduan2Panel;
import com.teamtop.redeploy.ui.Weiduan3Panel;
import com.teamtop.redeploy.ui.Weiduan6Panel;
import com.teamtop.redeploy.ui.YunyingPanel;

import io.netty.util.AttributeKey;

public class RedeployClientCache{
	/**
	 * 多个server的连接，key：zone，value：RedeployClient
	 */
	private static Map<Integer, RedeployClient> clients = new HashMap<Integer, RedeployClient>();
	public static AttributeKey<Integer> ATTR_KEY = new AttributeKey<Integer>("zone");
	static{
		clients.put(RedeployConst.PF_QI_E_WEI_XIN, new RedeployClient(RedeployConst.PF_QI_E_WEI_XIN,new BanshuPanel()));
		clients.put(RedeployConst.PF_APK, new RedeployClient(RedeployConst.PF_APK,new YunyingPanel()));
		clients.put(RedeployConst.PF_APK2, new RedeployClient(RedeployConst.PF_APK2,new Weiduan2Panel()));
		clients.put(RedeployConst.PF_APK3, new RedeployClient(RedeployConst.PF_APK3,new Weiduan3Panel()));
		clients.put(RedeployConst.PF_APK4, new RedeployClient(RedeployConst.PF_APK4,new Weiduan3Panel()));
		clients.put(RedeployConst.PF_TEST, new RedeployClient(RedeployConst.PF_TEST,new TXPanel()));
		clients.put(RedeployConst.PF_TEST_QI_E_WEI_XIN, new RedeployClient(RedeployConst.PF_TEST_QI_E_WEI_XIN,new VIETNAMPanel()));
		clients.put(RedeployConst.PF_TEST_APK, new RedeployClient(RedeployConst.PF_TEST_APK,new TWPanel()));
		clients.put(RedeployConst.PF_APK6, new RedeployClient(RedeployConst.PF_APK6,new Weiduan6Panel()));
		clients.put(RedeployConst.PF_WANZI, new RedeployClient(RedeployConst.PF_WANZI,new WanZiPanel()));
		clients.put(RedeployConst.PF_TANWAN, new RedeployClient(RedeployConst.PF_TANWAN,new TanwanXinxinPanel()));
		clients.put(RedeployConst.PF_NEWNEW, new RedeployClient(RedeployConst.PF_NEWNEW,new NewNewIos()));
//		clients.put(RedeployConst.PF_360, new RedeployClient(RedeployConst.PF_360,new PF360Panel()));
	}
	public static Map<Integer, RedeployClient> getClients() {
		return clients;
	}
	public static void setClients(Map<Integer, RedeployClient> clients) {
		RedeployClientCache.clients = clients;
	}

}
