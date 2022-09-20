package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cgylrw_262;
public class Config_cgylrw_262 extends ConfigBase<Struct_cgylrw_262> {
    private static Config_cgylrw_262 ins = null;
    public static Config_cgylrw_262 getIns(){
        if(ins==null){
            ins = new Config_cgylrw_262();
        }
        return ins;
    }
    private Config_cgylrw_262(){
        put(1,new Struct_cgylrw_262(1,1,5,"[[4,0,500]]",1,36001));
        put(2,new Struct_cgylrw_262(2,3,35,"[[4,0,500]]",1,36002));
        put(3,new Struct_cgylrw_262(3,4,1,"[[4,0,750]]",1,36003));
        put(4,new Struct_cgylrw_262(4,7,5,"[[4,0,750]]",1,36004));
        put(5,new Struct_cgylrw_262(5,1,13,"[[4,0,1000]]",2,36005));
        put(6,new Struct_cgylrw_262(6,3,70,"[[4,0,1000]]",2,36006));
        put(7,new Struct_cgylrw_262(7,2,400000,"[[4,0,1250]]",2,36007));
        put(8,new Struct_cgylrw_262(8,6,15,"[[4,0,1250]]",2,36008));
        put(9,new Struct_cgylrw_262(9,1,80,"[[4,0,1500]]",3,36009));
        put(10,new Struct_cgylrw_262(10,2,1500000,"[[4,0,2000]]",3,36010));
        put(11,new Struct_cgylrw_262(11,4,40,"[[4,0,2500]]",3,36011));
        put(12,new Struct_cgylrw_262(12,6,80,"[[4,0,2500]]",3,36012));
        put(13,new Struct_cgylrw_262(13,1,100,"[[4,0,3000]]",4,36013));
        put(14,new Struct_cgylrw_262(14,2,3000000,"[[4,0,3000]]",4,36014));
        put(15,new Struct_cgylrw_262(15,5,4,"[[4,0,3500]]",4,36015));
        put(16,new Struct_cgylrw_262(16,6,150,"[[4,0,3500]]",4,36016));
        put(17,new Struct_cgylrw_262(17,1,120,"[[4,0,4000]]",5,36017));
        put(18,new Struct_cgylrw_262(18,2,4000000,"[[4,0,4000]]",5,36018));
        put(19,new Struct_cgylrw_262(19,5,6,"[[4,0,4000]]",5,36019));
        put(20,new Struct_cgylrw_262(20,7,500,"[[4,0,4500]]",5,36020));
    }
    public void reset(){
        ins = null;
    }
}