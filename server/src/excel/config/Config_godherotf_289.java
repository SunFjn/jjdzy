package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_godherotf_289;
public class Config_godherotf_289 extends ConfigBase<Struct_godherotf_289> {
    private static Config_godherotf_289 ins = null;
    public static Config_godherotf_289 getIns(){
        if(ins==null){
            ins = new Config_godherotf_289();
        }
        return ins;
    }
    private Config_godherotf_289(){
        put(1,new Struct_godherotf_289(1,2,"[[1,410306,2]]","[[102,0],[103,0],[104,0]]",0));
        put(2,new Struct_godherotf_289(2,3,"[[1,410306,3]]","[[102,520000],[103,7000],[104,7000]]",200000));
        put(3,new Struct_godherotf_289(3,4,"[[1,410306,5]]","[[102,1280000],[103,16000],[104,16000]]",480000));
        put(4,new Struct_godherotf_289(4,5,"[[1,410306,7]]","[[102,2020000],[103,25000],[104,25000]]",755000));
        put(5,new Struct_godherotf_289(5,6,"[[1,410306,8]]","[[102,3140000],[103,39500],[104,39500]]",1180000));
        put(6,new Struct_godherotf_289(6,7,"[[1,410306,10]]","[[102,4270000],[103,53500],[104,53500]]",1602500));
        put(7,new Struct_godherotf_289(7,8,"[[1,410306,12]]","[[102,5390000],[103,67500],[104,67500]]",2022500));
        put(8,new Struct_godherotf_289(8,9,"[[1,410306,14]]","[[102,6520000],[103,81500],[104,81500]]",2445000));
        put(9,new Struct_godherotf_289(9,10,"[[1,410306,17]]","[[102,7640000],[103,95500],[104,95500]]",2865000));
        put(10,new Struct_godherotf_289(10,11,"[[1,410306,21]]","[[102,9350000],[103,117000],[104,117000]]",3507500));
        put(11,new Struct_godherotf_289(11,12,"[[1,410306,26]]","[[102,11050000],[103,138000],[104,138000]]",4142500));
        put(12,new Struct_godherotf_289(12,13,"[[1,410306,30]]","[[102,12760000],[103,159500],[104,159500]]",4785000));
        put(13,new Struct_godherotf_289(13,14,"[[1,410306,32]]","[[102,14470000],[103,181000],[104,181000]]",5427500));
        put(14,new Struct_godherotf_289(14,15,"[[1,410306,35]]","[[102,16560000],[103,207000],[104,207000]]",6210000));
        put(15,new Struct_godherotf_289(15,16,"[[1,410306,37]]","[[102,18660000],[103,233000],[104,233000]]",6995000));
        put(16,new Struct_godherotf_289(16,17,"[[1,410306,40]]","[[102,20750000],[103,259500],[104,259500]]",7782500));
        put(17,new Struct_godherotf_289(17,18,"[[1,410306,42]]","[[102,22850000],[103,285500],[104,285500]]",8567500));
        put(18,new Struct_godherotf_289(18,19,"[[1,410306,45]]","[[102,25130000],[103,314000],[104,314000]]",9422500));
        put(19,new Struct_godherotf_289(19,20,"[[1,410306,47]]","[[102,27420000],[103,343000],[104,343000]]",10285000));
        put(20,new Struct_godherotf_289(20,21,"[[1,410306,49]]","[[102,29710000],[103,371500],[104,371500]]",11142500));
        put(21,new Struct_godherotf_289(21,0,"0","[[102,32000000],[103,400000],[104,400000]]",12000000));
    }
    public void reset(){
        ins = null;
    }
}