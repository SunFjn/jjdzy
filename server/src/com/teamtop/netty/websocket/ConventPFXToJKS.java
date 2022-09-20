package com.teamtop.netty.websocket;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Key;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.util.Enumeration;

public class ConventPFXToJKS {
	public static final String PKCS12 = "PKCS12";
    public static final String JKS = "JKS";
    public static final String PFX_KEYSTORE_FILE = "D:\\temp\\certs\\214835473260004.pfx";// pfx文件位置
    public static final String PFX_PASSWORD = "214835473260004";// 导出为pfx文件的设的密码
    public static final String JKS_KEYSTORE_FILE = "D:\\temp\\certs\\_.sgzj.com.jks"; // jks文件位置
    public static final String JKS_PASSWORD = "123asd";// JKS的密码

    public static void coverTokeyStore() {
        FileInputStream fis = null;
        FileOutputStream out = null;
        try {
            KeyStore inputKeyStore = KeyStore.getInstance("PKCS12");
            fis = new FileInputStream(PFX_KEYSTORE_FILE);
            char[] pfxPassword = null;
            if ((PFX_PASSWORD == null) || PFX_PASSWORD.trim().equals("")) {
                pfxPassword = null;
            } else {
                pfxPassword = PFX_PASSWORD.toCharArray();
            }
            char[] jksPassword = null;
            if ((JKS_PASSWORD == null) || JKS_PASSWORD.trim().equals("")) {
                jksPassword = null;
            } else {
                jksPassword = JKS_PASSWORD.toCharArray();
            }

            inputKeyStore.load(fis, pfxPassword);
            fis.close();
            KeyStore outputKeyStore = KeyStore.getInstance("JKS");
            outputKeyStore.load(null, jksPassword);
            Enumeration enums = inputKeyStore.aliases();
            while (enums.hasMoreElements()) { // we are readin just one
                // certificate.
                String keyAlias = (String) enums.nextElement();
                System.out.println("alias=[" + keyAlias + "]");
                if (inputKeyStore.isKeyEntry(keyAlias)) {
                    Key key = inputKeyStore.getKey(keyAlias, pfxPassword);
                    Certificate[] certChain = inputKeyStore.getCertificateChain(keyAlias);
                    outputKeyStore.setKeyEntry(keyAlias, key, jksPassword, certChain);
                }
            }

            out = new FileOutputStream(JKS_KEYSTORE_FILE);
            outputKeyStore.store(out, jksPassword);
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        coverTokeyStore(); // pfx to jks
    }
}
