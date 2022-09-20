package com.teamtop.system.hero;

import java.io.IOException;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.hero.platform.Platform;

import io.netty.channel.Channel;

/**
 * 登陆工具
 * 用于验证seqid是否合法
 * @author kyle
 *
 */
public class LoginTool {
	private static Logger logger = LoggerFactory.getLogger("LoginTool");
	/**
	 * 能否登陆,验证seqid
	 * @param channel channel 
	 * @param openid openid账号名
	 * @param params
	 * @param postUrl
	 * @return true为可登陆 false不可登陆
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	public static boolean loginMod1(Channel channel,Platform tx) throws JsonParseException, JsonMappingException, IOException{
		StringBuffer sb = new StringBuffer();
		sb.append(GameProperties.openApiAddress).append("?mod=arealogin&openid=").append(tx.getOpenid()).append("&openkey=").append(tx.getOpenkey()).append("&seqid=").append(tx.getSeqid()).append("&pf=").append(tx.getPf());
		return checkLoginTx(channel, sb.toString(), tx.getOpenid());
	}
	/**
	 * 登陆模式2 (调试或后台登陆模式)
	 * @param channel
	 * @param tx
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static boolean loginMod2(Channel channel,Platform tx) throws JsonParseException, JsonMappingException, IOException{
		StringBuffer sb = new StringBuffer();
		sb.append(GameProperties.openApiAddress).append("?mod=token&op=check&openid=").append(tx.getOpenid()).append("&openkey=").append(tx.getOpenkey()).append("&seqid=").append(tx.getSeqid()).append("&pf=").append(tx.getPf());
		return checkLoginTx(channel, sb.toString(), tx.getOpenid());
	}
	
	public static boolean checkLoginTx(final Channel channel,final String url,final String openid) throws JsonParseException, JsonMappingException, IOException{
		logger.info("url:"+url);
		String jsonStr = HttpUtil.connectGet(url);
		boolean canGo = false;
		if(jsonStr!=null && !jsonStr.equals("")){
			ObjectMapper mapper = new ObjectMapper();
	    	JsonNode fromObject = mapper.readValue(jsonStr, JsonNode.class);
			if(fromObject!=null){
				if(fromObject!=null && Integer.parseInt(fromObject.get("ret").toString())==0){
					TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
//					tempData.addAttribute(GameConst.NORMAL_USER, 1);
					canGo = true;
				}else{
					canGo = false;
					logger.warn("checkLogin fail:"+openid+" fromObject:"+fromObject);
				}
			}else{
				canGo = false;
				logger.warn("checkLogin fail:"+openid+" fromObject is null");
			}
		}else{
			logger.warn("checkLogin fail:"+openid+" jsonStr is null");
		}
		return canGo;
	}
	
}
