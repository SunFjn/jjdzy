package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_allpartyddfh_241;
public class Config_allpartyddfh_241 extends ConfigBase<Struct_allpartyddfh_241> {
    private static Config_allpartyddfh_241 ins = null;
    public static Config_allpartyddfh_241 getIns(){
        if(ins==null){
            ins = new Config_allpartyddfh_241();
        }
        return ins;
    }
    private Config_allpartyddfh_241(){
        put(1,new Struct_allpartyddfh_241(1,5,"[[1,410023,1],[1,411003,5],[1,410017,20]]",1603,32001));
        put(2,new Struct_allpartyddfh_241(2,10,"[[1,410023,1],[1,411003,5],[1,410017,20]]",1603,32002));
        put(3,new Struct_allpartyddfh_241(3,15,"[[1,410023,1],[1,411003,5],[1,410017,40]]",1603,32003));
        put(4,new Struct_allpartyddfh_241(4,20,"[[1,410023,1],[1,411003,5],[1,410017,40]]",1603,32004));
        put(5,new Struct_allpartyddfh_241(5,30,"[[1,410023,2],[1,411003,10],[1,410017,50]]",1603,32005));
        put(6,new Struct_allpartyddfh_241(6,40,"[[1,410023,2],[1,411003,10],[1,410017,50]]",1603,32006));
        put(7,new Struct_allpartyddfh_241(7,50,"[[1,410023,2],[1,411003,15],[1,410017,70]]",1603,32007));
        put(8,new Struct_allpartyddfh_241(8,65,"[[1,410023,2],[1,411003,20],[1,410017,70]]",1603,32008));
        put(9,new Struct_allpartyddfh_241(9,80,"[[1,410023,3],[1,411003,20],[1,410017,100]]",1603,32009));
        put(10,new Struct_allpartyddfh_241(10,90,"[[1,410023,5],[1,411003,50],[1,410017,200]]",1603,32010));
    }
    public void reset(){
        ins = null;
    }
}