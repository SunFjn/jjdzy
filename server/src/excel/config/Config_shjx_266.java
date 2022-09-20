package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shjx_266;
public class Config_shjx_266 extends ConfigBase<Struct_shjx_266> {
    private static Config_shjx_266 ins = null;
    public static Config_shjx_266 getIns(){
        if(ins==null){
            ins = new Config_shjx_266();
        }
        return ins;
    }
    private Config_shjx_266(){
        put(110,new Struct_shjx_266(110,1,"[[102,1800000],[103,58000],[104,32000]]"));
        put(111,new Struct_shjx_266(111,1,"[[102,1800000],[103,58000],[104,32000]]"));
        put(112,new Struct_shjx_266(112,1,"[[102,1800000],[103,58000],[104,32000]]"));
        put(120,new Struct_shjx_266(120,2,"[[102,1800000],[103,58000],[104,32000]]"));
        put(121,new Struct_shjx_266(121,2,"[[102,1800000],[103,58000],[104,32000]]"));
        put(122,new Struct_shjx_266(122,2,"[[102,1800000],[103,58000],[104,32000]]"));
        put(130,new Struct_shjx_266(130,3,"[[102,1800000],[103,58000],[104,32000]]"));
        put(131,new Struct_shjx_266(131,3,"[[102,1800000],[103,58000],[104,32000]]"));
        put(132,new Struct_shjx_266(132,3,"[[102,1800000],[103,58000],[104,32000]]"));
        put(140,new Struct_shjx_266(140,4,"[[102,1800000],[103,58000],[104,32000]]"));
        put(141,new Struct_shjx_266(141,4,"[[102,1800000],[103,58000],[104,32000]]"));
        put(142,new Struct_shjx_266(142,4,"[[102,1800000],[103,58000],[104,32000]]"));
    }
    public void reset(){
        ins = null;
    }
}