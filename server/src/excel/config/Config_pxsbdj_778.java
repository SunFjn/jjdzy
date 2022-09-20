package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_pxsbdj_778;
public class Config_pxsbdj_778 extends ConfigBase<Struct_pxsbdj_778> {
    private static Config_pxsbdj_778 ins = null;
    public static Config_pxsbdj_778 getIns(){
        if(ins==null){
            ins = new Config_pxsbdj_778();
        }
        return ins;
    }
    private Config_pxsbdj_778(){
        put(1,new Struct_pxsbdj_778(1,1,250000,5,"[[1,402005,1]]"));
        put(2,new Struct_pxsbdj_778(2,1,1500000,3,"[[1,402006,1]]"));
        put(3,new Struct_pxsbdj_778(3,1,5000000,3,"[[1,447010,1]]"));
        put(4,new Struct_pxsbdj_778(4,2,250000,5,"[[1,402005,1]]"));
        put(5,new Struct_pxsbdj_778(5,2,1500000,3,"[[1,402006,1]]"));
        put(6,new Struct_pxsbdj_778(6,2,5000000,3,"[[1,447010,1]]"));
        put(7,new Struct_pxsbdj_778(7,3,250000,5,"[[1,402005,1]]"));
        put(8,new Struct_pxsbdj_778(8,3,1500000,3,"[[1,402006,1]]"));
        put(9,new Struct_pxsbdj_778(9,3,5000000,3,"[[1,402031,1]]"));
        put(10,new Struct_pxsbdj_778(10,4,250000,5,"[[1,402005,1]]"));
        put(11,new Struct_pxsbdj_778(11,4,1500000,3,"[[1,402006,1]]"));
        put(12,new Struct_pxsbdj_778(12,4,5000000,3,"[[1,402031,1]]"));
        put(13,new Struct_pxsbdj_778(13,5,250000,5,"[[1,402005,1]]"));
        put(14,new Struct_pxsbdj_778(14,5,1500000,3,"[[1,402006,1]]"));
        put(15,new Struct_pxsbdj_778(15,5,5000000,3,"[[1,402031,1]]"));
        put(16,new Struct_pxsbdj_778(16,6,250000,5,"[[1,402005,1]]"));
        put(17,new Struct_pxsbdj_778(17,6,1500000,3,"[[1,402006,1]]"));
        put(18,new Struct_pxsbdj_778(18,6,5000000,3,"[[1,447010,1]]"));
        put(19,new Struct_pxsbdj_778(19,7,250000,5,"[[1,402005,1]]"));
        put(20,new Struct_pxsbdj_778(20,7,1500000,3,"[[1,402006,1]]"));
        put(21,new Struct_pxsbdj_778(21,7,5000000,3,"[[1,402031,1]]"));
        put(22,new Struct_pxsbdj_778(22,8,250000,5,"[[1,402005,1]]"));
        put(23,new Struct_pxsbdj_778(23,8,1500000,3,"[[1,402006,1]]"));
        put(24,new Struct_pxsbdj_778(24,8,5000000,3,"[[1,402031,1]]"));
    }
    public void reset(){
        ins = null;
    }
}