package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdrc_019;
public class Config_fdrc_019 extends ConfigBase<Struct_fdrc_019> {
    private static Config_fdrc_019 ins = null;
    public static Config_fdrc_019 getIns(){
        if(ins==null){
            ins = new Config_fdrc_019();
        }
        return ins;
    }
    private Config_fdrc_019(){
        put(1,new Struct_fdrc_019(1,"[[21,0,25],[22,0,80]]"));
        put(2,new Struct_fdrc_019(2,"[[21,0,25],[22,0,80]]"));
        put(3,new Struct_fdrc_019(3,"[[21,0,25],[22,0,80]]"));
        put(4,new Struct_fdrc_019(4,"[[21,0,50],[22,0,140]]"));
        put(5,new Struct_fdrc_019(5,"[[21,0,50],[22,0,140]]"));
        put(6,new Struct_fdrc_019(6,"[[21,0,25],[22,0,80]]"));
    }
    public void reset(){
        ins = null;
    }
}