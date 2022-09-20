package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bztjd_261;
public class Config_bztjd_261 extends ConfigBase<Struct_bztjd_261> {
    private static Config_bztjd_261 ins = null;
    public static Config_bztjd_261 getIns(){
        if(ins==null){
            ins = new Config_bztjd_261();
        }
        return ins;
    }
    private Config_bztjd_261(){
        put(1,new Struct_bztjd_261(1,"[[3,0,250000]]","[[3,0,2500000]]","[1,1011,1,3788,0;1,1021,1,3788,0;1,1031,1,3788,0;1,1041,1,3788,0;1,1051,1,3788,0;1,1061,1,3788,0;1,1071,1,3788,0;1,1081,1,3788,0;1,1091,1,3788,0;1,1101,1,3788,0;1,1012,1,1894,0;1,1022,1,1894,0;1,1032,1,1894,0;1,1042,1,1894,0;1,1052,1,1894,0;1,1062,1,1894,0;1,1072,1,1894,0;1,1082,1,1894,0;1,1092,1,1894,0;1,1102,1,1894,0;1,1013,1,189,0;1,1023,1,189,0;1,1033,1,189,0;1,1043,1,189,0;1,1053,1,189,0;1,1063,1,189,0;1,1073,1,189,0;1,1083,1,189,0;1,1093,1,189,0;1,1103,1,189,0;1,1001,1,27530,0;1,1002,1,13760,0]","0",20));
        put(2,new Struct_bztjd_261(2,"[[4,0,1000]]","[[4,0,9500]]","[1,1011,1,0,0;1,1021,1,0,0;1,1031,1,0,0;1,1041,1,0,0;1,1051,1,0,0;1,1061,1,0,0;1,1071,1,0,0;1,1081,1,0,0;1,1091,1,0,0;1,1101,1,0,0;1,1012,1,3340,0;1,1022,1,3340,0;1,1032,1,3340,0;1,1042,1,3340,0;1,1052,1,3340,0;1,1062,1,3340,0;1,1072,1,3340,0;1,1082,1,3340,0;1,1092,1,3340,0;1,1102,1,3340,0;1,1013,1,1940,0;1,1023,1,1940,0;1,1033,1,1940,0;1,1043,1,1940,0;1,1053,1,1940,0;1,1063,1,1940,0;1,1073,1,1940,0;1,1083,1,1940,0;1,1093,1,1940,0;1,1103,1,1940,0;1,1002,1,39400,0;1,1003,1,7800,0]","[1,1013,1,6190,1;1,1023,1,6190,1;1,1033,1,6190,1;1,1043,1,6190,1;1,1053,1,6190,1;1,1063,1,6190,1;1,1073,1,6190,1;1,1083,1,6190,1;1,1093,1,6190,1;1,1103,1,6190,1;1,1014,1,630,1;1,1024,1,630,1;1,1034,1,630,1;1,1044,1,630,1;1,1054,1,630,1;1,1064,1,630,1;1,1074,1,630,1;1,1084,1,630,1;1,1094,1,630,1;1,1104,1,630,1;1,1015,1,50,1;1,1025,1,50,1;1,1035,1,50,1;1,1045,1,50,1;1,1055,1,50,1;1,1065,1,50,1;1,1075,1,50,1;1,1085,1,50,1;1,1095,1,50,1;1,1105,1,50,1;1,1003,1,25000,1;1,1004,1,6300,1]",0));
    }
    public void reset(){
        ins = null;
    }
}