package com.teamtop.houtaiHttp.qqGift;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.net.ssl.X509TrustManager;

/**
 * https����֤�������
 * @author wp712_000
 *
 */

public class MyX509TrustManager implements X509TrustManager{

	 public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
     }
 
     public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
     }
 
     public X509Certificate[] getAcceptedIssuers() {
         return new X509Certificate[]{};
     }
 
	 private static class TrustAnyHostnameVerifier implements HostnameVerifier {
	     public boolean verify(String hostname, SSLSession session) {
	         return true;
	     }
	 }
}
