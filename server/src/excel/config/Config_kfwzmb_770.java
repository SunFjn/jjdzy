package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kfwzmb_770;
public class Config_kfwzmb_770 extends ConfigBase<Struct_kfwzmb_770> {
    private static Config_kfwzmb_770 ins = null;
    public static Config_kfwzmb_770 getIns(){
        if(ins==null){
            ins = new Config_kfwzmb_770();
        }
        return ins;
    }
    private Config_kfwzmb_770(){
        put(1,new Struct_kfwzmb_770(1,3,1,"[[1,411025,1],[1,411024,32]]"));
        put(2,new Struct_kfwzmb_770(2,5,1,"[[1,411025,1],[1,411024,48]]"));
        put(3,new Struct_kfwzmb_770(3,7,1,"[[1,410019,1],[1,411024,80]]"));
        put(4,new Struct_kfwzmb_770(4,10,1,"[[1,410019,3],[1,411024,80]]"));
        put(5,new Struct_kfwzmb_770(5,3,2,"[[1,411025,1],[1,411024,32]]"));
        put(6,new Struct_kfwzmb_770(6,5,2,"[[1,411025,1],[1,411024,48]]"));
        put(7,new Struct_kfwzmb_770(7,7,2,"[[1,410019,1],[1,411024,80]]"));
        put(8,new Struct_kfwzmb_770(8,10,2,"[[1,410019,3],[1,411024,80]]"));
        put(9,new Struct_kfwzmb_770(9,3,3,"[[1,411025,1],[1,411024,32]]"));
        put(10,new Struct_kfwzmb_770(10,5,3,"[[1,411025,1],[1,411024,48]]"));
        put(11,new Struct_kfwzmb_770(11,7,3,"[[1,410019,1],[1,411024,80]]"));
        put(12,new Struct_kfwzmb_770(12,10,3,"[[1,410019,3],[1,411024,80]]"));
        put(13,new Struct_kfwzmb_770(13,3,4,"[[1,411025,1],[1,411024,32]]"));
        put(14,new Struct_kfwzmb_770(14,5,4,"[[1,411025,1],[1,411024,48]]"));
        put(15,new Struct_kfwzmb_770(15,7,4,"[[1,410019,1],[1,411024,80]]"));
        put(16,new Struct_kfwzmb_770(16,10,4,"[[1,410019,3],[1,411024,80]]"));
        put(17,new Struct_kfwzmb_770(17,3,5,"[[1,411025,1],[1,411024,32]]"));
        put(18,new Struct_kfwzmb_770(18,5,5,"[[1,411025,1],[1,411024,48]]"));
        put(19,new Struct_kfwzmb_770(19,7,5,"[[1,410019,1],[1,411024,80]]"));
        put(20,new Struct_kfwzmb_770(20,10,5,"[[1,410019,3],[1,411024,80]]"));
    }
    public void reset(){
        ins = null;
    }
}