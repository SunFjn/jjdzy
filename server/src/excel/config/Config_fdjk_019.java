package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdjk_019;
public class Config_fdjk_019 extends ConfigBase<Struct_fdjk_019> {
    private static Config_fdjk_019 ins = null;
    public static Config_fdjk_019 getIns(){
        if(ins==null){
            ins = new Config_fdjk_019();
        }
        return ins;
    }
    private Config_fdjk_019(){
        put(102001,new Struct_fdjk_019(102001,5400));
        put(102002,new Struct_fdjk_019(102002,5400));
        put(102003,new Struct_fdjk_019(102003,7200));
        put(102004,new Struct_fdjk_019(102004,7200));
        put(102005,new Struct_fdjk_019(102005,9000));
        put(102006,new Struct_fdjk_019(102006,9000));
        put(102007,new Struct_fdjk_019(102007,10800));
        put(102008,new Struct_fdjk_019(102008,12600));
        put(102009,new Struct_fdjk_019(102009,13500));
        put(102010,new Struct_fdjk_019(102010,14400));
        put(102011,new Struct_fdjk_019(102011,15300));
        put(102012,new Struct_fdjk_019(102012,16200));
        put(102013,new Struct_fdjk_019(102013,16200));
        put(102014,new Struct_fdjk_019(102014,17100));
        put(102015,new Struct_fdjk_019(102015,17100));
        put(102016,new Struct_fdjk_019(102016,18000));
        put(102017,new Struct_fdjk_019(102017,18000));
        put(102018,new Struct_fdjk_019(102018,18900));
        put(102019,new Struct_fdjk_019(102019,18900));
        put(102020,new Struct_fdjk_019(102020,19800));
    }
    public void reset(){
        ins = null;
    }
}