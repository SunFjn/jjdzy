package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdtgl_019;
public class Config_fdtgl_019 extends ConfigBase<Struct_fdtgl_019> {
    private static Config_fdtgl_019 ins = null;
    public static Config_fdtgl_019 getIns(){
        if(ins==null){
            ins = new Config_fdtgl_019();
        }
        return ins;
    }
    private Config_fdtgl_019(){
        put(101001,new Struct_fdtgl_019(101001,3));
        put(101002,new Struct_fdtgl_019(101002,3));
        put(101003,new Struct_fdtgl_019(101003,4));
        put(101004,new Struct_fdtgl_019(101004,4));
        put(101005,new Struct_fdtgl_019(101005,5));
        put(101006,new Struct_fdtgl_019(101006,6));
        put(101007,new Struct_fdtgl_019(101007,7));
        put(101008,new Struct_fdtgl_019(101008,8));
        put(101009,new Struct_fdtgl_019(101009,9));
        put(101010,new Struct_fdtgl_019(101010,10));
        put(101011,new Struct_fdtgl_019(101011,11));
        put(101012,new Struct_fdtgl_019(101012,12));
        put(101013,new Struct_fdtgl_019(101013,13));
        put(101014,new Struct_fdtgl_019(101014,14));
        put(101015,new Struct_fdtgl_019(101015,15));
        put(101016,new Struct_fdtgl_019(101016,16));
        put(101017,new Struct_fdtgl_019(101017,17));
        put(101018,new Struct_fdtgl_019(101018,18));
        put(101019,new Struct_fdtgl_019(101019,19));
        put(101020,new Struct_fdtgl_019(101020,20));
    }
    public void reset(){
        ins = null;
    }
}