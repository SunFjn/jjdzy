package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_nzbz_226;
public class Config_nzbz_226 extends ConfigBase<Struct_nzbz_226> {
    private static Config_nzbz_226 ins = null;
    public static Config_nzbz_226 getIns(){
        if(ins==null){
            ins = new Config_nzbz_226();
        }
        return ins;
    }
    private Config_nzbz_226(){
        put(11,new Struct_nzbz_226(11,"[[1,1]]","[[1,400057,80],[11,0,2000]]"));
        put(12,new Struct_nzbz_226(12,"[[2,2]]","[[1,400057,60],[11,0,1500]]"));
        put(13,new Struct_nzbz_226(13,"[[3,3]]","[[1,400057,40],[11,0,1000]]"));
        put(21,new Struct_nzbz_226(21,"[[1,1]]","[[1,400057,200],[4,0,12500]]"));
        put(22,new Struct_nzbz_226(22,"[[2,2]]","[[1,400057,200],[4,0,10000]]"));
        put(23,new Struct_nzbz_226(23,"[[3,3]]","[[1,400057,100],[4,0,7500]]"));
        put(24,new Struct_nzbz_226(24,"[[4,10]]","[[1,400057,100],[4,0,5000]]"));
    }
    public void reset(){
        ins = null;
    }
}