
const CHAR_FILE_EXTENTION = "nsc"
const CHAR_DEFAULT_SKILL_LIMIT = 10

const BUTTON_ACTIVE_COLOR = "#005fff"
const BUTTON_INACTIVE_COLOR = "#4e6a99"

const STRESS_BOX_ACTIVE_COLOR = "#e89090"

class SkillRank{
    constructor(_name,_color,_maxLevel){
        this.name = _name
        this.color = _color
        this._maxLevel = _maxLevel
    }
}

const skillRankDetails = []
skillRankDetails[0] = new SkillRank("Unknown","#ffffff",99)
skillRankDetails[1] = new SkillRank("Bronze","#b36e00",10)
skillRankDetails[2] = new SkillRank("Silver","#a8a8a8",20)
skillRankDetails[3] = new SkillRank("Gold","#ffe882",30)

const SkillRanks = {
    UNK: 0,
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
}
class BasicSkill {
    constructor(){
        this.name = "";
        this.rank = SkillRanks.UNK;
        this.level = 0;
        this.timesUsedSinceLastLevel = 0;
    }

    isSkill(){return true}
    getName(){return this.name;}
    setName(_name){this.name = _name;}

    getRank(){return this.rank;}
    setRank(_rank){this.rank = _rank;}

    getLevel(){return this.level;}
    setLevel(_level){this.level = _level}

    getTimesUsed(){return this.timesUsedSinceLastLevel;}
    setTimesUsed(_timesUsed){this.timesUsedSinceLastLevel = _timesUsed}

    init(_name,_rank,_level,_timesUsed){
        this.setName(_name);this.setRank(_rank);this.setLevel(_level);this.setTimesUsed(_timesUsed);
    }

    printData(){
        return "Name: " + this.name + "\nRank" + this.rank + "\nlevel"
        + this.level + "\nTimes Used This Level: " + this.timesUsedSinceLastLevel;
    }
}
class Character{
    constructor(){
        this.name = "";
        this.skills = [];
        this.skillLimit = CHAR_DEFAULT_SKILL_LIMIT;
        this.stressBoxes = [false,false,false,false]
        this.consequences = ["NONE","NONE","NONE","NONE"]
        this.maxFatePoints = 2
        this.currentFatePoints = this.maxFatePoints
    }

    isChar(){return true}

    init(_name){
        this.name = _name
    }

    addSkill(_skillSlot,_skill){
        if (this.skills[_skillSlot - 1] == null && _skillSlot <= this.skillLimit) {
            this.skills[(_skillSlot - 1)] = _skill;
        }
    }
    setSkills(SkillList){
        for(let i=0;i<SkillList.length;i++){
            this.skills[i] = SkillList[i];
        }
    }

    overwriteCharacterFromObject(newChar){
        //if (newChar.isChar == null){console.log("Character overwrite failed");return false;}
        this.name = newChar.name;
        this.skillLimit = newChar.skillLimit;
        this.stressBoxes = newChar.stressBoxes;
        this.consequences = newChar.consequences;
        this.maxFatePoints = newChar.maxFatePoints;
        this.currentFatePoints = newChar.currentFatePoints;

        for(let i=0;i<newChar.skills.length;i++){
            const e = newChar.skills[i]
            const tempSkill = new BasicSkill()
            tempSkill.init(e.name,e.rank,e.level,e.timesUsedSinceLastLevel)
            this.addSkill((i+1),tempSkill)
        }

        return true

    }

    getName(){return this.name;}
    getSkillLimit(){return this.skillLimit;}
    getSkills(){return this.skills;}
    getConsequences(){return this.consequences;}
    getStressBoxes(){return this.stressBoxes;}
    setStressBoxes(input){
        this.stressBoxes = input
    }
    setStressBox(pos,state){
        if(this.stressBoxes[pos] == null){return false;}

        this.stressBoxes[pos] = state
    }

}