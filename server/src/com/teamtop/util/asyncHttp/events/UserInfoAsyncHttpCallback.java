package com.teamtop.util.asyncHttp.events;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.asyncHttp.AbsAsyncHttpCallback;
import com.teamtop.util.log.LogTool;
/**
 * 腾讯用户信息异步请求
 * @author Administrator
 *
 */
public class UserInfoAsyncHttpCallback extends AbsAsyncHttpCallback{
	private Logger logger = LoggerFactory.getLogger(UserInfoAsyncHttpCallback.class);
	@Override
	public void handleData(Hero hero, String rtnData,Object ext) {
		try {
			int pf_level = 0; //平台等级（3366平台等级）
			if(!StringUtils.isBlank(rtnData)){					
				ObjectMapper mapper = new ObjectMapper();
				JsonNode fromObject = mapper.readValue(rtnData, JsonNode.class);
				String object = fromObject.get("ret").getValueAsText();
				if(object!=null && Integer.parseInt(object)==0){						
					JsonNode pf_levelObj= fromObject.get("3366_grow_level");
					
					if(pf_levelObj!=null){
						pf_level=pf_levelObj.getValueAsInt();
					}
				}
			}
//		tempData.addAttribute(RoleConst.ATTR_PFLEVEL, pf_level);
//		DiamondHandler diamondHandler =  (DiamondHandler)BaseAction.getBean("diamondHandler");
//		diamondHandler.initPfWelfare(RoleCache.getRoleFromCache(rid), tempData);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "handleCallback3366 err"));
		}
	
	}

	@Override
	public void timeout(Hero hero,Object ext) {
		
	}

}
