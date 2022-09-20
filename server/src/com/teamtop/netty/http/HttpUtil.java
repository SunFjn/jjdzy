package com.teamtop.netty.http;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import com.teamtop.util.db.trans.LMessageFormat;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.util.CharsetUtil;

public class HttpUtil {

	public static void responseFail(ChannelHandlerContext ctx) {
		response("-1", ctx);
	}

	public static void responseSucc(ChannelHandlerContext ctx) {
		response("success=Y", ctx);
	}

	public static void responseXiaoSucc(ChannelHandlerContext ctx) {
		response("SUCCESS", ctx);
	}
	/**
	 * 返回结果给请求方
	 * 
	 * @param rtn
	 *            返回值
	 * @param ctx
	 */
	public static void response(int rtn, ChannelHandlerContext ctx) {
		response(rtn + "", ctx);
	}

	/**
	 * 返回结果给请求方
	 * 
	 * @param rtn
	 *            返回值
	 * @param ctx
	 */
	public static void response(String rtn, ChannelHandlerContext ctx) {
		response(rtn.getBytes(CharsetUtil.UTF_8), ctx);
	}

	/**
	 * 返回结果给请求方
	 * 
	 * @param rtn
	 *            返回值
	 * @param ctx
	 */
	public static void response(byte[] body, ChannelHandlerContext ctx) {
		FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, Unpooled.buffer(body.length));
		response.headers().set("Access-Control-Allow-Origin", "*");
		response.headers().set("Access-Control-Allow-Headers", "X-Requested-With,content-type,token");
		response.headers().set("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
		response.headers().set(HttpHeaders.Names.CONTENT_TYPE, "text/plain; charset=UTF-8");
		response.headers().set(HttpHeaders.Names.CONTENT_LENGTH, response.content().capacity());// 这个长度一定不能搞错,否则客户端会收包失败
		response.content().writeBytes(body);
		ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE);
	}
	
	
	/**
	 * 获取参数集合根据传入的uri
	 * 
	 * @param uri
	 *            请求的uri
	 * @return 参数集合<名字,值>
	 * @throws UnsupportedEncodingException
	 */
	public static HashMap<String, Object> getRechargeParamters(String uri) throws UnsupportedEncodingException {
		HashMap<String, Object> res = new HashMap<String, Object>();
		if (StringUtils.isBlank(uri))
			return null;
		// /?key=6636fa178ba7072d82d2c4e60e0364bc&cmd=110&randnum=-810347853
		// 解析字符串
		uri = StringUtils.substring(uri, 2);// 去掉/?
		String[] params = StringUtils.split(uri, "&");// 拆分成key=6636fa178ba7072d82d2c4e60e0364bc,
		String[] vals = null;
		for (String str : params) {
			vals = StringUtils.split(str, "=");// 拆分成 key ,value
			if (vals == null || ArrayUtils.isEmpty(vals) || vals.length != 2)
				continue;
			// 2014.10.11添加字符编码格式转换
			byte[] bytes0 = vals[0].getBytes();
			String valsStr0 = new String(bytes0, "utf-8");
			byte[] bytes1 = vals[1].getBytes();
			String valsStr1 = new String(bytes1, "utf-8");
			res.put(valsStr0, valsStr1);
		}
		/*String zoneidstr = res.get("zoneid");
		if(zoneidstr!=null){
			String namestr = res.get("name");
			if(namestr!=null && namestr.indexOf(".S")<0){
				namestr = namestr + ".S"+zoneidstr;
				res.put("name", namestr);
			}
		}*/
		return res;
	}

	/**
	 * 获取参数集合根据传入的uri
	 * 
	 * @param uri
	 *            请求的uri
	 * @return 参数集合<名字,值>
	 * @throws UnsupportedEncodingException
	 */
	public static HashMap<String, String> getParamters(String uri) throws UnsupportedEncodingException {
		HashMap<String, String> res = new HashMap<String, String>();
		if (StringUtils.isBlank(uri))
			return null;
		// /?key=6636fa178ba7072d82d2c4e60e0364bc&cmd=110&randnum=-810347853
		// 解析字符串
		uri = StringUtils.substring(uri, 2);// 去掉/?
		String[] params = StringUtils.split(uri, "&");// 拆分成key=6636fa178ba7072d82d2c4e60e0364bc,
		String[] vals = null;
		for (String str : params) {
			vals = StringUtils.split(str, "=");// 拆分成 key ,value
			if (vals == null || ArrayUtils.isEmpty(vals) || vals.length != 2)
				continue;
			// 2014.10.11添加字符编码格式转换
			byte[] bytes0 = vals[0].getBytes();
			String valsStr0 = new String(bytes0, "utf-8");
			byte[] bytes1 = vals[1].getBytes();
			String valsStr1 = new String(bytes1, "utf-8");
			res.put(valsStr0, valsStr1);
		}
		/*String zoneidstr = res.get("zoneid");
		if(zoneidstr!=null){
			String namestr = res.get("name");
			if(namestr!=null && namestr.indexOf(".S")<0){
				namestr = namestr + ".S"+zoneidstr;
				res.put("name", namestr);
			}
		}*/
		return res;
	}

	/**
	 * GET 方式
	 */
	public static String connectGet(String postUrl) {
		BufferedReader br = null;
		StringBuilder response = new StringBuilder();
		String brLine = "";
		HttpURLConnection urlconn = null;
		InputStream inputStream = null;
		try {
			URL url = new URL(postUrl);
			urlconn = (HttpURLConnection) url.openConnection();
//			urlconn.setRequestProperty("user-agent", "mozilla/4.7 [en] (win98; i)");//设置通讯的头部信息，设置访问方式
//			urlconn.setRequestProperty("X-Forwarded-For", "127.0.0.1");
//			urlconn.setRequestProperty("Content-Type", "text/html; charset=utf-8");
			urlconn.setConnectTimeout(3000);
			urlconn.setReadTimeout(3000);
			//urlconn.setRequestMethod("POST"); // request method, default GET
			urlconn.setUseCaches(false); // Post can not user cache
			urlconn.setDoOutput(true); // set output from urlconn//设置是否向httpUrlConnection输出，因为这个是post请求，参数要放在http正文内，因此需要设为true, 默认情况下是false
			urlconn.setDoInput(true); // set input from urlconn//设置是否从httpUrlConnection读入，默认情况下是true
			//获得服务器返回的字节流
			inputStream = urlconn.getInputStream();
			br = new BufferedReader(new InputStreamReader(inputStream, "UTF8"));
			while ((brLine = br.readLine()) != null)
				response.append(brLine);//旧写法response = (new StringBuilder(String.valueOf(response))).append(brLine).toString();
		} catch (Exception e) {
//			logger.warn(" method of connect exception ,url: " + postUrl);
		} finally {
			try {
				if (br != null)
					br.close();
				if(urlconn != null)
					urlconn.disconnect();
				if(inputStream != null)
					inputStream.close();
			} catch (IOException e) {
			}
		}
		return response.toString();
	}

	/**
	 * POST 方式
	 * @param postUrl http://127.0.0.1:8001
	 * @param param xx=xx&yy=yy
	 */
	public static String connectPOST(String postUrl, String param) {
		BufferedReader br = null;
		StringBuilder response = new StringBuilder();
		String brLine = "";
		HttpURLConnection urlconn = null;
		InputStream inputStream = null;
		try {
			URL url = new URL(postUrl);
			urlconn = (HttpURLConnection) url.openConnection();
//			urlconn.setRequestProperty("user-agent", "mozilla/4.7 [en] (win98; i)");//设置通讯的头部信息，设置访问方式
//			urlconn.setRequestProperty("X-Forwarded-For", "127.0.0.1");
//			urlconn.setRequestProperty("Content-Type", "text/html; charset=utf-8");
			urlconn.setConnectTimeout(3000);
			urlconn.setReadTimeout(3000);
			urlconn.setRequestMethod("POST"); // request method, default GET
			urlconn.setUseCaches(false); // Post can not user cache
			urlconn.setDoOutput(true); // set output from urlconn//设置是否向httpUrlConnection输出，因为这个是post请求，参数要放在http正文内，因此需要设为true, 默认情况下是false
			urlconn.setDoInput(true); // set input from urlconn//设置是否从httpUrlConnection读入，默认情况下是true
			
            // 获取URLConnection对象对应的输出流
            PrintWriter printWriter = new PrintWriter(urlconn.getOutputStream());
            // 发送请求参数
            printWriter.write(param);//post的参数 xx=xx&yy=yy
            // flush输出流的缓冲
            printWriter.flush();
			
			//获得服务器返回的字节流
			inputStream = urlconn.getInputStream();
			br = new BufferedReader(new InputStreamReader(inputStream, "UTF8"));
			while ((brLine = br.readLine()) != null)
				response.append(brLine);//旧写法response = (new StringBuilder(String.valueOf(response))).append(brLine).toString();
		} catch (Exception e) {
//			logger.warn(" method of connect exception ,url: " + postUrl);
		} finally {
			try {
				if (br != null)
					br.close();
				if(urlconn != null)
					urlconn.disconnect();
				if(inputStream != null)
					inputStream.close();
			} catch (IOException e) {
			}
		}
		return response.toString();
	}
	
	public static void connecttest(String postUrl) {
		BufferedReader br = null;
		// String response = "", brLine = "";
		HttpURLConnection urlconn = null;
		try {
			URL url = new URL(postUrl);
			urlconn = (HttpURLConnection) url.openConnection();
			urlconn.setRequestProperty("user-agent", "mozilla/4.7 [en] (win98; i)"); // set
																						// request
																						// header
			urlconn.setRequestProperty("X-Forwarded-For", "127.0.0.1");
			urlconn.setConnectTimeout(3000);
			urlconn.setReadTimeout(3000);
			// urlconn.setRequestMethod("POST"); // request method, default GET
			urlconn.setUseCaches(false); // Post can not user cache
			urlconn.setDoOutput(true); // set output from urlconn
			urlconn.setDoInput(true); // set input from urlconn
			urlconn.setReadTimeout(3000);// 超时1秒钟
//			OutputStream out = urlconn.getOutputStream();
//			out.write("".getBytes("UTF8"));
//			out.flush();
//			out.close(); // output stream close,That's means need not to post
							// data to this outputstream

			InputStream inputStream = urlconn.getInputStream();
			byte[] dst = new byte[inputStream.available()];
			inputStream.read(dst);
			Object read = LMessageFormat.read(dst);
			System.err.println(read);
		} catch (Exception e) {
			// logger.error(LogFormat.exception(e));
//			logger.warn(" method of connect exception ,url: " + postUrl);
		} finally {
			try {
				if (br != null) {
					br.close();
				}
			} catch (IOException e) {
			}
			urlconn.disconnect();
		}
	}

	public static void uploadForHotswap(String uri) {
		try {
			URL url = new URL(uri);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setChunkedStreamingMode(1024 * 1024);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("Charsert", "UTF-8");
			String fname = "C:\\hotswap\\up.zip";
			File file = new File(fname);
			conn.setRequestProperty("Content-Type", "multipart/form-data;file=" + file.getName());
			conn.setRequestProperty("uploadType", "2");
			conn.setRequestProperty("filename", file.getName());
			OutputStream out = new DataOutputStream(conn.getOutputStream());
			DataInputStream in = new DataInputStream(new FileInputStream(file));
			int bytes = 0;
			byte[] bufferOut = new byte[1024];
			while ((bytes = in.read(bufferOut)) != -1) {
				out.write(bufferOut, 0, bytes);
			}
			in.close();
			out.flush();
			out.close();
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = null;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}
		} catch (Exception e) {
//			System.out.println("发送POST请求出现异常！" + e);
//			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		// connecttest("http://192.168.7.100:9800/?zoneid=1&battleType=20006&bid=2&rectime=1433849083");
		String connect = connectGet("http://127.0.0.1:3000?cmd=fight1v1&arg={\"left\":{\"id\":1000,\"name\":\"abc\",\"level\":82,\"sb\":101,\"str\":12355,\"zs\":2,\"roleList\":[{\"id\":1001,\"job\":1,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":1002,\"job\":2,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":1003,\"job\":3,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]}]},\"right\":{\"id\":2000,\"name\":\"abc\",\"level\":82,\"sb\":101,\"str\":12355,\"zs\":2,\"roleList\":[{\"id\":2001,\"job\":1,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":2002,\"job\":2,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":2003,\"job\":3,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]}]}}");
		System.err.println(connect);
	}
}
