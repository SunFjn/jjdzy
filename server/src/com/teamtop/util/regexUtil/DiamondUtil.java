package com.teamtop.util.regexUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;

public class DiamondUtil {
	private static final Logger log = LoggerFactory.getLogger(DiamondUtil.class);
    private URL url;
    private HttpURLConnection urlconn;
    
    String inencoding;
    String outencoding;
    
    public DiamondUtil(String inencoding, String outencoding) {
        this.inencoding = inencoding;
        this.outencoding = outencoding;
    }
	
	public String connect(String params, String postUrl) {
        BufferedReader br = null;
        String response = "", brLine = "";
        try {
            url = new URL(postUrl);
            urlconn = (HttpURLConnection) url.openConnection();
            urlconn.setRequestProperty("user-agent","mozilla/4.7 [en] (win98; i)");    //set request header 
            urlconn.setRequestProperty("X-Forwarded-For", "127.0.0.1");
            urlconn.setConnectTimeout(3000);
            urlconn.setReadTimeout(3000);
            //urlconn.setRequestMethod("POST");     // request method, default GET
            urlconn.setUseCaches(false);    //Post can not user cache
            urlconn.setDoOutput(true);    //set output from urlconn
            urlconn.setDoInput(true);    //set input from urlconn
            urlconn.setReadTimeout(3000);//超时1秒钟
            OutputStream out = urlconn.getOutputStream();
            out.write(params.getBytes(outencoding));
            out.flush();
            out.close();    // output stream close,That's means need not to post data to this outputstream

            br = new BufferedReader(new InputStreamReader(urlconn.getInputStream(), inencoding));
            while((brLine = br.readLine())!=null)
                response =(new StringBuilder(String.valueOf(response))).append(brLine).toString();
        } catch (Exception e) {
        	log.info("");
        } finally {
            try {
                if(br != null) {
                    br.close();
                }
            } catch (IOException e) {
            }
            urlconn.disconnect();
        }
        return response;
    }

	 //验证用户是否为黄钻VIP
    public static void setUserIsVip(String httpPath,String openKey,String openId,String pf,String pfkey,final TempData tempData){
    	try {
    		
    		int isblue=0;//是否是蓝钻
    		int blueLevel=0;
			int yearBlue=0;
			int is_high_blue=0;//是否豪华蓝钻（0：不是； 1：是）
			
			int is_yellow=0;
			int yellowLevel=0;
			int yearYellow=0;
			int is_high_yellow=0;//是否豪华版黄钻（0：不是； 1：是） 
			
			int is_vip=0;
			int vip_level=0; 	//QQ会员等级 
			int is_high_vip = 0;//是否豪华QQ会员（0：不是； 1：是）
			int is_year_vip=0; 	//是否是年费QQ会员（0：不是； 1：是）
			
			int is_red=0;
			int red_level=0;
			int is_high_red=0;
			int is_year_red=0;
			
			int pf_level = 0; //平台等级（3366平台等级）
			
			
			DiamondUtil tc = new DiamondUtil("UTF8", "UTF8");
			String sendPf = "";
			if(pf.indexOf("aiwan")!=-1){
				sendPf = "qzone";
			}else{
				sendPf = pf;
			}
    		String path=httpPath+"/openapi.php?mod=user&op=totalvip&openid="+openId+"&openkey="+openKey+"&pf="+sendPf;//+"&pfkey="+pfkey;
    		//System.out.println("path:"+path);
    		String vipJson = tc.connect("",path);
    		log.info(LogTool.getmsg("Dimond path:"+path));
    		log.info(LogTool.getmsg("Diamond TX Info Return:"+ vipJson));
			if(!StringUtils.isBlank(vipJson)){
				ObjectMapper mapper = new ObjectMapper();
		    	JsonNode fromObject = mapper.readValue(vipJson, JsonNode.class);
				String object = fromObject.get("ret").getValueAsText();
				if(object!=null && Integer.parseInt(object)==0){
					
					JsonNode is_viplobj = fromObject.get("is_vip");
					if(is_viplobj!=null){
						is_vip=is_viplobj.getValueAsInt();
					}
					JsonNode vip_levelobj= fromObject.get("vip_level");
					if(vip_levelobj!=null){
						vip_level=vip_levelobj.getValueAsInt();
					}
					JsonNode is_high_vipObj= fromObject.get("is_high_vip");
					if(is_high_vipObj!=null){
						is_high_vip=is_high_vipObj.getValueAsInt();
					}
					JsonNode is_year_vipObj= fromObject.get("is_year_vip");
					if(is_year_vipObj!=null){
						is_year_vip=is_year_vipObj.getValueAsInt();
					}
					
					JsonNode is_blueObj= fromObject.get("is_blue");
					if(is_blueObj!=null){
						isblue=is_blueObj.getValueAsInt();
					}
					JsonNode blue_levelObj= fromObject.get("blue_level");
					if(blue_levelObj!=null){
						blueLevel=blue_levelObj.getValueAsInt();
					}
					JsonNode is_high_blueObj= fromObject.get("is_high_blue");
					if(is_high_blueObj!=null){
						is_high_blue=is_high_blueObj.getValueAsInt();
					}
					JsonNode is_year_blueObj= fromObject.get("is_year_blue");
					if(is_year_blueObj!=null){
						yearBlue=is_year_blueObj.getValueAsInt();
					}
					
					
					JsonNode is_yellowObj= fromObject.get("is_yellow");
					if(is_yellowObj!=null){
						is_yellow=is_yellowObj.getValueAsInt();
					}
					JsonNode yellow_levelObj= fromObject.get("yellow_level");
					if(yellow_levelObj!=null){
						yellowLevel=yellow_levelObj.getValueAsInt();
					}
					JsonNode is_year_yellowObj= fromObject.get("is_year_yellow");
					if(is_year_yellowObj!=null){
						yearYellow=is_year_yellowObj.getValueAsInt();
					}
					JsonNode is_high_yellowObj= fromObject.get("is_high_yellow");
					if(is_high_yellowObj!=null){
						is_high_yellow=is_high_yellowObj.getValueAsInt();
					}
					
					
					JsonNode is_redObj= fromObject.get("is_red");
					if(is_redObj!=null){
						is_red=is_redObj.getValueAsInt();
					}
					JsonNode red_levelObj= fromObject.get("red_level");
					if(red_levelObj!=null){
						red_level=is_redObj.getValueAsInt();
					}
					JsonNode is_high_redObj= fromObject.get("is_high_red");
					if(is_high_redObj!=null){
						is_high_red=is_high_redObj.getValueAsInt();
					}
					JsonNode is_year_redObj= fromObject.get("is_year_red");
					if(is_year_redObj!=null){
						is_year_red=is_year_redObj.getValueAsInt();
					}
					
					/*is_blue
					blue_level
					is_year_blue
					is_yellow
					yellow_level
					is_year_yellow
					is_red
					red_level
					is_year_red*/
					
				}
			}
				
			if("3366".equals(pf)){		
				String pathPf = httpPath+"/openapi.php?mod=user&op=getinfo&openid="+openId+"&openkey="+openKey+"&pf="+pf;//+"&pfkey="+pfkey;
				String pfJson = tc.connect("",pathPf);
				log.info(LogTool.getmsg("Diamond TX Info 3366 Return:"+ pfJson));
				if(!StringUtils.isBlank(pfJson)){					
					ObjectMapper mapper = new ObjectMapper();
					JsonNode fromObject = mapper.readValue(pfJson, JsonNode.class);
					String object = fromObject.get("ret").getValueAsText();
					if(object!=null && Integer.parseInt(object)==0){						
						JsonNode pf_levelObj= fromObject.get("3366_grow_level");
						
						if(pf_levelObj!=null){
							pf_level=pf_levelObj.getValueAsInt();
						}
					}
				}
			}
			
			if(isblue==0){
				blueLevel=0;
				is_high_blue=0;
				yearBlue=0;
			}
			
			if(is_yellow==0){
				yellowLevel=0;
				yearYellow=0;
				is_high_yellow=0;
			}
			
			if(is_vip==0){
				vip_level=0;
				is_high_vip=0;
				is_year_vip=0;
			}
			
			if(is_red==0){				
				red_level=0;
				is_high_red=0;
				is_year_red=0;
			}
			
			tempData.addAttribute(HeroConst.ATTR_DIAMOND_Level, 1);//特权等级
			//System.out.println("blueDaimond:"+blueDiamond+" yearBlue:"+yearBlue+" yellowDaimond:"+yellowDaimond+" yearYellow:"+yearYellow);
			tempData.addAttribute(HeroConst.ATTR_BLUE, isblue);
			tempData.addAttribute(HeroConst.ATTR_BLUE_LEVEL, blueLevel);
			tempData.addAttribute(HeroConst.ATTR_HIGH_BLUE, is_high_blue); 
			tempData.addAttribute(HeroConst.ATTR_YEAR_BLUE, yearBlue);
			
			tempData.addAttribute(HeroConst.ATTR_YELLOW, is_yellow);
			tempData.addAttribute(HeroConst.ATTR_YELLOW_LEVEL, yellowLevel);
			tempData.addAttribute(HeroConst.ATTR_HIGH_YELLOW, is_high_yellow);
			tempData.addAttribute(HeroConst.ATTR_YEAR_YELLOW, yearYellow);
			
			tempData.addAttribute(HeroConst.ATTR_VIP, is_vip);
			tempData.addAttribute(HeroConst.ATTR_VIP_LEVEL, vip_level);
			tempData.addAttribute(HeroConst.ATTR_HIGH_VIP, is_high_vip); 
			tempData.addAttribute(HeroConst.ATTR_YEAR_VIP, is_year_vip);
			
			log.info("openId:"+openId+",pf:"+pf+",is_high_yellow:"+is_high_yellow);
			
			tempData.addAttribute(HeroConst.ATTR_RED, is_red);
			tempData.addAttribute(HeroConst.ATTR_RED_LEVEL, red_level);
			tempData.addAttribute(HeroConst.ATTR_HIGH_RED, is_high_red);
			tempData.addAttribute(HeroConst.ATTR_YEAR_RED, is_year_red);
			
			int pfId = 0;
			int diamond = 0;
			int hDiamond = 0;
			int yDiamond = 0;
			int diamondLevel = 0;
			HashMap<String, Object> map = new HashMap<String, Object>(); 
			log.info(LogTool.getmsg("Diamond PF:"+pf));
			if("qzone".equals(pf)){
				pfId = 1;
				diamond = is_yellow;
				hDiamond = is_high_yellow;
				yDiamond = yearYellow;
				diamondLevel = yellowLevel;
				map.put(DiamondConst.YELLOW, is_yellow>0?diamondLevel:0);
				map.put(DiamondConst.HIGHYELLOW, is_high_yellow>0?diamondLevel:0);
				map.put(DiamondConst.YEARYELLOW, yearYellow>0?diamondLevel:0);
			}else if("website".equals(pf)){
				pfId = 1;
				diamond = is_yellow;
				hDiamond = is_high_yellow;
				yDiamond = yearYellow;
				diamondLevel = yellowLevel;
				map.put(DiamondConst.YELLOW, is_yellow>0?diamondLevel:0);
				map.put(DiamondConst.HIGHYELLOW, is_high_yellow>0?diamondLevel:0);
				map.put(DiamondConst.YEARYELLOW, yearYellow>0?diamondLevel:0);
			}else if("pengyou".equals(pf)){
				pfId = 1;
				diamond = is_yellow;
				hDiamond = is_high_yellow;
				yDiamond = yearYellow;
				diamondLevel = yellowLevel;
				map.put(DiamondConst.YELLOW, is_yellow>0?diamondLevel:0);
				map.put(DiamondConst.HIGHYELLOW, is_high_yellow>0?diamondLevel:0);
				map.put(DiamondConst.YEARYELLOW, yearYellow>0?diamondLevel:0);
			}else if("qqgame".equals(pf)){
				pfId = 2;
				diamond = isblue;
				hDiamond = is_high_blue;
				yDiamond = yearBlue;
				diamondLevel = blueLevel;
				map.put(DiamondConst.BLUE, isblue>0?diamondLevel:0);
				map.put(DiamondConst.HIGHBLUE, is_high_blue>0?diamondLevel:0);
				map.put(DiamondConst.YEARBLUE, yearBlue>0?diamondLevel:0);
			}else if("3366".equals(pf)){
				pfId = 2;
				diamond = isblue;
				hDiamond = is_high_blue;
				yDiamond = yearBlue;
				diamondLevel = blueLevel;
				map.put(DiamondConst.BLUE, isblue>0?diamondLevel:0);
				map.put(DiamondConst.HIGHBLUE, is_high_blue>0?diamondLevel:0);
				map.put(DiamondConst.YEARBLUE, yearBlue>0?diamondLevel:0);
			}else if(pf.indexOf("aiwan")!=-1){//爱玩
				pfId = 1;
				diamond = is_yellow;
				hDiamond = is_high_yellow;
				yDiamond = yearYellow;
				diamondLevel = yellowLevel;
				map.put(DiamondConst.YELLOW, is_yellow>0?diamondLevel:0);
				map.put(DiamondConst.HIGHYELLOW, is_high_yellow>0?diamondLevel:0);
				map.put(DiamondConst.YEARYELLOW, yearYellow>0?diamondLevel:0);
			}
			
			tempData.addAttribute(HeroConst.ATTR_DINFO, map);//待更新钻石会员信息
			tempData.addAttribute(HeroConst.ATTR_PFID, pfId);//平台Id
			tempData.addAttribute(HeroConst.ATTR_DIAMOND, diamond);//钻石特权
			tempData.addAttribute(HeroConst.ATTR_DIAMOND_HIGH, hDiamond);//钻石特权豪华
			tempData.addAttribute(HeroConst.ATTR_DIAMOND_YEAR, yDiamond);//钻石特权年费
			tempData.addAttribute(HeroConst.ATTR_DIAMOND_Level, diamondLevel);//特权等级
			tempData.addAttribute(HeroConst.ATTR_PFLEVEL, pf_level);
		} catch (Exception e) {
			log.error(LogTool.exception(e, "Set Diamond Fail openId:"+openId));
		}
    }
    
    public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException {
//		String vipJson = "{\"ret\":0,\"is_vip\":1,\"vip_level\":10}";
//    	ObjectMapper mapper = new ObjectMapper();
//    	JsonNode jsonNode = mapper.readValue(vipJson, JsonNode.class);
//    	
//    	System.out.println("ret="+jsonNode.get("ret").getValueAsInt());
//    	System.out.println("vip_level="+jsonNode.get("vip_level").getValueAsInt());
//    	System.out.println("is_vip="+jsonNode.get("is_vip").getValueAsInt());
    	String openKey = "9DD4C17F49D324EE2D424CC8917B8FD56BF04ADB646EA584C68418E9A3D177F4885EA22E62FB26C63571016D67CCD0F4A5447EF08C7E478805306F49E64A9326DA84B0E669AFD181FCF21736EE97EB690FC3946F96FD702E";
    	String openId = "D3987A59F953BF7BAA8B271740508D55";
    	String pf = "qzone";
//   	ChannelAttribute attribute = new ChannelAttribute();
//    	setUserIsVip("api1.app100621282.twsapp.com", openKey, openId, pf, "", attribute);
//    	System.err.println(attribute.getAttribute(HeroConst.ATTR_YEAR_YELLOW));
//    	System.err.println(attribute.getAttribute(HeroConst.ATTR_YELLOW_LEVEL));
	}
}
