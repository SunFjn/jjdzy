package com.teamtop.houtaiHttp.qqGift;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.config.RequestConfig.Builder;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;

/**
 * Http(Https)代理类.实现了除multipart/form-data表单以外的代理.
 * 暂时没使用上文件上传,暂未实现multipart/form-data表单
 * @author feng
 *
 */

public class HttpProxy {
	//请求URL
	private String url;

	//Post参数
	private String postString;
	//请求Cookie
	private String requestCookie;
	//来源地址
	private String referer;
	
	//编码
	private String encoding="utf-8";
	
	//请求方法
	private String method="GET";
	
	
	//客户端信息
	private String userAgent="Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)";
	
	//响应Cookie
	private String responceCookie;
	
	//http代理地址
	private String proxyHost;
	//http代理端口
	private int proxyPort;
	//http代理协议
	private String proxyScheme="http";

	//超时,毫秒
	private int timeOut=5000;
	
	
	//发送表单内容
	private ArrayList<BasicNameValuePair> postData=new ArrayList<BasicNameValuePair>();
	//查询参数
	private ArrayList<BasicNameValuePair> queryData=new ArrayList<BasicNameValuePair>();
	
	//请求标头
	private ArrayList<BasicNameValuePair> requestHeaders=new ArrayList<BasicNameValuePair>();
	//响应标头
	private ArrayList<BasicNameValuePair> responseHeaders=new ArrayList<BasicNameValuePair>();
	
	//响应内容
	private String body;
	
	//错误信息
	private String errorMessage;
	//返回结果
	private String result;
	//返回Http状态码
	private int statusCode;

	
	private CloseableHttpClient createSSLClientDefault() {
		try {
			SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(
					null, new TrustStrategy() {
						// 信任所有
						public boolean isTrusted(X509Certificate[] chain,
								String authType) throws CertificateException {
							return true;
						}
					}).build();
			
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(
					sslContext,new HostnameVerifier() {
						//不检查主机头
						@Override
						public boolean verify(String hostname, SSLSession session) {
							return true;
						}
					});
			
			return HttpClients.custom().setSSLSocketFactory(sslsf).build();
		} catch (Exception e) {

		}
		return HttpClients.createDefault();
	}
	
	public boolean sendGet(){
		chopUrl();
		
		CloseableHttpClient client = null;  
		
		if(url.startsWith("https")){
			client=createSSLClientDefault();
		}else{
			client = HttpClientBuilder.create().build();
		}
		
		HttpGet httpGet=new HttpGet(url);
		preRequest(httpGet);	
		
		String body="";
		CloseableHttpResponse response=null;
		try{
			response= client.execute(httpGet);

			dealResponse(response);
		}catch(Exception ex){
			this.errorMessage=ex.getMessage();
			ex.printStackTrace();
			return false;
		}finally{
			try {
				httpGet.releaseConnection();
				response.close();
				client.close();
			} catch (IOException e) {
			}
		}
		this.statusCode=response.getStatusLine().getStatusCode();
		this.result=body;
		return true;
	}
	
	public boolean sendPost(){
		chopUrl();

		CloseableHttpClient client = null;  
		
		if(url.startsWith("https")){
			client=createSSLClientDefault();
		}else{
			client = HttpClientBuilder.create().build();
		}
		
		HttpPost httpPost=new HttpPost(url);

		preRequest(httpPost);
		
		String body="";
		CloseableHttpResponse response=null;
		try{
			//写入Post请求参数
			if(postData.size()>0){
				UrlEncodedFormEntity uefEntity=new UrlEncodedFormEntity(postData,encoding);
				httpPost.setEntity(uefEntity);
			}else if(postString!=null&&postString.length()>0){
				StringEntity strEntity=new StringEntity(postString,encoding);
				httpPost.setEntity(strEntity);
			}
			
			response= client.execute(httpPost);

			dealResponse(response);
			
			
		}catch(Exception ex){
			this.errorMessage=ex.getMessage();
			ex.printStackTrace();
			return false;
		}finally{
			try {
				httpPost.releaseConnection();
				response.close();
				client.close();
			} catch (Exception e) {
			}
		}
		this.statusCode=response.getStatusLine().getStatusCode();
		this.result=body;
		return true;
	}
	
	
	
	//发送请求
	public  Boolean send(){
		return true;
	}
	

	
	private void chopUrl(){
		if(queryData.size()>0){
			String queryString="";
			for(BasicNameValuePair kv:queryData){
				try {
					queryString=String.format("%s&%s=%s", queryString,kv.getName(),URLEncoder.encode(kv.getValue(),encoding));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
			}
			queryData.clear();
			if (url.indexOf("?")!=-1) {
				url=String.format("%s%s", url,queryString);
			}else{
				url=String.format("%s?%s", url,queryString.substring(1));
			}
		}
	}
	
	private void dealResponse(CloseableHttpResponse response) throws ParseException, IOException{
		ArrayList<BasicNameValuePair> kvs=new ArrayList<BasicNameValuePair>();
		Header[] headers=response.getAllHeaders();
		for(Header header : headers){
			kvs.add(new BasicNameValuePair(header.getName(),header.getValue()));
		}
		this.responseHeaders=kvs;
		
		HttpEntity httpEntity=response.getEntity();
		
		Charset charset=null;
		ContentType contype=ContentType.get(httpEntity);
		if(contype!=null){
			charset=contype.getCharset();
		}
		if(charset==null){
			charset=Charset.forName(encoding);
		}

		this.body=EntityUtils.toString(httpEntity,charset);
	}
	
	private void preRequest(HttpRequestBase request){
		request.addHeader("User-Agent",userAgent);
		
		if(referer!=null&&referer.length()>0)
			request.addHeader("Referer", referer);
		if(requestCookie!=null&&requestCookie.length()>0){
			request.addHeader("Cookie",requestCookie);
		}
		
		//写入请求标头
		for(BasicNameValuePair kv : requestHeaders){
			request.addHeader(kv.getName(),kv.getValue());
		}
		Builder builder=RequestConfig.custom();
		
		if(proxyHost!=null&&proxyHost.length()>0&&proxyPort>0){
			HttpHost proxy=new HttpHost(proxyHost, proxyPort,proxyScheme);
			builder.setProxy(proxy);
			
		}
		if(timeOut>0){
			builder=builder.setConnectTimeout(timeOut).setSocketTimeout(timeOut);
		}
		request.setConfig(builder.build());
	}
	
	
	public void addHeader(String name,String value){
		BasicNameValuePair nv=new BasicNameValuePair(name, value);
		this.requestHeaders.add(nv);
	}
	
	public void addQuery(String name,String value){
		BasicNameValuePair nv=new BasicNameValuePair(name, value);
		this.queryData.add(nv);
	}
	
	public void addPost(String name,String value){
		BasicNameValuePair nv=new BasicNameValuePair(name, value);
		this.postData.add(nv);
	}
	

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPostString() {
		return postString;
	}

	public void setPostString(String postString) {
		this.postString = postString;
	}

	public String getRequestCookie() {
		return requestCookie;
	}

	public void setRequestCookie(String requestCookie) {
		this.requestCookie = requestCookie;
	}

	public String getReferer() {
		return referer;
	}

	public void setReferer(String referer) {
		this.referer = referer;
	}

	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	public String getResponceCookie() {
		return responceCookie;
	}

	public void setResponceCookie(String responceCookie) {
		this.responceCookie = responceCookie;
	}

	public ArrayList<BasicNameValuePair> getPostData() {
		return postData;
	}

	public void setPostData(ArrayList<BasicNameValuePair> postData) {
		this.postData = postData;
	}

	public ArrayList<BasicNameValuePair> getQueryData() {
		return queryData;
	}

	public void setQueryData(ArrayList<BasicNameValuePair> queryData) {
		this.queryData = queryData;
	}

	public ArrayList<BasicNameValuePair> getRequestHeaders() {
		return requestHeaders;
	}

	public void setRequestHeaders(ArrayList<BasicNameValuePair> requestHeaders) {
		this.requestHeaders = requestHeaders;
	}

	public ArrayList<BasicNameValuePair> getResponseHeaders() {
		return responseHeaders;
	}

	public void setResponseHeaders(ArrayList<BasicNameValuePair> responseHeaders) {
		this.responseHeaders = responseHeaders;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getProxyHost() {
		return proxyHost;
	}

	public void setProxyHost(String proxyHost) {
		this.proxyHost = proxyHost;
	}

	public int getProxyPort() {
		return proxyPort;
	}

	public void setProxyPort(int proxyPort) {
		this.proxyPort = proxyPort;
	}

	public String getProxyScheme() {
		return proxyScheme;
	}

	public void setProxyScheme(String proxyScheme) {
		this.proxyScheme = proxyScheme;
	}

	public int getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(int timeOut) {
		this.timeOut = timeOut;
	}

}
