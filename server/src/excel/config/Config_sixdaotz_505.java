package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sixdaotz_505;
public class Config_sixdaotz_505 extends ConfigBase<Struct_sixdaotz_505> {
    private static Config_sixdaotz_505 ins = null;
    public static Config_sixdaotz_505 getIns(){
        if(ins==null){
            ins = new Config_sixdaotz_505();
        }
        return ins;
    }
    private Config_sixdaotz_505(){
        put(126,new Struct_sixdaotz_505(126,1,2,6,"[[114,2500]]"));
        put(128,new Struct_sixdaotz_505(128,1,2,8,"[[114,5000]]"));
        put(146,new Struct_sixdaotz_505(146,1,4,6,"[[114,7500]]"));
        put(148,new Struct_sixdaotz_505(148,1,4,8,"[[114,12000]]"));
        put(166,new Struct_sixdaotz_505(166,1,6,6,"[[114,17000]]"));
        put(168,new Struct_sixdaotz_505(168,1,6,8,"[[114,25000]]"));
        put(226,new Struct_sixdaotz_505(226,2,2,6,"[[110,1500]]"));
        put(228,new Struct_sixdaotz_505(228,2,2,8,"[[110,3000]]"));
        put(246,new Struct_sixdaotz_505(246,2,4,6,"[[110,4500]]"));
        put(248,new Struct_sixdaotz_505(248,2,4,8,"[[110,7500]]"));
        put(266,new Struct_sixdaotz_505(266,2,6,6,"[[110,10000]]"));
        put(268,new Struct_sixdaotz_505(268,2,6,8,"[[110,15000]]"));
        put(326,new Struct_sixdaotz_505(326,3,2,6,"[[302,1500],[100,300000]]"));
        put(328,new Struct_sixdaotz_505(328,3,2,8,"[[302,3000],[100,600000]]"));
        put(346,new Struct_sixdaotz_505(346,3,4,6,"[[302,4500],[100,900000]]"));
        put(348,new Struct_sixdaotz_505(348,3,4,8,"[[302,7500],[100,1500000]]"));
        put(366,new Struct_sixdaotz_505(366,3,6,6,"[[302,10000],[100,2000000]]"));
        put(368,new Struct_sixdaotz_505(368,3,6,8,"[[302,15000],[100,3000000]]"));
        put(426,new Struct_sixdaotz_505(426,4,2,6,"[[301,1500],[100,300000]]"));
        put(428,new Struct_sixdaotz_505(428,4,2,8,"[[301,3000],[100,600000]]"));
        put(446,new Struct_sixdaotz_505(446,4,4,6,"[[301,4500],[100,900000]]"));
        put(448,new Struct_sixdaotz_505(448,4,4,8,"[[301,7500],[100,1500000]]"));
        put(466,new Struct_sixdaotz_505(466,4,6,6,"[[301,10000],[100,2000000]]"));
        put(468,new Struct_sixdaotz_505(468,4,6,8,"[[301,15000],[100,3000000]]"));
        put(526,new Struct_sixdaotz_505(526,5,2,6,"[[117,1000]]"));
        put(528,new Struct_sixdaotz_505(528,5,2,8,"[[117,1500]]"));
        put(546,new Struct_sixdaotz_505(546,5,4,6,"[[117,3000]]"));
        put(548,new Struct_sixdaotz_505(548,5,4,8,"[[117,4500]]"));
        put(566,new Struct_sixdaotz_505(566,5,6,6,"[[117,6000]]"));
        put(568,new Struct_sixdaotz_505(568,5,6,8,"[[117,10000]]"));
        put(626,new Struct_sixdaotz_505(626,6,2,6,"[[116,1000]]"));
        put(628,new Struct_sixdaotz_505(628,6,2,8,"[[116,1500]]"));
        put(646,new Struct_sixdaotz_505(646,6,4,6,"[[116,3000]]"));
        put(648,new Struct_sixdaotz_505(648,6,4,8,"[[116,4500]]"));
        put(666,new Struct_sixdaotz_505(666,6,6,6,"[[116,6000]]"));
        put(668,new Struct_sixdaotz_505(668,6,6,8,"[[116,10000]]"));
    }
    public void reset(){
        ins = null;
    }
}