package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_mrfxjl_278;
public class Config_mrfxjl_278 extends ConfigBase<Struct_mrfxjl_278> {
    private static Config_mrfxjl_278 ins = null;
    public static Config_mrfxjl_278 getIns(){
        if(ins==null){
            ins = new Config_mrfxjl_278();
        }
        return ins;
    }
    private Config_mrfxjl_278(){
        put(1,new Struct_mrfxjl_278(1,"[[4,0,440]]"));
        put(2,new Struct_mrfxjl_278(2,"[[1,400057,8]]"));
        put(3,new Struct_mrfxjl_278(3,"[[4,0,540]]"));
        put(4,new Struct_mrfxjl_278(4,"[[1,410001,218]]"));
        put(5,new Struct_mrfxjl_278(5,"[[4,0,740]]"));
        put(6,new Struct_mrfxjl_278(6,"[[1,410002,10]]"));
        put(7,new Struct_mrfxjl_278(7,"[[1,400011,8]]"));
        put(8,new Struct_mrfxjl_278(8,"[[1,400175,15]]"));
    }
    public void reset(){
        ins = null;
    }
}