package com.teamtop.netty.ssl.server;

import io.netty.util.internal.SystemPropertyUtil;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.FileInputStream;
import java.security.KeyStore;

public final class ServerContextFactory {

    private static final String PROTOCOL = "TLS";
    private static final SSLContext SERVER_CONTEXT;


    private static String SERVER_KEY_STORE = "src/com/teamtop/netty/ssl/server/sslserverkeys";
    private static String SERVER_KEY_STORE_PASSWORD = "123456";
//    private static String SERVER_TRUST_KEY_STORE = "C:\\Program Files\\Java\\jdk1.8.0_73\\bin\\sslservertrust";
//    private static String SERVER_TRUST_KEY_STORE_PASSWORD = "123456";

    static {
    	
        String algorithm = SystemPropertyUtil.get("ssl.KeyManagerFactory.algorithm");
        if (algorithm == null) {
            algorithm = "SunX509";
        }

        SSLContext serverContext;
        try {
            KeyStore ks = KeyStore.getInstance("JKS");
            ks.load(new FileInputStream(SERVER_KEY_STORE), SERVER_KEY_STORE_PASSWORD.toCharArray());
            KeyManagerFactory kmf = KeyManagerFactory.getInstance(algorithm);
            kmf.init(ks, SERVER_KEY_STORE_PASSWORD.toCharArray());
//            KeyStore tks = KeyStore.getInstance("JKS");
//            tks.load(new FileInputStream(SERVER_TRUST_KEY_STORE), SERVER_TRUST_KEY_STORE_PASSWORD.toCharArray());

            // Set up key manager factory to use our key store
//            TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
//            tmf.init(tks);

            // Initialize the SSLContext to work with our key managers.
            serverContext = SSLContext.getInstance(PROTOCOL);
            serverContext.init(kmf.getKeyManagers(), /*tmf.getTrustManagers()*/null, null);
        } catch (Exception e) {
            throw new Error("Failed to initialize the server-side SSLContext", e);
        }


        SERVER_CONTEXT = serverContext;
    }


    public static SSLContext getServerContext() {
        return SERVER_CONTEXT;
    }


    private ServerContextFactory() {
        // Unused
    }
}