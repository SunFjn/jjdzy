package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hfkhgod_286;
public class Config_hfkhgod_286 extends ConfigBase<Struct_hfkhgod_286> {
    private static Config_hfkhgod_286 ins = null;
    public static Config_hfkhgod_286 getIns(){
        if(ins==null){
            ins = new Config_hfkhgod_286();
        }
        return ins;
    }
    private Config_hfkhgod_286(){
        put(101,new Struct_hfkhgod_286(101,1,8,20,"[[1,410406,1]]",0,0));
        put(102,new Struct_hfkhgod_286(102,0,8,20,"[[1,410406,3]]",5,0));
        put(103,new Struct_hfkhgod_286(103,0,8,20,"[[1,410406,6]]",0,6));
        put(111,new Struct_hfkhgod_286(111,1,9,15,"[[1,416003,2]]",0,0));
        put(112,new Struct_hfkhgod_286(112,0,9,15,"[[1,416003,4]]",7,0));
        put(113,new Struct_hfkhgod_286(113,0,9,15,"[[1,416003,8]]",0,12));
        put(121,new Struct_hfkhgod_286(121,1,11,10,"[[1,410023,5]]",0,0));
        put(122,new Struct_hfkhgod_286(122,0,11,10,"[[1,410023,10]]",8,0));
        put(123,new Struct_hfkhgod_286(123,0,11,10,"[[1,410023,30]]",0,30));
        put(131,new Struct_hfkhgod_286(131,1,13,5,"[[1,410086,1]]",0,0));
        put(132,new Struct_hfkhgod_286(132,0,13,5,"[[1,410086,1]]",10,0));
        put(133,new Struct_hfkhgod_286(133,0,13,5,"[[1,410086,5]]",0,98));
        put(141,new Struct_hfkhgod_286(141,1,15,5,"[[1,410019,10]]",0,0));
        put(142,new Struct_hfkhgod_286(142,0,15,5,"[[1,410019,25]]",12,0));
        put(143,new Struct_hfkhgod_286(143,0,15,5,"[[1,410019,55]]",0,158));
        put(201,new Struct_hfkhgod_286(201,1,20,0,"[[1,411010,188]]",0,0));
        put(202,new Struct_hfkhgod_286(202,0,20,0,"[[1,411010,288]]",10,0));
        put(203,new Struct_hfkhgod_286(203,0,20,0,"[[1,411010,888]]",0,98));
        put(211,new Struct_hfkhgod_286(211,1,22,0,"[[1,410092,188]]",0,0));
        put(212,new Struct_hfkhgod_286(212,0,22,0,"[[1,410092,388]]",11,0));
        put(213,new Struct_hfkhgod_286(213,0,22,0,"[[1,410092,888]]",0,158));
        put(221,new Struct_hfkhgod_286(221,1,24,0,"[[1,460082,1]]",0,0));
        put(222,new Struct_hfkhgod_286(222,0,24,0,"[[1,460083,1]]",12,0));
        put(223,new Struct_hfkhgod_286(223,0,24,0,"[[1,460059,1]]",0,168));
    }
    public void reset(){
        ins = null;
    }
}