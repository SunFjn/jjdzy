package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lbmh_307;
public class Config_lbmh_307 extends ConfigBase<Struct_lbmh_307> {
    private static Config_lbmh_307 ins = null;
    public static Config_lbmh_307 getIns(){
        if(ins==null){
            ins = new Config_lbmh_307();
        }
        return ins;
    }
    private Config_lbmh_307(){
        put(1001,new Struct_lbmh_307(1001,"[[0,120]]",400));
        put(1002,new Struct_lbmh_307(1002,"[[121,600]]",100));
        put(1003,new Struct_lbmh_307(1003,"[[601,780]]",0));
        put(1004,new Struct_lbmh_307(1004,"[[781,1200]]",-100));
        put(1005,new Struct_lbmh_307(1005,"[[1201,9999]]",-200));
        put(2001,new Struct_lbmh_307(2001,"[[0,120]]",400));
        put(2002,new Struct_lbmh_307(2002,"[[121,420]]",100));
        put(2003,new Struct_lbmh_307(2003,"[[421,660]]",0));
        put(2004,new Struct_lbmh_307(2004,"[[661,1500]]",-100));
        put(2005,new Struct_lbmh_307(2005,"[[1501,9999]]",-200));
    }
    public void reset(){
        ins = null;
    }
}