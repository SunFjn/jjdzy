package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdqd_019;
public class Config_fdqd_019 extends ConfigBase<Struct_fdqd_019> {
    private static Config_fdqd_019 ins = null;
    public static Config_fdqd_019 getIns(){
        if(ins==null){
            ins = new Config_fdqd_019();
        }
        return ins;
    }
    private Config_fdqd_019(){
        put(1,new Struct_fdqd_019(1,350401,40000,"[[21,0,60],[22,0,150],[1,416089,1]]"));
        put(2,new Struct_fdqd_019(2,350402,40000,"[[21,0,80],[22,0,180],[1,416089,2]]"));
        put(3,new Struct_fdqd_019(3,350403,20000,"[[21,0,100],[22,0,200],[1,416089,3]]"));
    }
    public void reset(){
        ins = null;
    }
}