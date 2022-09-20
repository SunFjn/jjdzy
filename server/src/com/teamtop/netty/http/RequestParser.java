package com.teamtop.netty.http;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.util.log.LogTool;

import java.util.Set;

import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpMethod;
import io.netty.handler.codec.http.QueryStringDecoder;
import io.netty.handler.codec.http.multipart.Attribute;
import io.netty.handler.codec.http.multipart.DefaultHttpDataFactory;
import io.netty.handler.codec.http.multipart.FileUpload;
import io.netty.handler.codec.http.multipart.HttpDataFactory;
import io.netty.handler.codec.http.multipart.HttpPostRequestDecoder;
import io.netty.handler.codec.http.multipart.InterfaceHttpData;
import io.netty.handler.codec.http.multipart.InterfaceHttpData.HttpDataType;

/**
 * HTTP请求参数解析器, 支持GET, POST
 */
public class RequestParser {

	/**
	 * 解析请求参数
	 * @return 包含所有请求参数的键值对, 如果没有参数, 则返回空Map
	 * @throws Exception
	 */
	public static Map<String, Object> parse(FullHttpRequest request) throws Exception {
		HttpMethod method = request.getMethod();

		Map<String, Object> parmMap = new HashMap<>();
		if (request instanceof HttpContent) {
//			System.err.println();//??
		}

		if (HttpMethod.GET == method) {
			// 是GET请求
			String uri = request.getUri().replace(";", "@__@");
			QueryStringDecoder decoder = new QueryStringDecoder(uri);
			Set<Entry<String, List<String>>> entrySet = decoder.parameters().entrySet();
			entrySet.forEach(entry -> {
				// entry.getValue()是一个List, 只取第一个元素
				parmMap.put(entry.getKey(), entry.getValue().get(0).replace("@__@", ";"));
			});
			// HashMap<String, String> paramters =
			// AnalyzeUtils.getParamters(request.getUri());
			// if (paramters != null) {
			// parmMap.putAll(paramters);
			// }
		} else if (HttpMethod.POST == method) {
			// 是POST请求
			HttpDataFactory factory = new DefaultHttpDataFactory(false);
			HttpPostRequestDecoder decoder = null;
			try {
				decoder = new HttpPostRequestDecoder(factory, request);
				// decoder.offer(request);
			} catch (Exception e1) {
				e1.printStackTrace();
			}

			List<InterfaceHttpData> parmList = decoder.getBodyHttpDatas();

			for (InterfaceHttpData parm : parmList) {
				// Attribute data = (Attribute) parm;
				// parmMap.put(data.getName(), data.getValue());

				if (parm.getHttpDataType() == HttpDataType.Attribute) {
					Attribute data = (Attribute) parm;
					parmMap.put(data.getName(), data.getValue());
					System.err.println(data.getName() + "=" + data.getValue());
					LogTool.info("RequestParser, "+data.getName() + "=" + data.getValue(), RequestParser.class);
				} else if (parm.getHttpDataType() == HttpDataType.InternalAttribute) {
				} else {
					String uploadFileName = getUploadFileName(parm);
					FileUpload fileUpload = (FileUpload) parm;
					System.out.println("fileUpload.length()=" + fileUpload.length());
					if (fileUpload.isCompleted()) {
						// fileUpload.isInMemory();// tells if the file is in Memory
						// or on File
						// fileUpload.renameTo(dest); // enable to move into another
						// File dest
						// decoder.removeFileUploadFromClean(fileUpload); //remove
						// the File of to delete file
						File dir = new File("C:\\" + "download" + File.separator);
						if (!dir.exists()) {
							dir.mkdir();
						}
						File dest = new File(dir, "热更文件.txt");
						try {
							FileOutputStream fos = new FileOutputStream(dest);
							fos.write(fileUpload.get());
							fos.flush();
							fos.close();
							// fileUpload.renameTo(dest);
							// decoder.removeHttpDataFromClean(fileUpload);
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}

		}
		return parmMap;
	}

	public static String getUploadFileName(InterfaceHttpData data) {
		String content = data.toString();
		String temp = content.substring(0, content.indexOf("\n"));
		content = temp.substring(temp.lastIndexOf("=") + 2, temp.lastIndexOf("\""));
		return content;
	}

}
