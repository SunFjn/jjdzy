package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lzdreward_234;
public class Config_lzdreward_234 extends ConfigBase<Struct_lzdreward_234> {
    private static Config_lzdreward_234 ins = null;
    public static Config_lzdreward_234 getIns(){
        if(ins==null){
            ins = new Config_lzdreward_234();
        }
        return ins;
    }
    private Config_lzdreward_234(){
        put(1,new Struct_lzdreward_234(1,"[[1,1]]","[[1,400011,180],[1,410016,900]]"));
        put(2,new Struct_lzdreward_234(2,"[[2,2]]","[[1,400011,150],[1,410016,750]]"));
        put(3,new Struct_lzdreward_234(3,"[[3,3]]","[[1,400011,120],[1,410016,600]]"));
        put(4,new Struct_lzdreward_234(4,"[[4,5]]","[[1,400011,108],[1,410016,450]]"));
        put(5,new Struct_lzdreward_234(5,"[[6,10]]","[[1,400011,90],[1,410016,360]]"));
        put(6,new Struct_lzdreward_234(6,"[[10,999999]]","[[1,400011,60],[1,410016,300]]"));
    }
    public void reset(){
        ins = null;
    }
}