package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bossts_200;
public class Config_bossts_200 extends ConfigBase<Struct_bossts_200> {
    private static Config_bossts_200 ins = null;
    public static Config_bossts_200 getIns(){
        if(ins==null){
            ins = new Config_bossts_200();
        }
        return ins;
    }
    private Config_bossts_200(){
        put(1,new Struct_bossts_200(1,1805,0));
        put(2,new Struct_bossts_200(2,1804,240001));
        put(3,new Struct_bossts_200(3,1804,240002));
        put(4,new Struct_bossts_200(4,1804,240003));
        put(5,new Struct_bossts_200(5,1804,240004));
        put(6,new Struct_bossts_200(6,1804,240005));
        put(8,new Struct_bossts_200(8,1803,2));
        put(9,new Struct_bossts_200(9,1803,3));
        put(10,new Struct_bossts_200(10,1803,4));
        put(11,new Struct_bossts_200(11,1803,5));
        put(12,new Struct_bossts_200(12,1803,6));
        put(13,new Struct_bossts_200(13,1803,7));
        put(14,new Struct_bossts_200(14,1803,8));
        put(15,new Struct_bossts_200(15,1803,9));
        put(16,new Struct_bossts_200(16,1803,10));
        put(17,new Struct_bossts_200(17,1803,11));
        put(18,new Struct_bossts_200(18,1803,12));
        put(19,new Struct_bossts_200(19,1803,13));
        put(100,new Struct_bossts_200(100,6211,1001));
        put(101,new Struct_bossts_200(101,6211,1002));
        put(102,new Struct_bossts_200(102,6211,1003));
        put(103,new Struct_bossts_200(103,6211,1004));
        put(104,new Struct_bossts_200(104,6211,1005));
        put(105,new Struct_bossts_200(105,6211,1006));
        put(106,new Struct_bossts_200(106,6211,1007));
        put(107,new Struct_bossts_200(107,6211,1008));
        put(108,new Struct_bossts_200(108,6211,1009));
        put(109,new Struct_bossts_200(109,6211,1010));
        put(110,new Struct_bossts_200(110,6211,1011));
        put(111,new Struct_bossts_200(111,6211,1012));
        put(112,new Struct_bossts_200(112,6211,1013));
        put(113,new Struct_bossts_200(113,6211,1014));
        put(114,new Struct_bossts_200(114,6211,1015));
        put(115,new Struct_bossts_200(115,6211,1016));
        put(116,new Struct_bossts_200(116,6211,1017));
        put(117,new Struct_bossts_200(117,6211,1018));
        put(118,new Struct_bossts_200(118,6211,1019));
        put(119,new Struct_bossts_200(119,6211,1020));
        put(150,new Struct_bossts_200(150,6211,1021));
        put(151,new Struct_bossts_200(151,6211,1022));
        put(152,new Struct_bossts_200(152,6211,1023));
        put(153,new Struct_bossts_200(153,6211,1024));
        put(154,new Struct_bossts_200(154,6211,1025));
        put(155,new Struct_bossts_200(155,6212,2001));
        put(156,new Struct_bossts_200(156,6212,2002));
        put(157,new Struct_bossts_200(157,6212,2003));
        put(158,new Struct_bossts_200(158,6212,2004));
        put(159,new Struct_bossts_200(159,6212,2005));
        put(160,new Struct_bossts_200(160,6212,2006));
        put(161,new Struct_bossts_200(161,6212,2007));
        put(162,new Struct_bossts_200(162,6212,2008));
        put(163,new Struct_bossts_200(163,6212,2009));
        put(164,new Struct_bossts_200(164,6212,2010));
        put(165,new Struct_bossts_200(165,6212,2011));
        put(166,new Struct_bossts_200(166,6212,2012));
        put(167,new Struct_bossts_200(167,3702,0));
        put(168,new Struct_bossts_200(168,3703,0));
        put(169,new Struct_bossts_200(169,3705,0));
        put(170,new Struct_bossts_200(170,3603,0));
        put(171,new Struct_bossts_200(171,1603,0));
        put(172,new Struct_bossts_200(172,1604,0));
        put(173,new Struct_bossts_200(173,7203,0));
        put(174,new Struct_bossts_200(174,3707,0));
    }
    public void reset(){
        ins = null;
    }
}