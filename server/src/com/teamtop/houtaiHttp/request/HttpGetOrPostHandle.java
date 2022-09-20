package com.teamtop.houtaiHttp.request;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.util.log.LogTool;

public class HttpGetOrPostHandle {

	public static String postInfo(List<NameValuePair> params, String url) {
		String result = "";
		CloseableHttpClient httpclient = null;
		try {
			httpclient = HttpClientBuilder.create().build();
			RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000) // 设置连接超时时间
					.setConnectionRequestTimeout(5000) // 设置请求超时时间
					.setSocketTimeout(5000)
					// .setRedirectsEnabled(true)//默认允许自动重定向
					.build();
			// List<NameValuePair> params = new ArrayList<NameValuePair>();
			// params.add(new BasicNameValuePair("name", "zhang"));
			// params.add(new BasicNameValuePair("passwd", "123"));
			HttpPost httppost = new HttpPost(url);
			httppost.setConfig(requestConfig);
			httppost.setEntity(new UrlEncodedFormEntity(params, "utf-8"));

			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				// System.out.println(response.toString());
				HttpEntity entity = response.getEntity();
				String jsonStr = EntityUtils.toString(entity, "utf-8");
				System.out.println("HttpGetOrPostHandle.postInfo:"+jsonStr);
				result = jsonStr;
			} finally {
				response.close();
			}

			httppost.releaseConnection();
		} catch (Throwable e) {
			LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo");
		} finally {
			// 关闭连接释放资源
			try {
				if (httpclient != null) {
					httpclient.close();
				}
			} catch (IOException e) {
				LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo httpclient.close()");
			}
		}
		return result;

		/**/
		// StringBuffer sb = new StringBuffer();
		// try {
		// String url = "";
		// URL urls = new URL(url);
		// HttpURLConnection uc = (HttpURLConnection) urls.openConnection();
		// uc.setRequestMethod("POST");
		// uc.setRequestProperty("content-type", "application/x-www-form-urlencoded");
		// uc.setRequestProperty("charset", "UTF-8");
		// uc.setDoOutput(true);
		// uc.setDoInput(true);
		// uc.setReadTimeout(10000);
		// uc.setConnectTimeout(10000);
		// OutputStream os = uc.getOutputStream();
		// DataOutputStream dos = new DataOutputStream(os);
		// dos.write(message.getBytes("utf-8"));
		// dos.flush();
		// os.close();
		// BufferedReader in = new BufferedReader(new
		// InputStreamReader(uc.getInputStream(), "utf-8"));
		// String readLine = "";
		// while ((readLine = in.readLine()) != null) {
		// sb.append(readLine);
		// }
		// in.close();
		// } catch (Exception e) {
		// LogTool.error(e, ChatMonitoring.class, "");
		// }
	}

	public static String postJsonInfo(JSONObject params, String url) {
		String result = "";
		CloseableHttpClient httpclient = null;
		try {
			httpclient = HttpClientBuilder.create().build();
			RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000) // 设置连接超时时间
					.setConnectionRequestTimeout(5000) // 设置请求超时时间
					.setSocketTimeout(5000)
					// .setRedirectsEnabled(true)//默认允许自动重定向
					.build();
			// List<NameValuePair> params = new ArrayList<NameValuePair>();
			// params.add(new BasicNameValuePair("name", "zhang"));
			// params.add(new BasicNameValuePair("passwd", "123"));
			HttpPost httppost = new HttpPost(url);
			httppost.setConfig(requestConfig);
			StringEntity formEntity = new StringEntity(params.toJSONString(), "utf-8");
			formEntity.setContentType("application/json");
			httppost.setEntity(formEntity);

			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				// System.out.println(response.toString());
				HttpEntity entity = response.getEntity();
				String jsonStr = EntityUtils.toString(entity, "utf-8");
				System.out.println("HttpGetOrPostHandle.postInfo:" + jsonStr);
				result = jsonStr;
			} finally {
				response.close();
			}

			httppost.releaseConnection();
		} catch (Throwable e) {
			LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo");
		} finally {
			// 关闭连接释放资源
			try {
				if (httpclient != null) {
					httpclient.close();
				}
			} catch (IOException e) {
				LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo httpclient.close()");
			}
		}
		return result;
	}
	
	public static String postImage(String url, String filePath) {
		String result = "";
		CloseableHttpClient httpclient = null;
		try {
			httpclient = HttpClientBuilder.create().build();
			RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000) // 设置连接超时时间
					.setConnectionRequestTimeout(5000) // 设置请求超时时间
					.setSocketTimeout(5000)
					// .setRedirectsEnabled(true)//默认允许自动重定向
					.build();
			HttpPost httpPost = new HttpPost(url);
			httpPost.setConfig(requestConfig);
			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			// builder.setCharset(Charset.forName("UTF-8"));// 设置请求的编码格式(没必要设置，设置还会导致接收解析boundary错误)
//			builder.setMode(HttpMultipartMode.RFC6532);
			builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
			File file = new File(filePath);
			builder.addBinaryBody("media", file);
			// FileInputStream fileInputStream = new FileInputStream(file);
			// builder.addBinaryBody("media", fileInputStream,
			// ContentType.create("multipart/form-data", Charset.forName("UTF-8")),
			// file.getName());// 文件流
			// builder.addBinaryBody("file", new FileInputStream(file));
			HttpEntity httpEntity = builder.build();
			httpPost.setEntity(httpEntity);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				System.out.println("HttpGetOrPostHandle.postFileAndInfo:"+response.toString());
				HttpEntity entity = response.getEntity();
				String jsonStr = EntityUtils.toString(entity, "utf-8");
				result = jsonStr;
				System.out.println("HttpGetOrPostHandle.postFileAndInfo:"+jsonStr);
			} finally {
				response.close();
			}

			httpPost.releaseConnection();
		} catch (Throwable e) {
			LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo");
		} finally {
			// 关闭连接释放资源
			try {
				if (httpclient != null) {					
					httpclient.close();
				}
			} catch (IOException e) {
				LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo httpclient.close()");
			}
		}
		return result;
	}

	public static void postFileAndInfo(String url, String filePath, Map<String, String> paramMap) {
		CloseableHttpClient httpclient = null;
		try {
			httpclient = HttpClientBuilder.create().build();
			RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000) // 设置连接超时时间
					.setConnectionRequestTimeout(5000) // 设置请求超时时间
					.setSocketTimeout(5000)
					// .setRedirectsEnabled(true)//默认允许自动重定向
					.build();
			HttpPost httpPost = new HttpPost(url);
			httpPost.setConfig(requestConfig);
			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			// builder.setCharset(Charset.forName("UTF-8"));// 设置请求的编码格式(没必要设置，设置还会导致接收解析boundary错误)
			builder.setMode(HttpMultipartMode.RFC6532);
			Iterator<Entry<String, String>> iterator = paramMap.entrySet().iterator();
			Entry<String, String> entry = null;
			for(;iterator.hasNext();) {
				entry = iterator.next();
				builder.addTextBody(entry.getKey(), entry.getValue(), ContentType.create("multipart/form-data", Charset.forName("UTF-8")));
//				builder.addTextBody("down", "888", ContentType.create("multipart/form-data", Charset.forName("UTF-8")));
			}
			File file = new File(filePath);
			builder.addBinaryBody("file", file);
			// builder.addBinaryBody("file", new FileInputStream(file));
			HttpEntity httpEntity = builder.build();
			httpPost.setEntity(httpEntity);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				System.out.println("HttpGetOrPostHandle.postFileAndInfo:"+response.toString());
				HttpEntity entity = response.getEntity();
				String jsonStr = EntityUtils.toString(entity, "utf-8");
				System.out.println("HttpGetOrPostHandle.postFileAndInfo:"+jsonStr);
			} finally {
				response.close();
			}

			httpPost.releaseConnection();
		} catch (Throwable e) {
			LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo");
		} finally {
			// 关闭连接释放资源
			try {
				if (httpclient != null) {					
					httpclient.close();
				}
			} catch (IOException e) {
				LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle postInfo httpclient.close()");
			}
		}
	}

	/**
	 * 通过get方法请求
	 * @param url
	 */
	public static String doGetInfo(String url, String parmsStr) {
		String result = "";
		CloseableHttpClient httpCilent = null;
		try {
			httpCilent = HttpClientBuilder.create().build();
			RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000) // 设置连接超时时间
					.setConnectionRequestTimeout(5000) // 设置请求超时时间
					.setSocketTimeout(5000)
					// .setRedirectsEnabled(true)//默认允许自动重定向
					.build();
			HttpGet httpGet = new HttpGet(url + "?" + parmsStr);
			httpGet.setConfig(requestConfig);
			CloseableHttpResponse response = httpCilent.execute(httpGet);
			try {
				LogTool.info("HttpGetOrPostHandle.doGetInfo" + response.toString(), HttpGetOrPostHandle.class);
				// System.out.println("HttpGetOrPostHandle.doGetInfo"+response.toString());
				HttpEntity entity = response.getEntity();
				String jsonStr = EntityUtils.toString(entity, "utf-8");
				result = jsonStr;
				LogTool.info("HttpGetOrPostHandle.doGetInfo" + jsonStr, HttpGetOrPostHandle.class);
				// System.out.println("HttpGetOrPostHandle.doGetInfo"+jsonStr);
			} finally {
				response.close();
			}
		} catch (Throwable e) {
			LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle getInfo");
		} finally {
			try {
				if (httpCilent != null) {					
					httpCilent.close();// 释放资源
				}
			} catch (IOException e) {
				LogTool.error(e, HttpGetOrPostHandle.class, "HttpGetOrPostHandle getInfo httpclient.close()");
			}
		}
		return result;
	}

}
