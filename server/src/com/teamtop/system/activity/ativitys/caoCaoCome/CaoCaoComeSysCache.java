package com.teamtop.system.activity.ativitys.caoCaoCome;

import com.teamtop.main.RunServerException;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.peacockFloor.PeacockFloorSysCache;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cclx_754;
import excel.struct.Struct_cclx_754;
/**
 * 曹操来袭
 * @author jjjjyyy
 *
 */
public class CaoCaoComeSysCache extends AbsServerEvent{
	
    private static CaoCaoComeSysCache ins;
	
	
	public static synchronized CaoCaoComeSysCache getIns() {
		if(ins==null) {
			ins = new CaoCaoComeSysCache();
		}
		return ins;
	}
	
	/**
	 * 曹操来袭公共缓存
	 */
	private CaoCaoComeCache caoCaoComeCache;
	/**
	 * 曹操来袭历史排行榜
	 */
	private CaoCaoComeHis caoCaoComeHis;


	public CaoCaoComeCache getCaoCaoComeCache() {
		return caoCaoComeCache;
	}

	public void setCaoCaoComeCache(CaoCaoComeCache caoCaoComeCache) {
		this.caoCaoComeCache = caoCaoComeCache;
	}

	public CaoCaoComeHis getCaoCaoComeHis() {
		return caoCaoComeHis;
	}

	public void setCaoCaoComeHis(CaoCaoComeHis caoCaoComeHis) {
		this.caoCaoComeHis = caoCaoComeHis;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			CaoCaoComeCache caoCaoComeCache=new CaoCaoComeCache();
			caoCaoComeCache.setState(CaoCaoComeConst.STATE0);
			//初始化boss
			CaoCaoBoss caoCaoBoss =new CaoCaoBoss();
			Struct_cclx_754 struct_cclx_754 = Config_cclx_754.getIns().get(1);
			int bossid = struct_cclx_754.getBoss()[0][1];
			caoCaoBoss.setBossId(bossid);
			FinalFightAttr battleFightAttr = BattleFunction.initNPC(bossid);
			long hp = battleFightAttr.getHp();
			caoCaoBoss.setHpmax(hp);
			caoCaoBoss.setCurhp(hp);
			caoCaoBoss.setAttr(battleFightAttr);
			caoCaoComeCache.setCaoCaoBoss(caoCaoBoss);
			
			CaoCaoComeSysCache.getIns().setCaoCaoComeCache(caoCaoComeCache);
			
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CAOCAOCOME_HIS);
			
			
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				CaoCaoComeSysCache.getIns().setCaoCaoComeHis(new CaoCaoComeHis());
			}else{
				CaoCaoComeSysCache.getIns().setCaoCaoComeHis(ObjStrTransUtil.toObj(content, CaoCaoComeHis.class));
			}
			
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "CaoCaoComeSysCache has wrong");
		}
	}
	
	@Override
	public void shutdownServer(){
		updateGloalData();
	}
	/**
	 * 
	 */
	public void updateGloalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CAOCAOCOME_HIS);
			globalData.setContent(ObjStrTransUtil.toStr(CaoCaoComeSysCache.getIns().getCaoCaoComeHis()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "updateGloalData shutdownServer has wrong");
		}
	}

}
