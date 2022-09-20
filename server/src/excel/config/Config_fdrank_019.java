package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdrank_019;
public class Config_fdrank_019 extends ConfigBase<Struct_fdrank_019> {
    private static Config_fdrank_019 ins = null;
    public static Config_fdrank_019 getIns(){
        if(ins==null){
            ins = new Config_fdrank_019();
        }
        return ins;
    }
    private Config_fdrank_019(){
        put(1,new Struct_fdrank_019(1,1,1,"[[22,0,15000]]"));
        put(2,new Struct_fdrank_019(2,2,2,"[[22,0,10000]]"));
        put(3,new Struct_fdrank_019(3,3,3,"[[22,0,8000]]"));
        put(4,new Struct_fdrank_019(4,4,10,"[[22,0,5000]]"));
        put(5,new Struct_fdrank_019(5,11,20,"[[22,0,3000]]"));
        put(6,new Struct_fdrank_019(6,21,50,"[[22,0,1000]]"));
    }
    public void reset(){
        ins = null;
    }
}