package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_gcbk_777;
public class Config_gcbk_777 extends ConfigBase<Struct_gcbk_777> {
    private static Config_gcbk_777 ins = null;
    public static Config_gcbk_777 getIns(){
        if(ins==null){
            ins = new Config_gcbk_777();
        }
        return ins;
    }
    private Config_gcbk_777(){
        put(1,new Struct_gcbk_777(1,"[[1,402073,1]]",1,"[[1,410438,30000]]",2));
        put(2,new Struct_gcbk_777(2,"[[1,411023,1]]",2,"[[1,410438,20000]]",3));
        put(3,new Struct_gcbk_777(3,"[[1,402074,1]]",3,"[[1,410438,5000]]",10));
        put(4,new Struct_gcbk_777(4,"[[1,402075,1]]",4,"[[1,410438,5000]]",10));
        put(5,new Struct_gcbk_777(5,"[[1,402076,1]]",5,"[[1,410438,5000]]",10));
        put(6,new Struct_gcbk_777(6,"[[1,410087,5]]",6,"[[1,410438,2000]]",50));
        put(7,new Struct_gcbk_777(7,"[[1,412017,100]]",7,"[[1,410438,1000]]",99));
        put(8,new Struct_gcbk_777(8,"[[1,411010,50]]",8,"[[1,410438,500]]",99));
    }
    public void reset(){
        ins = null;
    }
}